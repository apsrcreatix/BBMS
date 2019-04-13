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
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import LookUpIcon from "@material-ui/icons/FindInPage";
import AddIcon from "@material-ui/icons/NoteAdd";
import TableWithContent from "../Search";
import EntryForm from '../EntryForm';
import LookUp from '../LookUp';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Config from "../../Config";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Serums from "../PUS/Serums";
import Kits from "../PUS/Kits";
import Chemicals from '../PUS/Chemicals';
import BloodBags from '../PUS/BloodBag';
import InputBlood from '../Inputs/Blood';
import InputStock from '../Inputs/Stocks';
import InputScreen from '../Inputs/Screening';
import InputDiscard from '../Inputs/Discard';
import InputGrouping from '../Inputs/Grouping';
import InputInfectious from '../Inputs/Infectious';
import InputPreparation from '../Inputs/Preparation';
import InputReject from '../Inputs/Rejects';
import Analytics from '../Analytics';
import OutputBlood from '../Output/Blood';

const drawerWidth = 200;

const styles = (theme: any) => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "default"
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
interface props{
  classes:any
}
class PermanentDrawerLeft extends React.Component<props,{}>{
 state = {
  openPUS:false,
  openInputs:false,
  openAnalytics:false,
  openOutput:false
 };

 handleClick = (name: any) => (event: any) => {
   if(name=="openPUS") this.setState({openPUS:!this.state.openPUS});
   if(name=="openInputs") this.setState({openInputs:!this.state.openInputs});
   if(name=="openAnalytics") this.setState({openAnalytics:!this.state.openAnalytics});
   if(name=="openOutput") this.setState({openOutput:!this.state.openOutput});
  };

  render(){

    const ROUTES = [
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
        main: () => <EntryForm />
      },
      {
        key: 91,
        path: "/analytics",
        exact: true,
        label: "Analytics",
        icon: <AddIcon />,
        main: () => <Analytics />
      }      
    ];

    const PUS_OPTIONS = [
      {
        key: 4,
        path: "/serums",
        exact: true,
        label: "Serums",
        icon: <AddIcon />,
        main: () => <Serums />
      },
      {
        key: 5,
        path: "/kits",
        exact: true,
        label: "Kits",
        icon: <AddIcon />,
        main: () => <Kits />
      },
      {
        key: 6,
        path: '/chemicals',
        exact: true,
        label: "Chemicals",
        icon: <AddIcon />,
        main: () => <Chemicals />
      },
      {
        key: 7,
        path: '/bloodbags',
        exact: true,
        label: "BloodBags",
        icon: <AddIcon />,
        main: () => <BloodBags />
      }
    ];


    const INPUT_OPTIONS = [
      {
        key: 8,
        path: "/input/blood",
        exact: true,
        label: "Blood",
        icon: <AddIcon />,
        main: () => <InputBlood />
      },
      {
        key: 9,
        path: "/input/stock",
        exact: true,
        label: "Stocks",
        icon: <AddIcon />,
        main: () => <InputStock />
      },
      {
        key: 10,
        path: '/input/screening',
        exact: true,
        label: "Screening",
        icon: <AddIcon />,
        main: () => <InputScreen />
      },
      {
        key: 11,
        path: '/input/discard',
        exact: true,
        label: "Discard",
        icon: <AddIcon />,
        main: () => <InputDiscard />
      },
      {
        key: 12,
        path: '/input/grouping',
        exact: true,
        label: "Grouping",
        icon: <AddIcon />,
        main: () => <InputGrouping />
      },
      {
        key: 13,
        path: '/input/infectious',
        exact: true,
        label: "Infectious",
        icon: <AddIcon />,
        main: () => <InputInfectious />
      },
      {
        key: 14,
        path: '/input/preparation',
        exact: true,
        label: "Preparation",
        icon: <AddIcon />,
        main: () => <InputPreparation />
      },
      {
        key: 15,
        path: '/input/reject',
        exact: true,
        label: "Reject",
        icon: <AddIcon />,
        main: () => <InputReject />
      }
    ];

    
    const OUTPUT = [
      {
        key: 20,
        path: "/output/blood",
        exact: true,
        label: "Blood",
        icon: <AddIcon />,
        main: () => <OutputBlood />
      },
      {
        key: 21,
        path: "/output/blood-master-record",
        exact: true,
        label: "Blood Master Record",
        icon: <AddIcon />,
        main: () => <OutputBlood />
      },
      {
        key: 22,
        path: "/output/cross-matching",
        exact: true,
        label: "Cross Matching",
        icon: <AddIcon />,
        main: () => <OutputBlood />
      },
      {
        key: 23,
        path: "/output/patient-grouping",
        exact: true,
        label: "Patient Grouping",
        icon: <AddIcon />,
        main: () => <OutputBlood />
      },
      {
        key: 24,
        path: "/output/sample-preservation",
        exact: true,
        label: "Sample Preservation",
        icon: <AddIcon />,
        main: () => <OutputBlood />
      }
    ];

  const { classes } = this.props;

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
            <div className={classes.toolbar} />
            <List>
              {ROUTES.map(routes => (
                <Link key={routes.key} to={routes.path}>
                <Divider/>
                  <ListItem button key={routes.key}>
                    <ListItemText primary={routes.label} />
                  </ListItem>
                </Link>
              ))}
              <Divider />
              <ListItem button onClick={this.handleClick("openPUS")}>
                <ListItemText inset primary="PUS" />
                {this.state.openPUS ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.openPUS} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {PUS_OPTIONS.map(options => (
                    <Link key={options.key} to={options.path}>
                      <ListItem button className={classes.nested}>
                        <ListItemText inset primary={options.label} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
              <Divider />
              <ListItem button onClick={this.handleClick("openInputs")}>
                <ListItemText inset primary="Inputs" />
                {this.state.openInputs ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.openInputs} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {INPUT_OPTIONS.map(options => (
                    <Link key={options.key} to={options.path}>
                      <ListItem button className={classes.nested}>
                        <ListItemText inset primary={options.label} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
              <Divider />
              <ListItem button onClick={this.handleClick("openOutput")}>
                <ListItemText inset primary="Output" />
                {this.state.openOutput ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.openOutput} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {OUTPUT.map(options => (
                    <Link key={options.key} to={options.path}>
                      <ListItem button className={classes.nested}>
                        <ListItemText inset primary={options.label} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
              <Divider />
            </List>
            
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />

            {[...ROUTES,...PUS_OPTIONS,...INPUT_OPTIONS,...OUTPUT].map((route, index) => (
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
}

export default withStyles(styles)(PermanentDrawerLeft);
