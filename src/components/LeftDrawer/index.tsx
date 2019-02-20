// @TODO
// 1.Improve styling
// 2.Manage Routes to remaining links 
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import LookUpIcon from "@material-ui/icons/FindInPage";
import AddIcon from "@material-ui/icons/NoteAdd";
import UpdateIcon from "@material-ui/icons/Edit";
import TableWithContent from ".././LookUp";
import EntryForm from '../EntryForm';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const drawerWidth = 240;

const styles = (theme: any) => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

function PermanentDrawerLeft(props: any) {
  const routes = [
    {
      path: "/search-donor",
      label: "Donor Directory Search",
      icon: <SearchIcon />,

    },
    {
      path: "/directory-lookup",
      label: "Donor Directory Lookup",
      icon: <LookUpIcon />,
      main: () => <TableWithContent />
    },
    {
      path: "/registerDonor",
      label: "New Donor Entry",
      icon: <AddIcon />,
      main: () =><EntryForm />
    },
    {
      path: "/update-donor",
      label: "Update Donors Record",
      icon: <UpdateIcon />,

    }
  ];
  const { classes } = props;
  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Welcome, Blood Bank !
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {routes.map(routes => (
            <ListItem button key={routes.label}>
            <Link to={routes.path}>
              <ListItemIcon>
               {routes.icon}
              </ListItemIcon>
              <ListItemText primary={routes.label} />
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            component={route.main}
          />
        ))}
      </main>
    </div>
    </Router>
  );

}

export default withStyles(styles)(PermanentDrawerLeft);
