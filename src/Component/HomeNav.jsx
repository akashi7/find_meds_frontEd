import { useHistory } from 'react-router-dom';
export const HomeNav = () => {
  const History=useHistory()
  return (
    <div className="Homenav">
      <ul>
        <h2 onClick={()=>History.push('/')} >Creatives</h2>
      </ul>
      <ul>
        <form>
         <input type="text" placeholder="Search"  className="jbk"/>
         <button type="button" className="Tbutton">Search</button>
        </form>
      </ul>
      <ul>
        <li onClick={()=>History.push('/login')} >Login</li>
        <li onClick={()=>History.push('/signUp')}>Sign up</li>
      </ul>
    </div>
  )
}
