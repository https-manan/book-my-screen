import SliderModule from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useGetRecommendedMoviesQuery } from "../redux/api/api"
import { useEffect } from "react"
import { toast } from 'sonner';
import { Loader2 } from "lucide-react"

const Slider = SliderModule.default

const Banner = () => {
  const settings = {          
    dots: true,
    infinite: true,
    speed: 500, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }
  const {data,isLoading,error}= useGetRecommendedMoviesQuery();

  useEffect(()=>{
    if(error){
      toast("Failed to load movies")
    }
  },[error])
  return (
    <div className="w-full max-w-7xl mx-auto mt-4">
      {
        isLoading?<Loader2/>:<Slider {...settings}>
        {data?.movies.map((b) => (
          <div key={b._id} className="px-2">
            <img
              src={b.posterUrl.secure_url}//secure_url se hum display krte hai (the secrue url of the cloudinary )
              alt={`banner-${b._id}`}
              className="w-full h-[300px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        ))}
      </Slider>
      }
    </div>
  )
}

export default Banner