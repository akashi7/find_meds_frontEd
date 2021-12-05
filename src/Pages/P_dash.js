import { useEffect, useContext, useState } from "react";
import { PharmacyDashNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";


export const P_dash = () => {

  let url;

  const { phMeds, pharmacyMedecines } = useContext(UserContext);

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const token = localStorage.getItem('token');

  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/pharmacy');
      }
      else {
        await pharmacyMedecines(token);
      }
    })();
    //eslint-disable-next-line
  }, []);

  const initialState = {
    message: "",
    success: "",
    med_name: "",
    quantity: "",
    phone: "",
    id_number: ""
  };
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [quantityTwo, setQuantityTwo] = useState('');

  const handleMedecine = async (e) => {
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

    const res = await (await fetch(`${url}/api/pharma/insertMeds`, config)).json();

    if (res.status === 200) {
      setLoading(false);
      setState({ ...state, success: "Medecine registered succesfully" });
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
    else if (res.status === 204) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 409) {
      setLoading(false);
      setState({ ...state, message: res.error });
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/pharmacy');
    }
  };


  const handleUpdate = async (id) => {

    if (quantity) {
      const config = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        },
      };
      const res = await (await fetch(`${url}/api/pharma/addMedQuantity?id=${id}&&quantity=${quantity}`, config)).json();
      if (res.status === 200) {
        setState({ ...state, success: "Medecine quantity increased succesfully" });
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
      else if (res.status === 409) {
        setLoading(false);
        setState({ ...state, message: res.error });
      }
      else if (res.status === 401) {
        localStorage.clear();
        history.push('/pharmacy');
      }
    }

    if (quantityTwo) {
      const config = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        },
      };
      const res = await (await fetch(`${url}/api/pharma/removeMedQuantity?id=${id}&&quantity=${quantityTwo}`, config)).json();

      if (res.status === 200) {
        setState({ ...state, success: "Medecine decreased succesfully" });
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
        history.push('/pharmacy');
      }
    }


  };

  const handlePatient = async (e) => {
    e.preventDefault();
    setLoadingTwo(true);
    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/api/pharma/viewPatientMedAuth`, config)).json();
    if (res.status === 200) {
      localStorage.setItem("patPhone", res.phone);
      history.push(`/pharmacy/${res.phone}`);
    }
    else if (res.status === 204) {
      setLoadingTwo(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 409) {
      setLoadingTwo(false);
      setState({ ...state, message: res.error });
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/pharmacy');
    }
  };


  return (
    <div>
      <PharmacyDashNav />
      {state.message ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {state.message}
        </div> : ""}
      {state.success ?
        <div style={{ width: "100%", backgroundColor: "darkgreen", padding: "10px", textAlign: "center", color: "white" }}>
          {state.success}
        </div> : ""}
      <div className="Pha_dash">
        <div className="LEFT">
          <h4>All medecines</h4>
          <table id="customers">
            <thead>
              <tr>
                <th>Name</th>
                <br></br>
                <th>Quantity</th>
                <br></br>
                <th>Increase</th>
                <br></br>
                <th>Remove</th>
                <br></br>
                <th>Action</th>
                <br></br>
              </tr>
            </thead>
            <tbody>
              {phMeds.allMeds.length === 0 ? <div style={{ padding: "10px", textAlign: "center" }}> No medecines yet </div>
                : phMeds.allMeds.map(({ id, med_name, quantity }) => {
                  return (
                    <tr key={id}>
                      <td>{med_name} </td>
                      <br></br>
                      <td>{quantity} </td>
                      <br></br>
                      <td >
                        <input type="text" placeholder="0" className="s_input" onChange={(e) => setQuantity(e.target.value)} />
                      </td>
                      <br></br>
                      <td >
                        <input type="text" placeholder="0" className="s_input" onChange={(e) => setQuantityTwo(e.target.value)} />
                      </td>
                      <br></br>
                      <td className="send" onClick={() => handleUpdate(id)} >SEND</td>
                      <br></br>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="CENTER">
          <h4>Register new medecine</h4>
          <form onSubmit={(e) => handleMedecine(e)}>
            <input placeholder="Medecine name" type="text" className="inputs" onChange={(e) => setState({ ...state, med_name: e.target.value })} />
            <input placeholder="Quantity" type="text" className="inputs" onChange={(e) => setState({ ...state, quantity: e.target.value })} />
            {loading ? <button className="buttonk">Loading.....</button> :
              <button className="buttonk">Register</button>}
          </form>
        </div>
        <div className="RIGHT">
          <h4>Patient record</h4>
          <form onSubmit={(e) => handlePatient(e)}>
            <input placeholder="Phone" type="text" className="inputs" onChange={(e) => setState({ ...state, phone: e.target.value })} />
            <input placeholder="ID" type="text" className="inputs" onChange={(e) => setState({ ...state, id_number: e.target.value })} />
            {loadingTwo ? <button className="buttonk">loading....</button>
              : <button className="buttonk">Search</button>}
          </form>
        </div>
      </div>
    </div>
  );
};
