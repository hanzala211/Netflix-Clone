import { Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

export function LayOut() {
    return <>
        <Nav />
        <Outlet />
        <Footer />
    </>
}
