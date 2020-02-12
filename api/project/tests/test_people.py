import json
import unittest

from project import db
from project.population.models import People
from project.tests.base import BaseTestCase


def add_people(name, date_of_birth, district, country, region):
    people = People(
        name=name,
        date_of_birth=date_of_birth,
        district=district,
        country=country,
        region=region,
    )
    db.session.add(people)
    db.session.commit()
    return people


class TestPeopleResource(BaseTestCase):
    """Tests for people resource."""

    def test_add_people(self):
        """Ensure a new person can be added to the database"""
        data = json.dumps(
            {
                "name": "test name",
                "date_of_birth": "2016-08-07",
                "district": "test district",
                "country": "test country",
                "region": "test region",
            }
        )
        with self.client:
            response = self.client.post(
                "/people", data=data, content_type="application/json"
            )
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 201)
            self.assertEqual(data["status"], "success")
            self.assertEqual(data["message"], "test name person was added!")

    def test_add_people_missing_keys(self):
        """Ensure can't a new person to the database with missing key in payload"""
        data = json.dumps(
            {
                "name": "test name",
                "date_of_birth": "2016-08-07",
                "district": "test district",
            }
        )
        with self.client:
            response = self.client.post(
                "/people", data=data, content_type="application/json"
            )
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 400)
            self.assertEqual(data["status"], "fail")
            self.assertEqual(data["message"], "Invalid payload.")

    def test_get_people(self):
        """Test get all people"""
        add_people(
            "test name 1",
            "2016-08-09",
            "test district 1",
            "test country 1",
            "test region 1",
        )
        data = json.dumps(
            {
                "name": "test name 2",
                "date_of_birth": "2016-08-07",
                "district": "test district 2",
                "country": "test country 2",
                "region": "test region 2",
            }
        )
        with self.client:
            self.client.post("/people", data=data, content_type="application/json")
            response = self.client.get("/people")
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(data["data"]["people"]), 2)

    def test_get_single_person(self):
        """Test get single person"""
        person = add_people(
            "test name 1",
            "2016-08-09",
            "test district 1",
            "test country 1",
            "test region 1",
        )
        data = json.dumps(
            {
                "name": "test name 2",
                "date_of_birth": "2016-08-07",
                "district": "test district 2",
                "country": "test country 2",
                "region": "test region 2",
            }
        )
        with self.client:
            self.client.post("/people", data=data, content_type="application/json")
            response = self.client.get(f"/people/{person.id}")
            data = json.loads(response.data.decode())["data"]
            self.assertEqual(response.status_code, 200)
            self.assertEqual(data["id"], 1)
            self.assertEqual(data["name"], "test name 1")

    def test_get_single_person_incorrect_id(self):
        """Test get single person with incorrect id"""
        add_people(
            "test name 1",
            "2016-08-09",
            "test district 1",
            "test country 1",
            "test region 1",
        )
        with self.client:
            response = self.client.get(f"/people/2")
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 404)
            self.assertEqual(data["status"], "fail")
            self.assertEqual(data["message"], "Person does not exist")

    def test_get_single_person_not_id(self):
        """Test get single person invalid id"""
        add_people(
            "test name 1",
            "2016-08-09",
            "test district 1",
            "test country 1",
            "test region 1",
        )
        with self.client:
            response = self.client.get(f"/people/blah")
            data = json.loads(response.data.decode())
            self.assertEqual(response.status_code, 400)
            self.assertEqual(data["status"], "fail")
            self.assertEqual(data["message"], "Id must be an integer.")


if __name__ == "__main__":
    unittest.main()
