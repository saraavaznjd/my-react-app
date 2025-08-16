import './App.css'
import Header from "./components/header";
import Card from "./components/card";
import Footer from "./components/footer";


function App() {
  return(
    <>
      <Header/>
      <main>
        <Card title="React Day 2" text="Learning JSX and functional components." />
        <Card title="props example" text={"we can pass different data to each card."} />
      </main>
      <Footer/>
    </>
  )
}

export default App
