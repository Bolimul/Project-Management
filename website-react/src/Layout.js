import { Outlet, Link} from "react-router-dom";

const Layout = () => {
    return(
        <>
        <nav>
            <div>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
            </div>
        </nav>
        <Outlet/>
        </>
    )
};

export default Layout;