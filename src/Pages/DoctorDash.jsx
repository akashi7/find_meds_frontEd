import { useEffect,useState } from "react";
import { DoctorNav } from "../Components/AppNav"
import { useHistory } from "react-router-dom";

export const DoctorDash=()=> {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;

  const history = useHistory()

  const token = localStorage.getItem('token')

  useEffect(()=>{
    (async()=>{
      if(!token){
        history.push('/');
      }
    })()
    //eslint-disable-next-line
  },[])


  const initialSate={
    message:""
  }

  const[state,setState] = useState(initialSate)
  const [loading, setLoading] = useState(false);
  const[phone,setPhone] = useState('')

  const handleSearch=async(e)=>{

    e.preventDefault()

    setLoading(true)

    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await fetch(`${url}/api/doc/SearchPat?phone=${phone}`, config)).json();

    if (res.status === 200){
       localStorage.setItem('P_phone',res.phone)
       history.push("/doc/viewPatient")
    }
    else if (res.status === 300) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }
  }

  return (
    <div>
      <DoctorNav/>
      {state.message ?
        <div style={{ width: "100%", backgroundColor: "red", padding: "10px", textAlign: "center", color: "white" }}>
          {state.message}
        </div> : ""}
      <div className="search_P">
      <p>SEARCH PATIENT</p>
      <form onSubmit={(e)=>handleSearch(e)}>
          <input placeholder="Phone" type="text" className="inputs" required onChange={(e)=>setPhone(e.target.value)} />
          {loading ? <button className="buttonk" >LOADING.....</button>
          :<button className="buttonk" >SEND</button>}
        </form>
      </div>
    </div>
  )
}
