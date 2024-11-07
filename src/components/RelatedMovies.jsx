import { Link } from "react-router-dom";
import { useMovies, useUI } from "../context/moviesContext"
import { PlusBtn } from "./PlusBtn";
import { IoPlay } from "react-icons/io5";

export function RelatedMovies({ item }) {
    const { image720Url } = useMovies();
    const { setSelectedPlay } = useUI();
    return <div className="rounded-md w-[90%] container">
        <div className={`bg-cover bg-no-repeat bg-center  h-[15vh] relative rounded-t-md group cursor-pointer`} style={{ backgroundImage: `url('${image720Url}${item?.backdrop_path || item?.poster_path || "/default-placeholder.png"}')` }}>
            <Link to="/watch" onClick={() => setSelectedPlay(() => item)}>
                <img src="/public/images/4375011_logo_netflix_icon.png" alt="Netflix Logo" className="w-6 h-6 absolute top-2 left-1" />
                <p className="text-white text-sm absolute top-2 right-1">{item?.release_date ? item.release_date.slice(0, 4) : (item?.first_air_date ? item.first_air_date.slice(0, 4) : 'N/A')}</p>
                <Link to="/watch" className="absolute bg-[#2F2F2F] bg-opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 border-[1px] rounded-full p-2"><IoPlay className="text-[20px]" /></Link>
            </Link>
        </div>
        <div className="bg-[#2F2F2F] px-5 py-1 pt-3 h-52 rounded-b-md">
            <div className="flex items-center gap-2 justify-between">
                <div className="flex gap-2 items-center">
                    <span className="px-[8px] font-bold h-[23px] border-[1px] rounded-sm border-[#828282] text-[#BCBCBC] text-[15px]">18+</span>
                    <span className="px-[4px] font-bold h-[18px] border-[1px] rounded-[5px] border-[#828282] text-[#BCBCBC] text-[11px]">HD</span>
                </div>
                <PlusBtn />
            </div>
            <p className="line-clamp-5 text-[13px] mt-2 text-[#CECECE]">{item?.overview}</p>
        </div>
    </div>
}