// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@mui/styles";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// images
import Cake from "../../assets/images/home-desserts.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const list = [
  { name: "Cake Table", price: 7, alt: "product" },
  { name: "Strainer", price: 4, alt: "product" },
  { name: "Cupcake tray", price: 4, alt: "product" },
  { name: "Cake Table", price: 7, alt: "product" },
  { name: "Cake Table", price: 7, alt: "product" },
];

const ProductCarousel = () => {
  const classes = useStyles();
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      navigation
      slidesPerGroup={1}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      breakpoints={{
        350: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {list.map((product, i) => (
        <SwiperSlide key={i}>
          <div className={classes.container}>
            <div>
              <img src={Cake} alt={product.alt} width={300} height={200} />
            </div>
            <div className={classes.productContent}>
              <span>
                {product.name} - ${product.price}
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    height: 300,
  },
  productContent: {
    marginTop: 30,
    font: "400 30px/20px Poiret One",
  },
}));

export default ProductCarousel;
