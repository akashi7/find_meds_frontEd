import { DoctorLogin } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const Doc_login = () => {

  const history = useHistory();
  return (
    <div>
      <DoctorLogin />
      <div className="h_login_page">
        <p>LOGIN</p>
        <form>
          <input placeholder="Telephone" type="text" className="input" />
          <input placeholder="Password" type="password" className="input" />
          <button className="button" onClick={() => history.push("/h_dash")}>Login</button>
        </form>
      </div>
    </div>
  );
};
