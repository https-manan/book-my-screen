import React from 'react'

const email =()=>{
    return (
    <div className="w-[400px] rounded-2xl shadow-lg bg-white overflow-hidden">
      <Header />

      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold">Enter your email</h2>
        <p className="text-sm text-gray-500 mt-1">
          If you don't have an account yet, we'll create one for you.
        </p>

        <input
          type="text"
          placeholder="Enter email"
          className="mt-4 w-full border rounded-md px-4 py-2 outline-none"
        />

        <button className="mt-4 w-full bg-black text-white py-2 rounded-md">
          Continue
        </button>

        <p className="text-xs text-gray-400 mt-4">
          By entering your email id, you're agreeing to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default email
