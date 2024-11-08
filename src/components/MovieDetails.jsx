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
            <div className="absolute w-full lg:max-w-[50%] sm:max-w-[90%] max-w-[90%] z-[10000] rounded-xl top-10 bg-[#141414] pb-10">
                <div
                    className="sm:h-[50vh] bg-no-repeat sm:bg-cover bg-cover h-[25vh] w-full rounded-xl"
                    style={{
                        backgroundImage: `linear-gradient(0deg,#181818,transparent 50%), url('${imageBaseUrl}${foundData.backdrop_path || foundData.poster_path}')`
                    }}
                >
                    <IoCloseSharp onClick={closeModal} className="absolute sm:right-5 sm:top-5 top-3 right-3 sm:text-3xl text-xl bg-[#141414] cursor-pointer border-[1px] border-[#141414] rounded-full" />
                    <div className={`absolute -translate-y-[50%] sm:left-12 left-4 z-20 ${(relatedMovies.length === 0 || relatedMovies === undefined) ? "lg:top-[18%] sm:top-[8rem] 375:top-[6rem] 400:top-[9.5rem]" : isOpen ? "lg:top-[10%] sm:top-[7rem] 375:top-[6rem] 400:top-[9.5rem]" : "lg:top-[18%] sm:top-[8rem] 375:top-[6rem] 400:top-[9.5rem]"}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <img src="/images/4375011_logo_netflix_icon.png" className="sm:w-16 w-4" />
                            <h1 className="sm:tracking-[1rem] tracking-[0.5rem] font-bold text-[9px] sm:text-[20px] ">{foundData.media_type === "tv" ? "SERIES" : "FILM"}</h1>
                        </div>
                        <h1 className="w-[60%] sm:text-[40px] text-[13px] mb-2">{foundData.original_name || foundData.title}</h1>
                        <div className="flex gap-2 items-center">
                            <PlayBtn setSelectedPlay={setSelectedPlay} heroImage={foundData} />
                            <PlusBtn />
                            <Link className="sm:w-12 sm:h-12 h-8 w-8 hover:opacity-70 cursor-pointer bg-[#252623] bg-opacity-50 flex items-center justify-center rounded-full border border-white">
                                <BsHandThumbsUp className="sm:text-xl text-[15px]" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex sm:mx-11 mx-4 pt-5 pb-7 border-b-2 border-[#404040]">
                    <div className="flex flex-col gap-[10px] w-[65%]">
                        <div className="flex items-center sm:gap-3 gap-2">
                            <p className="text-[#BCBCBC] sm:text-[14px] text-[10px]">{foundData.release_date ? foundData.release_date.slice(0, 4) : foundData.first_air_date.slice(0, 4)}</p>
                            <span className="sm:px-[4px] font-bold sm:h-[18px] px-[2px] h-[15px] text-[9px] border-[1px] rounded-sm border-[#E4E4E4] text-[#BCBCBC] sm:text-[11px]">HD</span>
                            <Link className="cursor-default"><MessageSvg color="#BCBCBC" /></Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="sm:px-[6px] px-[4px] h-[17px] text-[10px] font-bold sm:h-[23px] border-[1px] rounded-sm border-[#E4E4E4] text-white sm:text-[15px]">18+</span>
                            <p className="text-white sm:text-[15px] text-[10px]">violence, language, substances</p>
                        </div>
                        <div>
                            <h2 className="font-bold sm:text-[25px] text-[15px]">{foundData.title || foundData.original_name}</h2>
                            <p className="sm:text-sm text-[10px] w-2/3 line-clamp-3 mt-2">{foundData.overview}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:gap-[17px] gap-[12px] w-[35%]">
                        <div className="flex gap-2">
                            <span className="text-[#777777] sm:text-[13px] text-[9px]">Cast:</span>
                            <p className="sm:text-[13px] text-[7px] tracking-wider flex">{castData?.status_message === 'The resource you requested could not be found.' ? "Nothing" : (castData?.cast.length > 0 || castData !== undefined) ? castData?.cast.slice(0, 3).map((item) => item.name).join(", ") : "N/A"}</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-[#777777] sm:text-[13px] text-[9px]">Crew:</span>
                            <p className="sm:text-[13px] text-[7px] tracking-wider flex">{castData?.status_message === 'The resource you requested could not be found.' ? "Nothing" : castData?.crew.length > 0 ? castData?.crew.slice(0, 3).map((item) => item.name).join(", ") : "N/A"}</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-[#777777] sm:text-[13px] text-[9px]">This show is:</span>
                            <p className="sm:text-[13px] text-[7px] tracking-wider flex">Exciting, Emotional, Offbeat</p>
                        </div>
                    </div>
                </div>
                {(relatedMovies.length !== 0 || relatedMovies !== undefined) && <h1 className="sm:mx-11 mx-4 sm:mt-5 mt-3 text-[17px] sm:text-[21px] font-semibold">More Like This</h1>}
                <div className={`grid sm:grid-cols-3 grid-cols-2 pt-2 pb-5 ${isOpen ? "" : "sm:h-[62rem] h-[25rem] overflow-hidden"} border-b-2 border-[#404040] sm:mx-11 mx-4 mr-1.5 `} style={{ rowGap: "20px" }}>
                    {relatedMovies?.length > 0 && relatedMovies.map((item, i) => (
                        <RelatedMovies key={i} item={item} />
                    ))}
                </div>
                <div className="relative">
                    {relatedMovies.length !== 0 && <button className="absolute left-1/2 -translate-x-1/2 top-1 -translate-y-1/2 hover:bg-opacity-60 rounded-full border-[1px] bg-opacity-80 bg-[#252623] p-2"
                        onClick={() => setIsOpen((prev) => !prev)}><IoIosArrowDown className={`text-[30px] ${isOpen ? "rotate-180" : "rotate-0"}`} /></button>}
                </div>

                <div className="sm:mx-11 mx-5 mt-12">
                    <h2 className="sm:text-[25px] text-[15px] text-[#777777]">About <span>{foundData.title}</span></h2>
                    <div className="mt-5 flex flex-col gap-2">
                        <p className="text-[#777777] sm:text-[13px] text-[10px]">Director: <span className="sm:text-[15px] text-[10px]">{castData?.status_message === 'The resource you requested could not be found.' ? "N/A" : castData?.cast.length > 0 ? castData?.cast.slice(0, 1)?.name : "N/A"}</span></p>
                        <p className="text-[#777777] sm:text-[13px] text-[10px]">Cast: <span className="sm:text-[15px] text-[10px]">{castData?.status_message === 'The resource you requested could not be found.' ? "Nothing" : castData?.cast.length > 0 ? castData?.cast.slice(0, 8).map((item) => item.name) : "N/A"}</span></p>
                        <p className="text-[#777777] sm:text-[13px] text-[10px]">Writer: <span className="sm:text-[15px] text-[10px]">{castData?.status_message === 'The resource you requested could not be found.' ? "Nothing" : castData?.cast.length > 0 ? castData?.cast[2]?.name : "N/A"}</span></p>
                        <p className="text-[#777777] sm:text-[13px] text-[10px]">This Movie is: <span className="sm:text-[15px] text-[10px]">Explosive, Adrenaline Rush, Exciting</span></p>
                        <p className="text-[#777777] sm:text-[13px] text-[10px]">Maturity Rating: <span className="sm:text-[15px] text-[10px]"><span className="ml-2 px-[6px] mr-1 font-bold h-[23px] border-[1px] rounded-sm border-[#E4E4E4] text-white sm:text-[15px] text-[10px]">18+</span> Recommended for ages 18 and up</span></p>
                    </div>
                </div>
            </div>
        </>
    );
}
