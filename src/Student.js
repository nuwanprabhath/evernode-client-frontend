import React, { useState } from "react";
import axios from 'axios';

function Student() {
  const [uri, setUri] = useState("");

  return (
    <div>
      <h1>Student interface</h1>
      <input
        type="text"
        id="uriInput"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
      />
      <button onClick={handleGetRecords}>Get Records</button>
    </div>
  );
  function handleGetRecords() {
    const url = `http://localhost:4001/retrieve/?id=${uri}`;
    axios.get(url)
      .then((response) => {
        const data = response.data;
        console.log("Data received: ", data);
      })
      .catch((error) => console.log(error));
  }
}

export default Student;
