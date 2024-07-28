/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
"use client";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import cn from "../../utils/cn";
import { useAuth } from "./context/auth";
import { loginAdmin, loginUser } from "./api/api";
import Cookies from "js-cookie"; // Import js-cookie
import { adminLinks, userLinks } from "../util/links";

export function SignIn({ role }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [status, setStatus] = useState("idle");

  const { setIsLoggedIn, setUserInfo, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.state?.pathname || "/";
  const signInRole = location.state?.role || "";
  const list = location.state?.list || "";

  const handleChange = (e) => {
    setLoginError(null);
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  function matchesLink(pathname, links) {
    const pathParts = pathname.split("/").filter(Boolean);

    return links.some((link) => {
      const linkParts = link.link.split("/").filter(Boolean);
      return linkParts[0] === pathParts[0];
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      let loginData;
      if (role === "admin" || signInRole === "admin") {
        loginData = await loginAdmin(formData);
      } else {
        loginData = await loginUser(formData);
      }

      setIsLoggedIn(true);
      setUser(loginData.user);
      setUserInfo(loginData);
      Cookies.set("token", loginData.user.token, { expires: 7 });
      Cookies.set("refreshToken", loginData.user.refreshToken, { expires: 7 });
      setStatus("idle");

      const isAdmin = loginData.user.role === "admin";
      const relevantLinks = isAdmin ? adminLinks : userLinks;
      const pathnameExists = matchesLink(pathname, relevantLinks);

      if (!pathnameExists) {
        const defaultPath = isAdmin ? "/dashboard" : "/";
        navigate(defaultPath, { replace: true });
      } else {
        navigate(pathname, { replace: true, state: { list: list } });
      }
    } catch (err) {
      setLoginError(err.message);
      setStatus("idle");
    }
  };

  return (
    <div className="w-full max-w-md p-4 mx-auto bg-white rounded-none shadow-lg md:rounded-2xl md:p-8 dark:bg-gray-800 shadow-slate-500">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Rently
      </h2>
      <p className="max-w-sm mt-2 text-sm font-bold text-neutral-600 dark:text-neutral-300">
        Sign In
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? "Logging in..." : "Log in"} &rarr;
          <BottomGradient />
        </button>

        {loginError && (
          <p className="m-3 text-center text-red-600 error">{loginError}</p>
        )}

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-5 h-[1px] w-full" />

        <NavLink
          className="text-lg text-center cursor-pointer dark:text-white hover:underline"
          to="/forgot-password"
          state={{ role: role || signInRole }}
        >
          Forgot Password?
        </NavLink>
        <div className="pb-0 mt-6">
          <p className="text-lg dark:text-white">
            Don't have an account?
            <NavLink
              to="/landing-page"
              className="underline text-primary dark:text-secondary"
            >
              {" "}
              Sign Up
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 block w-full h-px transition duration-500 opacity-0 group-hover/btn:opacity-100 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="absolute block w-1/2 h-px mx-auto transition duration-500 opacity-0 group-hover/btn:opacity-100 blur-sm -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
