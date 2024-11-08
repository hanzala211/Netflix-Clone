import { useEffect } from "react";
import Cards from "../components/Cards";
import { DetailsModal } from "../components/DetailsModal";
import { useMovies, useSearch, useSearched, useSelect, useUI } from "../context/moviesContext";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export function Search() {
    const { apiKey } = useMovies();
    const { searchResults, setSearchResults } = useSearched();
    const { searchQuery } = useSearch();
    const navigate = useNavigate();
    const { setSelectedData, setSelectedID } = useSelect()
    const { setModalLoading } = useUI();
    useEffect(() => {
        if (searchQuery !== "") {
            const abortController = new AbortController();
            const { signal } = abortController;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            }
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchQuery}`, { ...options, signal })
                .then(response => response.json())
                .then(data => {
                    const movies = data.results;
                    setSearchResults(movies);
                })
                .catch(error => console.error("Error fetching search results:", error));
            return () => { abortController.abort(); };
        }

    }, [searchQuery, apiKey, navigate, setSearchResults]);

    return <div className="sm:pt-44 pt-12 sm:px-16 px-5">
        <h2 className="sm:mb-6 mb-3 ml-2"><span className="text-[#808080] sm:text-[18px] text-[12px]">More To Explore:</span> <span className="capitalize sm:text-[25px] text-[15px]">{searchQuery}</span></h2>
        <div className="grid sm:grid-cols-6 grid-cols-2 grid-flow-row" style={{ rowGap: "35px", columnGap: "15px" }}>
            {searchResults.length !== 0 && searchResults?.map((item, i) => {
                return <Link key={uuidv4()} to={`${window.location.href}?jbv=${item?.id}`} onClick={() => {
                    setSelectedID(item.id);
                    setSelectedData(searchResults);
                    setModalLoading(true);
                }}><Cards index={i} item={item} apiData={searchResults} /></Link>
            })}
        </div>
        <DetailsModal />
    </div>;
}