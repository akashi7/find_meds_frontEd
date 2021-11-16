import { PharmacyLoginSignUpNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const P_signUp = () => {
  const history = useHistory();
  return (
    <div>
      <PharmacyLoginSignUpNav />
      <div className="h_login_page">
        <p>SIGN UP</p>
        <form>
          <input placeholder="Code" type="text" className="input" />
          <input placeholder="Pharmacy name" type="text" className="input" />
          <input placeholder="Password" type="password" className="input" />
          <input placeholder="Confirm password" type="password" className="input" />
          <button className="button" onClick={() => history.push("/p_dash")}>Sign up</button>
          <p onClick={() => history.push("/p_page")} className="Donot" >Have account?</p>
        </form>
      </div>
    </div>
  );
};
