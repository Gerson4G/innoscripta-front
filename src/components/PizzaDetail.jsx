import React from 'react';
import { pizzaData } from '../data/pizzas';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import '../css/PizzaDetail.css';


const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

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
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="quantity-order">Quantity</InputLabel>
                    <BootstrapInput id="quantity-order" placeholder="Quantity"/>
                </FormControl>
            </CardActions>
            </Card>
        </div>
    );
}

export default PizzaDetail;