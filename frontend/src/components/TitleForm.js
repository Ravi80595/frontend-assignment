import React, { useState } from "react";

function TitleForm({ onSubmit }) {
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ subject });
    setSubject("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <button type="submit">Add Title</button>
    </form>
  );
}

export default TitleForm;
