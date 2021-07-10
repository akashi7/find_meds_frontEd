import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AdHeader } from '../Components/AdHeader';
import { UserContext } from "../Contexts/UserContext";

export const Users = () => {

  const { users, GetAllUsers } = useContext(UserContext);

  const token = localStorage.getItem('token');
  const History = useHistory();


  const [state, setState] = useState({
    username: '',
    password: "",
    confirmPassword: "",
    address: '',
    tin: "",
    companyName: "",
    phone: "",
    message: ''
  });

  useEffect(() => {
    (async () => {
      if (!(token)) {
        History.push('/');
      }
      else {
        await GetAllUsers(token);
      }

    })();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };
    const res = await (await (fetch(`http://localhost:9000/auth/register`, config))).json();
    if (res.status === 200) {
      window.location.reload();
    }
    if (res.status === 203) {
      setState({ ...state, message: res.message });
    }
    if (res.status === 204) {
      setState({ ...state, message: res.message });
    }
  }
  return (
    <div>
      <AdHeader />
      <h1>Users</h1>
      <h2>Insert new User</h2>

      <form onSubmit={(e) => handleRegister(e)}>

        <input placeholder="Enter names"
          required
          onChange={(e) => setState({ ...state, username: e.target.value })}
        />
        <input placeholder="Enter company name"
          required
          onChange={(e) => setState({ ...state, companyName: e.target.value })}
        />
        <input placeholder="Enter phone number "
          required
          onChange={(e) => setState({ ...state, phone: e.target.value })}
        />
        <input placeholder="Enter tin"
          required
          onChange={(e) => setState({ ...state, tin: e.target.value })}
        />
        <input placeholder="Enter address"
          required
          onChange={(e) => setState({ ...state, address: e.target.value })}
        />
        <input placeholder="Choose password"
          required
          type="password"
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
        <input placeholder="Confirm password"
          required
          type="password"
          onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}
        />


        <button type="submit" >Register User</button>
        {state.message ? <p style={{ color: "red" }}>{state.message} </p> : ""}

        <h3>All users</h3>

      </form>
      <table id="customers">
        <thead>
          <tr>
            <th>Names</th>
            <th>Company name</th>
            <th>Tel</th>
            <th>Address</th>
            <th>Tin</th>

          </tr>
        </thead>
        <tbody>
          {users.Users.map(({ id, username, companyName, phone, address, tin }) => {
            return (
              <tr key={id} >
                <th>{username}</th>
                <th>{companyName}</th>
                <th>{phone}</th>
                <th>{address}</th>
                <th>{tin}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
