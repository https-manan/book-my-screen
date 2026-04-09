import React from "react"
import { events } from "../utils/constants"

const LiveEvents = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Live Events</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide cursor-pointer">
        {events.map((event, id) => (
          <div
            key={id}
            className="min-w-[220px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-3">
              <h3 className="font-semibold text-sm">
                {event.title}
              </h3>

              <p className="text-gray-500 text-xs">
                {event.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveEvents