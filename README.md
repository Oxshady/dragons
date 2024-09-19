# Movie Recommendation System

## Overview

This project is a movie recommendation system that leverages the Gemini API to parse user preferences and the MovieDB API to fetch movie details. The backend is built using Flask, and the frontend is developed with modern web technologies.

## Functionality

The system allows users to input their movie preferences in a Survey. The backend processes these inputs using the Gemini API and retrieves relevant movie data from the MovieDB API. The results are then displayed to the user with detailed information about each recommended movie.


## Technical Details

### Backend
- **Framework**: Flask
  - Handles API communication and logic processing.
  - Routes for receiving user input and delivering movie recommendations.
- **APIs**:
  - **Gemini Api API**: Parses natural language queries.
  - **MovieDB API**: Fetches movie details.
- **Database**: MySQL
  - User preferences and search histories can be stored and retrieved to improve recommendation 

### Frontend
- **Framework**: Vite
  - Fast and modern web development build tool.
- **Libraries**:
  - **React**: For building user interfaces.
  - **Axios**: For making HTTP requests to the backend.

## Setup Instructions 

1. **Create a virtual environment and activate it:**

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```


2. **Database setup**

  Ensure MySQL is installed and running on your system and run this command at the root of the repo
  
  ```sh
  cat setup_mysql.sql | mysql -u root -p
  ```
  and enter the password for the root user on your mysql if any

3. **Run the application**

  at the root of the repo run:

    ```sh
    chmod +x run.sh
    ./run.sh
    ```

And that's it , Enjoy!

## Authors

- **Shadi Mahmoud** - Backend Developer - [GitHub Profile](https://github.com/Oxshady)
- **Ahmed Harhash** - backend Developer - [GitHub Profile](https://github.com/ah0048)
- **Youssef Ahmed** - Backend Developer - [GitHub Profile](https://github.com/youssef3092004)
- **Karem Hany** - Backend Developer - [GitHub Profile](https://github.com/K-a-r-e-e-m)
- **Sondoss Essam** - Frontend Developer - [GitHub Profile](https://github.com/sondosEssam)
- **Sayed Abdelaal** - Frontend Developer - [GitHub Profile](https://github.com/sayedabdelal)
