import { useState } from "react";

export default function AdvancedForms() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  function handleChange(e) {
    setFormData(
      {...formData,
      [e.target.name]:e.target.value}
    )
  }

  function submitHandler(e) {
    e.preventDefault()

    if (!formData.username) {
      alert('enter username')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Email is not valid!");
      return;
    }
    if(formData.password.length < 6){
      alert('Password must be atLeast 6 caracter!')
      return
    }
    alert('Sighn Up is Succesful')
  }

    return (
        <form onSubmit={submitHandler} className="p-4 max-w-md mx-auto my-20 space-y-4 bg-gray-100 rounded-lg">
        <input
          type="text"
          value={formData.username}
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="email"
          value={formData.email}
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="password"
          value={formData.password}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sighn Up</button>
      </form>
    )
  }