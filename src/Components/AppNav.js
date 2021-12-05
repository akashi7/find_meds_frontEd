import { useHistory } from "react-router-dom";

export const HospitalLoginSignUpNav = () => {
  return (
    <div className="h_nav_bar">
      <h3>HOSPITAL</h3>
      <div>
        <p>SIGN UP</p>
      </div>
    </div>
  );
};

export const HospitalDashNav = () => {

  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/hospital");
  };
  return (
    <div className="h_nav_bar">
      <h3>DASHBOARD</h3>
      <p onClick={() => logOut()} className="Donot" >LOG OUT</p>
    </div>
  );
};

export const DoctorLogin = () => {
  return (
    <div className="h_nav_bar">
      <h3>WELCOME</h3>
      <h3>Login Doctor/Receptionist</h3>
    </div>
  );
};

export const PharmacyLoginSignUpNav = () => {
  const history = useHistory();
  return (
    <div className="h_nav_bar">
      <h3>PHARMACY</h3>
      <div>
        <p onClick={() => history.push("/pharmacy/signUp")} className="Donot" >SIGN UP</p>
      </div>
    </div>
  );
};

export const PharmacyDashNav = () => {
  const history = useHistory();
  return (
    <div className="h_nav_bar">
      <h3 onClick={() => history.push('/p_dash')}>DASHBOARD</h3>
      <p onClick={() => { localStorage.clear(); history.push("/pharmacy"); }} className="Donot" >LOG OUT</p>
    </div>
  );
};

export const ReceptionistNav = () => {
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <div className="h_nav_bar">
      <h3>RECEPTION</h3>
      <p onClick={() => logOut()} className="Donot" >LOG OUT</p>
    </div>
  );
};

export const DoctorNav = () => {
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <div className="h_nav_bar">
      <h3 onClick={() => history.push('/d_dash')} >DASHBOARD</h3>
      <div className="d_nav">
        <p onClick={() => history.push('/doc/profile')}>PROFILE</p>
        <p onClick={() => logOut()} className="Donot" >LOG OUT</p>
      </div>
    </div>
  );
};
