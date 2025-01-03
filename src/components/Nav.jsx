import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdNotificationsOutline } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMovies, useSearch, useUI } from "../context/moviesContext";

export function Nav() {
    const { searchQuery, setSearchQuery } = useSearch();
    const [isSearching, setIsSearching] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const searchRef = useRef(null);
    const { setLoading } = useUI();
    const { setApiData } = useMovies();
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("mousedown", handleClick)
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("touchmove", handleScroll);
        return () => {
            window.removeEventListener("mouseover", handleHoverIn);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("touchmove", handleScroll);
        }
    })

    function toggleSearch() {
        setIsSearching(true);
        searchRef.current.focus();
    }

    function handleHoverIn() {
        setIsRotated(true);
    }

    function handleHoverOut() {
        setIsRotated(false);
    }

    function handleClick(event) {
        if (!searchRef?.current?.contains(event.target)) {
            setIsSearching(false);
        }
    }

    function handleScroll() {
        if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }

    return <nav className={`flex justify-between items-center py-1 sm:py-0 sm:px-12 px-1.5 h-[50px] sm:h-[70px] transition duration-100 fixed ${isScrolled ? "bg-[#141414] z-[100]" : "bg-transparent"} w-[100vw] z-10`}>
        <div className="flex items-start sm:items-center sm:gap-5 gap-1">
            <Link to="/browse" onClick={() => setSearchQuery("")}><img src="/images/download1.png" alt="Netflix Log" className="sm:w-[7.5rem] w-[4rem]" /></Link>
            <div className="sm:hidden">
                <select
                    className="bg-transparent text-white py-1 px-1 w-[50px] text-[8px] rounded-sm"
                    onChange={(e) => navigate(e.target.value)}
                    value={window.location.pathname}
                >
                    <option className="bg-[#141414] hover:bg-[#2f2f2f] text-white" value="/browse">Home</option>
                    <option className="bg-[#141414] hover:bg-[#2f2f2f] text-white" value="/browse/genre/83">TV Shows</option>
                </select>
            </div>
            <div className="sm:flex items-center sm:gap-6 gap-4 text-[14px] hidden">
                <NavLink
                    className={({ isActive }) =>
                        !isActive ? "hover:text-[#B3B3B3] transition-color sm:text-[17px] text-[10px] duration-500 text-[#E5E5E5]" : "text-white font-bold sm:text-[17px] text-[10px]"
                    }
                    to="/browse"
                    onClick={() => {
                        setLoading(true);
                        setApiData([]);
                    }}
                    end
                >
                    Home
                </NavLink>
                <NavLink className={({ isActive }) => !isActive ? "hover:text-[#B3B3B3] sm:text-[17px] text-[10px] transition-color duration-500 text-[#E5E5E5]" : "text-white font-bold"} to="/browse/genre/83" onClick={() => {
                    setLoading(true)
                    setApiData([]);
                }}>TV Shows</NavLink>
            </div>
        </div>

        <div className="flex sm:gap-5 gap-2 items-center bg-transparent">
            <div className="relative flex justify-end w-40 sm:w-auto sm:block">
                <BsSearch onClick={toggleSearch} className={`sm:text-[17px] text-[13px] cursor-pointer transition-[left] duration-300 ease-out ${isSearching ? 'absolute top-1/2 -translate-y-1/2 375:left-[2.3rem] 400:left-[4rem] sm:left-2 ' : 'sm:translate-y-3 translate-y-1.5'}`} />
                <input
                    type="text"
                    ref={searchRef}
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                    className={`bg-[#141414] border-[0px] overflow-hidden rounded-sm text-white focus-within:outline-none ${isSearching ? "sm:px-9 px-6 pr-2 py-1 sm:w-full w-[80%] sm:text-[17px] text-[12px] border-[1px] transition-[padding-left] sm:transition-[padding-right,padding-left] duration-500" : "w-0 px-0 py-0 "}`}
                    placeholder="Titles, people, genres"
                />
            </div>
            <p className="sm:text-[15px] text-[11px]">Kids</p>
            <IoMdNotificationsOutline className="text-[17px]" />
            <div onMouseOver={handleHoverIn} onMouseLeave={handleHoverOut} className="flex cursor-pointer items-center gap-2">
                <img src="/images/profile.png" alt="Profile Image" className="rounded-[4px] h-5 w-5 sm:w-full sm:h-full" />
                <IoMdArrowDropdown className={isRotated ? "rotate-180 transition-transform duration-100" : "rotate-0 transition-transform duration-100"} />
            </div>
        </div>
    </nav >
}