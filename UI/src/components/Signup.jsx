import Spinner from "./Spinner";

export default function Signup() {
  return (
    <>
      {/* <Spinner /> */}
      <section className="signup row justify-content-center mt-5 ">
        <h2 className="text-center mb-4">Signup Page</h2>
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
        <div className="col-md-4 mb-3">
          <label>Role</label>
          <select class="form-control">
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <div className="col-md-12"></div>
        <div className="col-md-2">
          <button className="w-100 py-2">Signup</button>
        </div>
      </section>
    </>
  );
}
