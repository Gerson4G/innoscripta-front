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
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { ContextData } from './AppProvider';
import CloseIcon from '@material-ui/icons/Close';

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

    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    
    const [message, showMessage] = React.useState({isOpen: false, text: null});

    const [user, logUser] = React.useState({});

    const login = async () => {
      const body = { email, password };
      const res = (await fetch(`https://innoscripta-back.herokuapp.com/api/users/login/`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      }))
      const data = await res.json();
      if(res.status === 404 || res.status === 401){
        showMessage({isOpen: true, text: data});
      }
      else{
        showMessage({isOpen: true, text: `Welcome Back ${data.email}`});
        logUser(data);
      }
    }

    const signup = async () => {

        const body = { email, password };
        (await fetch(`hhttps://innoscripta-back.herokuapp.com/api/users`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          },
        })).json()
        .then(data => showMessage({isOpen: true, text: "User Created! Now you can sign up"}))
    }

    const popoverOpen = Boolean(anchorEl);
    const id = popoverOpen ? 'simple-popover' : undefined;


    return(
        <AppBar position="static">
          <ContextData>
            {({ setUser }) => (
              <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={message.isOpen}
              autoHideDuration={2000}
              onClose={() => showMessage({isOpen: false})}
              message={message.text}
              onEntered={() => { if(user.email)setUser(user)}}
              action={
                  <IconButton size="small" aria-label="close" color="inherit" onClick={() => showMessage({isOpen: false})}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
              }
              />
            )}
          </ContextData>
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Button onClick={() => toggle(true)}><ShoppingCartOutlined style={{color: "white"}}/></Button>
                <Drawer anchor={'left'} open={open} onClose={() => toggle(false)}>
                    <Cart/>
                </Drawer>
            </IconButton>
            <Link to="/"><Button color="primary" variant="contained">Pizzas Menu</Button></Link>
            <Button style={{marginLeft: "10px"}} onClick={handleClick} variant="contained" color="primary">{user?.email ?? 'Login'}</Button>
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
                <TextField style={{padding: "0 3px"}} label="Email" onChange={ ({target: {value}}) => setEmail(value)}/>
                <TextField style={{padding: "0 3px"}} label="Password" onChange={ ({target: {value}}) => setPassword(value)}/>
                <Button  variant="contained"  style={{verticalAlign: "bottom"}} color="primary" onClick={login}>Login</Button>
                <Button  variant="outlined"  style={{verticalAlign: "bottom", marginLeft: "10px"}} color="primary" onClick={signup}>Sign Up</Button>
              </div>
            </Popover>
        </AppBar>
    );
}
