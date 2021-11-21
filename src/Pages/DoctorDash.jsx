import { DoctorNav } from "../Components/AppNav"
import { useHistory } from "react-router-dom";

export const DoctorDash=()=> {

  const history = useHistory()
  return (
    <div>
      <DoctorNav/>
      <div className="search_P">
      <p>SEARCH PATIENT</p>
      <form>
          <input placeholder="Code" type="text" className="inputs" />
          <button className="buttonk" onClick={()=>history.push("/doc/viewPatient")} >SEND</button>
        </form>
      </div>
    </div>
  )
}
