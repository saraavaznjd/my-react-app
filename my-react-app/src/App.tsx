import React from "react";
import GreetingForm from "./typeScript/components/GreetingForm.js";
function App() {
  const handleGreet = (name: string) => {
    alert(`Hello, ${name}!`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <GreetingForm title="Welcome!" onSubmit={handleGreet} />
    </div>
  );
}

export default App;
