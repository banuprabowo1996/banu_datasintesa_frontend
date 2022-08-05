import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import Home from './pages/home';
import Form from './pages/form';
import Navbar from './components/navbar';
import About from './pages/about';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form" element={<Form />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
