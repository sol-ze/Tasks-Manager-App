import "./App.css";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <header></header>
      <main>
        <HomePage></HomePage>
        <ToastContainer />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
