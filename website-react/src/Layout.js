import { Outlet, Link} from "react-router-dom";

const Layout = () => {
    return(
        <>
        <nav>
            <div>
            <ul>
                <li>
                    <Link to="/login"><button>Login</button></Link>
                </li>
                <li>
                    <Link to="/register"><button>Register</button></Link>
                </li>
            </ul>
            </div>
            
        </nav>
        <Outlet/>
        </>
    )
};

export default Layout;