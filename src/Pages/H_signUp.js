import { HospitalLoginSignUpNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const H_signUp = () => {
  const history = useHistory();
  return (
    <div>
      <HospitalLoginSignUpNav />
      <div className="h_login_page">
        <p>SIGN UP</p>
        <form>
          <input placeholder="Code" type="text" className="input" />
          <input placeholder="Hospital name" type="text" className="input" />
          <input placeholder="Password" type="password" className="input" />
          <input placeholder="Confirm password" type="password" className="input" />
          <button className="button" onClick={() => history.push("/h_dash")}>Sign up</button>
          <p onClick={() => history.push("/h_page")} className="Donot" >Have account?</p>
        </form>
      </div>
    </div>
  );
};
