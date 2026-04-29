import React from 'react'

const CheckOutpage = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="font-bold text-lg">Logo</div>

        <h1 className="font-semibold text-lg">Review your booking</h1>

        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>

      {/* Main */}
      <div className="grid grid-cols-3 gap-6 p-6">

        {/* LEFT SECTION */}
        <div className="col-span-2 space-y-6">

          {/* Movie Card */}
          <div className="flex gap-4 bg-white p-4 rounded-lg shadow">
            <div className="w-16 h-20 bg-gray-300 rounded"></div>

            <div>
              <h2 className="font-semibold">Maa</h2>
              <p className="text-sm text-gray-500">UA16+ • Hindi • 2D</p>
              <p className="text-sm text-gray-500">
                Cinepolis Acropolis Mall, Kolkata
              </p>
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-white p-4 rounded-lg shadow space-y-4">

            <div className="flex justify-between text-sm">
              <p>Today, 30 Jun • 09:00 AM</p>
              <p className="font-medium">₹99</p>
            </div>

            <div>
              <p className="text-sm font-medium">1 ticket</p>
              <p className="text-xs text-gray-500">PREMIUM - K4</p>
            </div>

            <div className="bg-yellow-100 text-yellow-700 text-sm p-3 rounded">
              This theatre doesn't allow cancellation
            </div>

            <div className="flex justify-between items-center text-sm">
              <p className="font-medium">Offers</p>
              <button className="text-blue-600">View all Offers</button>
            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">

          {/* Payment Summary */}
          <div className="bg-white p-4 rounded-lg shadow space-y-3">
            <h3 className="font-medium">Payment summary</h3>

            <div className="flex justify-between text-sm">
              <p>Order amount</p>
              <p>₹99</p>
            </div>

            <div className="flex justify-between text-sm">
              <p>Taxes & fees</p>
              <p>₹22.42</p>
            </div>

            <hr />

            <div className="flex justify-between font-medium">
              <p>To be paid</p>
              <p>₹121.42</p>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-white p-4 rounded-lg shadow space-y-2">
            <h3 className="font-medium">Your details</h3>

            <p className="text-sm font-medium">Amrit</p>
            <p className="text-sm text-gray-500">+91-9122040963</p>
            <p className="text-sm text-gray-500">amritmaurya2014@gmail.com</p>
            <p className="text-sm text-gray-500">West Bengal</p>
          </div>

          {/* Terms */}
          <div className="text-sm text-gray-500">
            Terms and conditions
          </div>

          {/* Pay Button */}
          <button className="w-full bg-black text-white py-3 rounded-full font-medium">
            ₹121.42 TOTAL • Proceed To Pay
          </button>

        </div>

      </div>
    </div>
  )
}

export default CheckOutpage