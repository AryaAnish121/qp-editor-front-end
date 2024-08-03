import { useState } from "react";

const MCQOption = ({ value, ind, handleOptionChange }) => {
  const [editable, setEditable] = useState(false);

  const handleClick = () => {
    setEditable(true);
  };

  const handleBlur = () => {
    setEditable(false);
  };

  const handleChange = ({ target: { value: newValue } }) => {
    handleOptionChange(ind, newValue);
  };

  return (
    <p onClick={handleClick}>
      {editable ? (
        <input onBlur={handleBlur} onChange={handleChange} value={value} />
      ) : (
        value
      )}
    </p>
  );
};

export default MCQOption;
