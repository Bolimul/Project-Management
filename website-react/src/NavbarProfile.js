import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import Home from "./Home";
import PersonalAreaPostsSaved from "./PersonalAreaPostsSaved";
import StatisticalInfo from "./StatisticalInfo";
import PersonalInfo from "./PersonalInfo";
import FollowingUsers from "./FollowingUsers";

class NavbarProfile extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Area
          </Typography>
          <Button color="inherit" component={RouterLink} to="/home">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/savedPosts">
            Posts
          </Button>
          <Button color="inherit" component={RouterLink} to="/analytics">
            Analytics
          </Button>
          <Button color="inherit" component={RouterLink} to="/personalInfo">
            Info
          </Button>
          <Button color="inherit" component={RouterLink} to="/following_users">
            Following Users
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavbarProfile;
