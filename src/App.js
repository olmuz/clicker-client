import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from './components/Board/Board';
import Home from './components/Home/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='games/:id' element={<Board />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
