import { useState } from 'react';
import { useHistory } from 'react-router-dom';



export const Home = () => {

  const History = useHistory();

  const [state, setState] = useState({
    tin: "",
    password: "",
    message: ''
  });

  async function handleLogin(e) {
    e.preventDefault();
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };

    const res = await (await (fetch(`http://localhost:9000/auth/login`, config))).json();

    if (res.status === 200) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("tin", res.tin);
      History.push('/Dash');
    }
    if (res.status === 201) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("tin", res.tin);
      History.push('/AdminDash');
    }
    if (res.status === 205) {
      setState({ ...state, message: res.message });
    }
    if (res.status === 204) {
      setState({ ...state, message: res.message });
    }

  }



  return (
    <div>

      <form onSubmit={(e) => handleLogin(e)} >
        <input
          placeholder="Tin"
          onChange={(e) => setState({ ...state, tin: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
        <button type="submit" >Sign In</button>
        {state.message ? <p style={{ color: "red" }}>{state.message} </p> : ""}
      </form>


    </div>
  );
};
