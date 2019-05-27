"""This module defines the TravelPlan class"""
import asyncio
import io
import random
import requests

from google.cloud import vision
from google.cloud.vision import types


class TravelPlan():
    """TravelPlan class
    """
    types_plans = {'tourist': 'Tourist Attractions', 'local': 'Local Favorites',
                   'food': 'Food', 'physical': 'Hikes'}
    
    def __init__(self, *args, **kwargs):
        """Setup for the class"""
        for key, value in kwargs.items():
            setattr(self, key, value)
        
        # Set number of destinations for now -> In the future, allow user to choose
        # Number of destinations
        self.num_destinations = 3
        
        # Store the Google Maps API key
        with open('google_maps_apikey.txt', 'r') as f:
            self.google_maps_apikey = f.read().rstrip();

        self.google_maps_uri = 'https://maps.googleapis.com/maps/api/js?key={}\
                                &callback=initMap'.format(self.google_maps_apikey)

    def make_all_plans(self):
        """Method for obtaining tourist travel plans
        Return: List of dictionarys. Each dictionary corresponds to a different
        type of plan.
        """
        path = self.food_entry
        if path.startswith('http'):
            self.food_entry = self.annotate(path).web_entities[0].description

        self.restaurants = self.yelp_api(self.location)
        # Defines the first starting point of itinerary
        random_value = random.randint(0, len(self.restaurants) - 1)
        start = self.restaurants[random_value]
        # Add asynchrounous calls

        # Obtain tourist plan based on food for practice -> Will integrate
        # With the loop in the future
        plans = list(self.types_plans.keys())
        self.make_plan(start, plans[0])
        self.make_plan(start, plans[1])
        self.make_plan(start, plans[2])
        self.make_plan(start, plans[3])

        #async def main():
        #await asyncio.gather(
        #        self.make_plan(start, plans[0]),
        #     )

        # asyncio.run(main())

    @staticmethod
    def annotate(path):
        """This function was taken from Google Cloud's Web API tutorial
        https://cloud.google.com/vision/docs/internet-detection
        Return: instance of WebDetection class with web annotations associated
        with an image
        """
        client = vision.ImageAnnotatorClient()

        if path.startswith('http') or path.startswith('gs:'):
            image = types.Image()
            image.source.image_uri = path

        else:
            with io.open(path, 'rb') as image_file:
                content = image_file.read()

            image = types.Image(content=content)

        web_detection = client.web_detection(image=image).web_detection

        return web_detection
    
    def yelp_api(self, location, type_plan=None):
        """Interacts with the Yelp API to retrieve results based on user input
        Args:
            query: Keyword to be sent in Yelp API request
            location: Location
        Return:
            List of results from Yelp Query
        """
        # TODO: Add filters to Yelp search like distance and rating
        yelp_api = 'https://api.yelp.com/v3/businesses/search'
        params = {'location': self.get_address(location)}

        if type_plan in self.types_plans.keys():
            # Predefined queries
            params['term'] = self.types_plans[type_plan]
        else:
            params['term'] = self.food_entry
        with open('yelp_apikey.txt') as f:
            api_key = f.read().rstrip()
        headers = {'Authorization': 'Bearer {}'.format(api_key)}

        r = requests.get(yelp_api, params=params, headers=headers)
        yelp_results = r.json().get('businesses')
        output = [ result for result in yelp_results ]
        return output

    def make_plan(self, start, type_plan):
        """Makes the plan
        Args:
            type_plan: Defines the key word to use in Yelp API requests
            start: A dictionary (obtained from Yelp API) that contains
            business details. Defines starting point of plan
        Return: 
            A dictionary that maps out itinerary
        """
        final = [] 
        destinations = self.yelp_api(start, type_plan)
        google_map = self.distance_matrix_api(start, destinations)

        for i in range(len(google_map) + 1):
            location = {}
            if i == 0:
                location['yelp_business'] = start
            else:
                location['yelp_business'] = destinations[i - 1]

            if i < len(google_map) - 1:
                location['google_map'] = google_map[i]

            final.append(location)
        print(final)
        setattr(self, type_plan, final)
        return final
                

    def distance_matrix_api(self, start, destinations):
        """Calls the distance matrix API from Google
        Returns: a list of the dictionary output from each Google API call 
        """
        google_api = 'https://maps.googleapis.com/maps/api/distancematrix/json'
        with open('google_maps_apikey.txt') as f:
            api_key = f.read().rstrip()
        # Perform async calls to distance_matrix_api. (origin to multiple locations)
        # Choose the shortest distance and use that destination to begin a new async call
        params = {'key': api_key, 'origins': self.get_address(start)}
        index = -1
        results = []
        async def call_google(index):
            if hasattr(params, 'origins') is False: 
                params['origins'] = self.get_address(destinations[index])
            params['destinations'] = self.get_address(destinations[index + 1])
            r = requests.get(google_api, params=params)
            params.pop('origins', None)
            results.append(r.json())
        
        async def orchestrate():
            await asyncio.gather(
                call_google(index),
                call_google(index + 1),
                call_google(index + 2),
            )
        
        asyncio.run(orchestrate())
        return results

    @staticmethod
    def get_address(business):
        """Given a dictionary from Yelp API search that represents
        one business, the address will be returned
        Return: String representing the address"""
        if type(business) is not dict:
            return business
        location = business.get('location')
        address = location.get('address1') + ',' + location.get('city') +\
                  ',' + location.get('state')
        return address
