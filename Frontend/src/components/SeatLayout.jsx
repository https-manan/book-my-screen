import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'


const SeatLayout = () =>{
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">

      <div className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="w-32" onClick={navigate('/')}>{<img src={logo}/>}</div>
        <div className="text-center">
          <h1 className="font-semibold text-lg">Maa</h1>
          <p className="text-sm text-gray-500">
            29 Jun, 08:10 PM | Cinepolis Acropolis Mall, Kolkata
          </p>
        </div>

        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>

      {/* Main */}
      <div className="flex-1 px-6 py-6">

        {/* Timings */}
        <div className="flex gap-3 mb-8">
          {["08:10 PM", "11:30 PM", "01:30 PM"].map((time, i) => (
            <div
              key={i}
              className="px-4 py-2 border rounded-md text-sm bg-white shadow-sm"
            >
              {time}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-10">

          {/* PREMIUM */}
          <div className="text-center">
            <p className="mb-3 font-medium">PREMIUM : ₹510</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="w-8 h-8 border rounded flex items-center justify-center text-sm">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* EXECUTIVE */}
          <div className="text-center">
            <p className="mb-3 font-medium">EXECUTIVE : ₹290</p>

            <div className="flex flex-col gap-3 items-center">
              {["D", "C", "B"].map((row, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="mr-2">{row}</span>
                  <div className="flex gap-2 flex-wrap">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="w-8 h-8 border rounded flex items-center justify-center text-sm">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NORMAL */}
          <div className="text-center">
            <p className="mb-3 font-medium">NORMAL : ₹270</p>

            <div className="flex items-center gap-2">
              <span className="mr-2">A</span>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 border rounded flex items-center justify-center text-sm">
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screen */}
          <div className="mt-6">
            <div className="w-64 h-6 bg-purple-300 rounded-t-full mx-auto"></div>
            <p className="text-center text-sm text-gray-500 mt-2">Screen</p>
          </div>

        </div>
      </div>

      {/* Bottom */} {/*This footer should only be shown when we select a seat not before that  */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <p className="text-sm font-medium">2 Seats Selected</p>

        <button className="bg-black text-white px-6 py-2 rounded-md">
          Proceed
        </button>
      </div>

    </div>
  )
}

export default SeatLayout