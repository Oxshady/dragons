import bcrypt
from flask import request, jsonify
from api.v1.views import api_v1
from models.watch_list import WatchList
from models import db

@api_v1.route('/watchlist', methods=['POST', 'GET'])
def watchlist():
    if request.method == 'GET':
        user_id = request.args.get('user_id')
        watchlist = db.filter_group("WatchList", user_id=user_id)
        Wlist = [watch.to_dict() for watch in watchlist]
        return jsonify(Wlist), 200
    elif request.method == 'POST':
        user_id = request.args.get('user_id')
        user = db.filter_one("User", id=user_id)
        data = request.get_json()
        movie_id = data.get('movie_id')
        rate = data.get('rate')
        language = data.get('language')
        popularity = data.get('popularity')
        watchlist = WatchList(movie_id=movie_id, rate=rate, language=language, popularity=popularity, user=user)
        watchlist.save()
        return jsonify({'message': 'Movie added to watchlist'}), 200