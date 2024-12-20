import Skeleton from '@mui/material/Skeleton';
import { moviesData } from "../assets/Constants";
import { HeroSection } from "../components/HeroSection";
import { TitleCards } from "../components/TitleCards";
import { useMovies, useUI } from "../context/moviesContext";
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';


export function Home() {
    const { loading, setLoading } = useUI();
    const { setApiData, setHeroImage, apiKey } = useMovies();
    let storeTime = useRef(null);
    const [randomPage] = useState(Math.floor(Math.random() * 50) + 1);
    const location = useLocation();
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };
        async function fetchMovies() {
            if (location.pathname === "/browse") {
                try {
                    setLoading(true);
                    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${randomPage}`, options);
                    const result = await response.json();
                    const movies = result.results;
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
                } catch (error) {
                    console.error(error);
                }
                finally {
                    storeTime.current = setTimeout(() => {
                        setLoading(false);
                    }, 2500)
                }
            }
        }
        fetchMovies()
        return () => { clearTimeout(storeTime.current) }
    }, [randomPage, setApiData, setLoading, setHeroImage, apiKey]); // to render movie for the main Image
    function randomNumber(movies) {
        const randomHeroImage = Math.floor(Math.random() * movies.length) + 1;
        return randomHeroImage
    }
    return <>
        {!loading ? <section>
            <HeroSection />
            <div className="sm:-mt-[25vh] -mt-[9vh]">
                {moviesData.map((item, i) => {
                    return <>
                        <TitleCards key={i} index={i} obj={item} />
                    </>
                })
                }
            </div>
        </section > : <div className='flex gap-5 flex-wrap sm:p-4 p-5 sm:pt-[10rem] pt-[5rem]'>
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