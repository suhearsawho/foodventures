"""This module defines the routes for result related queries"""

import argparse
import io
import requests

from flask import (
    render_template, request, Blueprint, redirect, url_for
)
from .travelplan import TravelPlan 

bp = Blueprint('results', __name__, url_prefix='/')


@bp.route('')
def index():
    """Handles the homepage where users can enter queries to obtain
    multiple travel itineraries
    Return: Template for results/index.html
    """
    query_string = request.args
    print(request.__dict__)
    if query_string:
        return redirect(url_for('results.travel_plan', **query_string)) 
    
    return render_template('results/index.html')

@bp.route('/search', methods=('GET', 'POST'))
def travel_plan():
    """Handles the travel_plan page that displays a list of results
    Return: Template for travel plan
    """
    query_string = request.args
    if query_string:
        if request.method == 'GET':
            query_dict = query_string.to_dict()
            travel = TravelPlan(**query_dict)
            travel.make_all_plans()
            return render_template('results/travel_plan.html', travel=travel)

        # Should I use put instead?
        if request.method == 'POST':
            pass
            # Save the data into the user profile 
    return render_template('results/index.html')
