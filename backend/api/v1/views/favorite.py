import bcrypt
from flask import request, jsonify
from api.v1.views import api_v1
from models.favorite import Favorite
from models import db

@api_v1.route('/favorite', methods=['POST', 'GET'])
def favorite():
	if request.method == 'GET':
		user_id = request.args.get('user_id')
		favorites = db.filter_group("Favorite", user_id=user_id)
		favorite_list = [favorite.to_dict() for favorite in favorites]
		return jsonify(favorite_list), 200
	elif request.method == 'POST':
		user_id = request.args.get('user_id')
		user = db.filter_one("User", id=user_id)
		data = request.get_json()
		movie_id = data.get('movie_id')
		rate = data.get('rate')
		language = data.get('language')
		popularity = data.get('popularity')
		favorite = Favorite(movie_id=movie_id, rate=rate, language=language, popularity=popularity, user=user)
		favorite.save()
		return jsonify({'message': 'Movie added to favorites'}), 200