from flask import jsonify, request
from api.v1.views import api_v1
import requests
import json
from os import getenv
from dotenv import load_dotenv
load_dotenv()
history = []

def ai_model(questions_answers):
    """
    ai model
    """

    import google.generativeai as genai

    genai.configure(api_key=getenv("GEMINI_API_KEY"))

    generation_config = {
        "temperature": 2,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "application/json",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        system_instruction="You are a highly intelligent engine designed to analyze movie preferences based on user inputs. The input will be a dictionary consisting of 6 keys, each representing a question, and their corresponding answers, which reflect the user's movie-watching preferences (e.g., genre, language, time period, storytelling style, etc.). Your task is to creatively analyze the input and recommend up to 8 film titles that best match the user's preferences.\n\nThe output should be a list of film titles (just the names of the films) that the user can later use to search for more details on MovieDB. Ensure that the recommended films align with the given preferences, drawing from a wide range of movie genres, languages, and time periods.\n\n",
    )

    chat_session = model.start_chat(
        history=history,
    )

    response = chat_session.send_message({
        'parts': [
            {
                'text': json.dumps(questions_answers)
            }
        ]
    }).to_dict()
    response = json.loads(response.get('candidates')[0].get('content').get('parts')[0].get('text'))
    history.append(
    {
        "role": "user",
        "parts": [
        json.dumps(questions_answers),
        ],
    }
    )
    history.append(
    {
        "role": "model",
        "parts": [
        json.dumps(response),
        ],
    }
    )
    if len(history) > 10:
        history.pop(0)
        history.pop(0)
    return response





def movies(recommendations):
    data = []
    token = getenv("MOVIE_DB_ACCESS_TOKEN")
    for i in recommendations:
        url = f"https://api.themoviedb.org/3/search/movie?query={i}"
        headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {token}"
	}
        response = requests.get(url, headers=headers)
        details = response.json().get('results')[0]
        img = "https://image.tmdb.org/t/p/original/{}".format(details.get('poster_path'))
        data.append({'movieid': details.get('id'), 'title': details.get('title'), 'year': details.get('release_date'), 'rate': details.get('vote_average'), 'popularity': details.get('popularity'), 'vote_count': details.get('vote_count'), 'img': img, 'description': details.get('overview'), 'language': details.get('original_language'), 'adult': details.get('adult')})
    return data



@api_v1.route('/films', methods=['POST'], strict_slashes=False)
def films():
    data = request.get_json()
    if data is None:
        return jsonify({'error': 'No data provided'}), 400
    resp = ai_model(data)
    rec = movies(resp)
    return jsonify(rec), 200
