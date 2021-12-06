import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { UserProvider } from './Contexts/UserContext';
import { DoctorDash } from './Pages/DoctorDash';
import { DoctorProfile } from './Pages/DoctorProfile';
import { Doc_login } from './Pages/Doc_login';
import { Doc_recovery } from './Pages/Doc_recovery';
import { HospitalPage } from './Pages/HospitalPage';
import { H_dash } from './Pages/H_dash';
import { H_signUp } from './Pages/H_signUp';
import { PatientCode } from './Pages/PatientCode';
import { PatientRecord } from './Pages/PatientRecord';
import { Patient_info } from './Pages/Patient_info';
import { PharmaPage } from './Pages/PharmaPage';
import { P_dash } from './Pages/P_dash';
import { P_signUp } from './Pages/P_signUp';
import { P_viewPrev } from './Pages/P_viewPrev';
import { Reception } from './Pages/Reception';




function App() {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <Route path="/hospital" component={HospitalPage} exact />
          <Route path="/hospital/signUp" component={H_signUp} exact />
          <Route path="/h_dash" component={H_dash} exact />
          <Route path="/" component={Doc_login} exact />
          <Route path="/pharmacy" component={PharmaPage} exact />
          <Route path="/pharmacy/signUp" component={P_signUp} exact />
          <Route path="/p_dash" component={P_dash} exact />
          <Route path="/pharmacy/:id" component={P_viewPrev} exact />
          <Route path="/rec_dash" component={Reception} exact />
          <Route path="/p_code" component={PatientCode} exact />
          <Route path="/d_dash" component={DoctorDash} exact />
          <Route path="/doc/viewPatient" component={Patient_info} exact />
          <Route path="/doc/PatientRecord/:id" component={PatientRecord} exact />
          <Route path="/doc/profile" component={DoctorProfile} exact />
          <Route path="/doc/recovery" component={Doc_recovery} exact />
        </UserProvider>
      </Switch>
    </Router>
  );
}

export default App;
