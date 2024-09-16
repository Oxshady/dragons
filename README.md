# Movie Recommendation System

## Authors
- **Shadi Mahmoud** - Backend Developer - [GitHub Profile](https://github.com/Oxshady)
- **Youssef Ahmed** - Backend Developer - [GitHub Profile](https://github.com/youssef3092004)
- **Karem Hany** - Backend Developer - [GitHub Profile](https://github.com/K-a-r-e-e-m)
- **Sondoss Essam** - Frontend Developer - [GitHub Profile](https://github.com/sondosEssam)
- **Sayed Abdelaal** - Frontend Developer - [GitHub Profile](https://github.com/sayedabdelal)

## Overview
This project is a movie recommendation system that leverages the OpenAI ChatGPT API to parse user preferences and the MovieDB API to fetch movie details. The backend is built using Flask, and the frontend is developed with modern web technologies.

## Functionality
The system allows users to input their movie preferences in natural language. The backend processes these inputs using the ChatGPT API and retrieves relevant movie data from the MovieDB API. The results are then displayed to the user with detailed information about each recommended movie.

## API Usage

### The MovieDB API
**Purpose**: Used to retrieve movie data based on user preferences.
- **Endpoint**: `https://api.themoviedb.org/3/search/movie`
- **Input**: Parsed data from ChatGPT API (e.g., genres, popularity, ratings).
- **Output**: JSON data containing movie recommendations, including titles, descriptions, ratings, and release dates.
- **Documentation**: [MovieDB API Docs](https://developers.themoviedb.org/3)

### OpenAI ChatGPT API
**Purpose**: Parses natural language queries to extract user preferences.
- **Endpoint**: `https://api.openai.com/v1/engines/davinci-codex/completions`
- **Input**: User's natural language input.
- **Output**: Parsed data including genres, popularity, and ratings.
- **Documentation**: [OpenAI API Docs](https://beta.openai.com/docs/)

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
      preferences TEXT
    );
    ```

### Frontend
- **Framework**: Vite
  - Fast and modern web development build tool.
- **Libraries**:
  - **React**: For building user interfaces.
  - **Axios**: For making HTTP requests to the backend.

## Setup Instructions

### Backend
1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Create a virtual environment and activate it:
    ```sh
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```
3. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```
4. Set up the MySQL database using the provided script:
    ```sh
    mysql -u root -p < setup_mysql.sql
    ```
5. Run the backend server:
    ```sh
    python run_backend.py
    ```

### Frontend
1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install the required dependencies:
    ```sh
    npm install
    ```
3. Run the frontend development server:
    ```sh
    npm run dev
    ```

## Contributing
Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more details.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
