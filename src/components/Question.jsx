import "../styles/Question.css";
import Option from "./Option";
import Cross from "../icons/Cross";

// TODO: make the app mobile responsive
// TODO: add rearrangement of questions


const Question = ({
  type,
  title,
  marks,
  options,
  ind,
  handleMainChange,
  handleOptionChange,
  handleNewOption,
  handleDeleteOption,
  handleDeleteQuestion,
}) => {
  const handleChange = ({ target: { value, name } }) => {
    handleMainChange(ind, { [name]: value });
  };

  return (
    <div className="question">
      <div className="head">
        <input
          type="text"
          className="question-title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <div className="question-options">
          <button
            className="delete-button question-option"
            onClick={() => handleDeleteQuestion(ind)}
          >
            <Cross />
          </button>
          <select
            name="type"
            className="question-option"
            defaultValue={type}
            onChange={handleChange}
          >
            <option value="ans">Long/Short Answer</option>
            <option value="adash">Long/Short Answer Dashed</option>
            <option value="mcq/fitb">MCQ/Fill in the blanks</option>
          </select>
          <input
            type="number"
            name="marks"
            onChange={handleChange}
            value={marks}
            className="question-option"
          />
        </div>
      </div>
      {type === "mcq/fitb" && (
        <ul className="mcq-questions">
          {options.map((option, index) => (
            <li key={index} className="mcq-choice">
              <Option
                value={option}
                ind={index}
                handleOptionChange={(oid, newValue) => {
                  handleOptionChange(ind, oid, newValue);
                }}
              />
              <button
                className="delete-button"
                onClick={() => handleDeleteOption(ind, index)}
              >
                <Cross />
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                handleNewOption(ind);
              }}
              className="question-option"
            >
              Add option
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Question;
