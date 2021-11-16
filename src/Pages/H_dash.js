import { HospitalDashNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const H_dash = () => {
  const history = useHistory();
  return (
    <div>
      <HospitalDashNav />
      <div className="h_dash_div" >
        <div className="left">
          <h4>DOCTORS</h4>
        </div>
        <div className="right">
          <h4>NEW DOCTOR</h4>
          <form>
            <input placeholder="Full names" type="text" className="inputs" />
            <input placeholder="telephone" type="text" className="inputs" />
            <input placeholder="Password" type="password" className="inputs" />
            <input placeholder="Confirm password" type="password" className="inputs" />
            <button className="button">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};
