export function PlaySvg() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlayStandard" aria-hidden="true"><path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="black"></path></svg>;
}
export function ISvg() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="CircleIStandard" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>;
}

export const moviesData = [
    {
        heading: "International Movies",
        category: "popular"
    },
    {
        heading: "New On Netflix",
        region: "https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&primary_release_year=2024"
    },
    {
        heading: "Watch It Again",
        region: 'https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US'
    },
    {
        heading: "Comedy Movies",
        category: "top_rated"
    },
    {
        heading: "Movies In India",
        region: "https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-IN&region=IN"
    },
    {
        heading: "Movies In Turkey",
        region: "https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_origin_country=TR"
    },
    {
        heading: "Movies In US",
        region: "https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=16"
    },
    {
        heading: "Top Rated Movies Today",
        region: "https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US"
    },
    {
        heading: "Horror",
        region: "https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=27"
    }
]
export const showsData = [
    {
        heading: "Action and Adventures",
        region: `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=10759`
    },
    {
        heading: "War & Politics",
        region: `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=10768`
    },
    {
        heading: "Comedy",
        region: `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=35`
    },
    {
        heading: "Crime",
        region: `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=80`
    },
    {
        heading: "Mystery",
        region: `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=9648`
    },
    {
        heading: "Sci-Fi & Fantasy",
        region: `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=10765`
    },
    {
        heading: "International TV Shows",
        region: `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=37`
    },
]

export function MessageSvg({ color }) {
    return <svg xmlns="http://www.w3.org/2000/svg" fill={color} role="img" viewBox="0 0 16 16" width="16" height="16" data-icon="SubtitlesSmall" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M0 1.75C0 1.33579 0.335786 1 0.75 1H15.25C15.6642 1 16 1.33579 16 1.75V12.25C16 12.6642 15.6642 13 15.25 13H12.75V15C12.75 15.2652 12.61 15.5106 12.3817 15.6456C12.1535 15.7806 11.8709 15.785 11.6386 15.6572L6.80736 13H0.75C0.335786 13 0 12.6642 0 12.25V1.75ZM1.5 2.5V11.5H7H7.19264L7.36144 11.5928L11.25 13.7315V12.25V11.5H12H14.5V2.5H1.5ZM6 6.5L3 6.5V5L6 5V6.5ZM13 7.5H10V9H13V7.5ZM3 9V7.5L9 7.5V9L3 9ZM13 5H7V6.5H13V5Z" fill={color}></path></svg>
}