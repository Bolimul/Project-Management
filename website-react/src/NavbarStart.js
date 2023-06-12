import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import NavBar_Signed from "./NavBar_Signed";

class NavbarStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nS: 2,
      openNav: false,
    };
  }

  handleClick = () => {
    this.setState({ openNav: !this.state.openNav });
  };

  render() {
    const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/home" onClick={() => this.setState({ nS: 0 })}>
            Home
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/login" onClick={() => this.setState({ nS: 2 })}>
            Login
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/register" onClick={() => this.setState({ nS: 2 })}>
            Register
          </Link>
        </Typography>
      </ul>
    );

    switch (this.state.nS) {
      case 0:
        return <NavBar_Signed />;
      case 2:
        return (
          <>
            <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
              <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                  as="a"
                  href="#"
                  className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                  Your Logo
                </Typography>
                <div className="flex items-center gap-4">
                  <div className="mr-4 hidden lg:block">{navList}</div>
                  <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={this.handleClick}
                  >
                    {this.state.openNav ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </IconButton>
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => this.setState({ nS: 1 })}
                    className="hidden lg:inline-block"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
              <MobileNav open={this.state.openNav}>{navList}</MobileNav>
            </Navbar>
          </>
        );
      default:
        return null;
    }
  }
}

export default NavbarStart;
