import { RedirectIcon } from "@/icons/RedirectIcon"
import Link from "next/link"
import React from "react"

const ForgotPasswordModal = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-2/5 bg-strong-blue p-8 rounded-xl">
        <h1 className="text-4xl font-medium text-pure-white">
          Forgot your Password?
        </h1>

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
              <p className="font-medium text-pure-white pb-2">New Password</p>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full text-pure-white py-3 border border-transparent hover:border-light-purple bg-dark-blue rounded-lg px-3 focus:outline-none focus:border-light-purple"
                placeholder="Enter your password"
              />
            </label>
            <label>
              <p className="font-medium text-pure-white pb-2">
                Confirm new password
              </p>
              <input
                id="confirm-password"
                name="confirm-password"
                type="confirm-password"
                className="w-full text-pure-white py-3 border border-transparent hover:border-light-purple bg-dark-blue rounded-lg px-3 focus:outline-none focus:border-light-purple"
                placeholder="Confirm your password"
              />
            </label>
            <button className="w-full py-3 transition delay-70 ease-in-out font-medium text-pure-white bg-light-purple hover:bg-hover-purple rounded-lg inline-flex space-x-2 items-center justify-center">
              <span>Send</span>
            </button>
            <p className="text-center text-pure-white">
              Not registered yet?{" "}
              <Link
                href="/register"
                className="text-light-purple font-medium inline-flex space-x-1 items-center hover:text-hover-purple"
              >
                Register now
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

export default ForgotPasswordModal
