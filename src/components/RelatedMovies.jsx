import { Link } from "react-router-dom";
import { useMovies, useUI } from "../context/moviesContext"
import { IoPlay } from "react-icons/io5";
import { HiOutlinePlus } from "react-icons/hi";

export function RelatedMovies({ item }) {
    const { image720Url } = useMovies();
    const { setSelectedPlay } = useUI();
    return <div className="rounded-md max-w-[90%] h-[12rem] sm:h-0 mb-1.5 sm:mb-0">
        <div className={`sm:bg-cover bg-contain bg-no-repeat sm:bg-center sm:h-[15vh] h-[5.75rem] bg-top relative rounded-t-md group cursor-pointer`} style={{ backgroundImage: `url('${image720Url}${item?.backdrop_path || item?.poster_path || "/default-placeholder.png"}')` }}>
            <Link to="/watch" onClick={() => setSelectedPlay(() => item)}>
                <img src="/images/4375011_logo_netflix_icon.png" alt="Netflix Logo" className="sm:w-6 sm:h-6 w-3 h-3 absolute sm:top-2 left-1 top-1" />
                <p className="text-white sm:text-sm text-[10px] absolute sm:top-2 right-1 top-0.5">{item?.release_date ? item.release_date.slice(0, 4) : (item?.first_air_date ? item.first_air_date.slice(0, 4) : 'N/A')}</p>
                <Link to="/watch" className="absolute bg-[#2F2F2F] bg-opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 border-[1px] rounded-full p-2"><IoPlay className="text-[20px]" /></Link>
            </Link>
        </div>
        <div className="bg-[#2F2F2F] sm:px-5 px-2 py-1 pt-3 sm:h-52 h-[6rem] rounded-b-md">
            <div className="flex items-center gap-2 justify-between">
                <div className="flex sm:gap-2 gap-1.5 items-center">
                    <span className="sm:px-[8px] px-[3px] font-bold sm:h-[23px] h-[16px] border-[1px] rounded-sm border-[#828282] text-[#BCBCBC] sm:text-[15px] text-[8px]">18+</span>
                    <span className="sm:px-[4px] px-[2px] font-bold sm:h-[18px] h-[15px] border-[1px] rounded-[5px] border-[#828282] text-[#BCBCBC] sm:text-[11px] text-[8px]">HD</span>
                </div>
                <Link className="sm:w-12 sm:h-12 h-5 w-5 hover:opacity-70 cursor-pointer bg-[#252623] bg-opacity-50 flex items-center justify-center rounded-full border border-white">
                    <HiOutlinePlus className="fill-white sm:text-xl text-[12px] " />
                </Link>
            </div>
            <p className="sm:line-clamp-5 line-clamp-3 sm:text-[13px] text-[8px] mt-2 text-[#CECECE]">{item?.overview}</p>
        </div>
    </div>
}