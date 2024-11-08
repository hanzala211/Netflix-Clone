import { HiOutlinePlus } from "react-icons/hi";
import { Link } from "react-router-dom";

export function PlusBtn() {
    return <Link className="sm:w-12 sm:h-12 h-8 w-8 hover:opacity-70 cursor-pointer bg-[#252623] bg-opacity-50 flex items-center justify-center rounded-full border border-white">
        <HiOutlinePlus className="fill-white sm:text-xl text-[15px] " />
    </Link>
}