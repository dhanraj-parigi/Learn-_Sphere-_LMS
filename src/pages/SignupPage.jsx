import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("student");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();
    setError("");

    const userEmail = email.trim();

    if(!name || !userEmail || !password){
      setError("Please fill all fields");
      return;
    }

    try{

      setLoading(true);

      /* check if email already exists */
      const checkUser = await fetch(
        `http://localhost:3001/users?email=${userEmail}`
      );

      const existingUser = await checkUser.json();

      if(existingUser.length > 0){
        setError("Email already registered");
        setLoading(false);
        return;
      }

      const newUser = {
        name,
        email:userEmail,
        password,
        role
      };

      await fetch("http://localhost:3001/users",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(newUser)
      });

      alert("Signup successful");

      navigate("/login");

    }catch(err){

      console.error(err);
      setError("Unable to signup. Try again.");

    }finally{
      setLoading(false);
    }

  };


  return(

    <div className="container mt-5" style={{maxWidth:"420px"}}>

      <div className="card shadow p-4">

        <h3 className="text-center mb-3">
          Create Account
        </h3>

        {error && (
          <p className="text-danger text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup}>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <select
              className="form-control"
              value={role}
              onChange={(e)=>setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

        </form>

      </div>

    </div>

  );
}

export default SignupPage;