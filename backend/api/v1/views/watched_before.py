import bcrypt
from flask import request, jsonify
from api.v1.views import api_v1
from models.watched_before import WatchedBefore
from models import db

@api_v1.route('/watchbefore', methods=['POST', 'GET'])
def watchlist():
    if request.method == 'GET':
        user_id = request.args.get('user_id')
        watchbefore = db.filter_group("WatchedBefore", user_id=user_id)
        Wbefore = [watch.to_dict() for watch in watchbefore]
        return jsonify(Wbefore), 200
    elif request.method == 'POST':
        user_id = request.args.get('user_id')
        user = db.filter_one("User", id=user_id)
        data = request.get_json()
        movie_id = data.get('movie_id')
        rate = data.get('rate')
        language = data.get('language')
        popularity = data.get('popularity')
        watchbefore = Wbefore(movie_id=movie_id, rate=rate, language=language, popularity=popularity, user=user)
        watchbefore.save()
        return jsonify({'message': 'Movie added to watchbefore'}), 200