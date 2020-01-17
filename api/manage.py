from flask.cli import FlaskGroup
from project import create_app, db
from project.population.models import People

cli = FlaskGroup(create_app)


@cli.command("recreate_db")
def recreate_db():
  db.drop_all()
  db.create_all()
  db.session.commit()
  
if __name__ == "__main__":
  cli()
