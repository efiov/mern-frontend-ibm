const BaseRegister = () => {
  return (
    <div className="col-sm-5 bg-img align-self-center">
      <div className="info">
        <div className="logo clearfix"></div>
        <div className="btn-section clearfix">
          <button
            //onClick={login}
            className="nav-link link-btn btn-primary default-bg"
          >
            Login
          </button>
          <button
            //onClick={register}
            className="nav-link link-btn btn-primary default-bg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseRegister;
