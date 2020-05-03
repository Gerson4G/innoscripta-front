import React from 'react';
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
    const { params: {id} } = match;
    const pizza = pizzaData.find( pizza => pizza.id === parseInt(id, 10));
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Card className={classes.root} variant="outlined">
            <CardContent>
                <img src={pizza.img} alt={pizza.title} />
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                {pizza.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Ingredients:
                </Typography>
            </CardContent>
            <CardActions>
            <TextField
              id="pizza-quantity"
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              placeholder="How many pizzas"
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<AddShoppingCartIcon/>}
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
    );
}

export default PizzaDetail;