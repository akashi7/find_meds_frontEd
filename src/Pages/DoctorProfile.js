import { DoctorNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const DoctorProfile = () => {
  const history = useHistory();

  return (
    <div>
      <DoctorNav />
      <div className="search_P">
        <p>CHANGE PASSWORD</p>
        <form>
          <input placeholder="New Password" type="text" className="inputs" />
          <input placeholder="Confirm password" type="text" className="inputs" />
          <input placeholder="Old  password" type="text" className="inputs" />
          <button className="buttonk" >SEND</button>
        </form>
      </div>
    </div>
  );
};
