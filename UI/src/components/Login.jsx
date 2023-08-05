import { Link } from "react-router-dom";
import Spinner from "./Spinner";

export default function Login() {
  return (
    <>
      {/* <Spinner /> */}
      <section className="signup row justify-content-center mt-5 ">
        <h2 className="text-center mb-4">Login into your account</h2>
        <div className="mb-3 col-md-4">
          <label>Username</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-12"></div>
        <div className="col-md-4 mb-3">
          <label>Password</label>
          <input type="password" className="form-control" />
        </div>
        <div className="col-md-12"></div>
        <div className="col-md-2 mb-4">
          <button className="w-100 py-2">Login</button>
        </div>
        <div className="col-md-12 text-center">
          New User - <Link to="/signup">Click Here</Link> to Signup
        </div>
      </section>
    </>
  );
}
