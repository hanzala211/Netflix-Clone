import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdNotificationsOutline } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useMovies, useSearch, useUI } from "../context/moviesContext";

export function Nav() {
    const { searchQuery, setSearchQuery } = useSearch();
    const [isSearching, setIsSearching] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const searchRef = useRef(null);
    const { setLoading } = useUI();
    const { setApiData } = useMovies();

    useEffect(() => {
        window.addEventListener("mousedown", handleClick)
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("mouseover", handleHoverIn);
            window.removeEventListener("scroll", handleScroll);
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
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }
    return <nav className={`flex justify-between items-center px-12 h-[70px] transition duration-100 fixed ${isScrolled ? "bg-[#141414] z-[100]" : "bg-transparent"} w-full z-10`}>
        <div className="flex items-center gap-6 text-[14px]">
            <Link to="/browse" onClick={() => setSearchQuery("")}><img src="/images/download1.png" alt="Netflix Log" className="w-[7.5rem]" /></Link>
            <NavLink
                className={({ isActive }) =>
                    !isActive ? "hover:text-[#B3B3B3] transition-color duration-500 text-[#E5E5E5]" : "text-white font-bold"
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
            <NavLink className={({ isActive }) => !isActive ? "hover:text-[#B3B3B3] transition-color duration-500 text-[#E5E5E5]" : "text-white font-bold"} to="/browse/genre/83" onClick={() => {
                setLoading(true)
                setApiData([]);
            }}>TV Shows</NavLink>
            <NavLink className={({ isActive }) => !isActive ? "hover:text-[#B3B3B3] transition-color duration-500 text-[#E5E5E5]" : "text-white font-bold"} to="/browse/genre/34399" onClick={() => {
                setLoading(true)
                setApiData([]);
            }}>Movies</NavLink>
            <NavLink className={({ isActive }) => !isActive ? "hover:text-[#B3B3B3] transition-color duration-500 text-[#E5E5E5]" : "text-white font-bold"} to="/latest" onClick={() => {
                setLoading(true)
                setApiData([]);
            }}>New & Popular</NavLink>
            <NavLink className={({ isActive }) => !isActive ? "hover:text-[#B3B3B3] transition-color duration-500 text-[#E5E5E5]" : "text-white font-bold"} to="/browse/my-list" onClick={() => {
                setLoading(true)
                setApiData([]);
            }}>My List</NavLink>
            <NavLink className={({ isActive }) => !isActive ? "hover:text-[#B3B3B3] transition-color duration-500 text-[#E5E5E5]" : "text-white font-bold"} to="/browse/original-audio" onClick={() => {
                setLoading(true)
                setApiData([]);
            }}>Browse by Languages</NavLink>
        </div>
        <div className="flex gap-5 items-center bg-transparent">
            <div className="relative">
                <BsSearch onClick={toggleSearch} className={`text-[17px] cursor-pointer transition-[left] duration-300 ease-out ${isSearching ? 'absolute top-1/2 -translate-y-1/2 left-2 ' : 'translate-y-3'}`} />
                <input
                    type="text"
                    ref={searchRef}
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                    className={`bg-[#141414]  border-[0px] overflow-hidden rounded-sm text-white focus-within:outline-none ${isSearching ? "px-9 py-1 w-full border-[1px] transition-[padding-right,padding-left] duration-500" : "w-0 px-0 py-0 "}`}
                    placeholder="Titles, people, genres"
                />
            </div>
            <p className="text-[15px]">Kids</p>
            <IoMdNotificationsOutline className="text-[17px]" />
            <div onMouseOver={handleHoverIn} onMouseLeave={handleHoverOut} className="flex cursor-pointer items-center gap-2">
                <img src="/images/profile.png" alt="Profile Image" className="rounded-[4px]" />
                <IoMdArrowDropdown className={isRotated ? "rotate-180 transition-transform duration-100" : "rotate-0 transition-transform duration-100"} />
            </div>
        </div>

    </nav >
}