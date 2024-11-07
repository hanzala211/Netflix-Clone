import { createContext, useContext, useMemo, useState } from "react";

const MovieContext = createContext();

function MovieProvider({ children }) {
    const [apiData, setApiData] = useState([]);
    const [heroImage, setHeroImage] = useState({});
    const [playData, setPlayData] = useState([]);
    const [url, setUrl] = useState("");

    const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";
    const image720Url = "https://image.tmdb.org/t/p/w780";
    const apiKey = "YOUR_API_KEY";

    const dataContext = useMemo(() => ({
        apiData, imageBaseUrl, heroImage, image720Url, apiKey,
        playData, url,
        setApiData, setHeroImage, setPlayData, setUrl
    }), [apiData, heroImage, imageBaseUrl, image720Url, apiKey, playData, url]);

    return <MovieContext.Provider value={dataContext}>{children}</MovieContext.Provider>;
}

function useMovies() {
    const context = useContext(MovieContext);
    if (!context) throw new Error("useMovies must be used within a MovieProvider");
    return context;
}

const SearchContext = createContext();

function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState("");

    const value = useMemo(() => ({ searchQuery, setSearchQuery }), [searchQuery]);

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

function useSearch() {
    const context = useContext(SearchContext);
    if (!context) throw new Error("useSearch must be used within a SearchProvider");
    return context;
}

const UIContext = createContext();

function UIProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [selectedPlay, setSelectedPlay] = useState(null);

    const value = useMemo(() => ({
        loading, setLoading,
        modalLoading, setModalLoading, selectedPlay, setSelectedPlay
    }), [loading, modalLoading, selectedPlay]);

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

function useUI() {
    const context = useContext(UIContext);
    if (!context) throw new Error("useUI must be used within a UIProvider");
    return context;
}

const SelectedContext = createContext();

function SelectedProvider({ children }) {
    const [selectedData, setSelectedData] = useState(null);
    const [selectedID, setSelectedID] = useState(null);

    const value = useMemo(() => ({ selectedData, setSelectedData, selectedID, setSelectedID }), [selectedData, selectedID]);

    return <SelectedContext.Provider value={value}>{children}</SelectedContext.Provider>;
}

function useSelect() {
    const context = useContext(SelectedContext);
    if (!context) throw new Error("useSelect must be used within a SelectedProvider");
    return context;
}
const DetailsContext = createContext();
function DetailsProvider({ children }) {
    const [castData, setCastData] = useState([]);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const value = useMemo(() => ({
        castData, setCastData,
        relatedMovies, setRelatedMovies
    }), [castData, relatedMovies]);
    return <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
}
function useDetails() {
    const context = useContext(DetailsContext);
    return context;
}
const SearchedContext = createContext();
function SearchedProvider({ children }) {
    const [searchResults, setSearchResults] = useState([]);
    const value = useMemo(() => ({
        searchResults, setSearchResults
    }), [searchResults]);
    return <SearchedContext.Provider value={value}>{children}</SearchedContext.Provider>
}
function useSearched() {
    const context = useContext(SearchedContext)
    return context;
}
export { useMovies, MovieProvider, SearchProvider, useSearch, UIProvider, useUI, SelectedProvider, useSelect, DetailsProvider, useDetails, useSearched, SearchedProvider };
