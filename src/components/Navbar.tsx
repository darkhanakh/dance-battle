import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          n! Dance Battle
        </Link>
      </div>
    </>
  );
};

export default Navbar;
