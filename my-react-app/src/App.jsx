import './App.css'
import Header from "./components/header";
import Footer from "./components/footer";
import Counter from './components/counter';
import Toggle from './components/toggle';
import TextInput from './components/textInput';
import AddItemForm from './components/addItemForm';


function App() {
  return(
    <>
      <Header/>
      <h1 style={{ textAlign: "center" }}>Day 3 - forms & controlled inputs</h1>
      <AddItemForm></AddItemForm>
      <Footer/>
    </>
  )
}

export default App
