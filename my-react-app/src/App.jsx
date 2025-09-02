import './App.css'
import Header from "./components/header";
import Footer from "./components/footer";
import Counter from './components/counter';
import Toggle from './components/toggle';
import TextInput from './components/textInput';


function App() {
  return(
    <>
      <Header/>
      <h1 style={{ textAlign: "center" }}>Day 3 - useState Examples</h1>
      <Counter></Counter>
      <Toggle></Toggle>
      <TextInput></TextInput>
      <Footer/>
    </>
  )
}

export default App
