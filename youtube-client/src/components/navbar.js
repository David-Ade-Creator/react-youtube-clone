import React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import VideoCallIcon from '@material-ui/icons/VideoCall';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import {
  makeStyles,
  useTheme,
  createStyles
} from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((Theme) =>
  createStyles({
    root: {
      display: "flex",
      color:'black',
      backgroundColor:'white'
    },
    drawer: {
      [Theme.breakpoints.up("xl")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    menuButton: {
      marginRight: Theme.spacing(2)
    },
    // necessary for content to be below app bar
    toolbar: Theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: Theme.spacing(3)
    }
  })
);


export default function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root} style={{color:'black'}} elevation={1}>
      <CssBaseline />
      <div position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'93vw'}}>
            <div>
              <Link to="/" style={{textDecoration:'none'}}>
              <span>Youtubetm</span>
              </Link>
            </div>
            <Hidden smDown>
            <div style={{marginRight:'20px'}}>
              <input style={{width:'30vw',height:'30px',outlineWidth:'none'}} placeholder="Search"/><IconButton><SearchIcon/></IconButton>
            </div>
            </Hidden>
            <Hidden mdDown>
            <div>
              <IconButton><VideoCallIcon style={{color:'black'}}/></IconButton>
              <IconButton><DashboardIcon style={{color:'black'}}/></IconButton>
              <IconButton><NotificationsIcon style={{color:'black'}}/></IconButton>
              <IconButton><Avatar/></IconButton>
            </div>
            </Hidden>
          </div>
        </Toolbar>
      </div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
