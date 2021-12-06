import { useEffect, useState, useContext } from "react";
import { PharmacyDashNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const P_viewPrev = () => {

  let url;

  const { pharmaMeds, pharmaViewTodayMeds } = useContext(UserContext);

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const token = localStorage.getItem('token');

  const phone = localStorage.getItem("patPhone");

  const history = useHistory();

  const [toogle, setToogle] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState([]);
  const [noth, setNoth] = useState(false);
  const [message, setMessage] = useState(false);


  const Toogle = () => {
    if (toogle) {
      setToogle(false);
    }
    else setToogle(true);
  };

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/pharmacy');
      }
      else {
        await pharmaViewTodayMeds(token, phone);
      }

    })();
    //eslint-disable-next-line
  }, []);

  const today = new Date().toLocaleDateString();

  const Search = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await fetch(`${url}/api/pharma/filterDate?date=${startDate}&&phone=${phone}`, config)).json();

    if (res.status === 200) {
      setLoading(false);
      setNoth(false);
      setRecord(res.data);
    }
    if (res.status === 203) {
      setLoading(false);
      setRecord([]);
      setNoth(true);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/pharmacy');
    }
  };

  const Approve = async (e, id) => {
    e.preventDefault();

    const config = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/pharma/approveMeds?id=${id}`, config)).json();

    if (res.status === 200) {
      setMessage(true);
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/pharmacy');
    }

  };

  return (
    <div>
      <PharmacyDashNav />
      {message ?
        <div style={{ width: "100%", backgroundColor: "darkgreen", padding: "10px", textAlign: "center", color: "white" }}>
          Succesfully approved
        </div> : ""}
      {toogle ? (
        <div className="search-date">
          <p style={{ width: "fit-content", color: "darkgreen", backgroundColor: "whitesmoke", padding: "5px" }} onClick={Toogle}>Back</p>
          <p style={{ marginTop: "15px", width: "fit-content", borderBottom: "1px solid black", marginLeft: "550px" }}>SEARCH RECORD</p>
          <div className="date-p">
            <p>SELECT DATE</p>
            <br></br>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} required />
            {loading ? <button>LOADING.....</button> : <button onClick={(e) => Search(e)} >SEARCH</button>}
            <div style={{ marginTop: "30px" }}>
              {noth ? <p> No record found </p> : ""}
              {record.map(({ id, disease, medecines, date, patient_name, status }) => {
                return (
                  <div key={id}>
                    <p>Names :{patient_name} </p>
                    <br></br>
                    <p>Medecines : {medecines}</p>
                    <br></br>
                    <p>Date : {date}</p>
                    <br></br>
                    <p>Disease : {disease} </p>
                    {!status ? <button className="buttonz" onClick={(e, i) => Approve(e, id)} >Approve</button> : <button disabled className="buttonz">Approve</button>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )
        : <div className="search-date">
          <p style={{ width: "fit-content", color: "darkgreen", backgroundColor: "whitesmoke", padding: "5px" }} onClick={Toogle}>Search</p>
          {pharmaMeds.medecines.length === 0 ? <p> No record today {today} </p>
            : pharmaMeds.medecines.map(({ id, disease, medecines, date, status }) => {
              return (
                <div key={id}>
                  <p>Medecines : {medecines}</p>
                  <br></br>
                  <p>Date : {date}</p>
                  <br></br>
                  <p>Disease : {disease} </p>
                  {!status ? <button className="buttonz" onClick={(e, i) => Approve(e, id)} >Approve</button> :
                    <button disabled className="buttonz">Approve</button>}
                </div>
              );
            })}
          { }
        </div>}
    </div>
  );
};
