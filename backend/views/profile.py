from flask import Blueprint, request, jsonify, session
from backend.models.users import User
from backend import db


profile = Blueprint('profile', __name__)

@profile.route('/profile', methods=['GET'])
def profile_view():
    '''Retrieve the profile of the current user.

    This route allows users to view their profile information. The user's 
    profile is retrieved from the database using the user ID stored in the 
    session. If the user is not logged in, an error message is returned.

    Returns:
        Response:
            - **200 OK**: If the user is logged in, returns a JSON object with the user's profile information.
            - **401 Unauthorized**: If no user is logged in.
    '''
    if 'user_id' in session:
        user_id = session['user_id']
        user = User.query.get(user_id)
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({'error': 'You are not logged in'}), 401


@profile.route('/update-profile', methods=['PUT'])
def update_profile():
    '''Update the profile of the current user.

    This route allows users to update their profile information. The user's 
    profile is retrieved from the database using the user ID stored in the 
    session. If the user is not logged in, an error message is returned.

    JSON Body:
        first_name (str): The first name of the user.
        last_name (str): The last name of the user.
        phoneNumber (str): The phone number of the user.
        address (str): The address of the user.

    Returns:
        Response:
            - **200 OK**: If the user is logged in and the profile is updated successfully, returns a success message.
            - **400 Bad Request**: If any of the required fields (first_name, last_name, phoneNumber, address) are missing.
            - **401 Unauthorized**: If no user is logged in.
    '''
    if 'user_id' in session:
        user_id = session['user_id']
        user = User.query.get(user_id)
        if user is None:
            return jsonify({'error': 'User not found'}), 404

        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        phoneNumber = data.get('phoneNumber')
        address = data.get('address')

        if not first_name or not last_name or not phoneNumber or not address:
            return jsonify({'error': 'All fields are required'}), 400

        user.first_name = first_name
        user.last_name = last_name
        user.phoneNumber = phoneNumber
        user.address = address

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    else:
        return jsonify({'error': 'You are not logged in'}), 401
