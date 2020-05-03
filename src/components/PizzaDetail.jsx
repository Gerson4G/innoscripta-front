import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { pizzaData } from '../data/pizzas';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NextWeekOutlinedIcon from '@material-ui/icons/NextWeekOutlined';
import { ContextData } from './AppProvider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../css/PizzaDetail.css';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    padding: '20px',
    margin: '20px',
    boxShadow: '10px 5px 5px gray',
  }
});

const PizzaDetail = ({match}) => {
    const [quantity, setQuantity] = useState(0);
    const { params: {id} } = match;
    const pizza = pizzaData.find( pizza => pizza.id === parseInt(id, 10));
    const classes = useStyles();

    return (
      <ContextData>
        {({ setCart, cart }) => (
          <div className={classes.container}>
              <Card className={classes.root} variant="outlined">
              <CardContent>
                  <img src={pizza.img} alt={pizza.title} />
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {pizza.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                      Ingredients:
                      <List component="nav">
                        { pizza.ingredients.map( ingredient => 
                          <ListItem>
                            <ListItemText primary={ingredient} />
                          </ListItem>
                        )}
                      </List>
                  </Typography>
              </CardContent>
              <CardActions>
              <TextField
                id="pizza-quantity"
                label="Quantity"
                type="number"
                value={quantity}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                placeholder="How many pizzas"
                size="small"
                onChange={({target: {value}}) => setQuantity(parseInt(value, 10))}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<AddShoppingCartIcon/>}
                onClick={ () => setCart([...cart, {...pizza, quantity}])}
              >
                Add to shopping cart
              </Button>
              <Link to="/checkout">
                <Button
                  variant="contained"
                  color="default"
                  endIcon={<NextWeekOutlinedIcon/>}
                >
                  Buy
                </Button>
              </Link>
              </CardActions>
              </Card>
          </div>
        )}
      </ContextData>
    );
}

export default PizzaDetail;