import React from 'react'
import { ordersData } from '../utils/constants'

const BookingHistory = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {ordersData.map((m) => {
        return (
          <div key={m.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-start border-b pb-4">
              <div className="flex gap-4">
                <div className="w-20 h-28 rounded-md overflow-hidden">
                  <img src={m.poster} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <h3 className="text-base font-semibold text-gray-800">
                    {m.title}
                  </h3>
                  <p>{m.format}</p>
                  <p>{m.bookingTime}</p>
                  <p>Quantity: {m.quantity}</p>
                  <p className="flex items-center gap-2">
                    🎟 {m.seats}
                  </p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600 space-y-2">
                <p className="text-gray-500">M-Ticket</p>
                <p>
                  Ticket: ₹{m.ticket} + Convenience Fees: ₹{m.fee}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  ₹{m.total}
                </p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 pt-4">
              <div>
                <p className="font-medium text-gray-600">Booking Date & Time</p>
                <p>{m.bookingTime}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Payment Method</p>
                <p>{m.paymentMethod}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Booking ID</p>
                <p>{m.id}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookingHistory