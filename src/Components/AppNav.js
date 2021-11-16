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
  return (
    <div className="h_nav_bar">
      <h3>DASHBOARD</h3>
      <p onClick={() => history.push("/h_page")} className="Donot" >LOG OUT</p>
    </div>
  );
};

export const DoctorLogin = () => {
  return (
    <div className="h_nav_bar">
      <h3>DOCTOR</h3>
    </div>
  );
};

export const PharmacyLoginSignUpNav = () => {
  const history = useHistory();
  return (
    <div className="h_nav_bar">
      <h3>PHARMACY</h3>
      <div>
        <p onClick={() => history.push("/p_signUp")} className="Donot" >SIGN UP</p>
      </div>
    </div>
  );
};

export const PharmacyDashNav = () => {
  const history = useHistory();
  return (
    <div className="h_nav_bar">
      <h3>DASHBOARD</h3>
      <p onClick={() => history.push("/p_page")} className="Donot" >LOG OUT</p>
    </div>
  );
};