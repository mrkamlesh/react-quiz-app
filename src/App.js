import React, { PureComponent } from "react";
import Question from "./components/Question";
import Answer from "./components/Answer";

export default class App extends PureComponent {
  state = {
    questions: {
      1: 'What US city is known as the "birthplace of jazz"?',
      2: "What is the capital of Greece?",
      3: "What planet gave birth to Superman?",
    },
    answers: {
      1: {
        1: "Chicago",
        2: "New Orleans",
        3: "New York",
      },
      2: {
        1: "Athens",
        2: "Patras",
        3: "Kalamata",
      },
      3: {
        1: "Krypton",
        2: "Mars",
        3: "Saturn",
      },
    },
    correctAnswers: {
      1: "2",
      2: "1",
      3: "1",
    },
    correctAnswer: 0,
    clickedAnswer: 0,
    step: 1,
    score: 0,
  };

  checkAnswer = (answer) => {
    const { correctAnswers, step, score } = this.state;
    if (answer === correctAnswers[step]) {
      this.setState({
        score: score + 1,
        correctAnswer: correctAnswers[step],
        clickedAnswer: answer,
      });
    } else {
      this.setState({
        correctAnswer: 0,
        clickedAnswer: answer,
      });
    }
  };

  nextStep = (step) => {
    this.setState({
      step: step + 1,
      correctAnswer: 0,
      clickedAnswer: 0,
    });
  };

  render() {
    let {
      questions,
      answers,
      correctAnswer,
      clickedAnswer,
      step,
      score,
    } = this.state;

    return (
      <div className="content">
        {step <= Object.keys(questions).length ? (
          <>
            <Question question={questions[step]} />

            <Answer
              answer={answers[step]}
              step={step}
              checkAnswer={this.checkAnswer}
              correctAnswer={correctAnswer}
              clickedAnswer={clickedAnswer}
            />

            <button
              className="next__step"
              disabled={
                clickedAnswer && Object.keys(questions).length >= step
                  ? false
                  : true
              }
              onClick={() => this.nextStep(step)}
            >
              Next
            </button>
          </>
        ) : (
          <div className="final__page">
            <h1>You have completed the quiz!</h1>
            <p>
              Your score is: {score} of {Object.keys(questions).length}
            </p>
            <p>Thank you!</p>
          </div>
        )}
      </div>
    );
  }
}
