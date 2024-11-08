import { Skeleton } from "@mui/material";
import { HeroSection } from "../components/HeroSection";
import { TitleCards } from "../components/TitleCards";
import { useMovies, useUI } from "../context/moviesContext";
import { showsData } from "../assets/Constants";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export function Shows() {
    const { setApiData, setHeroImage, apiKey } = useMovies();
    const { setLoading, loading } = useUI();
    const [randomPage] = useState(Math.floor(Math.random() * 50) + 1);
    const location = useLocation();
    let storeTime = useRef(null);
    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };
        async function fetchTvShows() {
            try {
                if (location.pathname === "/browse/genre/83") {
                    setLoading(true);
                    setApiData([]);
                    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${randomPage}`, { ...options, signal });
                    const data = await response.json();
                    const movies = data.results;
                    setApiData((prev) => [...prev, ...movies]);
                    let validHeroImage = null;
                    for (let i = 0; i < movies.length; i++) {
                        const randomIndex = randomNumber(movies);
                        if (movies[randomIndex]?.backdrop_path) {
                            validHeroImage = movies[randomIndex];
                            break;
                        }
                    }
                    if (validHeroImage) {
                        setHeroImage(validHeroImage);
                    }
                }
            } catch (error) {
                console.error(error);
            }
            finally {
                storeTime.current = setTimeout(() => {
                    setLoading(false);
                }, 5000)
            }
        }
        fetchTvShows();
        return () => { clearTimeout(storeTime.current) }
    }, [randomPage, apiKey, setLoading, setApiData, setHeroImage])
    useEffect(() => {
        const loadingTime = setTimeout(() => {
            setLoading(false)
        }, 2000)
        return () => clearTimeout(loadingTime)
    }, [])
    function randomNumber(movies) {
        const randomHeroImage = Math.floor(Math.random() * movies.length) + 1;
        return randomHeroImage
    }
    return <>
        {!loading ? <section>
            <HeroSection />
            <div className="sm:-mt-[25vh] -mt-[9vh]">
                {showsData.map((item, i) => {
                    return <TitleCards key={i} index={i} obj={item} />
                })
                }
            </div>
        </section > : <div style={{ padding: '1rem', paddingTop: "10rem" }} className='flex gap-5 flex-wrap'>
            {
                Array.from({ length: 6 }, (_, i) => {
                    return <Skeleton
                        key={i}
                        variant="rectangular"
                        width={290}
                        height={150}
                        animation="wave"
                        sx={{ bgcolor: "grey.800" }}
                        style={{ borderRadius: "10px" }}
                    />
                })}
        </div>
        }
    </>
}