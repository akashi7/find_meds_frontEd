import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../Components/Header';
import { UserContext } from "../Contexts/UserContext";

export const Cars = () => {


  const { allCars, ViewCars } = useContext(UserContext);


  const token = localStorage.getItem('token');
  const tin = localStorage.getItem('tin');
  const History = useHistory();

  const [state, setState] = useState({
    plate: "",
    seats: "",
    name: "",
    message: ""
  });

  useEffect(() => {
    (async () => {
      if (!(token)) {
        History.push('/');
      }
      else {
        await ViewCars(token, tin);
      }

    })();
  }, []);

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

    const res = await (await (fetch(`http://localhost:9000/user/registerCar?tin=${tin}`, config))).json();
    if (res.status === 200) {
      setState({ ...state, message: res.message });
      window.location.reload();
    }
    if (res.status === 204) {
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
      {state.message ? <p style={{ color: "darkgreen" }} >{state.message}</p> : ""}
      <h1>Cars</h1>
      <form onSubmit={(e) => handleSubmit(e)} id="form-input">
        <input
          placeholder="Enter plate"
          onChange={(e) => setState({ ...state, plate: e.target.value })}
          required
        />
        <input
          placeholder="Enter name"
          onChange={(e) => setState({ ...state, name: e.target.value })}
          required
        />
        <input
          placeholder="Enter Seates"
          onChange={(e) => setState({ ...state, seats: e.target.value })}
          required
        />
        <button type="submit" >Register Car</button>

      </form>


      <h2>All cars</h2>
      <table id="customers">
        <thead>
          <tr>
            <th>Plate</th>
            <th>Name</th>
            <th>seats</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {allCars.cars.map(({ id, plate, name, seats, time }) => {
            return (
              <tr key={id} >
                <th>{plate}</th>
                <th>{name}</th>
                <th>{seats}</th>
                <th>{time}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
