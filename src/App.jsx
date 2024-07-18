import './App.css';
import Card from "./components/UI/Card";
import CalculationForm from "./components/Form";
import brainIcon from "./assets/brain_icon.png";
//import Hero from "./components/UI/Hero";

function App() {
  return (
    <div >
      <header >
        <Card>
          <h2>TB Meningitis Risk Calculator</h2>
          <img src={brainIcon}></img>
          <CalculationForm />
        </Card>
      </header>
    </div>
  );
}

export default App;
