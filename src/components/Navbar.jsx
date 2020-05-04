import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import Drawer from '@material-ui/core/Drawer';
import Popover from '@material-ui/core/Popover';
import { Cart } from './ShoppingCart';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export const Navbar = () => {
    const classes = useStyles();
    const [open, toggle] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const popoverOpen = Boolean(anchorEl);
    const id = popoverOpen ? 'simple-popover' : undefined;

    return(
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Button onClick={() => toggle(true)}><ShoppingCartOutlined/></Button>
                <Drawer anchor={'left'} open={open} onClose={() => toggle(false)}>
                    <Cart/>
                </Drawer>
            </IconButton>
            <Button  onClick={handleClick} color="inherit">Login</Button>
            </Toolbar>
            <Popover
                id={id}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
              <div style={{padding: "10px"}}>
                <TextField style={{padding: "0 3px"}} label="Email" />
                <TextField style={{padding: "0 3px"}} label="Password" />
                <Button  variant="contained"  style={{verticalAlign: "bottom"}} color="primary" onClick={() => login()}>Login</Button>
              </div>
            </Popover>
        </AppBar>
    );
}

const login = () => {

}