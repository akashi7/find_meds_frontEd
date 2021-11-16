import { HospitalLoginSignUpNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const HospitalPage = () => {

  const history = useHistory();
  return (
    <div>
      <HospitalLoginSignUpNav />
      <div className="h_login_page">
        <p>LOGIN</p>
        <form>
          <input placeholder="Code" type="text" className="input" />
          <input placeholder="Password" type="password" className="input" />
          <button className="button" onClick={() => history.push("/h_dash")}>Login</button>
          <p onClick={() => history.push("/h_signUp")} className="Donot" >Do not have account?</p>
        </form>
      </div>
    </div>
  );
};
