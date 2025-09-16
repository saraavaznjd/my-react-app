import AdvancedForms from "./components/advencedForms"
import CustomHook from "./components/customHook"

export default function App() {
    return (
      <div>
        <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">Day 12 - Advenced Forms & Custom Hooks</h1>
      </header>
      <AdvancedForms />
      <hr className="w-1/2 mx-auto" />
      <CustomHook />
      </div>
    )
  }