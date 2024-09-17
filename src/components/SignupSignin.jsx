import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase"; // Import auth from a separate Firebase config file
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignupSignin = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const provider = new GoogleAuthProvider(); // Google Auth Provider

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (state === "Sign Up") {
      signupwithEmail();
    } else {
      loginwithEmail();
    }
  };

  const signupwithEmail = () => {
    setLoading(true); // Start loading
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", password);
    console.log("ConfirmPassword", confirmPassword);

    // Validate form fields before creating user
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false); // Stop loading
        return;
      }

      // Create a new account using email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User>>>", user);
          toast.success("User Created!");
          setLoading(false); // Stop loading
          
          // Create a document with the user ID (optional)
          createDoc(user);
          
          // Navigate to dashboard
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false); // Stop loading
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false); // Stop loading
    }
  };

  const loginwithEmail = () => {
    setLoading(true); // Start loading
    console.log("Email", email);
    console.log("Password", password);

    // Validate form fields before logging in
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User>>>", user);
          toast.success("Logged In Successfully!");
          setLoading(false); // Stop loading
          
          // Navigate to dashboard
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false); // Stop loading
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false); // Stop loading
    }
  };

  const handleGoogleSignupLogin = () => {
    setLoading(true); // Start loading

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google User>>>", user);
        toast.success("Logged in with Google!");
        setLoading(false); // Stop loading

        // Navigate to dashboard
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false); // Stop loading
      });
  };

  function createDoc(user) {
    // Create a document for the user in the database (optional)
    console.log("Create a document for user", user.uid);
  }

  return (
    <form
      className="min-h-[60vh] flex items-center my-3"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-custom">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "login"} to book an
          appointment
        </p>

        {state === "Sign Up" && (
          <>
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Confirm Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button
          disabled={loading} // Disable the button while loading
          type="submit"
          className="bg-primary text-white border border-zinc-300 w-full py-2 rounded-md text-base flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 border-t-2 border-solid border-white border-r-transparent rounded-full"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                ></path>
              </svg>
              {state === "Sign Up" ? "Creating Account..." : "Logging In..."}
            </>
          ) : (
            state === "Sign Up" ? "Sign Up using Email and Password" : "Login using Email and Password"
          )}
        </button>

        <div className="w-full flex justify-center items-center gap-2 my-4">
          <div className="h-[1px] bg-zinc-300 w-full"></div>
          <p className="text-sm">Or</p>
          <div className="h-[1px] bg-zinc-300 w-full"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignupLogin}
          className="bg-green-500 text-white w-full py-2 rounded-md text-base mt-2"
        >
          {state === "Sign Up" ? "Sign Up using Google" : "Login using Google"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default SignupSignin;
