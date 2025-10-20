import React, { useState } from "react";

type GreetingFormProps = {
    title: string
    onSubmit: (name:string) => void
}

const GreetingForm = ({ title, onSubmit }:GreetingFormProps) => {
  const [name,setName] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(name)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md w-64">
      <h2 className="font-bold mb-2">{title}</h2>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
        className="border p-2 w-full mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Say Hello
      </button>
    </form>
  );
};

export default GreetingForm;
