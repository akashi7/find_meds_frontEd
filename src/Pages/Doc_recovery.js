import { useState } from "react";
import { DoctorLogin } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const Doc_recovery = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const history = useHistory();

  const initialState = {
    message: "",
    phone: "",
    code: "",
    password: "",
    confirmPassword: ""
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [message, setMessage] = useState('');
  const [data, setData] = useState(false);
  const [reset, setReset] = useState(false);

  const handleReset = async (e) => {

    e.preventDefault();

    setLoading(true);

    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/api/doc/forgotPassword`, config)).json();

    if (res.status === 200) {
      document.getElementById("form").reset();
      setLoading(false);
      setData(true);
      localStorage.setItem('code', res.code);
      localStorage.setItem('phone', res.phone);
    }
    else if (res.status === 300) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 307) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }

  };

  const handleVerify = (e) => {

    e.preventDefault();

    const code = localStorage.getItem('code');

    if (state.code === code) {
      document.getElementById("code").reset();
      document.getElementById("code").style.display = "none";
      setReset(true);
      setData(false);
    }
    else {
      setState({ ...state, message: "Invalid code " });
    }

  };

  const handleResetPassword = async (e) => {

    e.preventDefault();

    setLoadingTwo(true);

    const phone = localStorage.getItem('phone');

    const config = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/api/doc/resetPassword?phone=${phone}&&confirmPassword=${state.confirmPassword}`, config)).json();

    if (res.status === 200) {
      setLoadingTwo(false);
      setMessage("Password Reset Succesfully!!!");
      setTimeout(() => {
        history.push("/");
      }, 4000);
    }
    else if (res.status === 409) {
      setLoadingTwo(false);
      setState({ ...state, message: res.error });
    }

  };

  return (
    <div>
      <DoctorLogin />
      {message ?
        <div style={{ width: "100%", backgroundColor: "darkgreen", padding: "10px", textAlign: "center", color: "white" }}>
          {message}
        </div> : ""}
      {state.message ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {state.message}
        </div> : ""}
      <div className="search_P">
        {data ? <p>ENTER CODE SENT TO YOUR PHONE</p> : <p>RESET PASSWORD</p>}
        {data ?
          <form id="code" onSubmit={(e) => handleVerify(e)}>
            <input placeholder="Code" type="text" className="inputs" required onChange={(e) => setState({ ...state, code: e.target.value })} />
            <button className="buttonk" >SEND</button>
          </form>
          : <form id="form" onSubmit={(e) => handleReset(e)}>
            <input placeholder="Telephone" type="text" className="inputs" required onChange={(e) => setState({ ...state, phone: e.target.value })} />
            {loading ? <button className="buttonk" >LOADING.....</button>
              : <button className="buttonk" >SEND</button>}
          </form>}
        {reset ?
          <form onSubmit={(e) => handleResetPassword(e)} >
            <input placeholder="Password" type="password" className="inputs" required onChange={(e) => setState({ ...state, password: e.target.value })} />
            <input placeholder="Confirm password" type="password" className="inputs" required onChange={(e) => setState({ ...state, confirmPassword: e.target.value })} />
            {loadingTwo ? <button className="buttonk" >LOADING.....</button>
              : <button className="buttonk" >SEND</button>}
          </form>
          : ""}
      </div>
    </div>
  );
};
