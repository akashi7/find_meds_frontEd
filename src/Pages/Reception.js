import { ReceptionistNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const Reception = () => {
  const history = useHistory();
  return (
    <div>
      <ReceptionistNav />
      <div className="reception_reg">
        <p>REGISTER PATIENT</p>
        <form>
          <input placeholder="Full names" type="text" className="inputs" />
          <input placeholder="Tel" type="text" className="inputs" />
          <input placeholder="ID" type="text" className="inputs" />
          <input placeholder="AGE" type="text" className="inputs" />
          <input placeholder="DISTRICT" type="text" className="inputs" />
          <input placeholder="SECTOR" type="text" className="inputs" />
          <button className="buttonk" onClick={() => history.push("/p_code")} >Register</button>
        </form>
      </div>
    </div>
  );
};
