import os

class BaseConfig:
  """Base configuration"""
  TESTING = False
  SQLALCHEMY_TRACK_MODIFICATION = False


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