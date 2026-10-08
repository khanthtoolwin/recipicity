import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import axios from "../helpers/axios";
const SignInForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const login = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      let data = {
        email,
        password,
      };
      let res = await axios.post("/api/users/login", data);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.msg);
    }
  };
  return (
    <div className="w-screen">
      <form
        onSubmit={login}
        className="mx-auto flex max-w-md flex-col gap-4 border-2 border-white p-4"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-orange-400">
          Login Form
        </h1>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="email" className="text-orange-400">
              Email
            </Label>
          </div>
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-1"
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
          />
          {!!error && (
            <p className="mt-5 px-1 text-sm text-red-500 italic">{error}</p>
          )}
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="password" className="text-orange-400">
              Password
            </Label>
          </div>
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-1"
            id="password"
            type="password"
          />
        </div>
        <div className="mt-4 flex items-center justify-between px-1">
          <Button
            type="submit"
            className="cursor-pointer rounded-sm bg-orange-400 px-5 py-1 text-white hover:bg-orange-500"
          >
            Login
          </Button>
          <Link to="#" className="text-sm text-orange-400">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
