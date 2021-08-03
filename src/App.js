import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// import { UserProvider } from './Contexts/UserContext';
// import { AdminDash } from './Pages/AdminDash';
// import { Cars } from './Pages/Cars';
// import { Dashboard } from './Pages/Dashboard';
// import { Drivers } from './Pages/Drivers';
// import { Home } from './Pages/Home';
// import { Record } from './Pages/Record';
// import { Search } from './Pages/Search';
// import { Users } from './Pages/Users';


import { HomePage } from './Page/HomePage';
import { UserLogin } from './Page/UserLogin';
import { UserSignUp } from './Page/UserSignUp';


function App() {
  return (
    // <Router>
    //   <Switch>
    //     <UserProvider>
    //       <Route path="/" component={Home} exact />
    //       <Route path="/Dash" exact component={Dashboard} />
    //       <Route path="/Cars" exact component={Cars} />
    //       <Route path="/Driver" exact component={Drivers} />
    //       <Route path="/Record" exact component={Record} />
    //       <Route path="/Search" exact component={Search} />
    //       <Route path="/AdminDash" exact component={AdminDash} />
    //       <Route path="/Users" exact component={Users} />

    //     </UserProvider>
    //   </Switch>
    // </Router>
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/signUp" component={UserSignUp} exact />
        <Route path="/login" component={UserLogin} exact />
        <Route />
      </Switch>
    </Router>
  );
}

export default App;
