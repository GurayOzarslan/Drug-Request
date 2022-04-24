import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {P_User} from './P_User';
import {P_Drug} from './P_Drug';
import {P_Route_Of_Admin} from './P_Route_Of_Admin';
import {Orderr} from './Orderr';
import {BrowserRouter, Routes ,Route ,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        React JS Frontend<br /><br />
        Senaryo: Sisteme login oldugu farz edilen Test User, patient icin order sayfasından ilac eklemek ister.
      </h3>
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/P_User">
              User
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/P_Drug">
              Drug
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/P_Route_Of_Admin">
              Route
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Orderr">
              Order
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/Orderr' element={<Orderr/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/P_User' element={<P_User/>}/>
        <Route path='/P_Drug' element={<P_Drug/>}/>
        <Route path='/P_Route_Of_Admin' element={<P_Route_Of_Admin/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
