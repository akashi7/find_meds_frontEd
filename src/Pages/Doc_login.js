import { useState } from "react";
import { DoctorLogin } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const Doc_login = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const history = useHistory();

  const initialState = {
    message: "",
    phone: "",
    password: ""
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/api/auth/docLogin`, config)).json();

    if (res.status === 200) {
      localStorage.setItem("token", res.token);
      history.push('/d_dash');
    }
    else if (res.status === 201) {
      localStorage.setItem("token", res.token);
      history.push('/rec_dash');
    }
    else if (res.status === 202) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 203) {
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
      <DoctorLogin />
      {state.message ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {state.message}
        </div> : ""}
      <div className="h_login_page">
        <p>LOGIN</p>
        <form onSubmit={(e) => handleDoctorLogin(e)} >
          <input placeholder="Telephone" type="text" className="input" onChange={(e) => setState({ ...state, phone: e.target.value })} />
          <input placeholder="Password" type="password" className="input" onChange={(e) => setState({ ...state, password: e.target.value })} />
          {loading ? <button className="button" >Loading......</button>
            : <button className="button">Login</button>}
        </form>
      </div>
    </div>
  );
};
