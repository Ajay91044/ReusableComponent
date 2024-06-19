//---------------------------- When Using State -------------------- 

import { useState } from "react"; 


const Counter1 = () => {
  const [count, setCounter] = useState(0);

console.log(count);


  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>Counter</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            marginRight: "10px",
            cursor: "pointer",
            outline: "none"
          }}
          onClick={() => setCounter(count + 1)}
        >
          Increment
        </button>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            outline: "none"
          }}
          onClick={() => setCounter(count - 1)}
        >
          Decrement
        </button>
      </div>
      <h2 style={{ marginTop: "20px" }}>{count}</h2>
    </div>
  );
};

export default Counter1;
