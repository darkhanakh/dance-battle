import { createBrowserRouter } from "react-router-dom";
import { MentorSelection } from "../pages";
import Hero from "../pages/Hero.tsx";
import Navbar from "../components/Navbar.tsx";
import BattlePage from "../pages/BattlePage.tsx";

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
    path: "/battle",
    element: (
      <>
        <BattlePage/>
      </>
    )
  }
]);

export default routes;
