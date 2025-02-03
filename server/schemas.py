from flask_marshmallow import Marshmallow
from models import User, Artwork, Project, Comment

ma = Marshmallow()

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class ArtworkSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Artwork

class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Project

class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
