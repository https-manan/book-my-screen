import React from 'react'

const otp = () => {
return (
    <div className="w-[400px] rounded-2xl shadow-lg bg-white overflow-hidden">
      <Header />
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold">
          Enter the code we just mailed you
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          If you don't have an account yet, we'll create one for you.
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <input className="w-10 h-10 border rounded-md text-center" />
          <input className="w-10 h-10 border rounded-md text-center" />
          <input className="w-10 h-10 border rounded-md text-center" />
          <input className="w-10 h-10 border rounded-md text-center" />
        </div>
        <p className="text-xs text-gray-400 mt-3">OTP Expires in 02:00</p>
        <button className="mt-4 w-full bg-black text-white py-2 rounded-md">
          Continue
        </button>
        <p className="text-xs text-gray-400 mt-4">
          By entering the OTP sent to your email, you're agreeing to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default otp
