import { useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../context/moviesContext";

export function Footer() {
    const navigate = useNavigate();
    const { searchQuery } = useSearch();
    const previousSearchQuery = useRef(searchQuery);
    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate(`/search?q=${searchQuery}`);
        } else if (previousSearchQuery.current && previousSearchQuery.current.length > 0 && searchQuery.length === 0) {
            navigate("/browse");
        }
        return () => previousSearchQuery.current = searchQuery;
    }, [searchQuery])
    return <footer className="flex flex-col items-start mx-auto w-full max-w-[900px] pt-32 pb-5">
        <div className="flex gap-5 text-2xl">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
        </div>
        <div className="mt-5 flex gap-32">
            <div className="flex flex-col gap-5">
                <Link className="hover:underline text-[#808080] text-sm">Audio Description</Link>
                <Link className="hover:underline text-[#808080] text-sm">Investor Relations</Link>
                <Link className="hover:underline text-[#808080] text-sm">Legal Notices</Link>
                <Link className="mt-2 text-[#808080] text-sm hover:text-white border-[2px] border-[#808080] text-center py-1 tracking-tight">Service Code</Link>
                <p className="text-xs text-[#808080]">© 1997-2024 Netflix, Inc.</p>
            </div>
            <div className="flex flex-col gap-5">
                <Link className="hover:underline text-[#808080] text-sm">Help Center</Link>
                <Link className="hover:underline text-[#808080] text-sm">Jobs</Link>
                <Link className="hover:underline text-[#808080] text-sm">Cookie Prefernces</Link>
            </div>
            <div className="flex flex-col gap-5">
                <Link className="hover:underline text-[#808080] text-sm">Gift Cards</Link>
                <Link className="hover:underline text-[#808080] text-sm">Terms of Use</Link>
                <Link className="hover:underline text-[#808080] text-sm">Corporate Information</Link>
            </div>
            <div className="flex flex-col gap-5">
                <Link className="hover:underline text-[#808080] text-sm">Media Center</Link>
                <Link className="hover:underline text-[#808080] text-sm">Privacy</Link>
                <Link className="hover:underline text-[#808080] text-sm">Contact Us</Link>
            </div>
        </div>
    </footer>
}