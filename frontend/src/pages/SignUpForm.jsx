import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router";
const SignUpForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState(null);

  const navigate = useNavigate();

  const register = async (e) => {
    try {
      e.preventDefault();
      setErrors(null);
      let data = {
        name,
        email,
        password,
      };
      let res = await axios.post(
        "http://localhost:4000/api/users/register",
        data,
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div className="w-screen">
      <form
        onSubmit={register}
        className="mx-auto flex max-w-md flex-col gap-4 border-2 border-white p-4"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-orange-400">
          Register Form
        </h1>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="name" className="text-orange-400">
              Username
            </Label>
          </div>
          <TextInput
            className="w-full p-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            placeholder="John Doe"
          />
          {!!(errors && errors.name) && (
            <p className="px-1 text-sm font-normal text-red-500 italic">
              {errors.name.msg}
            </p>
          )}
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="email" className="text-orange-400">
              Email
            </Label>
          </div>
          <TextInput
            className="w-full p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
          />
          {!!(errors && errors.email) && (
            <p className="px-1 text-sm font-normal text-red-500 italic">
              {errors.email.msg}
            </p>
          )}
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="password" className="text-orange-400">
              Password
            </Label>
          </div>
          <TextInput
            className="w-full p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
          {!!(errors && errors.password) && (
            <p className="px-1 text-sm font-normal text-red-500 italic">
              {errors.password.msg}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between px-1">
          <Button
            type="submit"
            className="cursor-pointer rounded-sm bg-orange-400 px-5 py-1 text-white hover:bg-orange-500"
          >
            Sign Up
          </Button>
          <Link to="/sign-in" className="text-sm text-orange-400">
            Login Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
