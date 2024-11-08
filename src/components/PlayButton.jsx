import { Link } from "react-router-dom";
import { PlaySvg } from "../assets/Constants";

export function PlayBtn({ heroImage, setSelectedPlay }) {
    return <Link to="/watch" onClick={() => {
        setSelectedPlay(() => heroImage)
    }} className="flex items-center bg-white text-black gap-3 sm:py-3 sm:px-8 px-3 py-1 sm:text-[20px] text-[12px] rounded-md transition duration-300 hover:opacity-70 customSvg"><PlaySvg />Play</Link>
}