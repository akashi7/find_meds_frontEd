import { PharmacyDashNav } from "../Components/AppNav";

export const P_dash = () => {
  return (
    <div>
      <PharmacyDashNav />
      <div className="Pha_dash">
        <div className="LEFT">
          <h4>All medecines</h4>
        </div>
        <div className="CENTER">
          <h4>Register new medecine</h4>
          <form>
            <input placeholder="Medecine name" type="text" className="inputs" />
            <button className="buttonk">Register</button>
          </form>
        </div>
        <div className="RIGHT">
          <h4>Patient record</h4>
          <form>
            <input placeholder="Code" type="text" className="inputs" />
            <input placeholder="ID" type="text" className="inputs" />
            <button className="buttonk">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};
