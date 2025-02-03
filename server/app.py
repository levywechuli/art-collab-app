from flask import Flask, send_from_directory
from flask_cors import CORS
from models import db  # Ensure the db is properly imported from your models file
from routes.artwork_routes import artwork_bp
from routes.project_routes import project_bp
from routes.user_routes import user_bp
import os

# Initialize Flask app
app = Flask(__name__)

# Configure the app with your config settings (Ensure you have a Config class in config.py)
app.config.from_object('config.Config')  # Ensure 'Config' is defined in your config.py

# Print the database URI to make sure it's correct
print(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
def home():
    return 'Welcome to the Art Collaboration API!'  


@app.route('/favicon.ico')
def favicon():
   

# Enable Cross-Origin Resource Sharing (CORS) for handling cross-origin requests
CORS(app)

# Register Blueprints to handle different parts of the app
app.register_blueprint(artwork_bp, url_prefix='/artworks')
app.register_blueprint(project_bp, url_prefix='/projects')
app.register_blueprint(user_bp, url_prefix='/users')

# Route for the home page (you can customize this)
@app.route('/')
def home():
    return 'Welcome to the Art Collaboration API!'  # Or render a template for a homepage

# Route to handle favicon.ico (optional)
@app.route('/favicon.ico')
def favicon():
    # Make sure the 'static' folder exists and contains the 'favicon.ico'
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico')

if __name__ == "__main__":
    # Run the app in debug mode (make sure to switch to production server when deploying)
    print("Starting Flask app...")
    app.run(debug=True)
