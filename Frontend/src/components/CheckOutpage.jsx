import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetShowByIdQuery } from "../redux/api/api";
import { useSeatContext } from "../context/SeatContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { socket } from "../utils/socket";

const CheckOutpage = () => {

    const { showId, state } = useParams();

    const navigate = useNavigate();

    const { selectedSeats } = useSeatContext();

    const { user } = useSelector(
        (s) => s.auth
    );

    const [timeLeft, setTimeLeft] =
        useState(300);


    const {
        data,
        isLoading,
        error
    } = useGetShowByIdQuery(
        { id: showId },
        { skip: !showId }
    );


    /*
     * Unlock seats when timer expires.
     */

    useEffect(() => {

        if (
            !showId ||
            !selectedSeats?.length ||
            !user?._id
        ) {
            return;
        }


        const interval = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 1) {

                    clearInterval(interval);


                    const seatIds =
                        selectedSeats.map(
                            (seat) =>
                                `${seat.row}-${seat.number}`
                        );


                    socket.emit(
                        "unlock-seats",
                        {
                            showId,
                            seatIds,
                            userId: user._id
                        }
                    );


                    toast.error(
                        "Time expired!"
                    );

                    navigate("/");

                    return 0;
                }


                return prev - 1;
            });

        }, 1000);


        return () => {
            clearInterval(interval);
        };

    }, [
        showId,
        selectedSeats,
        user?._id,
        navigate
    ]);


    if (isLoading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <Loader2
                    className="animate-spin"
                    size={36}
                />

            </div>
        );
    }


    if (error) {

        return (

            <div className="min-h-screen flex flex-col justify-center items-center gap-4">

                <p className="text-gray-500">
                    Couldn't load your booking.
                    Please go back and try again.
                </p>


                <button
                    onClick={() => navigate(-1)}
                    className="bg-black text-white px-6 py-2 rounded-md"
                >
                    Go back
                </button>

            </div>
        );
    }


    if (
        !selectedSeats ||
        selectedSeats.length === 0
    ) {

        return (

            <div className="min-h-screen flex flex-col justify-center items-center gap-4">

                <p className="text-gray-500">
                    No seats selected.
                </p>


                <button
                    onClick={() => navigate(-1)}
                    className="bg-black text-white px-6 py-2 rounded-md"
                >
                    Go back and select seats
                </button>

            </div>
        );
    }


    const show = data?.show;


    const orderAmount =
        selectedSeats.reduce(
            (sum, seat) =>
                sum + seat.price,
            0
        );


    const taxesAndFees = 0;


    const totalPayable =
        orderAmount +
        taxesAndFees;


    const seatsByType =
        selectedSeats.reduce(
            (acc, seat) => {

                if (!acc[seat.type]) {
                    acc[seat.type] = [];
                }

                acc[seat.type].push(
                    `${seat.row}${seat.number}`
                );

                return acc;

            },
            {}
        );


    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;


    const showDateTime =
        show?.startTime
            ? `${new Date(
                show.startTime
            ).toLocaleDateString(
                "en-US",
                {
                    day: "2-digit",
                    month: "short"
                }
            )} • ${new Date(
                show.startTime
            ).toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )}`
            : "";


    const handleProceedToPay = () => {

        toast(
            "Payment integration coming soon"
        );
    };


    return (

        <div className="min-h-screen bg-gray-100">

            {/* Header */}

            <div className="flex items-center justify-between px-6 py-4 bg-white shadow">

                <div
                    className="font-bold text-lg cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    Logo
                </div>


                <h1 className="font-semibold text-lg">
                    Review your booking
                </h1>


                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">

                    {user?.name
                        ?.charAt(0)
                        ?.toUpperCase()}

                </div>

            </div>


            {/* Main */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

                {/* Timer */}

                <p className="md:col-span-3 text-center font-medium text-red-500">

                    Time left:{" "}

                    {String(minutes).padStart(
                        2,
                        "0"
                    )}

                    :

                    {String(seconds).padStart(
                        2,
                        "0"
                    )}

                </p>


                {/* LEFT SECTION */}

                <div className="md:col-span-2 space-y-6">

                    {/* Movie Card */}

                    <div className="flex gap-4 bg-white p-4 rounded-lg shadow">

                        {show?.movie?.posterUrl?.secure_url ? (

                            <img
                                src={
                                    show.movie
                                        .posterUrl
                                        .secure_url
                                }
                                alt={
                                    show.movie.title
                                }
                                className="w-16 h-20 object-cover rounded"
                            />

                        ) : (

                            <div className="w-16 h-20 bg-gray-300 rounded">
                            </div>

                        )}


                        <div>

                            <h2 className="font-semibold">
                                {show?.movie?.title}
                            </h2>


                            <p className="text-sm text-gray-500">

                                {show?.movie?.certification}

                                {" • "}

                                {show?.movie?.languages?.join(
                                    ", "
                                )}

                                {" • "}

                                {show?.format}

                            </p>


                            <p className="text-sm text-gray-500">

                                {show?.theater?.name}

                                {show?.theater?.location
                                    ? `, ${show.theater.location}`
                                    : ""}

                            </p>

                        </div>

                    </div>


                    {/* Booking Info */}

                    <div className="bg-white p-4 rounded-lg shadow space-y-4">

                        <div className="flex justify-between text-sm">

                            <p>
                                {showDateTime}
                            </p>

                            <p className="font-medium">
                                ₹{orderAmount.toFixed(2)}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm font-medium">

                                {selectedSeats.length} ticket
                                {selectedSeats.length !== 1
                                    ? "s"
                                    : ""}

                            </p>


                            {Object.entries(
                                seatsByType
                            ).map(
                                ([type, seats]) => (

                                    <p
                                        key={type}
                                        className="text-xs text-gray-500"
                                    >

                                        {type}
                                        {" - "}
                                        {seats.join(
                                            ", "
                                        )}

                                    </p>

                                )
                            )}

                        </div>


                        <div className="bg-yellow-100 text-yellow-700 text-sm p-3 rounded">

                            This theatre doesn't allow cancellation

                        </div>


                        <div className="flex justify-between items-center text-sm">

                            <p className="font-medium">
                                Offers
                            </p>

                            <button className="text-blue-600">
                                View all Offers
                            </button>

                        </div>

                    </div>

                </div>


                {/* RIGHT SECTION */}

                <div className="space-y-6">

                    {/* Payment Summary */}

                    <div className="bg-white p-4 rounded-lg shadow space-y-3">

                        <h3 className="font-medium">
                            Payment summary
                        </h3>


                        <div className="flex justify-between text-sm">

                            <p>
                                Order amount
                            </p>

                            <p>
                                ₹{orderAmount.toFixed(2)}
                            </p>

                        </div>


                        <div className="flex justify-between text-sm">

                            <p>
                                Taxes & fees
                            </p>

                            <p>
                                ₹{taxesAndFees.toFixed(2)}
                            </p>

                        </div>


                        <hr />


                        <div className="flex justify-between font-medium">

                            <p>
                                To be paid
                            </p>

                            <p>
                                ₹{totalPayable.toFixed(2)}
                            </p>

                        </div>

                    </div>


                    {/* User Details */}

                    <div className="bg-white p-4 rounded-lg shadow space-y-2">

                        <h3 className="font-medium">
                            Your details
                        </h3>


                        <p className="text-sm font-medium">
                            {user?.name}
                        </p>


                        <p className="text-sm text-gray-500">

                            {user?.phone
                                ? `+91-${user.phone}`
                                : ""}

                        </p>


                        <p className="text-sm text-gray-500">
                            {user?.email}
                        </p>


                        <p className="text-sm text-gray-500">
                            {state}
                        </p>

                    </div>


                    {/* Terms */}

                    <div className="text-sm text-gray-500">
                        Terms and conditions
                    </div>


                    {/* Pay Button */}

                    <button
                        onClick={
                            handleProceedToPay
                        }
                        className="w-full bg-black text-white py-3 rounded-full font-medium"
                    >

                        ₹{totalPayable.toFixed(2)}

                        {" TOTAL • "}

                        Proceed To Pay

                    </button>

                </div>

            </div>

        </div>
    );
};

export default CheckOutpage;