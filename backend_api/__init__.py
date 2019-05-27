"""This module defines the application factory"""

from flask import Flask

def create_app():
    """Creates and configure the application factory"""
    app = Flask(__name__)
    
    # Import results blueprint
    from . import results
    app.register_blueprint(results.bp)

    return app
