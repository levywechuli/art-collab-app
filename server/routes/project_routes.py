from flask import Blueprint, request, jsonify
from models import db, Project, Artwork, ProjectArtwork
from schemas import ProjectSchema, ArtworkSchema

project_bp = Blueprint('project', __name__)

# Create Project Route
@project_bp.route('', methods=['POST'])
def create_project():
    data = request.get_json()

    # Get data from request
    title = data.get('title')
    description = data.get('description')

    # Create a new Project object
    new_project = Project(
        title=title,
        description=description
    )

    # Add the new project to the session and commit
    db.session.add(new_project)
    db.session.commit()

    # Serialize the project object to return
    project_schema = ProjectSchema()
    return jsonify(project_schema.dump(new_project)), 201

# Get all Projects Route
@project_bp.route('', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    project_schema = ProjectSchema(many=True)
    return jsonify(project_schema.dump(projects))

# Get a single project by ID Route
@project_bp.route('/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)  # If project doesn't exist, return 404
    project_schema = ProjectSchema()
    return jsonify(project_schema.dump(project))

# Add Artwork to a Project
@project_bp.route('/<int:project_id>/artworks', methods=['POST'])
def add_artwork_to_project(project_id):
    data = request.get_json()

    # Check if artwork ID is provided in the request
    artwork_id = data.get('artwork_id')

    # Check if the project exists
    project = Project.query.get_or_404(project_id)
    artwork = Artwork.query.get_or_404(artwork_id)

    # Create the relationship in ProjectArtwork table
    project_artwork = ProjectArtwork(
        project_id=project.id,
        artwork_id=artwork.id
    )

    db.session.add(project_artwork)
    db.session.commit()

    # Return a success message
    return jsonify({"message": "Artwork added to project successfully!"}), 200
