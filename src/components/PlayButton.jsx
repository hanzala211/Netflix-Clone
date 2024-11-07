import { Link } from "react-router-dom";
import { PlaySvg } from "../assets/Constants";

export function PlayBtn({ heroImage, setSelectedPlay }) {
    return <Link to="/watch" onClick={() => {
        setSelectedPlay(() => heroImage)
    }} className="flex items-center bg-white text-black gap-3 py-3 px-8 text-[20px] rounded-md transition duration-300 hover:opacity-70"><PlaySvg />Play</Link>
}