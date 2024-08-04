import { useEffect, useState } from "react";
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

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const handleUp = (qid) => {
    if (questions[qid].pos === 0) return;
    setQuestions((prev) => {
      return prev.map((question, index) => {
        if (index === qid) {
          return {
            ...question,
            pos: question.pos - 1,
          };
        } else if (question.pos === prev[qid].pos - 1) {
          return {
            ...question,
            pos: question.pos + 1,
          };
        }
        return question;
      });
    });
  };

  const handleDown = (qid) => {
    if (questions[qid].pos === questions.length - 1) return;
    setQuestions((prev) => {
      return prev.map((question, index) => {
        if (index === qid) {
          return {
            ...question,
            pos: question.pos + 1,
          };
        } else if (question.pos === prev[qid].pos + 1) {
          return {
            ...question,
            pos: question.pos - 1,
          };
        }
        return question;
      });
    });
  };

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
      let max = -1;

      prev.forEach((question) => {
        if (question.pos > max) max = question.pos;
      });

      return [
        ...prev,
        {
          type: "ans",
          title: "",
          marks: "",
          options: [],
          pos: max + 1,
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
      fileDownload(
        res.data,
        `${examDetails.studyingClass}-${examDetails.subject}.docx`
      );
    } catch (error) {
      alert("FAILED: " + error.message);
    }
  };

  const save = () => {
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("examDetails", JSON.stringify(examDetails));
    alert("Saved");
  };

  const load = () => {
    const qstorage = localStorage.getItem("questions");
    const esstorage = localStorage.getItem("examDetails");
    if (qstorage) setQuestions(JSON.parse(qstorage));

    if (esstorage) setExamDetails(JSON.parse(esstorage));
  };

  const clear = () => {
    if (window.confirm("Are you sure?") === false) return;
    localStorage.clear();
    setQuestions([]);
    setExamDetails({
      term: "",
      studyingClass: "",
      subject: "",
    });
    alert("Cleared");
  };

  const exportData = () => {
    fileDownload(
      JSON.stringify({ questions, examDetails }, null, 4),
      "data.json"
    );
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
          {questions
            .sort((a, b) => (a.pos > b.pos ? 1 : -1))
            .map((question, index) => (
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
                handleDown={handleDown}
                handleUp={handleUp}
              />
            ))}
        </div>
        <div className="add-question">
          <button className="question-option alt-bg" onClick={load}>
            Load Last Save
          </button>
          <button className="question-option alt-bg" onClick={save}>
            Save Paper
          </button>
          <button className="question-option alt-bg" onClick={exportData}>
            Export Data
          </button>
          <button className="question-option alt-bg" onClick={clear}>
            Clear
          </button>
          <button className="question-option alt-bg" onClick={addQuestion}>
            Add Question
          </button>
          <button className="question-option alt-bg" onClick={generateDocs}>
            Generate Docs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
