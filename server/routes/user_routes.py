from flask import Blueprint, request, jsonify
from models import db, User
from schemas import UserSchema

user_bp = Blueprint('user', __name__)

# Create User Route
@user_bp.route('', methods=['POST'])
def create_user():
    data = request.get_json()

    # Check if all required fields are provided
    username = data.get('username')
    email = data.get('email')
    password_hash = data.get('password_hash')  # In practice, hash the password before saving it
    bio = data.get('bio')
    profile_picture_url = data.get('profile_picture_url')

    # Create a new User object
    new_user = User(
        username=username,
        email=email,
        password_hash=password_hash,
        bio=bio,
        profile_picture_url=profile_picture_url
    )

    # Add the new user to the session and commit
    db.session.add(new_user)
    db.session.commit()

    # Serialize the user object to return
    user_schema = UserSchema()
    return jsonify(user_schema.dump(new_user)), 201

# Get all Users Route
@user_bp.route('', methods=['GET'])
def get_users():
    users = User.query.all()
    user_schema = UserSchema(many=True)
    return jsonify(user_schema.dump(users))

# Get a single user by ID Route
@user_bp.route('/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)  # If user doesn't exist, return 404
    user_schema = UserSchema()
    return jsonify(user_schema.dump(user))
