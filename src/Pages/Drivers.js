import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../Components/Header';
import { UserContext } from "../Contexts/UserContext";

export const Drivers = () => {


  const { allDrivers, ViewDrivers } = useContext(UserContext);

  const token = localStorage.getItem('token');
  const tin = localStorage.getItem('tin');
  const History = useHistory();

  useEffect(() => {
    (async () => {
      if (!(token)) {
        History.push('/');
      }
      else {
        await ViewDrivers(token, tin);
      }
    })();
  }, []);

  const [state, setState] = useState({
    idno: "",
    phonenumber: "",
    name: "",
    license: "",
    message: "",
  });


  async function handleSubmit(e) {
    e.preventDefault();
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };

    const res = await (await (fetch(`http://localhost:9000/user/registerDriver?tin=${tin}`, config))).json();
    if (res.status === 200) {
      setState({ ...state, message: res.message });
      window.location.reload();
    }
    if (res.status === 205) {
      document.getElementById("form-input").reset();
      setState({ ...state, message: res.message });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  }

  return (
    <div>
      <Header />
      <h1>Driver</h1>
      {state.message ? <p style={{ color: "darkgreen" }} >{state.message}</p> : ""}
      <form onSubmit={(e) => handleSubmit(e)} id="form-input">
        <input
          placeholder="Enter IDNO"
          onChange={(e) => setState({ ...state, idno: e.target.value })}
          required
        />
        <input
          placeholder="Enter names"
          onChange={(e) => setState({ ...state, name: e.target.value })}
          required
        />
        <input
          placeholder="Enter Tel"
          onChange={(e) => setState({ ...state, phonenumber: e.target.value })}
          required
        />
        <input
          placeholder="Enter license"
          onChange={(e) => setState({ ...state, license: e.target.value })}
          required
        />
        <button type="submit" >Register Driver</button>
      </form>


      <h2>All drivers</h2>

      <table id="customers">
        <thead>
          <tr>
            <th>Id no</th>
            <th>Name</th>
            <th>Tel</th>
            <th>License</th>
          </tr>
        </thead>
        <tbody>
          {allDrivers.drivers.map(({ id, idno, name, phonenumber, license }) => {
            return (
              <tr key={id} >
                <th>{idno}</th>
                <th>{name}</th>
                <th>{phonenumber}</th>
                <th>{license}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
