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
import TableWithContent from "../Search";
import EntryForm from '../EntryForm';
import LookUp from '../LookUp';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Config from "../../Config";
const drawerWidth = 240;

const styles = (theme: any) => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "crimson"
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
      key: 1,
      path: "/",
      exact: true,
      label: "Donor Directory Search",
      icon: <SearchIcon />,
      main: () => <TableWithContent />
    },
    {
      key: 2,
      path: "/directory-lookup",
      exact: true,
      label: "Donor Directory Lookup",
      icon: <LookUpIcon />,
      main: () =><LookUp />
      
    },
    {
      key: 3,
      path: "/registerDonor",
      exact: true,
      label: "New Donor Entry",
      icon: <AddIcon />,
      main: () =><EntryForm />
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
            Welcome, {Config.AUTH.username} !
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
      {/* <div style={
        {
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: "20px",
      }
      }>
        <img style={ {boxShadow: "1px 3px 1px #9E9E9E", borderRadius: "50%" }} src={require('./../../assets/icons/mars-icon.jpg')} width="100" height="100"/>
      </div> */}
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {routes.map(routes => (
            <Link key={routes.key} to={routes.path}>
            <ListItem button key={routes.key}>
              <ListItemIcon key={routes.key}>
               {routes.icon}
              </ListItemIcon>
              <ListItemText primary={routes.label} />
            </ListItem>
            </Link>
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
            exact={route.exact}
            component={route.main}
          />
        ))}
      </main>
    </div>
    </Router>
  );

}

export default withStyles(styles)(PermanentDrawerLeft);
