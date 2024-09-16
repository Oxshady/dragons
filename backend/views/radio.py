from flask import jsonify, request
import requests
import json
history = []
questions_answers ={
"What is your preferred movie genre?":"Action",
"In which language do you prefer watching movies?":"English",
"What time period of movies do you enjoy the most?":"2020s",
"What kind of movie pace do you prefer?":"Fast-paced and action-packed",
"What is your favorite type of storytelling?":"Character-driven",
"What type of movie endings do you prefer?":"open endings"
}

def ai_model(questions_answers):
    """
    Install the Google AI Python SDK

    $ pip install google-generativeai
    """

    import google.generativeai as genai

    genai.configure(api_key="AIzaSyBZnGPW_twNl4SbTgELHhpxG8erLX5LulU")

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
        system_instruction="You are a highly intelligent engine designed to analyze movie preferences based on user inputs. The input will be a dictionary consisting of 6 keys, each representing a question, and their corresponding answers, which reflect the user's movie-watching preferences (e.g., genre, language, time period, storytelling style, etc.). Your task is to creatively analyze the input and recommend up to 5 film titles that best match the user's preferences.\n\nThe output should be a list of film titles (just the names of the films) that the user can later use to search for more details on MovieDB. Ensure that the recommended films align with the given preferences, drawing from a wide range of movie genres, languages, and time periods.\n\n",
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
        questions_answers,
        ],
    }
    )
    history.append(
    {
        "role": "model",
        "parts": [
        response,
        ],
    }
    )
    if len(history) > 10:
        history.pop(0)
    print(response)
    return response




def movies(recommendations):
    data = []
    token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmNkNTJjMTA1NjJhNjVjZWU2NzAyMWYxYjE2ZThhOCIsIm5iZiI6MTcyNjQzODc3NS44ODQ2MDQsInN1YiI6IjY2ZTc1Y2RjMDUwZjE0ZTRmY2NmYmEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cc1hPN6g3vPLo3KV1ccPZ_OV68os10uJPlTs2WLR190"
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




def films(q):
    data = q
    if data is None:
        return jsonify({'error': 'No data provided'}), 400
    resp = ai_model(data)
    rec = movies(resp)
    return rec
    
    
print(films(questions_answers))