import { createBrowserRouter } from "react-router-dom";
import { MentorSelection } from "../pages";
import Hero from "../pages/Hero.tsx";
import Navbar from "../components/layout/Navbar.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Hero />
      </>
    ),
  },
  {
    path: "/character-selection",
    element: (
      <>
        <Navbar />
        <MentorSelection />
      </>
    ),
  },
]);

export default routes;
