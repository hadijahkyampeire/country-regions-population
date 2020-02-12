from sqlalchemy.sql import func
from project import db


class People(db.Model):

    __tablename__ = "people"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    district = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    region = db.Column(db.String(128), nullable=False)
    created = db.Column(db.DateTime, default=func.now(), nullable=False)

    def __init__(self, name, date_of_birth, district, country, region):
        self.name = name
        self.date_of_birth = date_of_birth
        self.district = district
        self.country = country
        self.region = region

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "date_of_birth": str(self.date_of_birth),
            "district": self.district,
            "country": self.country,
            "region": self.region,
            "created": str(self.created),
        }
