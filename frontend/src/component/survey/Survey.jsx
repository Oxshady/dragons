import React, { useState } from "react";
import "./css/Survey.css";
import { Link } from "react-router-dom";
function Survey () {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const surveyContent = [
    {
      questionText: "What is your preferred movie genre?",
      answerOptions: [
        "Action",
        "Drama",
        "Comedy",
        "Horror",
        "Romance",
        "Sci-Fi",
      ],
    },
    {
      questionText: "In which language do you prefer watching movies?",
      answerOptions: [
        "English",
        "Spanish",
        "French",
        "Hindi",
        "Japanese",
        "Any language (with subtitles)",
      ],
    },
    {
      questionText: "What time period of movies do you enjoy the most?",
      answerOptions: ["1980s", "1990s", "2000s", "2010s", "2020s"],
    },
    {
      questionText: "What kind of movie pace do you prefer?",
      answerOptions: [
        "Slow and thought-provoking",
        "Fast-paced and action-packed",
        "A mix of both",
      ],
    },
    {
      questionText: "What is your favorite type of storytelling?",
      answerOptions: [
        "Character-driven (focuses on character development)",
        "Plot-driven (focuses on the events and actions)",
        "Visual-driven (focuses on stunning cinematography and effects)",
      ],
    },
    {
      questionText: "What type of movie endings do you prefer?",
      answerOptions: [
        "Happy endings",
        "Open endings (ambiguous or unresolved)",
        "Plot twists or surprise endings",
        "Tragic endings",
      ],
    },
  ];
const survey_url = "http://localhost:5000/survey";
  const handleAnswerOptionClick = (answer) => {
    setAnswers({
      ...answers,
      [surveyContent[currentQuestion].questionText]: answer,
    });

  };

    const handlePrev = () => {
      const prevQuestion = currentQuestion - 1;
      if (prevQuestion >= 0) {
        setCurrentQuestion(prevQuestion);
      }
    };

    const handleNext = () => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < surveyContent.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        handleSubmit();
      }
    };

  const handleSubmit = () => {
    console.log(answers);
     setIsSubmitted(true);
    const response = fetch(survey_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),})
  }
  return (
    <div className="survey-container">
      {isSubmitted ? (
        <div className="submission-message">
          <h1>All is done</h1>
          <p>Go to see your recommendations</p>
          <Link to="/survey_recommendation">
            <button className="see-recommendations">Go</button>
          </Link>
        </div>
      ) : (
        <div className="survey-card">
          <h1>Survey</h1>
          <div className="survey-body">
            <div className="survey -question">
              {surveyContent[currentQuestion].questionText}
            </div>
            <div className="survey-answer">
              {surveyContent[currentQuestion].answerOptions.map(
                (answerOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(answerOption)}
                    className={
                      answers[surveyContent[currentQuestion].questionText] ===
                      answerOption
                        ? "selected"
                        : ""
                    }
                  >
                    {answerOption}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="survey-footer">
            <button onClick={handlePrev} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button onClick={handleNext}>
              {currentQuestion === surveyContent.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Survey ;
