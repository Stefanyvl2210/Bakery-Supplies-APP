// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@mui/styles";
import { getImageUrl } from "../../helpers/formatters";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProductCarousel = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleDetail = (product) => {
    navigate("/detail", {
      state: {
        product,
        relatedProducts: props.products.filter((item) => item.id !== product.id),
      },
    });
  };

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
      className={props.products.length < 3 ? classes.productsContainer : ''}
    >
      {props.products.map((product, i) => (
        <SwiperSlide key={i}>
          <div className={classes.container}>
            <div className={classes.imageWrapper}>
              <img src={getImageUrl(product.image)} alt={product.name} />
            </div>
            <div className={classes.productContent}>
              <span>
                {product.name} - ${product.price}
              </span>
            </div>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={() => handleDetail(product)}
            >
              Details
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    minHeight: 380,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imageWrapper: {
    width: 300,
    maxWidth: "100%",
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  productContent: {
    marginTop: 24,
    minHeight: 72,
    font: "400 30px/34px Poiret One",
    maxWidth: 300,
  },
  button: {
    marginTop: "auto !important",
    minWidth: "150px !important",
    height: "50px !important",
  },
  productsContainer: {
    "& .swiper-wrapper": {
      justifyContent: "center"
    }
  }
}));

export default ProductCarousel;
