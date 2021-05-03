import React from "react"
import "./Question.css"

const Question = ({
  question,
  options,
  selectedAnswer,
  onChange,
  hasError,
}) => {
  return (
    <div
      className={`question-wrapper box-border p-4 border-4 ${
        hasError ? "border-red-700" : ""
      }`}
    >
      <div className="text-sm">{question}</div>
      <form>
        {Array.isArray(options) &&
          options.map((option, idx) => (
            <div className="pt-2" key={`r${idx}`}>
              <input
                id={`r${idx}`}
                type="radio"
                name="radio"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onChange(option)}
              />
              <label htmlFor={`r${idx}`} className="px-2">
                {option}
              </label>
            </div>
          ))}
      </form>
    </div>
  )
}

export default Question
