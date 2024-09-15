from flask import Blueprint, request, jsonify, session
from backend.models.users import User

login = Blueprint('login', __name__)

@login.route('/login', methods=['POST'])
def login_view():
    '''Authenticate a user and establish a session.

    This route allows users to log in by providing their email and password. 
    On successful login, the user is assigned to a session, and a response 
    is returned indicating whether the login was successful or not.

    JSON Body:
        email (str): The email address of the user.
        password (str): The password of the user.

    Returns:
        Response:
            - **200 OK**: If login is successful, returns a JSON object with a success message and user or admin ID.
            - **400 Bad Request**: If any of the required fields (email or password) are missing.
            - **401 Unauthorized**: If the email or password is incorrect.
    '''
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        print(session)

        session['user_id'] = user.id
        person = 'user_id'
        personId = user.id

        print(f"Session after login: {session}")
        response = jsonify({'message': 'Login successful!', person: personId})
        return response, 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@login.route('/check-session', methods=['GET'])
def check_session():
    '''Check if the session is active.

    This route verifies if the current session is active and whether the user 
    is authenticated a regular user.

    Returns:
        Response:
            - **200 OK**: If a session is active, returns a JSON object with authentication status and user or admin ID.
            - **401 Unauthorized**: If no session is active.
    '''
    if 'user_id' in session:
        return jsonify({
            'isAuthenticated': True,
            'user_id': session.get('user_id')
            }), 200
    else:
        return jsonify({'isAuthenticated': False}), 401
