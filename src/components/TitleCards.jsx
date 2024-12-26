import { useEffect, useState, useMemo, useRef } from "react";
import { useMovies, useSelect, useUI } from "../context/moviesContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Cards from "./Cards";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { DetailsModal } from "./DetailsModal";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";

export function TitleCards({ obj }) {
    const { apiKey } = useMovies();
    const { setModalLoading } = useUI();
    const { setSelectedData, setSelectedID } = useSelect()
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [randomPage] = useState(Math.floor(Math.random() * 50) + 1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isClickable, setIsClickable] = useState(true);
    let timerRef = useRef(null);
    const carouselRef = useRef()

    const itemsToShow = document.querySelector("body").offsetWidth > 640 ? 6 : 2;
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
            breakpoint: { max: 1024, min: 640 },
            items: itemsToShow
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        }
    };
    return (
        <>
            <div className="flex flex-col group sm:mt-16 mt-8 relative sm:px-12 375:px-4 400:px-[1px] w-[100vw] overflow-hidden sm:overflow-visible">
                <div className="flex items-end justify-between">
                    <h2 className="sm:text-[30px] text-[15px] font-medium mb-4 relative z-[1]">{obj.heading}</h2>
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
                    swipeable={false}
                    draggable={false}
                    responsive={responsive}
                    infinite={true}
                    arrows={false}
                    slidesToSlide={itemsToShow}
                    className="custom-carousel"
                    customTransition="transform 400ms cubic-bezier(0.25, 1, 0.5, 1)"
                    beforeChange={() => setIsClickable(false)}
                    afterChange={() => {
                        setIsClickable(true)
                    }}
                >
                    {loading ? Array.from({ length: itemsToShow }, (_, i) => (
                        <div key={i} className="bg-[#424242] h-[10vh] sm:h-[15vh] w-[95%] max-w-[40vw] animate-pulse rounded-lg" />
                    ))
                        : (
                            apiData.map((item, i) => {
                                return <Link key={uuidv4()} to={`${window.location.href}?jbv=${item?.id}`} onClick={() => {
                                    setSelectedID(item.id);
                                    setSelectedData(apiData);
                                    setModalLoading(true);
                                }}><Cards index={i} item={item} apiData={apiData} /></Link>
                            })
                        )}
                </Carousel>
                {/* </div> */}
                <button
                    className="sm:text-2xl z-[1000] sm:h-[10.5rem] sm:px-2 transition-all duration-300 sm:hover:text-3xl sm:hover:bg-hover-bg opacity-0 group-hover:opacity-100 absolute top-[65%] sm:left-0 -left-4 bg-[#141414b3] rounded-md rounded-l-none transform -translate-y-[50%] flex items-center justify-center cursor-pointer h-[6.2rem] text-[12px] bg-opacity-30"
                    style={{ minWidth: "3rem", maxWidth: "3rem" }}
                    onClick={handlePrevious}
                    disabled={!isClickable}
                >
                    <FaChevronLeft />
                </button>
                <button
                    className="sm:text-2xl z-[1000] sm:h-[10.5rem] sm:px-2 pr-5 transition-all duration-300 sm:hover:text-3xl sm:hover:bg-hover-bg opacity-0 group-hover:opacity-100 absolute top-[65%] sm:right-0 -right-4 bg-[#141414b3]  rounded-md rounded-r-none transform -translate-y-[50%] flex items-center justify-center cursor-pointer h-[6.2rem] text-[12px] bg-opacity-30"
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
