// import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css'; // Importa Boxicons
import { Swiper, SwiperSlide } from 'swiper/react'; // Importa los componentes de Swiper
import { Navigation } from 'swiper/modules'; // Importa el módulo de navegación
import 'swiper/css'; // Importar los estilos de Swiper
import 'swiper/css/navigation'; // Importar estilos de navegación
import Layout from './Layout'; // Importa el componente Layout

const MainCine = () => {
    // const [profileOpen, setProfileOpen] = useState(false);
    // const [asideOpen, setAsideOpen] = useState(true);

    // const toggleProfile = () => setProfileOpen(!profileOpen);
    // const toggleAside = () => setAsideOpen(!asideOpen);

    const slides = [
        { imgSrc: 'https://via.placeholder.com/300x200?text=Slide+1', title: 'Slide 1' },
        { imgSrc: 'https://via.placeholder.com/300x200?text=Slide+2', title: 'Slide 2' },
        { imgSrc: 'https://via.placeholder.com/300x200?text=Slide+3', title: 'Slide 3' },
        { imgSrc: 'https://via.placeholder.com/300x200?text=Slide+4', title: 'Slide 4' },
    ];

    return (
        <Layout active="cartelera">
            <div className="w-full flex justify-center items-center p-4">
                <div className="w-3/4">
                    <Swiper
                        spaceBetween={10} // Reduce el espacio entre las imágenes
                        slidesPerView={3}
                        navigation={true} // Habilitar la navegación
                        loop={true}
                        modules={[Navigation]} // Importar el módulo de navegación
                        pagination={{ clickable: true }}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col items-center">
                                    <img src={slide.imgSrc} alt={slide.title} className="rounded-lg" />
                                    <span className="mt-2 font-bold">{slide.title}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </Layout>
    );
};

export default MainCine;
