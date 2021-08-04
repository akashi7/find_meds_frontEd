import { HomeNav } from '../Component/HomeNav';
import { useHistory } from 'react-router-dom';
export const UserSignUp = () => {

  const History = useHistory();

  return (
    <div>
      <HomeNav />
      <div className="loginForm">
        <form className="Lform" >
          <h3>Sign Up</h3>
          <input
            placeholder="Tel"
            className="jb"
          />
          <input
            placeholder="Password"
            type="password"
            className="jb"
          />
          <input
            placeholder="Confirm password"
            type="password"
            className="jb"
          />
          <button className="sButton" type="button" >Sign Up</button>
          <p className="ty" onClick={() => History.push('/login')} >Have account </p>
        </form>
      </div>
    </div>
  );
};
