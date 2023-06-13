import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import "./App";
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

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const StyledIconButton = styled(IconButton)({
  marginLeft: "10px",
});

const StyledListItemText = styled(ListItemText)({
  fontSize: "1.5rem",
  fontFamily: "'Courier New', Courier, monospace",
  textAlign: "left",
});

const StyledDrawer = styled(Drawer)({
  width: "350px",
  ".MuiDrawer-paper": {
    width: "200px",
  },
});

const NavBar_Signed = () => {
  const [nS, setNS] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    await auth.signOut();
    console.log(auth.currentUser);
    setNS(2);
  };

  const navLinks = [
    { title: "home", path: "/home", state: 0 },
    { title: "profile", path: "/PersonalInfo", state: 1 },
    { title: "friends", path: "/FriendsPage", state: 0 },
    { title: "add friend", path: "/FriendSearch", state: 0 },
    { title: "blog", path: "/blog", state: 0 },
    { title: "sign out", path: "/sign-out", state: 2, onClick: handleSignOut },
    { title: "mode", path: "/mode", state: 0 },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let component = null;
  switch (nS) {
    case 2:
      return <NavbarStart />;
    case 1:
      return <NavbarProfile />;
    case 0:
      return (
        <AppBar position="static">
          <Toolbar>
            <StyledLink to="/home">Doctor Web</StyledLink>
            <StyledIconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </StyledIconButton>
            <StyledDrawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <IconButton onClick={handleDrawerToggle}>
                <CloseIcon />
              </IconButton>
              <List>
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
                      <StyledListItemText primary={title} />
                    </ListItem>
                  </StyledLink>
                ))}
              </List>
            </StyledDrawer>
          </Toolbar>
        </AppBar>
      );
  }
};

export default NavBar_Signed;
