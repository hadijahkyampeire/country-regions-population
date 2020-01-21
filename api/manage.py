import json
import os

from flask.cli import FlaskGroup
from project import create_app, db
from project.population.models import People

cli = FlaskGroup(create_app)


@cli.command("recreate_db")
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command('seed_db')
def seed_db():
    """Seeds the database."""
    print(os.path.dirname(__file__), 'os.......')
    with open(os.path.join(os.path.dirname(__file__), "project/fixtures", "bootstrap_db.json")) as file:
        data = json.load(file)
    print(data)
    db.session.add(People(data))
    db.session.commit()


if __name__ == "__main__":
    cli()
