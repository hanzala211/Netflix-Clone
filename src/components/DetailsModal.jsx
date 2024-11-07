import { ApiCalls } from "../assets/ApiCalls";
import { DetailsProvider, useSelect, useUI } from "../context/moviesContext";
import { MovieDetails } from "./MovieDetails";
import { ClipLoader } from "react-spinners";

export function DetailsModal() {
    const { selectedID } = useSelect();
    const { modalLoading } = useUI();
    return <DetailsProvider>
        {!modalLoading ? <div className={`fixed inset-0 z-[10000] flex justify-center transition-opacity duration-500 delay-1000 ${selectedID ? "opacity-100" : "opacity-0 pointer-events-none"
            } overflow-y-auto custom-scrollbar`}
        ><MovieDetails /></div>
            : <div className="fixed inset-0 z-[10000] h-[100vh] flex justify-center items-center"><ClipLoader size={70} color="#ED0000" /></div>}
        <ApiCalls />
    </DetailsProvider>
} 