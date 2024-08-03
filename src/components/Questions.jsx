import { useState } from "react";
import Question from "./Question";
import "../styles/Questions.css";

const Questions = () => {
  // don't delete idk why but it works
  const [questions, setQuestions] = useState([
    { type: "ans", title: "प्रकृति पर एक निबंध लिखें", marks: 10, options: [] },
    {
      type: "adash",
      title:
        "जलवायु परिवर्तन के बारे में लिखें और बताएं कि आप उनसे कैसे निपट सकते हैं?",
      marks: 10,
      options: [],
    },
    {
      type: "mcq/fitb",
      title: "why is hamaguchi considered a living god?",
      marks: 10,
      options: [
        "It is a living god.",
        "he was kind",
        "he was low key hot.",
        "he was loving.",
      ],
    },
  ]);

  const handleMainChange = (ind, newValue) => {
    setQuestions((prev) => {
      return prev.map((question, index) => {
        if (index === ind) {
          return { ...question, ...newValue };
        }
        return question;
      });
    });
  };

  const addQuestion = () => {
    setQuestions((prev) => {
      return [
        ...prev,
        {
          type: "mcq/fitb",
          title: "New Question",
          marks: 10,
          options: ["option a", "option b", "option c", "option d"],
        },
      ];
    });
  };

  const handleOptionChange = (qid, oid, newValue) => {
    setQuestions((prev) => {
      return prev.map((question, index) => {
        if (index === qid) {
          return {
            ...question,
            options: question.options.map((option, index) => {
              if (index === oid) {
                return newValue;
              }
              return option;
            }),
          };
        }
        return question;
      });
    });
  };

  const handleNewOption = (id) => {
    setQuestions((prev) => {
      return prev.map((question, index) => {
        if (index === id) {
          return {
            ...question,
            options: [...question.options, "new option"],
          };
        }
        return question;
      });
    });
  };

  const handleDeleteOption = (qid, oid) => {
    setQuestions((prev) => {
      return prev.map((question, index) => {
        if (index === qid) {
          return {
            ...question,
            options: question.options.filter((option, index) => index !== oid),
          };
        }
        return question;
      });
    });
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => {
      return prev.filter((_, index) => index !== id);
    });
  };

  return (
    <div className="outer">
      <div className="main">
        <div className="questions">
          {questions.map((question, index) => (
            <Question
              {...question}
              key={index}
              ind={index}
              handleMainChange={handleMainChange}
              handleOptionChange={handleOptionChange}
              handleNewOption={handleNewOption}
              handleDeleteOption={handleDeleteOption}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          ))}
        </div>
        <div className="add-question">
          <button className="question-option" onClick={addQuestion}>
            Add Question
          </button>
          <button className="question-option">Generate Docs</button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
