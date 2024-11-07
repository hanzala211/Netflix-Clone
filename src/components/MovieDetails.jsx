import { Link, useNavigate } from "react-router-dom";
import { useDetails, useMovies, useSelect, useUI } from "../context/moviesContext";
import { PlayBtn } from "./PlayButton";
import { BsHandThumbsUp } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { MessageSvg } from "../assets/Constants";
import { useEffect, useMemo, useState } from "react";
import { RelatedMovies } from "./RelatedMovies";
import { PlusBtn } from "./PlusBtn";
import { IoIosArrowDown } from "react-icons/io";


export function MovieDetails() {
    const { imageBaseUrl } = useMovies();
    const { castData, relatedMovies, setCastData, setRelatedMovies } = useDetails();
    const { selectedData, selectedID, setSelectedID, } = useSelect();
    const { setSelectedPlay } = useUI();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    let foundData = useMemo(() => selectedData?.find(item => item.id === selectedID), [selectedData, selectedID]);
    useEffect(() => {
        if (selectedID) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, [selectedID]);

    const closeModal = () => {
        setSelectedID(() => null);
        navigate(-1);
        setIsOpen(false);
        foundData = null;
        setCastData([])
        setRelatedMovies([])
    };
    if (!foundData) {
        return null;
    }
    return (
        <>
            <div className="overlay" onClick={closeModal} />
            <div className="absolute w-full max-w-[50%] z-[10000] rounded-xl top-10 bg-[#141414] pb-10">
                <div
                    className="h-[50vh] bg-no-repeat bg-cover rounded-xl"
                    style={{
                        backgroundImage: `linear-gradient(0deg,#181818,transparent 50%), url('${imageBaseUrl}${foundData.backdrop_path || foundData.poster_path}')`
                    }}
                >
                    <IoCloseSharp onClick={closeModal} className="absolute right-5 top-5 text-3xl bg-[#141414] cursor-pointer border-[1px] border-[#141414] rounded-full" />
                    <div className={`absolute -translate-y-[50%] left-12 z-20 ${(relatedMovies.length === 0 || relatedMovies !== undefined) ? "top-[18%]" : isOpen ? "top-[10%]" : "top-[18%]"}`}>
                        <div className="flex items-center gap-3">
                            <img src="/public/images/4375011_logo_netflix_icon.png" className="w-8" alt="Netflix Logo" />
                            <h1 className="tracking-[1rem] font-bold ">{foundData.media_type === "tv" ? "SERIES" : "FILM"}</h1>
                        </div>
                        <h1 className="w-[60%] mb-5 font-bold text-2xl mt-4 ml-2">{foundData.original_name || foundData.title}</h1>
                        <div className="flex gap-2 items-center">
                            <PlayBtn setSelectedPlay={setSelectedPlay} heroImage={foundData} />
                            <PlusBtn />
                            <Link className="w-12 h-12 hover:opacity-70 cursor-pointer bg-[#252623] bg-opacity-50 flex items-center justify-center rounded-full border border-white">
                                <BsHandThumbsUp className="text-xl" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex mx-11 pt-5 pb-7 border-b-2 border-[#404040]">
                    <div className="flex flex-col gap-[10px] w-[65%]">
                        <div className="flex items-center gap-3">
                            <p className="text-[#BCBCBC] text-[14px]">{foundData.release_date ? foundData.release_date.slice(0, 4) : foundData.first_air_date.slice(0, 4)}</p>
                            <span className="px-[4px] font-bold h-[18px] border-[1px] rounded-sm border-[#E4E4E4] text-[#BCBCBC] text-[11px]">HD</span>
                            <Link className="cursor-default"><MessageSvg color="#BCBCBC" /></Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-[6px] font-bold h-[23px] border-[1px] rounded-sm border-[#E4E4E4] text-white text-[15px]">18+</span>
                            <p className="text-white text-[15px]">violence, language, substances</p>
                        </div>
                        <div>
                            <h2 className="font-bold text-[25px]">{foundData.title || foundData.original_name}</h2>
                            <p className="text-sm w-2/3 line-clamp-3 mt-2">{foundData.overview}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[17px] w-[35%]">
                        <div className="flex gap-2">
                            <span className="text-[#777777] text-[13px]">Cast:</span>
                            <p className="text-[13px] tracking-wider flex">{castData?.status_message === 'The resource you requested could not be found.' ? "Nothing" : (castData?.cast.length > 0 || castData !== undefined) ? castData?.cast.slice(0, 3).map((item) => item.name).join(", ") : "N/A"}</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-[#777777] text-[13px]">Crew:</span>
                            <p className="text-[13px] tracking-wider flex">{castData?.status_message === 'The resource you requested could not be found.' ? "Nothing" : castData?.crew.length > 0 ? castData?.crew.slice(0, 3).map((item) => item.name).join(", ") : "N/A"}</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-[#777777] text-[13px]">This show is:</span>
                            <p className="text-[13px] tracking-wider flex">Exciting, Emotional, Offbeat</p>
                        </div>
                    </div>
                </div>
                {(relatedMovies.length !== 0 || relatedMovies !== undefined) && <h1 className="mx-11 mt-5 text-[21px] font-semibold">More Like This</h1>}
                <div className={`grid grid-cols-3 pt-2 pb-5 ${isOpen ? "" : "h-[62rem] overflow-hidden"} border-b-2 border-[#404040] mx-11 `} style={{ rowGap: "20px" }}>
                    {relatedMovies?.length > 0 && relatedMovies.map((item, i) => (
                        <RelatedMovies key={i} item={item} />
                    ))}
                </div>
                <div className="relative">
                    {relatedMovies.length !== 0 && <button className="absolute left-1/2 -translate-x-1/2 top-1 -translate-y-1/2 hover:bg-opacity-60 rounded-full border-[1px] bg-opacity-80 bg-[#252623] p-2"
                        onClick={() => setIsOpen((prev) => !prev)}><IoIosArrowDown className={`text-[30px] ${isOpen ? "rotate-180" : "rotate-0"}`} /></button>}
                </div>

                <div className="mx-11 mt-12">
                    <h2 className="text-[25px] text-[#777777]">About <span>{foundData.title}</span></h2>
                    <div className="mt-5 flex flex-col gap-2">
                        <p className="text-[#777777] text-[13px]">Director: <span className="text-[15px]">{castData?.status_message === 'The resource you requested could not be found.' ? "N/A" : castData?.cast.length > 0 ? castData?.cast.slice(0, 1)?.name : "N/A"}</span></p>
                        <p className="text-[#777777] text-[13px]">Cast: <span className="text-[15px]">{castData?.status_message === 'The resource you requested could not be found.' ? "Nothing" : castData?.cast.length > 0 ? castData?.cast.slice(0, 8).map((item) => item.name) : "N/A"}</span></p>
                        <p className="text-[#777777] text-[13px]">Writer: <span className="text-[15px]">{castData?.status_message === 'The resource you requested could not be found.' ? "Nothing" : castData?.cast.length > 0 ? castData?.cast[2]?.name : "N/A"}</span></p>
                        <p className="text-[#777777] text-[13px]">This Movie is: <span className="text-[15px]">Explosive, Adrenaline Rush, Exciting</span></p>
                        <p className="text-[#777777] text-[13px]">Maturity Rating: <span className="text-[13px]"><span className="ml-2 px-[6px] font-bold h-[23px] border-[1px] rounded-sm border-[#E4E4E4] text-white text-[15px]">18+</span> Recommended for ages 18 and up</span></p>
                    </div>
                </div>
            </div>
        </>
    );
}
