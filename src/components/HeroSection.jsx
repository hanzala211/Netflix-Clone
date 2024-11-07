import { Link } from "react-router-dom";
import { ISvg } from "../assets/Constants";
import { useMovies, useSelect, useUI } from "../context/moviesContext";
import { PlayBtn } from "./PlayButton";
import { DetailsModal } from "./DetailsModal";

export function HeroSection() {
    const { imageBaseUrl, heroImage, apiData } = useMovies();
    const { setSelectedData, setSelectedID } = useSelect();
    const { setModalLoading, setSelectedPlay } = useUI();
    return <div className={`bg-cover bg-no-repeat w-full bg-center h-[100vh] z-[0] relative`} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 5%, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0) 90%, rgba(0, 0, 0, 0.7) 95%, rgba(0, 0, 0, 1) 100%), url('${imageBaseUrl}${heroImage.backdrop_path !== null ? heroImage.backdrop_path : heroImage.poster_path}')` }}>
        <div className="absolute top-[55%] -translate-y-1/2 left-12 z-20 ">
            <div className="flex items-center gap-1">
                <img src="/images/4375011_logo_netflix_icon.png" className="lg:w-16 w-8" />
                <h1 className="tracking-[1rem] font-bold ">{heroImage.media_type === "tv" ? "SERIES" : "FILM"}</h1>
            </div>
            <div className="font-bold text-3xl lg:text-7xl mt-4 ml-2">
                <h1 className="w-2/3">{heroImage.title || heroImage.original_name}</h1>
                <p className="lg:text-xl text-sm w-1/2 mt-5">{heroImage.overview}</p>
            </div>
            <div className="ml-2 mt-4 flex gap-5 items-center z-[10]">
                <PlayBtn heroImage={heroImage} setSelectedPlay={setSelectedPlay} />
                <Link to={`${window.location.href}?jbv=${heroImage.id}`}><button className="flex bg-[#515050] text-white gap-3 py-3 px-7 rounded-md transition opacity-90 duration-300 hover:opacity-70" onClick={() => {
                    setSelectedID(() => heroImage.id)
                    setSelectedData(() => apiData)
                    setModalLoading(true);
                }}><ISvg />More Info</button></Link>
            </div>
        </div>
        <p className="absolute right-0 top-[70%] bg-[#242021] px-5 pr-20 opacity-85 border-l-4 text-xl py-3">18+</p>
        <DetailsModal />
    </div>
}