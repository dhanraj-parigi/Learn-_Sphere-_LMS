import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if(!email || !password){
      setError("Please enter email and password");
      return;
    }

    try{

      setLoading(true);

      const res = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );

      const data = await res.json();

      if(data.length === 0){
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const user = data[0];

      // store user
      localStorage.setItem("user", JSON.stringify(user));

      // redirect
      if(user.role === "admin"){
        navigate("/admin");
      }else{
        navigate("/courses");
      }

    }catch(err){

      setError("Server error. Please try again.");

    }finally{
      setLoading(false);
    }

  };


  return (

    <div className="container mt-5" style={{maxWidth:"420px"}}>

      <div className="card shadow p-4">

        <h3 className="text-center mb-3">
          Login
        </h3>

        {error && (
          <p className="text-danger text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>

  );
}

export default LoginPage;