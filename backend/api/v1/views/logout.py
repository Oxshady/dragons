from flask import Blueprint, session, jsonify
from api.v1.views import api_v1
@api_v1.route('/logout', methods=['POST', 'GET'])
def logout_view():
    '''Log out the current user or admin and clear the session.

    This route handles logging out users or administrators by clearing their 
    respective session data. Depending on the session status, it either logs 
    out an admin, a regular user, or returns an error if no user is logged in.

    Returns:
        Response:
            - **200 OK**: If logout is successful, returns a JSON object with a success message.
            - **401 Unauthorized**: If no user is logged in.
    '''
    print(f"Session before logout: {session}")

    if 'user_id' in session:
        session.pop('user_id', None)
        print(f"Session after logout: {session}")
        return jsonify({'message': 'Logout successful'}), 200
    
    else:
        return jsonify({'error': 'You are not logged in'}), 401
