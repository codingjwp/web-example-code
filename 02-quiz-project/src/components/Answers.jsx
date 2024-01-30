import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
  const shuffledAnswerRef = useRef();

  if (!shuffledAnswerRef.current) {
    shuffledAnswerRef.current = [...answers];
    shuffledAnswerRef.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
    {shuffledAnswerRef.current.map((answer) => {
      const isSelected = selectedAnswer === answer;
      let cssClasses = '';
      if (answerState === 'answered' && isSelected) {
        cssClasses = 'selected';
      }
      if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
        cssClasses = answerState
      }
      return (
        <li key={answer} className="answer">
          <button 
            className={cssClasses}
            disabled={answerState !== ''}
            onClick={() => onSelect(answer)}>{answer}</button>
        </li>
      )
    })}
  </ul>
  )
}