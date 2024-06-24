import React, { useState, useEffect } from "react";

const LifecycleExample = () => {
  const [count, setCount] = useState(0);

  const [table,setTable]=useState(0);

  // Mounting phase: runs once after initial render
  useEffect(() => {

    console.log("Component mounted");
    // setTable(table+2);

    // Cleanup function for unmounting
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  // Updating phase: runs whenever 'count' state changes

  const handleIncrement = () => {
    setCount(count+1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <div>Table:{table}</div>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default LifecycleExample;
