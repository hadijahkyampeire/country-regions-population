import json
import os
import coverage
import sys
import unittest

from flask.cli import FlaskGroup
from project import create_app, db


COV = coverage.coverage(
    branch=True, include="project/*", omit=["project/tests/*", "project/config.py"],
)
COV.start()


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


@cli.command()
def test():
    """Runs the tests without code coverage"""
    tests = unittest.TestLoader().discover("project/tests", pattern="test*.py")
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    sys.exit(result)


@cli.command()
def test_cov():
    """Runs the tests with code coverage"""
    tests = unittest.TestLoader().discover("project/tests", pattern="test*.py")
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print("Coverage Summary:")
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    sys.exit(result)


if __name__ == "__main__":
    cli()
