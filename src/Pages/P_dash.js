import { PharmacyDashNav } from "../Components/AppNav";

export const P_dash = () => {
  return (
    <div>
      <PharmacyDashNav />
      <div className="Pha_dash">
        <div className="LEFT">
          <h4>All medecines</h4>
          <table id="customers">
            <thead>
              <tr>
                <th>Name</th>
                <br></br>
                <th>Quantity</th>
                <br></br>
                <th>Action</th>
                <br></br>
                <th>Action</th>
                <br></br>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Quartem</td>
                <br></br>
                <td>10</td>
                <br></br>
                <td className="Update">Update</td>
                <br></br>
                <td className="Delete">Delete</td>
                <br></br>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="CENTER">
          <h4>Register new medecine</h4>
          <form>
            <input placeholder="Medecine name" type="text" className="inputs" />
            <input placeholder="Quantity" type="text" className="inputs" />
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
