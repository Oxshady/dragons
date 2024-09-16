# 🎥 Movie Recommendation System with ChatGPT and MovieDB API

## Overview
This project is an intelligent **Movie Recommendation System** that leverages OpenAI's ChatGPT and the MovieDB API to provide users with tailored movie recommendations. By analyzing user preferences via natural language input, the system fetches relevant movie details from MovieDB and suggests films that match the user’s mood and genre preferences.

### Key Features
- **Natural Language Interaction**: Users can input queries like “I want to watch a sci-fi thriller” or “Give me a romantic comedy.”
- **Real-time Movie Suggestions**: The system fetches movie data from MovieDB based on user input and filters results according to genres, ratings, and popularity.
- **Detailed Movie Information**: Users can view movie descriptions, release dates, trailers, and ratings.
- **Dynamic Recommendations**: Recommendations adjust based on user feedback and changing preferences.

## Functionality

### User Input
- Users interact with the recommendation engine through a web interface, entering natural language queries.
- Example queries include:
  - "Show me popular action movies."
  - "I'm in the mood for a comedy."

### Recommendation Process
- **Step 1**: The input is processed by OpenAI’s ChatGPT API, which analyzes the text and extracts key information such as movie genres, preferred tones, or specific actors.
- **Step 2**: Based on the processed input, the system sends a request to the MovieDB API, searching for movies that match the query criteria (e.g., genre, popularity, release date).
- **Step 3**: The results are returned as a list of movie recommendations, displayed on the frontend with additional movie details (plot, trailers, ratings).

### User Experience
- **Home Page**: Users are greeted with a search box where they can enter their movie preferences.
- **Recommendation Page**: The system presents the recommended movies with clickable options to explore trailers, plot details, and ratings.

## API Usage

### OpenAI ChatGPT API
**Purpose**: Used to interpret natural language queries provided by the user.
- **Endpoint**: `https://api.openai.com/v1/engines/davinci/completions`
- **Input**: User query (e.g., "Suggest a horror movie.")
- **Output**: Parsed information such as genre, tone, actors, or any other preferences.
- **Documentation**: [OpenAI API Docs](https://beta.openai.com/docs/)

### The MovieDB API
**Purpose**: Used to retrieve movie data based on user preferences.
- **Endpoint**: `https://api.themoviedb.org/3/search/movie`
- **Input**: Parsed data from ChatGPT API (e.g., genres, popularity, ratings).
- **Output**: JSON data containing movie recommendations, including titles, descriptions, ratings, and release dates.
- **Documentation**: [MovieDB API Docs](https://developers.themoviedb.org/3)

## Technical Details

### Backend
- **Framework**: Flask
  - Handles API communication and logic processing.
  - Routes for receiving user input and delivering movie recommendations.
- **APIs**:
  - **OpenAI ChatGPT API**: Parses natural language queries.
  - **MovieDB API**: Fetches movie details.
- **Database**: MySQL
  - User preferences and search histories can be stored and retrieved to improve recommendation quality.
  - Example Database Schema:
    ```sql
    CREATE TABLE user_preferences (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      genre VARCHAR(255),
      rating FLOAT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

### Frontend
- **Technologies**: HTML, CSS, JavaScript
  - User input is captured via a form.
  - Movie results are displayed dynamically, with details like movie posters, descriptions, and links to trailers.
- **Interaction Flow**:
  1. User submits a movie preference query.
  2. The backend sends the query to ChatGPT API for interpretation.
  3. Movie recommendations are fetched from MovieDB and displayed.

## Authors
- **Shadi Mahmoud** - Backend Developer - [GitHub Profile](https://github.com/ShadiMahmoud)
- **Youssef Ahmed** - Backend Developer - [GitHub Profile](https://github.com/YoussefAhmed)
- **Karem Hany** - Backend Developer - [GitHub Profile](https://github.com/KaremHany)
- **Sondoss Esslam** - Frontend Developer - [GitHub Profile](https://github.com/SondossEsslam)
- **Sayed Abdelaal** - Frontend Developer - [GitHub Profile](https://github.com/sayedabdelal)
