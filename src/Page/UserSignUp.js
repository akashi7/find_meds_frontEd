import { HomeNav } from '../Component/HomeNav';
export const UserSignUp = () => {
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
        </form>
      </div>
    </div>
  );
};
