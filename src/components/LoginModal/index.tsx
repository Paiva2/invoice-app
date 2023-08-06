"use client"

import { RedirectIcon } from "@/icons/RedirectIcon"
import Link from "next/link"
import React from "react"

const LoginModal = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-2/5 bg-strong-blue p-8 rounded-xl">
        <h1 className="text-4xl font-medium text-pure-white">Login</h1>
        <p className="text-hash-blue">Welcome!</p>

        <div className="my-5">
          <button className="w-full py-3 my-3 border flex space-x-2 items-center justify-center border-light-purple rounded-lg transition delay-70 ease-in-out text-pure-white  hover:bg-hover-purple">
            <img
              src="https://www.svgrepo.com/show/361182/github-inverted.svg"
              className="w-7 h-7"
              alt=""
            />{" "}
            <span className="font-semibold mt-1">Login with Github</span>
          </button>
        </div>
        <form action="" className="my-10">
          <div className="flex flex-col space-y-5">
            <label>
              <p className="font-medium text-pure-white pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full py-3 text-pure-white border border-transparent hover:border-light-purple bg-dark-blue rounded-lg px-3 focus:outline-none focus:border-light-purple"
                placeholder="Enter email address"
              />
            </label>
            <label>
              <p className="font-medium text-pure-white pb-2">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full text-pure-white py-3 border border-transparent hover:border-light-purple bg-dark-blue rounded-lg px-3 focus:outline-none focus:border-light-purple"
                placeholder="Enter your password"
              />
            </label>
            <div>
              <Link
                href="/forgot-password"
                className="font-medium text-light-purple"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="w-full py-3 transition delay-70 ease-in-out font-medium text-pure-white bg-light-purple hover:bg-hover-purple rounded-lg inline-flex space-x-2 items-center justify-center">
              <span>Login</span>
            </button>
            <p className="text-center text-pure-white">
              Not registered yet?{" "}
              <Link
                href="/register"
                className="text-light-purple font-medium inline-flex space-x-1 items-center hover:text-hover-purple"
              >
                <span>Register now</span>
                <span>
                  <RedirectIcon />
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
