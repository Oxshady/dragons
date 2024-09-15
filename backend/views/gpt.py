from flask import Flask, request, jsonify, render_template_string
import requests

app = Flask(__name__)

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie Recommendations</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        #movieInput {
            width: 70%;
            padding: 10px;
            font-size: 16px;
        }
        #recommendButton {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
        #recommendations {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .movie {
            width: 48%;
            margin-bottom: 20px;
            border: 1px solid #ddd;
            padding: 10px;
            box-sizing: border-box;
        }
        .movie img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <h1>Movie Recommendations</h1>
    <input type="text" id="movieInput" placeholder="Enter a movie title">
    <button id="recommendButton">Recommend</button>
    <div id="recommendations"></div>

    <script>
        document.getElementById('recommendButton').addEventListener('click', function() {
            const movieName = document.getElementById('movieInput').value;
            if (movieName) {
                fetch('/recommend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({movie_name: movieName}),
                })
                .then(response => response.json())
                .then(data => {
                    const recommendationsDiv = document.getElementById('recommendations');
                    recommendationsDiv.innerHTML = '';
                    data.forEach(movie => {
                        const movieDiv = document.createElement('div');
                        movieDiv.className = 'movie';
                        movieDiv.innerHTML = `
                            <h2>${movie.title}</h2>
                            ${movie.poster_url ? `<img src="${movie.poster_url}" alt="${movie.title} poster">` : ''}
                            <p>Rating: ${movie.rating}</p>
                            <p>Release Date: ${movie.release_date}</p>
                        `;
                        recommendationsDiv.appendChild(movieDiv);
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
        });
    </script>
</body>
</html>
"""

def search_movie(api_key, movie_name):
    base_url = "https://api.themoviedb.org/3"
    search_endpoint = f"{base_url}/search/movie"
    
    params = {
        "api_key": api_key,
        "query": movie_name,
        "language": "en-US",
        "page": 1,
        "include_adult": False
    }
    
    response = requests.get(search_endpoint, params=params)
    
    if response.status_code == 200:
        data = response.json()
        results = data.get("results", [])
        if results:
            return results[0]["id"]
        else:
            return None
    else:
        return None

def get_movie_recommendations(api_key, movie_id):
    base_url = "https://api.themoviedb.org/3"
    endpoint = f"{base_url}/movie/{movie_id}/recommendations"
    
    params = {
        "api_key": api_key,
        "language": "en-US",
        "page": 1
    }
    
    response = requests.get(endpoint, params=params)
    
    if response.status_code == 200:
        data = response.json()
        recommendations = data.get("results", [])
        return recommendations
    else:
        return None

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/recommend', methods=['POST'])
def recommend():
    api_key = "1d52bd3939e8fa456948af28c6bb73f9"
    movie_name = request.json['movie_name']
    
    movie_id = search_movie(api_key, movie_name)
    if movie_id:
        recommendations = get_movie_recommendations(api_key, movie_id)
        if recommendations:
            results = []
            for movie in recommendations[:5]:
                results.append({
                    'title': movie['title'],
                    'poster_url': f"https://image.tmdb.org/t/p/w500{movie['poster_path']}" if movie['poster_path'] else None,
                    'rating': movie['vote_average'],
                    'release_date': movie['release_date']
                })
            return jsonify(results)
    
    return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)