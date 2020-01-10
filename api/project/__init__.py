import os
from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)

app_settings = os.getenv("APP_SETTINGS")
app.config.from_object(app_settings)

# instantiate db
db = SQLAlchemy(app)

class Population(db.Model):
  __tablename__ = 'population'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  village = db.Column(db.String(128))

  def __init__(self, village):
    self.village = village

class Ping(Resource):
  def get(self):
    return {
      'status':'success',
      'message': 'heyyy'
    }

api.add_resource(Ping, '/ping')