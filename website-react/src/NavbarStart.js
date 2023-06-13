import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";
import NavBarSigned from "./NavBarSigned";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const StyledIconButton = styled(IconButton)({
  marginLeft: "10px", // Increase the left margin to move the hamburger icon to the right
});

const StyledListItemText = styled(ListItemText)({
  fontSize: "20rem", // Increase the size of the text inside the menu
  fontFamily: "'Courier New', Courier, monospace", // Change the font
  textAlign: "left", // Text align to right
});

const StyledDrawer = styled(Drawer)({
  width: "350px", // Increase the width of the drawer
  ".MuiDrawer-paper": {
    width: "200px", // This makes sure the drawer paper also have same width as drawer
  },
});

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
    const navLinks = [
      { title: "Home", path: "/home", state: 0 },
      { title: "Login", path: "/login", state: 2 },
      { title: "Register", path: "/register", state: 2 },
    ];

    switch (this.state.nS) {
      case 0:
        return <NavBarSigned />;
      case 2:
        return (
          <AppBar position="static">
            <Toolbar>
              <StyledLink to="/">Welcome to Doctor Web</StyledLink>
              <StyledIconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={this.handleClick}
              >
                <MenuIcon />
              </StyledIconButton>
              <StyledDrawer
                anchor="left"
                open={this.state.openNav}
                onClose={this.handleClick}
              >
                <IconButton onClick={this.handleClick}>
                  <CloseIcon />
                </IconButton>
                <List>
                  {navLinks.map(({ title, path, state }, index) => (
                    <StyledLink
                      to={path}
                      key={index}
                      onClick={() => this.setState({ nS: state })}
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
      default:
        return null;
    }
  }
}

export default NavbarStart;
