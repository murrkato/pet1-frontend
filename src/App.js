import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register/Register';
import Home from './pages/Home/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />}></Route>
          <Route path='/home' element={<Home />}></Route>
          {/* <Route path='/login' element={<Login />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
