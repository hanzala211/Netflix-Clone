import { useDetails, useMovies, useSelect, useUI } from "../context/moviesContext";
import { useEffect, useMemo } from "react";

export function ApiCalls() {
    const { apiKey } = useMovies();
    const { setCastData, setRelatedMovies } = useDetails();
    const { selectedData, selectedID } = useSelect();
    const { setModalLoading } = useUI();
    let foundData = useMemo(() => selectedData?.find(item => item.id === selectedID), [selectedData, selectedID]);
    const mediaType = foundData?.media_type === "tv" ? "tv" : "movie";

    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        const fetchCredits = async () => {
            if (!selectedID) return;
            try {
                setModalLoading(true);
                const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${selectedID}/credits?language=en-US`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${apiKey}`
                    },
                    signal
                });
                const result = await response.json();
                setCastData(result || []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCredits();
        return () => { abortController.abort(); };
    }, [selectedID, apiKey, setCastData, setModalLoading, mediaType]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };

        async function fetchData() {
            if (selectedID) {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${selectedID}/recommendations?language=en-US`, options);
                    const result = await response.json();
                    setRelatedMovies(result.results || []);
                } catch (error) {
                    console.error(error);
                } finally {
                    setTimeout(() => {
                        setModalLoading(false);
                    }, 500);
                }
            }
        }

        fetchData();
    }, [selectedID, apiKey, setModalLoading, setRelatedMovies, mediaType]);



    return null;
}
