import { useState, useEffect } from "react";
import { ReceptionistNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const Reception = () => {


  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const history = useHistory();

  const token = localStorage.getItem('token');

  const initialState = {
    message: "",
    success: "",
    full_names: "",
    id_number: "",
    age: "",
    phone: "",
    district: "",
    sector: "",
    insurance: ""
  };

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, []);

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');

  const handlePatientReg = async (e) => {
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

    const res = await (await fetch(`${url}/api/auth/registerPatient`, config)).json();

    if (res.status === 200) {
      setLoading(false);
      setState({ ...state, success: "Patient registered succesfully" });
      setCode(res.code);
      document.getElementById("form").reset();
      setTimeout(() => {
        setState({ ...state, success: "" });
      }, 4000);
    }
    else if (res.status === 205) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 409) {
      setLoading(false);
      setState({ ...state, message: res.error });
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }
  };

  return (
    <div>
      <ReceptionistNav />
      {state.message ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {state.message}
        </div> : ""}
      {state.success ?
        <div style={{ width: "100%", backgroundColor: "darkgreen", padding: "10px", textAlign: "center", color: "white" }}>
          {state.success}
        </div> : ""}
      {code ?
        <div style={{ width: "100%", backgroundColor: "darkgreen", padding: "10px", textAlign: "center", color: "white" }}>
          Patient code is : {code}
        </div> : ""}
      <div className="reception_reg">
        <p>REGISTER PATIENT</p>
        <form onSubmit={(e) => handlePatientReg(e)} id="form" >
          <input placeholder="FULL NAMES" type="text" className="inputs" onChange={(e) => setState({ ...state, full_names: e.target.value })} />
          <input placeholder="Tel" type="text" className="inputs" onChange={(e) => setState({ ...state, phone: e.target.value })} />
          <input placeholder="ID" type="text" className="inputs" onChange={(e) => setState({ ...state, id_number: e.target.value })} />
          <input placeholder="AGE" type="text" className="inputs" onChange={(e) => setState({ ...state, age: e.target.value })} />
          <input placeholder="DISTRICT" type="text" className="inputs" onChange={(e) => setState({ ...state, district: e.target.value })} />
          <input placeholder="SECTOR" type="text" className="inputs" onChange={(e) => setState({ ...state, sector: e.target.value })} />
          <input placeholder="INSURANCE" type="text" className="inputs" onChange={(e) => setState({ ...state, insurance: e.target.value })} />
          {loading ? <button className="buttonk" >Loading......</button>
            : <button className="buttonk" >Register</button>
          }
        </form>
      </div>
    </div>
  );
};
