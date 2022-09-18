import React, { useEffect } from "react";
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
// import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import { useHistory, NavLink, Link } from "react-router-dom";
import { login } from "../api/auth";
import logo from "../../src/assets/img/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

toast.configure();

const Login = ({ setAdmin }) => {
  // const [loginForm, setLoginForm] = useState({});
  const history = useHistory();

  useEffect(() => {
        const adminData = localStorage.getItem("lethustock-admin-data");
        adminData ? history.push("/dashboard") : history.push("/");
  },[history]);
  // const collectData = (e) => {
  //   let data = { ...loginForm };
  //   data[e.target.type] = e.target.value;
  //   setLoginForm(data);
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const _LOGIN = async (data) => {
    try {
      // e.preventDefault();
      // const { email, password } = loginForm;
      // if (!email || !password)
      //   return toast.error("Email or Password Is Required!");
      const res = await login(data);
      if (!res.ok) return toast.error(res.data.msg);
      let token = res.data.token;
      let adminData = res.data.data;
      localStorage.setItem("lethustock-admin-token", token);
      localStorage.setItem("lethustock-admin-data", JSON.stringify(adminData));
      setAdmin(adminData);
      reset();
      toast.success(res.data.message);
      history.push("/dashboard");
    } catch (err) {
      console.log("login error", err);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 rounded login-page-details">
      <Card className="log-card">
      <form onSubmit={handleSubmit(_LOGIN)}>
        <CardBody>
          <div className="flex justify-center">
            <img src={logo} className="w-40" alt="..." />
            <br />
          </div>
         
          <div className="mt-12 mb-8 px-4">
            {/* <input
              type="email"
              color="green-500"
              size="regular"
              outline={true}
              placeholder="Email Address"
              iconFamily="material-icons"
              iconName="person"
              // onChange={(e) => collectData(e)}
              {...register("email", { required: "Email is Required" ,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              }})}
              onKeyUp={() => {
                trigger("email");
              }}
            />
                 {errors.email && (
                <small className="text-red-600">{errors.email.message}</small>
              )} */}
            <input
                type="text"
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("email", { required: "Email Is Required! " ,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }})}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-red-600">{errors.email.message}</small>
              )}
          </div>
          <div className="mt-4 mb-0 px-4">
          <input
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("password", { required: "Password Is Required! "})}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              {errors.password && (
                <small className="text-red-600">{errors.password.message}</small>
              )}
          </div>
        </CardBody>
        <CardFooter>
          <NavLink to="/forgot-password" className="flex justify-center">
            <p className="text-gray-700 mb-4 text-center lg:mb-1 mt-0">
              Forgot Password
            </p>
          </NavLink>
          <div className="flex justify-center ">
            <Button
              size="lg"
              ripple="dark"
              className="common-btn"
              type='submit'
            >
              Get Started
            </Button>
            
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-gray-700 mb-6 text-center lg:mb-0">
              Copyright &copy; {new Date().getFullYear()}{" "}
              <Link
                to="#"
                target="_blank"
                rel="noreferrer"
                className="common-color"
              >
                {" "}
                Lethustock{" "}
              </Link>{" "}
            </p>
          </div>
        </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
