import { createBrowserRouter } from "react-router-dom";
import { MentorSelection, Hero, TestRhythm } from "../pages";
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
    path: "/test-game",
    element: (
      <>
        <Navbar />
        <TestRhythm />
      </>
    ),
  },
]);

export default routes;
