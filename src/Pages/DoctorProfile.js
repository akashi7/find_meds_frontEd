import { useEffect, useState } from "react";
import { DoctorNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const DoctorProfile = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const history = useHistory();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, []);

  const initialState = {
    message: "",
    success: "",
    password: "", confirmPassword: "", oldPassword: ""
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {

    e.preventDefault();

    setLoading(true);

    const config = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/api/doc/updatePass`, config)).json();

    if (res.status === 200) {
      setLoading(false);
      setState({ ...state, success: "Password updated succesfully" });
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }

    else if (res.status === 301) {
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
      <DoctorNav />
      {state.message ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {state.message}
        </div> : ""}
      {state.success ?
        <div style={{ width: "100%", backgroundColor: "darkgreen", padding: "10px", textAlign: "center", color: "white" }}>
          {state.success}
        </div> : ""}
      <div className="search_P">
        <p>CHANGE PASSWORD</p>
        <form onSubmit={(e) => handleUpdate(e)}>
          <input placeholder="New Password" type="password" className="inputs" onChange={(e) => setState({ ...state, password: e.target.value })} />
          <input placeholder="Confirm password" type="password" className="inputs" onChange={(e) => setState({ ...state, confirmPassword: e.target.value })} />
          <input placeholder="Old  password" type="password" className="inputs" onChange={(e) => setState({ ...state, oldPassword: e.target.value })} />
          {loading ? <button className="buttonk" >LOADING......</button>
            : <button className="buttonk" >SEND</button>}
        </form>
      </div>
    </div>
  );
};
