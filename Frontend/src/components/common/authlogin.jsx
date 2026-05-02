import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { useGetOtpByEmailMutation, useVerifyEmailMutation } from "../../redux/api/api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/api/auth";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [time, setTime] = useState(1000 * 60 * 5);
  const [hash, setHash] = useState("");
  const dispatch = useDispatch(); //dispatch is used for the updating values to the slice we have created like the isAuthenticated and user
  const [getOtpByEmail,{ data, error, isLoading, isSuccess }] = useGetOtpByEmailMutation();
  const [verifyEmail,{data:verifyData,error:verifyError,isLoading:verifyLoading,isSuccess:verifySuccess }] = useVerifyEmailMutation();
  const navigate=useNavigate();
  const otpRefs = useRef([]);//useRef se hum kuch bhi change kr rhe ho react ko farak nahi phadta

  const handelOtp = async () => {
    await getOtpByEmail({ email }).unwrap();
  };
  const handelVerifyOtp = async () => {
    const otpString = otp.join("");
    await verifyEmail({ hash,otp:otpString,email});
  };
  const handleOtpChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Failed to send OTP");
    }
    if (isSuccess && data) {
      console.log("OTP response data:", data);
      const receivedHash = data?.hash;
      setHash(receivedHash);
      setStep("otp");
    }
  }, [error, isSuccess, data]);

  useEffect(() => {
    if (verifyData?.user) {
      toast.success("OTP verified");
      dispatch(setUser({//Dispatch is for like jo changes push krne hai redux slice me
        auth: true,
        user: verifyData.user
      }));
    }
    if (verifyError) {
      toast.error("Failed to verify OTP");
    }
  }, [verifyData, verifyError, dispatch, navigate]);

  useEffect(() => {
    if (step !== "otp") return;
    setTime(1000 * 60 * 5);
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  const minutes = Math.floor(time / 60000);
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");

  return (
    <div className="min-h-screen bg-black/70 flex items-center justify-center p-4">
      <div className="w-[430px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative bg-gradient-to-r from-gray-900 via-[#442230] to-pink-500 px-8 pt-8 pb-14 text-white">
          <div className="flex flex-col items-center">
            <img src={logo} alt="logo" className="w-20 mb-4" />
            <h1 className="text-4xl font-bold tracking-tight">bookMyScreen</h1>
            <p className="text-sm text-gray-200 mt-3">Where movies meet magic.</p>
          </div>
        </div>

        <div className="px-8 py-10">
          {step === "email" && (
            <>
              <h2 className="text-xl font-semibold text-center">Enter your email</h2>
              <p className="text-gray-500 text-sm text-center mt-2">
                If you don't have an account yet, please SignUp.
              </p>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-8 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
              <button
                onClick={handelOtp}
                className="mt-6 w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90">
                {isLoading ? "Loading..." : "Continue"}
              </button>
            </>
          )}
          {step === "otp" && (
            <>
              <button onClick={() => setStep("email")} className="text-sm mb-4 text-gray-500">
                ← Back
              </button>
              <h2 className="text-xl font-semibold text-center">Enter the code we mailed you</h2>
              <p className="text-gray-500 text-sm text-center mt-2">OTP sent to {email || "your email"}</p>

              <div className="flex justify-center gap-3 mt-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-14 h-14 border-2 rounded-xl text-center text-xl font-semibold outline-none focus:border-black"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-500 text-center mt-5">
                {time > 0 ? `OTP expires in ${minutes}:${seconds}` : "OTP has expired. Please resend."}
              </p>

              <button
                onClick={handelVerifyOtp}
                disabled={otp.join("").length < 6}
                className="mt-6 w-full bg-black text-white py-3 rounded-xl font-medium disabled:opacity-50">
                {verifyLoading ? "Wait..." : "Continue"}
              </button>
              <button
                onClick={() => {
                  setOtp(["", "", "", "", "", ""]);
                  setHash("");
                  setStep("email");
                  setTimeout(() => handelOtp(), 0);
                }}
                className="w-full mt-4 text-sm text-pink-500">
                Resend OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;