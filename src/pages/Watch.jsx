import { useEffect, useRef, useState } from "react";
import { useMovies, useSelect, useUI } from "../context/moviesContext";
import { PropagateLoader, PulseLoader } from "react-spinners";
import { FaPause, FaPlay } from "react-icons/fa";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export function Watch() {
    const { setPlayData, playData, setUrl, url } = useMovies();
    const navigate = useNavigate();
    const { selectedPlay } = useUI();
    const { setSelectedID } = useSelect();
    const [loading, setLoading] = useState();
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFull, setIsFull] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const handleLoading = () => setIsVideoLoading(true);
        const handlePlaying = () => setIsVideoLoading(false);
        video.addEventListener("loadstart", handleLoading);
        video.addEventListener("waiting", handleLoading);
        video.addEventListener("playing", handlePlaying);
        video.addEventListener("canplay", handlePlaying);
        video.addEventListener("canplaythrough", handlePlaying);

        return () => {
            video.removeEventListener("loadstart", handleLoading);
            video.removeEventListener("waiting", handleLoading);
            video.removeEventListener("playing", handlePlaying);
            video.removeEventListener("canplay", handlePlaying);
            video.removeEventListener("canplaythrough", handlePlaying);
        };
    }, []);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '096a25c359msh70e2224e7c8e258p11401ajsn6fb8a6b37e32',
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };
        async function data() {
            try {
                setLoading(true);
                const response = await fetch(`https://yt-api.p.rapidapi.com/search?query=${selectedPlay?.title || selectedPlay?.original_name}Trailer`, options);
                const result = await response.text();
                const data = await JSON.parse(result);
                const movie = await data.data[0];
                setPlayData(movie);
            } catch (error) {
                console.error(error);
            }
        }
        data();
    }, [selectedPlay, setPlayData]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '096a25c359msh70e2224e7c8e258p11401ajsn6fb8a6b37e32',
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };
        async function fetchData() {
            if (selectedPlay) {
                try {
                    async function fetchData() {
                        const response = await fetch(`https://yt-api.p.rapidapi.com/dl?id=${playData.videoId}&cgeo=DE`, options);
                        return response.json();
                    };
                    let data = await fetchData();
                    if (data.error === "Retry") {
                        data = await fetchData();
                    }
                    if (data?.adaptiveFormats?.[0]) {
                        setUrl(data.adaptiveFormats[0]);
                    } else {
                        console.error("No adaptiveFormats found in the response");
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchData();
    }, [selectedPlay, playData.videoId, setUrl]);

    const togglePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const time = e.target.value;
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleTimeUpdate = () => {
        const current = videoRef.current.currentTime;
        setCurrentTime(current);
        setRemainingTime(videoRef.current.duration - current);
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
        setRemainingTime(videoRef.current.duration);
    };

    const toggleFullscreen = async () => {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
            setIsFull(false);
            await unlockOrientation();
        } else if (playerRef.current.requestFullscreen) {
            await playerRef.current.requestFullscreen();
            setIsFull(true);
            await lockOrientation("landscape");
        }
    };

    const lockOrientation = async (orientation) => {
        if (window.screen.orientation && window.screen.orientation.lock) {
            try {
                await window.screen.orientation.lock(orientation);
            } catch (error) {
                console.error("Orientation lock failed:", error);
            }
        }
    };

    const unlockOrientation = async () => {
        if (window.screen.orientation && window.screen.orientation.unlock) {
            await window.screen.orientation.unlock();
        }
    };

    const getSeekBackground = () => {
        const percentage = (currentTime / duration) * 100;
        return {
            background: `linear-gradient(to right, red ${percentage}%, #555 ${percentage}%)`
        };
    };

    function calculateTime() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = Math.floor(remainingTime % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <div className="overflow-hidden w-full">
            {loading ? (
                <div className="fixed inset-0 z-[10000]">
                    <PulseLoader color="#BE0D08" className="absolute z-[10000] rounded-xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                </div>
            ) : (
                <div ref={playerRef} className="relative w-full">
                    <video
                        ref={videoRef}
                        autoPlay
                        className="w-full h-[100vh] relative object-fill"
                        src={url.url}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onPlay={() => lockOrientation("landscape")}
                        onPause={unlockOrientation}
                    ></video>
                    {isVideoLoading && (
                        <div className="fixed inset-0 z-[10000] pointer-events-none">
                            <PropagateLoader color="#BE0D08" className="absolute z-[10000] rounded-xl top-1/2 -translate-y-1/2 left-1/2" />
                        </div>
                    )}
                    <button
                        className="absolute top-8 left-7 hover:scale-125 transition-transform duration-200 ease-in-out"
                        onClick={() => {
                            setPlayData([]);
                            setUrl([]);
                            setSelectedID(null);
                            navigate("/browse");
                        }}
                    >
                        <FaArrowLeftLong className="text-[30px]" />
                    </button>
                    <div className="absolute bottom-16 left-0 w-full bg-transparent bg-opacity-50 text-white pr-7 flex items-center justify-between">
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            className="custom-range flex-grow mx-4"
                            style={getSeekBackground()}
                        />
                        <p>{calculateTime()}</p>
                    </div>
                    <div className="absolute bottom-4 left-0 w-full bg-transparent bg-opacity-50 text-white px-5 flex items-center flex-row justify-between">
                        <button onClick={togglePlayPause} className="mr-4 hover:scale-125 transition-transform duration-200 ease-in-out">
                            {isPlaying ? <FaPause className="text-[25px]" /> : <FaPlay className="text-[25px]" />}
                        </button>
                        <div>
                            <button onClick={toggleFullscreen} className="mr-4 hover:scale-125 transition-transform duration-200 ease-in-out">
                                {isFull ? <RiFullscreenExitLine className="text-[30px]" /> : <RiFullscreenFill className="text-[30px]" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
