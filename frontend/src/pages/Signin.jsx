/* eslint-disable no-undef */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInstart, signInsuccess, signInfailure } from "../redux/user/userslice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formdata, setformdata] = useState({});
  const { loading, error: errormessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook here

  const handdlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handdlesubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      dispatch(signInfailure("All fields are required"));
      return;
    }
    try {
      dispatch(signInstart());
      const respones = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await respones.json();

      if (data.success === false) {
        dispatch(signInfailure(data.message));
        return;
      } 

      if(respones.ok){
        dispatch(signInsuccess(data));
        navigate('/'); // Use navigate function here
      }
    
    } catch (error) {
      dispatch(signInfailure(error.message));
    }
  };

  // If user is signed in, redirect to home page
  // Can be handled here if needed, based on state

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col lg:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to={"/"} className="text-4xl dark:text-white font-bold">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sophat
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            You can sign in with email and password or Google account.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handdlesubmit}>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Enter email"
                id="email"
                onChange={handdlechange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Enter password"
                id="password"
                onChange={handdlechange}
              />
            </div>
            <Button
              gradientDuoTone={"purpleToPink"}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Dont have an account?</span>
            <Link to={"/signup"} className="text-blue-500">
              Sign up
            </Link>
          </div>
          {errormessage && (
            <Alert className="mt-5" color="failure">
              {errormessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
