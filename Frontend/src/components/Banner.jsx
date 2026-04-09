import SliderModule from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { banners } from "../utils/constants"

const Slider = SliderModule.default

const Banner = () => {
  const settings = {          
    dots: true,
    infinite: true,
    speed: 500, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }
  return (
    <div className="w-full max-w-7xl mx-auto mt-4">
      <Slider {...settings}>
        {banners.map((b, i) => (
          <div key={i} className="px-2">
            <img
              src={b}
              alt={`banner-${i}`}
              className="w-full h-[300px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Banner