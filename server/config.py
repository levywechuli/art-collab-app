import os

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.urandom(24)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///artist_collab.db'  # SQLite for simplicity, use Postgres in production
    CORS_HEADERS = 'Content-Type'
