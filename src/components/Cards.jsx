import { BsHandThumbsUp } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { IoChevronDown, IoPlay } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useMovies, useSelect, useUI } from "../context/moviesContext";
import React, { useState } from "react";

function Cards({ item, apiData, index }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const { setSelectedPlay, setModalLoading } = useUI();
    const { image720Url } = useMovies();
    const { setSelectedData, setSelectedID } = useSelect()
    return <div
        className="relative flex flex-col w-[18rem]"
        onMouseEnter={() => setHoveredIndex(() => index)}
        onMouseLeave={() => setHoveredIndex(null)}
    >
        <img
            className={`rounded-md w-[100%] mr-0 max-h-[18vh] transition-transform z-10 duration-300  ${hoveredIndex === index ? 'delay-500 scale-125 -translate-y-14 z-[150]' : ''} cursor-pointer object-fill`}
            src={item.backdrop_path ? `${image720Url}${item.backdrop_path}` : '/public/images/Broken.png'}
            alt={item.title}
        />
        <img src="/public/images/4375011_logo_netflix_icon.png" alt="Netflix Logo" className={`lg:w-6 lg:h-6 w-3 h-3  absolute transition-transform duration-300 top-2 left-1 z-[100] ${hoveredIndex === index ? "delay-500 -translate-y-[4.7rem] -translate-x-9 z-[1500000]" : ""}`} />
        <div
            className={`absolute z-[110] bottom-[-5vw] flex-col w-[100%] py-7 px-5 bg-[#141414] flex gap-3 rounded-b-md transition-transform duration-300 ${hoveredIndex === index ? 'delay-500 opacity-100 scale-125 shadow-md shadow-[#010101]' : 'opacity-0 scale-0'}`}
        >
            <div className="flex justify-between w-full">
                <div className="flex gap-2" >
                    <Link to="/watch" className="w-8 h-8 hover:opacity-70 cursor-pointer bg-white flex items-center justify-center rounded-full border border-white" onClick={() => setSelectedPlay(item)}>
                        <IoPlay className="fill-black" />
                    </Link>
                    <Link className="w-8 h-8 hover:opacity-70 cursor-pointer bg-black flex items-center justify-center rounded-full border border-white">
                        <HiOutlinePlus className="fill-white" />
                    </Link>
                    <Link className="w-8 h-8 hover:opacity-70 cursor-pointer bg-black flex items-center justify-center rounded-full border border-white">
                        <BsHandThumbsUp />
                    </Link>
                </div>
                <Link to={`${window.location.href}?jbv=${item?.id}`} onClick={() => {
                    setSelectedID(item.id);
                    setSelectedData(apiData);
                    setModalLoading(true);
                    setHoveredIndex(null)
                }} className="w-8 h-8 hover:opacity-70 cursor-pointer bg-black flex items-center justify-center rounded-full border border-white">
                    <IoChevronDown />
                </Link>
            </div>
            <div className="flex gap-4 ml-1.5 items-center">
                <p className="text-[grey] text-[12px]">{item?.original_language?.toUpperCase()}</p>
                <p className="text-[grey] text-[12px]">•</p>
                <p className="text-[grey] text-[12px]">
                    {item?.release_date ? item.release_date.slice(0, 4) : (item?.first_air_date ? item.first_air_date.slice(0, 4) : 'N/A')}
                </p>
            </div>
        </div>
    </div>
}
export default React.memo(Cards);