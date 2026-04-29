import { useNavigate, useParams } from 'react-router-dom'
import { filters } from '../utils/constants';
import { useGetMovieByIdQuery,useGetShowByMovieAndLocationQuery } from '../redux/api/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const getDates = (numDays = 7) => {
  const today = new Date();
  return Array.from({ length: numDays }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return {
      full: d.toISOString().split("T")[0],
      date: d.getDate(),
      day: d.toLocaleString("en-US", { weekday: "short" }),
      month: d.toLocaleString("en-US", { month: "short" }),
    };
  });
};
const dates = getDates(7);

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id, state, movieName } = useParams();
  const [selectedDate, setSelectedDate] = useState(dates[0].full);

  const { data, isLoading, error } = useGetMovieByIdQuery({ id }, { skip: !id });
  const { data: showData, isLoading: showLoading } = useGetShowByMovieAndLocationQuery(
    { movieId: id, date: selectedDate, location: state },
    { skip: !id || !state || !selectedDate }
  );

  useEffect(() => {
    if (error) toast.error("Error in getting movie details")
  }, [error])

  if (isLoading) return (
    <div className="flex justify-center mt-20">
      <Loader2 className="animate-spin" size={36} />
    </div>
  )

  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${data?.movie?.posterUrl?.secure_url})` }}>
        <div className="backdrop-blur-md bg-black/70 p-6">
          <div className="flex gap-6 text-white max-w-5xl mx-auto">
            <img
              src={data?.movie?.posterUrl?.secure_url}
              alt={data?.movie?.title}
              className="w-52 rounded-xl shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-bold">{data?.movie?.title}</h1>
              <div className="flex gap-4 items-center mt-3">
                <span className="text-pink-400 font-semibold">
                  ⭐ {data?.movie?.rating}
                </span>
                <span className="text-gray-300">{data?.movie?.votes} Votes</span>
                <button className="bg-white text-black px-4 mx-9 py-1 rounded-md hover:bg-gray-300 transition cursor-pointer">
                  Rate now
                </button>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="bg-gray-800 px-3 py-1 rounded">
                  {data?.movie?.genre?.join(", ")}
                </span>
                <span className="bg-gray-800 px-3 py-1 rounded">
                  {data?.movie?.languages?.join(", ")}
                </span>
              </div>
              <div className="mt-5">
                <h3 className="font-semibold text-lg">About the movie</h3>
                <p className="text-sm text-gray-300 mt-1 max-w-xl">
                  {data?.movie?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-6 pb-10">
        <div className="flex gap-2 flex-wrap">
            {/*we need to work on filters and filter on basis of filters by using state and all  */}
          {filters.map((f, i) => (
            <div key={i} className="px-3 py-1 bg-white rounded-full text-sm shadow hover:bg-gray-200 cursor-pointer transition">
              {f}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6 overflow-x-auto">
          {dates.map((d, i) => (
            <div
              key={i}
              onClick={() => setSelectedDate(d.full)}
              className={`min-w-[70px] text-center p-2 rounded-lg shadow cursor-pointer transition ${
                selectedDate === d.full ? "bg-red-500 text-white" : "bg-white hover:bg-gray-200"
              }`}>
              <div className="text-sm font-semibold">{d.date}</div>
              <div className="text-xs">{d.day}</div>
              <div className="text-xs">{d.month}</div>
            </div>
          ))}
        </div>

        {/* Shows */}
        <div className="mt-6 space-y-4">
          {showLoading ? (
            <div className="flex justify-center mt-6">
              <Loader2 className="animate-spin" />
            </div>
          ) : showData?.groupedShow?.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">No shows available for this date.</p>
          ) : (
            showData?.groupedShow?.map((group, i) => (
              <div key={i} className="border p-4 rounded-xl bg-white flex gap-4 shadow-sm hover:shadow-md transition">
                <img
                  src={group?.theater?.theaterDetails?.logo?.secure_url}
                  alt={group?.theater?.theaterDetails?.name}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <div className="font-semibold">{group?.theater?.theaterDetails?.name}</div>
                  <div className="text-sm text-gray-500">{group?.theater?.theaterDetails?.location}</div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {group?.theater?.shows?.map((show, j) => (
                      <div
                        key={j}
                        onClick={() => navigate(
                          `/movies/${id}/${movieName}/${state}/theater/${group?.theater?.theaterDetails?._id}/show/${show._id}/seat-layout`
                        )}
                        className="border px-3 py-2 rounded text-sm cursor-pointer hover:bg-green-100 hover:border-green-400 transition">
                        <div>{new Date(show.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</div>
                        <div className="text-xs text-gray-500">{show.format}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails;