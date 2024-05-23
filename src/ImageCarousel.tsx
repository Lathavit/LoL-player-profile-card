import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel: React.FC = () => {

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    const images = [
        "https://i.pinimg.com/474x/06/76/6c/06766cd0e227685b06a28d41e0b5e38b.jpg",
        "https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/SEA/calcmenu/recipes/TH-recipes/chicken-&-other-poultry-dishes/%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%84%E0%B8%82%E0%B9%88%E0%B8%94%E0%B8%B2%E0%B8%A7/%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%84%E0%B8%82%E0%B9%88%E0%B8%94%E0%B8%B2%E0%B8%A7_header.jpg",
        "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4u0apV8IPPprHzzY9HirMUtZ5IbbkqXn0DyPkzdvtvGvxo9TcMy.jpg",
    ];

    return (
        <div>
            {/* <h2> Image Carousel </h2> */}
                <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            style={{ maxWidth: 10000,
                                maxHeight: 300,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;
