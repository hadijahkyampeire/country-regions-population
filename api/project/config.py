import os


class BaseConfig:
<<<<<<< HEAD
  """Base configuration"""
  TESTING = False
  SQLALCHEMY_TRACK_MODIFICATIONS = False
=======
    """Base configuration"""

    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY")
>>>>>>> add unit tests


class DevelopmentConfig(BaseConfig):
    """Development configuration"""

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")


class TestingConfig(BaseConfig):
    """Testing configuration"""

    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_TEST_URL")


class ProductionConfig(BaseConfig):
    """Production configuration"""

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
