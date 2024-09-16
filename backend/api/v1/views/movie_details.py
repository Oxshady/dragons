from flask import jsonify, request
from api.v1.views import api_v1
import requests
import json
from os import getenv
from dotenv import load_dotenv
load_dotenv()

def find_by_id(movie_id):
    data = []
    token = getenv("MOVIE_DB_ACCESS_TOKEN")
    url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(url, headers=headers)
    result = response.json()

    if not result:
        return jsonify({"error": "No results found"}), 404
    
    img = "https://image.tmdb.org/t/p/original/{}".format(result.get('poster_path'))
    data.append({
        'movieid': result.get('id'),
        'title': result.get('title'),
        'year': result.get('release_date'),
        'rate': result.get('vote_average'),
        'popularity': result.get('popularity'),
        'vote_count': result.get('vote_count'),
        'img': img,
        'description': result.get('overview'),
        'language': result.get('original_language'),
        'adult': result.get('adult')
    })
    return data

@api_v1.route('/movies', methods=['GET'], strict_slashes=False)
def get_by_id():
    movie_id = request.args.get('movieid')
    if not movie_id:
        return jsonify({'error': 'No movie ID provided'}), 400

    return jsonify(find_by_id(movie_id))
