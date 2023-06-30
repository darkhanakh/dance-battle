import { createBrowserRouter } from "react-router-dom";
import { MentorSelection, Hero, Game } from "../pages";
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
  {
    path: "/game",
    element: (
      <>
        <Navbar />
        <Game />
      </>
    ),
  },
]);

export default routes;
