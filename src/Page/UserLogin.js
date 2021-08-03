import { HomeNav } from '../Component/HomeNav';
export const UserLogin = () => {


  return (
    <div className="whole">
      <HomeNav />
      <div className="loginForm">
        <form className="Lform" >
          <h3>Login</h3>
          <input
            placeholder="Tel"
            className="jb"
          />
          <input
            placeholder="Password"
            type="password"
            className="jb"
          />
          <button className="sButton" type="button">Login</button>
        </form>
      </div>
    </div>
  );
};
