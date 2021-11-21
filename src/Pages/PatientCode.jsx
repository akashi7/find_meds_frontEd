import { ReceptionistNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const PatientCode=()=> {

  const history = useHistory()

  function goBack(e){
   e.preventDefault()
   history.goBack()
  }
  return (
    <div>
      <ReceptionistNav />
      <h3 style={{marginTop:"20px",textAlign:"center"}}>Patient recorded info</h3>
      <div className="patient-code">
         <div className="p_info">
           <p>Patient name : Akashi Christian </p>
           <p>Patient ID  : 1234312345678909</p>
           <p>Patient Code : 234</p>
         </div>
         <button className="buttonk" onClick={(e)=>goBack(e)} >Go back</button>
      </div> 
    </div>
  )
}
