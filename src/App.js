import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { UserProvider } from './Contexts/UserContext';
import { DoctorDash } from './Pages/DoctorDash';
import { Doc_login } from './Pages/Doc_login';
import { HospitalPage } from './Pages/HospitalPage';
import { H_dash } from './Pages/H_dash';
import { H_signUp } from './Pages/H_signUp';
import { PatientCode } from './Pages/PatientCode';
import { PatientRecord } from './Pages/PatientRecord';
import { Patient_info } from './Pages/Patient_info';
import { PharmaPage } from './Pages/PharmaPage';
import { P_dash } from './Pages/P_dash';
import { P_signUp } from './Pages/P_signUp';
import { Reception } from './Pages/Reception';




function App() {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <Route path="/h_page" component={HospitalPage} exact />
          <Route path="/h_signUp" component={H_signUp} exact />
          <Route path="/h_dash" component={H_dash} exact />
          <Route path="/" component={Doc_login} exact />
          <Route path="/p_page" component={PharmaPage} exact />
          <Route path="/p_signUp" component={P_signUp} exact />
          <Route path="/p_dash" component={P_dash} exact />
          <Route path="/rec_dash" component={Reception} exact />
          <Route path="/p_code" component={PatientCode} exact />
          <Route path="/d_dash" component={DoctorDash} exact />
          <Route path="/doc/viewPatient" component={Patient_info} exact />
          <Route path="/doc/PatientRecord" component={PatientRecord} exact />
        </UserProvider>
      </Switch>
    </Router>
  );
}

export default App;
