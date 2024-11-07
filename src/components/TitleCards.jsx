import { useEffect, useState, useMemo, useRef } from "react";
import { useMovies } from "../context/moviesContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Cards from "./Cards";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { DetailsModal } from "./DetailsModal";
import { v4 as uuidv4 } from 'uuid';

export function TitleCards({ obj }) {
    const { apiKey } = useMovies();
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [randomPage] = useState(Math.floor(Math.random() * 50) + 1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isClickable, setIsClickable] = useState(true);
    let timerRef = useRef(null);
    const carouselRef = useRef()
    const itemsToShow = 6;
    const totalMovies = useMemo(() => apiData.length, [apiData]);
    const totalPages = useMemo(() => Math.ceil(totalMovies / itemsToShow), [totalMovies, itemsToShow]);
    useEffect(() => {
        if (!apiKey) return;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    obj.category
                        ? `https://api.themoviedb.org/3/movie/${obj.category}?language=en-US&page=${randomPage}`
                        : obj.region,
                    options
                );
                const result = await response.json();
                setApiData(result.results || []);
            } catch (error) {
                console.error(error);
            } finally {
                timerRef.current = setTimeout(() => setLoading(false), 700)
            }
        };
        fetchMovies();
        return () => {
            clearTimeout(timerRef.current)
        }
    }, [randomPage, apiKey, obj.category, obj.region]);

    function handleNext() {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    }

    function handlePrevious() {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
        if (carouselRef.current) {
            carouselRef.current.previous();
        }
    }
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: itemsToShow
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: itemsToShow
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: itemsToShow
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: itemsToShow
        }
    };
    return (
        <>
            <div className="flex flex-col group mt-16 relative px-12">
                <div className="flex items-end justify-between">
                    <h2 className="text-[30px] font-medium mb-4 relative z-[1]">{obj.heading}</h2>
                    <div className="flex gap-0.5 mb-3 mr-5">
                        {Array.from({ length: totalPages }, (_, i) => {
                            return <div className={`w-3 h-0.5 bg-[#4D4D4D] ${currentIndex === i ? "bg-[#AAAAAA]" : ""}`} key={i}></div>
                        })}
                    </div>
                </div>
                {/* <div
                        className="flex flex-row transition-transform duration-500 gap-3"
                        style={{
                            transform: `translateX(${-currentIndex * (100 / totalPages)}%)`,
                            width: `${totalPages * 100}%`,
                        }}
                    > */}
                <Carousel
                    ref={carouselRef}
                    swipeable={true}
                    draggable={false}
                    responsive={responsive}
                    infinite={true}
                    arrows={false}
                    slidesToSlide={itemsToShow}
                    className="custom-carousel"
                    customTransition="transform 400ms cubic-bezier(0.25, 1, 0.5, 1)"
                    beforeChange={() => setIsClickable(false)}
                    afterChange={() => setIsClickable(true)}
                >
                    {loading ? Array.from({ length: itemsToShow }, (_, i) => (
                        <div key={i} className="bg-[#424242] h-[18vh] w-full max-w-[15vw] animate-pulse rounded-lg" />
                    ))
                        : (
                            apiData.map((item, i) => {
                                return <Cards key={uuidv4()} index={i} item={item} apiData={apiData} />
                            })
                        )}
                </Carousel>
                {/* </div> */}
                <button
                    className="text-2xl z-[1000] h-[10.5rem] px-2 transition-all duration-300 hover:text-3xl hover:bg-hover-bg opacity-0 group-hover:opacity-100 absolute top-[65%] left-0 rounded-md rounded-l-none transform -translate-y-[50%] flex items-center justify-center cursor-pointer"
                    style={{ minWidth: "3rem", maxWidth: "3rem" }}
                    onClick={handlePrevious}
                    disabled={!isClickable}
                >
                    <FaChevronLeft />
                </button>
                <button
                    className="text-2xl z-[1000] h-[10.5rem] px-2 pr-5 transition-all duration-300 hover:text-3xl hover:bg-hover-bg opacity-0 group-hover:opacity-100 absolute top-[65%] right-0 rounded-md rounded-r-none transform -translate-y-[50%] flex items-center justify-center cursor-pointer"
                    style={{ minWidth: "3rem", maxWidth: "3rem" }}
                    onClick={handleNext}
                    disabled={!isClickable}
                >
                    <FaChevronRight />
                </button>
            </div >
            <DetailsModal />
        </>
    );
}
