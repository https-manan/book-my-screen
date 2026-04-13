import { useParams } from 'react-router-dom'
import { allMovies, filters, theatres } from '../utils/constants';

const getDates = (numDays = 7) => {
  const today = new Date();

  return Array.from({ length: numDays }, (_, i) => { //Array.from takes 2 args 1st is lenth of array and 2nd is like similar to map 
    const d = new Date(); //in built js obj
    d.setDate(today.getDate() + i); //This setDate is inbuilt

    return {
      date: d.getDate(),
      day: d.toLocaleString("en-US", { weekday: "short" }),
      month: d.toLocaleString("en-US", { month: "short" }),
    };
  });
};
const dates = getDates(7);


const MovieDetails = () => {
    const { id } = useParams();
    const movie = allMovies.find((m) => m.id === Number(id));

    if (!movie) return <div>Movie not found</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <div
                className="relative bg-cover bg-center"
                style={{ backgroundImage: `url(${movie.img})` }}>   
                <div className="backdrop-blur-md bg-black/70 p-6">
                    <div className="flex gap-6 text-white max-w-5xl mx-auto">

                        <img
                            src={movie.img}
                            alt={movie.title}
                            className="w-52 rounded-xl shadow-lg"/>

                        <div>
                            <h1 className="text-4xl font-bold">{movie.title}</h1>
                            <div className="flex gap-4 items-center mt-3">
                                <span className="text-pink-400 font-semibold">
                                    ⭐ {movie.rating}
                                </span>
                                <span className="text-gray-300">{movie.votes}</span>

                                <button className="bg-white text-black px-4 mx-9 py-1 rounded-md hover:bg-gray-300 transition cursor-pointer">
                                    Rate now
                                </button>
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <span className="bg-gray-800 px-3 py-1 rounded">
                                    {movie.genre}
                                </span>
                                <span className="bg-gray-800 px-3 py-1 rounded">
                                    {movie.languages}
                                </span>
                            </div>
                            <div className="mt-5">
                                <h3 className="font-semibold text-lg">About the movie</h3>
                                <p className="text-sm text-gray-300 mt-1 max-w-xl">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Quae, accusantium.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-6">
                <div className="flex gap-2 flex-wrap">
                    {filters.map((f, i) => (
                        <div
                            key={i}
                            className="px-3 py-1 bg-white rounded-full text-sm shadow hover:bg-gray-200 cursor-pointer transition">
                            {f}
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 mt-6 overflow-x-auto">
                    {dates.map((d, i) => (
                        <div
                            key={i}
                            className="min-w-[70px] text-center bg-white p-2 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition">
                            <div className="text-sm font-semibold">{d.date}</div>
                            <div className="text-xs text-gray-500">{d.day}</div>
                            <div className="text-xs text-gray-400">{d.month}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 space-y-4">
                    {theatres.map((t, i) => (
                        <div
                            key={i}
                            className="border p-4 rounded-xl bg-white flex gap-4 shadow-sm hover:shadow-md transition">
                            <img src={t.img} alt={i} className="w-16 h-16 object-contain" />

                            <div className="flex-1">
                                <div className="font-semibold flex justify-between">
                                    <div>{t.name} </div>
                                    <div>{t.distance}</div>
                                </div>

                                <div className="text-sm text-gray-500">
                                    {t.cancellation}
                                </div>
                                <div className="flex gap-2 mt-3 flex-wrap">
                                    {t.timings.map((tm, i) => (
                                        <div
                                            key={i}
                                            className="border px-3 py-2 rounded text-sm cursor-pointer hover:bg-green-100 hover:border-green-400 transition">
                                            <div>{tm.time}</div>
                                            <div className="text-xs text-gray-500">
                                                {tm.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;