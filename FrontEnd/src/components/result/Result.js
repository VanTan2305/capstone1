import React from 'react';
import styled from 'styled-components';
import { Progress, Button } from 'antd';
import { AiOutlineCheck, AiOutlineClose, AiOutlineSolution } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Result = ({
  minute,
  seconds,
  totalCorrectAnswer,
  totalInCorrectAnswer,
  totalUnAnswered,
  correctAnswer,
  userAnswer,
  resetHandler,
  exam,
  params,
  examSeconds,
  examMinutes
}) => {
  const percentage = Math.floor((totalCorrectAnswer / correctAnswer.length) * 100);
  let bandScore = String((totalCorrectAnswer / correctAnswer.length) * 9).split('.');

  if (bandScore.length === 1) {
    bandScore = bandScore.join('.');
  } else {
    +bandScore[1] <= 5 ? (bandScore[1] = '5') : (bandScore[1] = '0');
    bandScore[0] = String(+bandScore[0] + 1);
    bandScore = bandScore.join('.');
  }

  return (
    <Wrapper>
      <div>
        <h1>Your Exam Performance: </h1>
        <h2>
          Your Band Score: <span className="bolder">{bandScore}/9</span>
        </h2>
        <Progress
          strokeColor={{
            '0%': '#78909C',
            '100%': '#78909C'
          }}
          strokeWidth={40}
          percent={percentage}
          style={{ fontSize: '50px' }}
          status="active"
        />
        <div className="result-container">
          <nav className="left">
            <div>
              <h3>{correctAnswer.length}</h3>
              <p>Total Questions</p>
            </div>
            <div>
              <h3>
                {totalCorrectAnswer}/{correctAnswer.length}
              </h3>
              <p>Marks</p>
            </div>
            <div>
              <h3>
                {exam ? 60 - examMinutes - 1 : minute} : {exam ? 60 - examSeconds : seconds}
              </h3>
              <p>Time taken</p>
            </div>
          </nav>
          <nav className="right">
            <div className="correct">
              <h3>{totalCorrectAnswer}</h3>
              <p>Correct</p>
            </div>
            <div className="incorrect">
              <h3>{totalInCorrectAnswer}</h3>
              <p>Incorrect</p>
            </div>
            <div className="unanswered">
              <h3>{totalUnAnswered}</h3>
              <p>Unanswered</p>
            </div>
          </nav>
        </div>

        <h4>
          <AiOutlineSolution /> Answer Keys:
        </h4>
        <section className="table-result">
          {correctAnswer.map((ans, i) => (
            <div key={i}>
              <div>
                <span className="answer-number">{i + 1} </span>{' '}
                <span className="correct-answer">{ans}</span> :{' '}
                <span className="user-answer">{userAnswer[i] || 'No Answer'} </span>
                <span
                  className={
                    userAnswer[i]
                      ? ans.toLowerCase() ===
                        [...new Set(userAnswer[i].trim().split(' '))].join(' ').toLocaleLowerCase()
                        ? 'answer-true'
                        : 'answer-false'
                      : 'answer-false'
                  }>
                  {userAnswer[i] ? (
                    ans.toLowerCase() ===
                    [...new Set(userAnswer[i].trim().split(' '))].join(' ').toLocaleLowerCase() ? (
                      <AiOutlineCheck />
                    ) : (
                      <AiOutlineClose />
                    )
                  ) : (
                    <AiOutlineClose />
                  )}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!exam ? (
          <Button type="primary" className="button-reset" onClick={resetHandler}>
            <BiReset style={{ color: 'white' }} /> Retest
          </Button>
        ) : (
          <Button type="primary" className="button-reset" onClick={resetHandler}>
            <Link to="/">Back to Home page</Link>
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default Result;

const Wrapper = styled.section`
  h2 {
    text-align: center;
    font-size: 4.5rem;
    color: #32b3c7;
  }

  .bolder {
    font-weight: bold;
  }

  .result-container {
    display: flex;
    justify-content: space-between;
    margin: 2rem 15rem;
    line-height: 20px;
  }

  .result-container p {
    font-size: 2rem;
    border-bottom: 4px dotted #dddddd;
    padding-bottom: 3px;
    color: #908080;
  }

  .result-container div {
    margin-bottom: 5rem;
    width: 200px;
  }

  .result-container .right div {
    border-left: 10px solid red;
  }
  .result-container .right .correct {
    border-left: 10px solid #64e572;
  }
  .result-container .right .incorrect {
    border-left: 10px solid #ff9655;
  }
  .result-container .right .unanswered {
    border-left: 10px solid #fff263;
  }

  h3 {
    font-size: 4rem;
    color: #32b3c7;
  }

  h4 {
    display: flex;
    align-items: center;
    font-size: 3rem;
    color: #1e90ff;
    color: #32b3c7;
    font-weight: bold;
  }

  .result-container .right h3,
  .result-container .right p {
    padding-left: 7px;
  }

  .table-result {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    font-size: 2rem;
  }

  .user-answer {
    color: #3c5b74;
  }

  .correct-answer {
    color: #32b3c7;
  }

  .answer-number {
    background-color: #32b3c7;
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: -3px 0px 0px -40px;
    float: left;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: white;
    font-weight: bold;
    border-radius: 50%;
  }

  .answer-true {
    color: green;
  }

  .answer-false {
    color: red;
  }

  .button-reset {
    margin-top: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    color: red;
    width: 250px;
    height: 50px;
    background: #32b4c8;
    color: white;
    font-weight: bold;
    font-size: 25px;
    border: none;
  }

  .button-reset:hover {
    background-color: #6b7280;
  }
`;
