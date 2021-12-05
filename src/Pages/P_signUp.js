import { useState, useEffect } from "react";
import { PharmacyLoginSignUpNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const P_signUp = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const history = useHistory();

  const initialState = {
    message: "",
    code: "", ph_name: "", password: "", confirmPassword: "", location: ""
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [location, setLocation] = useState();

  const getLocationCord = async () => {

    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

  };

  useEffect(() => {
    getLocationCord();
    //eslint-disable-next-line
  }, []);


  const getAddress = async () => {

    const APIKEY = 'AIzaSyBPorX1SlTTrjos_NYsNwbYgfzfaAMsdsM';

    const res = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${APIKEY}`)).json();

    let location = res.results[0].formatted_address;

    setLocation(location);


  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/api/auth/registerPharmacy?location=${location}`, config)).json();

    if (res.status === 200) {
      localStorage.setItem('token', res.token);
      history.push('/p_dash');
    }
    else if (res.status === 205) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 206) {
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
      <PharmacyLoginSignUpNav />
      {state.message ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {state.message}
        </div> : ""}
      <div className="h_login_page">
        <p>SIGN UP</p>
        <form onSubmit={(e) => handleSignUp(e)}>
          <input placeholder="Code" type="text" className="input" onChange={(e) => setState({ ...state, code: e.target.value })} />
          <input placeholder="Pharmacy name" type="text" className="input" onChange={(e) => setState({ ...state, ph_name: e.target.value })} />
          <p style={{ color: "black" }} onClick={getAddress} className="LO" >Get your location</p>
          <input placeholder={!location ? "location" : location} type="text" className="input" disabled />
          <input placeholder="Password" type="password" className="input" onChange={(e) => setState({ ...state, password: e.target.value })} />
          <input placeholder="Confirm password" type="password" className="input" onChange={(e) => setState({ ...state, confirmPassword: e.target.value })} />
          {loading ? <button className="button">Loading......</button>
            : <button className="button">Sign up</button>}
          <p onClick={() => history.push("/pharmacy")} className="Donot" >Have account?</p>
        </form>
      </div>
    </div>
  );
};
