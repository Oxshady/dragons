from flask import request, jsonify, session
from models import db
from api.v1.views import api_v1
from favourite import Favourite

@api_v1.route('/favourite', methods='[GET]')
def get_favourite():
    '''Get all favourites for the current user.

    This route allows users to view all their favourite movies. The user's 
    favourite movies are retrieved from the database using the user ID stored in 
    the session. If the user is not logged in, an error message is returned.

    Returns:
        Response:
            - **200 OK**: If the user is logged in, returns a JSON object with the user's favourite movies.
            - **401 Unauthorized**: If no user is logged in.
    '''
    if 'user_id' in session:
        user_id = session['user_id']
        favourites = db.filter_group("Favourite", user_id=user_id)
        return jsonify([fav.to_dict() for fav in favourites]), 200
    else:
        return jsonify({'error': 'You are not logged in'}), 401


@api_v1.route('/favourite', methods='[POST]')
def add_favourite():
    '''Add a new favourite movie.

    This route allows users to add a new movie to their favourites list. The 
    movie ID is provided in the JSON body. If the movie is already in the user's 
    favourites list, an error message is returned.

    JSON Body:
        - **movie_id** (int): The ID of the movie to add to favourites.

    Returns:
        Response:
            - **201 Created**: If the movie is successfully added to favourites, returns a success message.
            - **400 Bad Request**: If the movie is already in favourites or the movie ID is missing.
            - **401 Unauthorized**: If no user is logged in.
    '''
    if 'user_id' not in session:
        return jsonify({'error': 'You are not logged in'}), 401
    user_id = session['user_id']
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON'}), 400
    movie_id = data.get('movie_id')
    if not movie_id:
        return jsonify({'error': 'movie ID is required'}), 400

    if db.filter_one("Favourite", user_id=user_id, movie_id=movie_id):
        return jsonify({'error': 'movie already in favourites'}), 400

    new_favourite = Favourite(user_id=user_id, movie_id=movie_id)
    new_favourite.save()

    return jsonify({'message': 'movie added to favourites'}), 201


api_v1.route('/favourite', methods='[DELETE]')
def delete_favourite():
    '''Delete a favourite movie.

    This route allows users to remove an movie from their favourites list. The 
    movie ID is provided in the JSON body. If the movie is not in the user's 
    favourites list, an error message is returned.

    JSON Body:
        - **movie_id** (int): The ID of the movie to remove from favourites.

    Returns:
        Response:
            - **200 OK**: If the movie is successfully removed from favourites, returns a success message.
            - **400 Bad Request**: If the movie is not in favourites or the movie ID is missing.
            - **401 Unauthorized**: If no user is logged in.
    '''
    if 'user_id' not in session:
        return jsonify({'error': 'You are not logged in'}), 401
    user_id = session['user_id']
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON'}), 400
    movie_id = data.get('movie_id')
    if not movie_id:
        return jsonify({'error': 'movie ID is required'}), 400
    favourite = db.filter_one("Favourite", user_id=user_id, movie_id=movie_id)
    if not favourite:
        return jsonify({'error': 'movie not in favourites'}), 400
    favourite.delete()
    return jsonify({'message': 'movie removed from favourites'}), 200

