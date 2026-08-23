import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { useGetShowByIdQuery } from "../redux/api/api";
import { useSeatContext } from "../context/SeatContext";
import { useSelector } from "react-redux";

const SeatLayout = () => {
  const { showId } = useParams();
  const { data, isLoading, error } = useGetShowByIdQuery({ id: showId });
  const navigate = useNavigate();
  // was: const [selectedSeats, setSelectedSeats] = useSeatContext([]);
  // useSeatContext() returns an object ({selectedSeats, setSelectedSeats}),
  // not an array — array-destructuring an object throws "not iterable".
  const { selectedSeats, setSelectedSeats } = useSeatContext();
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading show</p>;

  const groupedSeats = data?.show?.seatLayout?.reduce((acc, row) => {
    if (!acc[row.type]) {
      acc[row.type] = [];
    }
    acc[row.type].push(row);
    return acc;
  }, {});

  const handleSeatToggle = (rowData, seat) => {
    if (seat.status !== "AVAILABLE") return;
    setSelectedSeats((prev) => {
      const exists = prev.some(
        (s) => s.row === rowData.row && s.number === seat.number
      );
      if (exists) {
        return prev.filter(
          (s) => !(s.row === rowData.row && s.number === seat.number)
        );
      }
      return [
        ...prev,
        {
          row: rowData.row,
          number: seat.number,
          type: rowData.type,
          price: rowData.price,
        },
      ];
    });
  };

  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const handleProceed = () => {
    navigate(`/show/${showId}/${data?.show?.location}/checkout`, {
      state: { selectedSeats, totalPrice },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="w-32 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>

        <div className="text-center">
          <h1 className="font-semibold text-lg">
            {data?.show?.movie?.title}
          </h1>
          <p className="text-sm text-gray-500">
            {new Date(data?.show?.date).toLocaleDateString()} |{" "}
            {new Date(data?.show?.startTime).toLocaleTimeString()} |{" "}
            {data?.show?.theater?.name} | {data?.show?.location}
          </p>
        </div>
        <div className="bg-[#f84464] cursor-pointer text-white px-4 py-1.5 rounded text-sm">
          {!isAuthenticated && (
                        <button
                            onClick={() => navigate('/authLogin')}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium">
                            Sign In
                        </button>
                    )}
                    {isAuthenticated && (
                        <button
                            onClick={() => navigate(`/profile/${user._id}`)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition">
                            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                                👤
                            </div>
                            <span className="text-sm font-medium text-gray-800">
                                {user?.name}
                            </span>
                        </button>
                    )}
        </div>
      </div>

      {/* Body */}
      {/* pb-28 keeps content clear of the fixed footer once it slides in */}
      <div className="flex-1 px-6 py-6 pb-28">

        {/* Seat Layout */}
        <div className="flex flex-col items-center gap-10">
          {Object.entries(groupedSeats || {}).map(([type, rows]) => (
            <div key={type} className="text-center">
              <p className="mb-3 font-medium">
                {type} : ₹{rows[0]?.price}
              </p>
              <div className="flex flex-col gap-3 items-center">
                {rows
                  .sort((a, b) => a.row.localeCompare(b.row))
                  .map((rowData, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="mr-2">{rowData.row}</span>
                      <div className="flex gap-2 flex-wrap">
                        {rowData.seats.map((seat, i) => {
                          const isSelected = selectedSeats.some(
                            (s) => s.row === rowData.row && s.number === seat.number
                          );
                          const isOccupied =
                            seat.status === "BOOKED" || seat.status === "BLOCKED";
                          return (
                            <div
                              key={i}
                              onClick={() => handleSeatToggle(rowData, seat)}
                              className={`w-8 h-8 border rounded flex items-center justify-center text-xs
                                ${isOccupied ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed" : ""}
                                ${!isOccupied && !isSelected ? "border-gray-400 cursor-pointer" : ""}
                                ${isSelected ? "bg-purple-600 border-purple-600 text-white cursor-pointer" : ""}
                              `}>
                              {isOccupied ? "✕" : seat.number}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Screen */}
          <div className="mt-10 perspective-1000">
            <div
              className="relative mx-auto w-[300px] h-12 bg-purple-400/30 rounded-[100%] shadow-[0_15px_35px_rgba(168,85,247,0.5)] border-t-2 border-purple-300"
              style={{
                transform: "rotateX(-45deg)",
                maskImage:
                  "linear-gradient(to bottom, black 50%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 50%, transparent 100%)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-[100%]"></div>
            </div>

            <p className="text-center text-xs font-medium tracking-widest uppercase mt-4 opacity-80">
              Screen This Way
            </p>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 border border-gray-400 rounded"></span>
                Available
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 bg-gray-300 border border-gray-300 rounded flex items-center justify-center text-[9px]">
                  ✕
                </span>
                Occupied
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 bg-purple-600 rounded"></span>
                Selected
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer — slides up from off-screen once at least one seat is selected */}
      <div
        className={`fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
          selectedSeats.length > 0 ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div>
          <p className="text-sm font-medium">
            {selectedSeats.length} Seat{selectedSeats.length !== 1 ? "s" : ""} Selected
          </p>
          <p className="text-xs text-gray-500">₹{totalPrice}</p>
        </div>
        <button
          onClick={handleProceed}
          className="bg-black text-white px-6 py-2 rounded-md">
          Proceed
        </button>
      </div>

    </div>
  );
};

export default SeatLayout;