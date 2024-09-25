import React, { useState } from "react";
import { useMutation } from '@tanstack/react-query';

import { useNavigate } from "react-router-dom";
import "./css/Survey.css";
import LoadingIndicator from "../../UI/LoadingIndicator";

function Survey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const surveyContent = [
    {
      questionText: "What is your preferred movie genre?",
      answerOptions: ["Action", "Drama", "Comedy", "Horror", "Romance", "Sci-Fi"],
    },
    {
      questionText: "In which language do you prefer watching movies?",
      answerOptions: ["English", "Spanish", "French", "Hindi", "Japanese", "Any language (with subtitles)"],
    },
    {
      questionText: "What time period of movies do you enjoy the most?",
      answerOptions: ["1980s", "1990s", "2000s", "2010s", "2020s"],
    },
    {
      questionText: "What kind of movie pace do you prefer?",
      answerOptions: ["Slow and thought-provoking", "Fast-paced and action-packed", "A mix of both"],
    },
    {
      questionText: "What is your favorite type of storytelling?",
      answerOptions: ["Character-driven", "Plot-driven", "Visual-driven"],
    },
    {
      questionText: "What type of movie endings do you prefer?",
      answerOptions: ["Happy endings", "Open endings", "Plot twists", "Tragic endings"],
    },
  ];

  const navigate = useNavigate();
  const survey_url = "http://localhost:5000/api/v1/films";

  // TanStack `useMutation` hook to handle survey submission
  const mutation = useMutation({
    mutationFn: async (surveyAnswers) => {
      const response = await fetch(survey_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyAnswers),
      });
      return response.json();
    },
    onSuccess: (data) => {
      console.log('Response from server:', data);
      console.log("fenish")
      navigate('/recommendations', { state: { recommendations: data } });
    },
    onError: (error) => {
      console.error('Error submitting the survey:', error);
    },
  });


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
    mutation.mutate(answers);
  };
  if(mutation.isPending) {
    return <LoadingIndicator />;
  }

  return (
    <div className="survey-container">
      {mutation.isLoading ? (
        <div>Loading...</div>
      ) : mutation.isError ? (
        <div>Error occurred while submitting the survey.</div>
      ) : (
        <div className="survey-card">
          <h1>Survey</h1>
          <div className="survey-body">
            <div className="survey-question">
              {surveyContent[currentQuestion].questionText}
            </div>
            <div className="survey-answer">
              {surveyContent[currentQuestion].answerOptions.map((answerOption, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(answerOption)}
                  className={
                    answers[surveyContent[currentQuestion].questionText] === answerOption ? "selected" : ""
                  }
                >
                  {answerOption}
                </button>
              ))}
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

export default Survey;
