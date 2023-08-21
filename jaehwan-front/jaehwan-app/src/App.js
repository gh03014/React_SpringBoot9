//import logo from './logo.svg';
import './App.css';
//react-router-dom 버전 6으로 업그레이드 되면서  Switch 가 Routes로 바뀜 
//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import ListJaehwanBoardComponent from './components/ListJaehwanBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateJaehwanBoardComponent from './components/CreateJaehwanBoardComponent';
import ReadJaehwanBoardComponent from './components/ReadJaehwanBoardComponent';

function App() {
  return (
    <div> 
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path = "/"  element = {<ListJaehwanBoardComponent/>}></Route>
              <Route path = "/board" element = {<ListJaehwanBoardComponent/>}></Route>
              <Route path = "/create-board/:no" element = {<CreateJaehwanBoardComponent/>}></Route>
              <Route path = "/read-board/:no" element = {<ReadJaehwanBoardComponent/>}></Route>
            </Routes>
          </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
