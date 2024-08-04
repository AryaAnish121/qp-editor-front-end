import { useState } from "react";
import Question from "./Question";
import "../styles/Questions.css";
import fileDownload from "js-file-download";
import axios from "axios";

const Questions = () => {
  const [examDetails, setExamDetails] = useState({
    term: "",
    studyingClass: "",
    subject: "",
  });

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
      type: "mcq/fitb/mqna/mtf",
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
          type: "mcq/fitb/mqna/mtf",
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

  const handleHotKey = (qid, oid, hotKey) => {
    setQuestions((prev) => {
      return prev.map((question, index) => {
        if (index === qid) {
          return {
            ...question,
            options: question.options.map((option, index) => {
              if (index === oid) {
                if (hotKey === "ctrlSpace") return `${option}_______`;
                else if (hotKey === "ctrlL") return `${option}<MTFSpace>`;
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

  const handleExamDetailsChange = ({ target: { value, name } }) => {
    setExamDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const generateDocs = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/generate`,
        {
          data: questions,
          ...examDetails,
        },
        { responseType: "blob" }
      );
      fileDownload(res.data, `${examDetails.studyingClass}-${examDetails.subject}-${examDetails.term}.docx`);
    } catch (error) {
      alert("FAILED: " + error.message);
    }
  };

  return (
    <div className="outer">
      <div className="main">
        <div className="question-details">
          <input
            type="text"
            placeholder="Term"
            className="question-option"
            onChange={handleExamDetailsChange}
            value={examDetails.term}
            name="term"
          />
          <input
            type="text"
            placeholder="Class"
            className="question-option"
            onChange={handleExamDetailsChange}
            value={examDetails.studyingClass}
            name="studyingClass"
          />
          <input
            type="text"
            placeholder="Subject"
            className="question-option"
            onChange={handleExamDetailsChange}
            value={examDetails.subject}
            name="subject"
          />
        </div>
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
              handleHotKey={handleHotKey}
            />
          ))}
        </div>
        <div className="add-question">
          <button className="question-option" onClick={addQuestion}>
            Add Question
          </button>
          <button className="question-option" onClick={generateDocs}>
            Generate Docs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
