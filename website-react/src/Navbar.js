import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import NavbarProfile from "./NavbarProfile";
import NavbarStart from "./NavbarStart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import Home from "./Home";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const Navbar = () => {
  const [nS, setNS] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    await auth.signOut();
    console.log(auth.currentUser);
    setNS(2);
  };

  const navLinks = [
    { title: "home", path: "/", state: 0 },
    { title: "profile", path: "/PersonalInfo", state: 1 },
    { title: "friends", path: "/FriendsPage", state: 0 },
    { title: "add friend", path: "/FriendsSearch", state: 0 },
    { title: "blog", path: "/blog", state: 0 },
    { title: "sign out", path: "/Home", state: 2, onClick: handleSignOut },
    { title: "mode", path: "/mode", state: 0 },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  switch (nS) {
    case 2:
      return <NavbarStart />;
    case 1:
      return <NavbarProfile />;
    case 0:
      return (
        <AppBar position="static">
          <Toolbar>
            <StyledLink to="/home" style={{ flexGrow: 1 }}>
              Doctor Web
            </StyledLink>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: "1rem" }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <IconButton onClick={handleDrawerToggle}>
                <CloseIcon />
              </IconButton>
              <List sx={{ width: "200px" }}>
                {navLinks.map(({ title, path, state, onClick }, index) => (
                  <StyledLink
                    to={path}
                    key={index}
                    onClick={() => {
                      setNS(state);
                      if (onClick) onClick();
                    }}
                  >
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                  </StyledLink>
                ))}
              </List>
            </Drawer>
          </Toolbar>
        </AppBar>
      );
    default:
      return null;
  }
};

export default Navbar;
