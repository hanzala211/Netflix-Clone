import { Link } from "react-router-dom";
import { ISvg } from "../assets/Constants";
import { useMovies, useSelect, useUI } from "../context/moviesContext";
import { PlayBtn } from "./PlayButton";
import { DetailsModal } from "./DetailsModal";

export function HeroSection() {
    const { imageBaseUrl, heroImage, apiData } = useMovies();
    const { setSelectedData, setSelectedID } = useSelect();
    const { setModalLoading, setSelectedPlay } = useUI();
    return <div className={`bg-cover bg-no-repeat w-[100vw] bg-center h-[30vh] sm:h-[100vh] z-[0] relative`} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 5%, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.7) 95%, rgba(0, 0, 0, 1) 100%), url('${imageBaseUrl}${heroImage.backdrop_path !== null ? heroImage.backdrop_path : heroImage.poster_path}')` }}>
        <div className="absolute top-[55%] -translate-y-1/2 sm:left-12 left-3 z-20">
            <div className="flex items-center gap-1">
                <img src="/images/4375011_logo_netflix_icon.png" className="sm:w-16 w-4" />
                <h1 className="sm:tracking-[1rem] tracking-[0.5rem] font-bold text-[10px] sm:text-[20px] ">{heroImage.media_type === "tv" ? "SERIES" : "FILM"}</h1>
            </div>
            <div className="font-bold text-3xl sm:text-7xl sm:mt-4 mt-1 sm:ml-2" style={{ lineHeight: "normal" }}>
                <h1 className="w-2/3 sm:text-[40px] text-[15px]">{heroImage.title || heroImage.original_name}</h1>
                <p className="lg:text-xl text-[10px] w-1/2 sm:mt-5 line-clamp-3 lg:line-clamp-none">{heroImage.overview}</p>
            </div>
            <div className="sm:ml-2 sm:mt-4 flex sm:gap-5 gap-2 mt-1 items-center z-[10]">
                <PlayBtn heroImage={heroImage} setSelectedPlay={setSelectedPlay} />
                <Link to={`${window.location.href}?jbv=${heroImage.id}`}><button className="flex items-center bg-[#515050] text-white gap-3 px-3 py-1 sm:py-3 sm:px-7 sm:text-[20px] text-[10px] rounded-md transition opacity-90 duration-300 hover:opacity-70 customSvg" onClick={() => {
                    setSelectedID(() => heroImage.id)
                    setSelectedData(() => apiData)
                    setModalLoading(true);
                }}><ISvg />More Info</button></Link>
            </div>
        </div>
        <p className="absolute right-0 top-[70%] bg-[#242021] sm:px-5 sm:pr-20 sm:py-3 px-2 py-1 pr-7 sm:text-[25px] text-[14px] opacity-85 border-l-4 ">18+</p>
        <DetailsModal />
    </div>
}