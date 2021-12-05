import { useEffect, useContext, useState } from "react";
import { HospitalDashNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";


export const H_dash = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const { Docs, AllDoctors } = useContext(UserContext);

  const history = useHistory();

  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/h_page');
      }
      else {
        await AllDoctors(token);
      }
    })();

    //eslint-disable-next-line
  }, []);

  const initialState = {
    success: "",
    message: "",
    full_names: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: ""
  };


  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);


  const handleNewDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/api/hospital/registerDoc`, config)).json();

    if (res.status === 200) {
      setLoading(false);
      setState({ ...state, success: "Success" });
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }

    else if (res.status === 205) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 206) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/h_page');
    }
    else if (res.status === 409) {
      setLoading(false);
      setState({ ...state, message: res.error });
    }
  };

  return (
    <div>
      <HospitalDashNav />
      {state.message ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {state.message}
        </div> : ""}
      {state.success ?
        <div style={{ width: "100%", backgroundColor: "darkgreen", padding: "10px", textAlign: "center", color: "white" }}>
          {state.success}
        </div> : ""}
      <div className="h_dash_div" >
        <div className="left">
          <h4>DOCTORS</h4>
          <table id="customers">
            <thead>
              <tr>
                <th>Full names</th>
                <br></br>
                <th>Telephone</th>
                <br></br>
                <th>Role</th>
                <br></br>
              </tr>
            </thead>
            <tbody>
              {Docs.docs.length === 0 ? <div style={{ padding: "10px", textAlign: "center" }}>No Doctors registered yet!</div>
                : Docs.docs.map(({ id, full_names, phone, role }) => {
                  return (
                    <tr key={id} >
                      <td>{full_names}</td>
                      <br></br>
                      <td>{phone}</td>
                      <br></br>
                      <td>{role}</td>
                      <br></br>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="right">
          <h4>NEW DOCTOR</h4>
          <form onSubmit={(e) => handleNewDoctor(e)}>
            <input placeholder="Full names" type="text" className="inputs" onChange={(e) => setState({ ...state, full_names: e.target.value })} />
            <input placeholder="Telephone" type="text" className="inputs" onChange={(e) => setState({ ...state, phone: e.target.value })} />
            <input placeholder="Role" type="text" className="inputs" onChange={(e) => setState({ ...state, role: e.target.value })} />
            <input placeholder="Password" type="password" className="inputs" onChange={(e) => setState({ ...state, password: e.target.value })} />
            <input placeholder="Confirm password" type="password" className="inputs" onChange={(e) => setState({ ...state, confirmPassword: e.target.value })} />
            {loading ? <button className="button">Loading......</button>
              : <button className="button">Register</button>}
          </form>
        </div>
      </div>
    </div >
  );
};
