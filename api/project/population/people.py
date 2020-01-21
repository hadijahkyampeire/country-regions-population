from flask import Blueprint, request
from flask_restful import Resource, Api
from sqlalchemy import exc

from project import db
from project.population.models import People

population_blueprint = Blueprint('population', __name__)
api = Api(population_blueprint)


class PeopleList(Resource):
    def post(self):
        post_data = request.get_json()
        response_object = {
            'status': 'fail',
            'message': 'Invalid payload.'
        }
        if not post_data:
            return response_object, 400
        name = post_data.get('name')
        date_of_birth = post_data.get('date_of_birth')
        district = post_data.get('district')
        country = post_data.get('country')
        region = post_data.get('region').lower()
        try:
            db.session.add(People(name=name, date_of_birth=date_of_birth,
                                  district=district, country=country, region=region))
            db.session.commit()
            response_object = {
                'status': 'success',
                'message': f'{name} person was added!'
            }
            return response_object, 201
        except exc.IntegrityError:
            db.session.rollback()
            return response_object, 400

    def get(self):
        """Get all people records"""
        persons = People.query.all()
        print(request.args)
        # query = request.args.get('district').lower()
        region = request.args.get('region', '').lower()
        # if query:
        #     persons = People.query.filter_by(district=query).all()
        if region:
            persons = People.query.filter_by(region=region).all()
        response_object = {
            'status': 'success',
            'data': {
                'people': [people.to_json() for people in persons]
            }
        }
        return response_object, 200


class Person(Resource):
    def get(self, person_id):
        """Get single people details"""
        response_object = {
            'status': 'fail',
            'message': 'Person does not exist'
        }
        try:
            person = People.query.filter_by(id=person_id).first()
            if not person:
                return response_object, 400
            else:
                response_object = {
                    'status': 'success',
                    'data': {
                        'id': person.id,
                        'name': person.name,
                        'date_of_birth': person.date_of_birth,
                        'district': person.district,
                        'country': person.country,
                        'region': person.region,
                        'created': person.created
                    }
                }
                return response_object, 200
        except ValueError:
            return response_object, 404


api.add_resource(PeopleList, '/people')
api.add_resource(Person, '/people/<person_id>')
