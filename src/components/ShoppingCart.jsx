import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ContextData } from './AppProvider';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

export const Cart = props => {
    const classes = useStyles();

    return(
        <ContextData>
            {({ cart }) => (
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    {cart.length > 0 ? cart.map( pizza => 
                        <ListItem>
                            <ListItemIcon>
                               <img style={{height: '60px', padding: '10px'}} src={pizza.img} alt={pizza.title} />
                            </ListItemIcon>
                        <ListItemText primary={pizza.title} secondary={
                            <div>
                                <div>Quantity: {pizza.quantity}</div>
                                <div>SubTotal: {pizza.price * pizza.quantity}</div>
                            </div>
                        }/>
                    </ListItem>
                    )
                : <ListItem><ListItemText primary="No pizzas added to the shopping cart yet"/></ListItem>
                }
                    
            </List>
            )}
        </ContextData>
    );
}