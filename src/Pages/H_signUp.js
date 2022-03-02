import { useState } from "react";
import { HospitalLoginSignUpNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const H_signUp = () => {

  const history = useHistory();

  const initialState = {
    message: "",
    code: "",
    h_name: "",
    password: "",
    confirmPassword: " "
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const handleSbmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/api/auth/registerHospital`, config)).json();

    if (res.status === 200) {
      localStorage.setItem("token", res.token);
      history.push('/h_dash');
    }
    else if (res.status === 205) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 206) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 409) {
      setLoading(false);
      setState({ ...state, message: res.error });
    }
  };


  return (
    <div>
      <HospitalLoginSignUpNav />
      {state.message ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {state.message}
        </div> : ""}
      <div className="h_login_page">
        <p>SIGN UP</p>
        <form onSubmit={(e) => handleSbmit(e)}>
          <input placeholder="Code" type="text" className="input" onChange={(e) => setState({ ...state, code: e.target.value })} />
          <input placeholder="Hospital name" type="text" className="input" onChange={(e) => setState({ ...state, h_name: e.target.value })} />
          <input placeholder="Password" type="password" className="input" onChange={(e) => setState({ ...state, password: e.target.value })} />
          <input placeholder="Confirm password" type="password" className="input" onChange={(e) => setState({ ...state, confirmPassword: e.target.value })} />
          {loading ? <button className="button">Loading.....</button>
            : <button className="button">Sign up</button>}
          <p onClick={() => history.push("/hospital")} className="Donot" >Have account?</p>
        </form>
      </div>
    </div>
  );
};
