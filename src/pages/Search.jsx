import { useEffect } from "react";
import Cards from "../components/Cards";
import { DetailsModal } from "../components/DetailsModal";
import { useMovies, useSearch, useSearched } from "../context/moviesContext";
import { useNavigate } from "react-router-dom";

export function Search() {
    const { apiKey } = useMovies();
    const { searchResults } = useSearched();
    const { searchQuery } = useSearch();
    const navigate = useNavigate();
    const { setSearchResults } = useSearched();
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

    return <div className="pt-44 px-16">
        <h2 className="mb-6 ml-2"><span className="text-[#808080] text-[18px]">More To Explore:</span> <span className="capitalize text-[25px]">{searchQuery}</span></h2>
        <div className="grid grid-cols-6 grid-flow-row" style={{ rowGap: "35px", columnGap: "15px" }}>
            {searchResults.length !== 0 && searchResults?.map((item, i) => {
                return <Cards key={i} item={item} apiData={searchResults} index={i} />
            })}
        </div>
        <DetailsModal />
    </div>;
}