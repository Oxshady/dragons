from flask import jsonify, request
from api.v1.views import api_v1
import requests
import json
from os import getenv
from dotenv import load_dotenv
load_dotenv()
import time


cache = {
    "timestamp": None,
    "data": {}
}

CACHE_TIMEOUT = 3600

def get_movies(page):
    data = []
    token = getenv("MOVIE_DB_ACCESS_TOKEN")
    url = f"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page={page}"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(url, headers=headers)
    results = response.json().get('results', [])

    if not results:
        return jsonify({"error": "No results found"}), 404
    
    for result in results:
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

@api_v1.route('/movies/home', methods=['POST'], strict_slashes=False)
def home_movies():
    global cache
    current_time = time.time()

    page = int(request.json.get('page', 1))
    print(f"page is {page}")
    limit = 20

    if cache["timestamp"] and current_time - cache["timestamp"] < CACHE_TIMEOUT:
        if page in cache["data"]:
            start_index = (page - 1) * limit
            end_index = start_index + limit
            return jsonify(cache["data"][page][start_index:end_index])

    movies = get_movies(page)

    if not cache["timestamp"] or current_time - cache["timestamp"] >= CACHE_TIMEOUT:
        cache["data"] = {}
        cache["timestamp"] = current_time

    cache["data"][page] = movies

    return jsonify(movies)


@api_v1.route('/movies/search', methods=['POST'], strict_slashes=False)
def seacrh_movies():
    required_movie = []
    data = request.get_json()
    title = data.get('title')
    token = getenv("MOVIE_DB_ACCESS_TOKEN")
    url = f"https://api.themoviedb.org/3/search/movie?query={title}"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(url, headers=headers)
    details = response.json().get('results')[0]
    img = "https://image.tmdb.org/t/p/original/{}".format(details.get('poster_path'))
    required_movie.append({
        'movieid': details.get('id'),
        'title': details.get('title'),
        'year': details.get('release_date'),
        'rate': details.get('vote_average'),
        'popularity': details.get('popularity'),
        'vote_count': details.get('vote_count'),
        'img': img,
        'description': details.get('overview'),
        'language': details.get('original_language'),
        'adult': details.get('adult')
    })
    return required_movie
