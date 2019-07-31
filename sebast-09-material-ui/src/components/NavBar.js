import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const NavBar = () => {
  return (
    <div red>
      <AppBar position="static" red>
        <Toolbar red>
          <Typography variant="title" color="inherit">
            Kiwi Travel Planner
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
