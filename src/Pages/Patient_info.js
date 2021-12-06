import { useEffect, useContext, useState } from "react";
import { DoctorNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";


export const Patient_info = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const history = useHistory();

  const { P_info, viewPatient, docMeds, docSeeAllMeds } = useContext(UserContext);

  const tel = localStorage.getItem('P_phone');

  const token = localStorage.getItem('token');

  const [meds, setMeds] = useState([]);
  const [checked, setChecked] = useState(false);
  const [In, setIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTwo, setMessageTwo] = useState('');

  const initialState = {
    medecines: [],
    disease: "",
    id_number: ""
  };

  const [state, setState] = useState(initialState);


  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        await viewPatient(token, tel);
        await docSeeAllMeds(token);
      }
    })();
    //eslint-disable-next-line
  }, []);

  const setSearch = (medecines) => {

    const seen = new Set();

    const uniqArr = docMeds;

    const filterdArray = uniqArr.filter(el => {
      const duplicate = seen.has(el.med_name);
      seen.add(el.med_name);
      return !duplicate;
    });

    if (!medecines) {
      setMeds([]);
    }
    else {
      let matched = filterdArray.filter(({ med_name }) => {
        const regex = new RegExp(`${medecines}`, 'gi');
        return med_name.match(regex);
      });
      setMeds(matched);
    }
  };

  const handleCheckBox = (med) => {

    if (!checked) {
      setChecked(true);
      let Arr = state.medecines;
      const checkMed = (text) => {
        return text === med;
      };
      const answer = Arr.find(checkMed);
      if (!answer) {
        Arr.push(med);
        setChecked(false);
      }
      else {
        setIn(true);
        setTimeout(() => {
          setIn(false);
        }, 5000);
      }
    }
    if (checked) {
      setChecked(false);
    }
  };

  const Id = Math.random();

  const removeElement = (el) => {
    let Arr = state.medecines;
    let i;
    for (i = 0; i < Arr.length; i++) {
      if (Arr[i] === el) {
        Arr.splice(i, 1);
      }
    }
    setState({ ...state, medecines: Arr });
  };

  const handleSend = async (e, names, phone) => {
    e.preventDefault();
    if (!state.disease) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
    else {
      setLoading(true);
      const config = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(state)
      };
      const res = await (await fetch(`${url}/api/doc/sendMeds?patient_name=${names}&&patient_phone=${phone}`, config)).json();
      if (res.status === 200) {
        setLoading(false);
        setMessage('Sucessfully Sent');
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
      if (res.status === 307) {
        setLoading(false);
        setMessageTwo(res.message);
      }
      else if (res.status === 401) {
        localStorage.clear();
        history.push('/');
      }
    }
  };

  const viewPrev = async (e) => {
    e.preventDefault();
    setLoadingTwo(true);
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/doc/viewPrevRecord?code=${tel}&&id_number=${state.id_number}`, config)).json();

    if (res.status === 200) {
      localStorage.setItem("ID", state.id_number);
      history.push(`/doc/PatientRecord/${state.id_number}`);
    }

    if (res.status === 205) {
      setLoadingTwo(false);
      setMessageTwo(res.message);
    }

    else if (res.status === 409) {
      setLoadingTwo(false);
      setMessageTwo(res.error);
    }

    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }

  };

  return (
    <div>
      <DoctorNav />
      {message ?
        <div style={{ width: "100%", backgroundColor: "darkgreen", padding: "10px", textAlign: "center", color: "white" }}>
          {message}
        </div> : ""}
      {messageTwo ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {messageTwo}
        </div> : ""}
      <div className="Doc_View_p" >
        <div className="INFO" >
          <h3>Patient info</h3>
          <div className="space">
            {P_info.patient.map(({ id, full_names, age, district, sector, phone }) => {
              return (
                <div className="p_info" key={id}>
                  <p>Patient name : {full_names} </p>
                  <br></br>
                  <p>Age : {age} </p>
                  <br></br>
                  <p>District : {district} </p>
                  <br></br>
                  <p>sector : {sector} </p>
                  <br></br>
                  <label style={{ color: "darkgreen" }}>Recommended medecines</label>
                  <div className="sentMed">
                    {state.medecines.length === 0 ? ""
                      : state.medecines.map(el => {
                        return (
                          <div className="sntDiv" >
                            <p key={Id}> {el} </p>
                            <p className="x" onClick={() => removeElement(el)} >X</p>
                          </div>);
                      })}
                  </div>
                  {state.medecines.length > 0 ? (
                    <div> {loading ? <button className="buttonz">Loading....</button>
                      : <button className="buttonz" onClick={(e, i, k) => handleSend(e, full_names, phone)}>SEND</button>} </div>
                  )
                    : ""}
                </div>
              );
            })}
          </div>
        </div>
        <div className="MEDS">
          <h3>Recommend medecines</h3>
          <div className="space">
            {error ? <p style={{ color: "red" }}>Disease field is required</p> : ""}
            <input placeholder="DISEASE" type="text" className="inputs"
              onChange={(e) => setState({ ...state, disease: e.target.value })}
            />
            {In ? <p style={{ color: "red" }}>You arleady taken medecine</p> : ""}
            <input placeholder="SEARCH MEDS" type="text" className="inputs"
              onChange={(e) => setSearch(e.target.value)}
            />
            {meds.length !== 0 ? <div className="medList">
              {meds && meds.map(({ id, med_name }) => {
                return (
                  <div key={id} className="medListInfo">
                    <p> {med_name}</p>
                    <input type="checkbox" className="checkBox" value={med_name} onChange={(e) => handleCheckBox(e.target.value)} />
                  </div>
                );
              })}
            </div> : ""}
          </div>
        </div>
        <div className="RECORD">
          <h3>Previous record</h3>
          <div className="space">
            <label>Enter patient ID to view Previous Record</label>
            <input placeholder="ID" type="text" className="inputs" onChange={(e) => setState({ ...state, id_number: e.target.value })} />
            {loadingTwo ? <button className="buttonz">loading.....</button> : <button className="buttonz" onClick={(e) => viewPrev(e)} >View</button>}
          </div>
        </div>
      </div>
    </div >
  );
};

