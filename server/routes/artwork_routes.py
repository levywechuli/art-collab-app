from flask import Blueprint, request, jsonify
from models import db, Artwork
from schemas import ArtworkSchema

artwork_bp = Blueprint('artwork', __name__)

# Create Artwork
@artwork_bp.route('', methods=['POST'])
def create_artwork():
    title = request.json.get('title')
    description = request.json.get('description')
    image_url = request.json.get('image_url')
    user_id = request.json.get('user_id')
    
    artwork = Artwork(title=title, description=description, image_url=image_url, user_id=user_id)
    
    db.session.add(artwork)
    db.session.commit()
    
    artwork_schema = ArtworkSchema()
    return jsonify(artwork_schema.dump(artwork)), 201

# Get all artworks
@artwork_bp.route('', methods=['GET'])
def get_artworks():
    artworks = Artwork.query.all()
    artwork_schema = ArtworkSchema(many=True)
    return jsonify(artwork_schema.dump(artworks))

# Get artwork details
@artwork_bp.route('/<int:id>', methods=['GET'])
def get_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    artwork_schema = ArtworkSchema()
    return jsonify(artwork_schema.dump(artwork))
