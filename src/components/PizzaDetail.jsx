import React, {useState} from 'react';
import { Link } from 'react-router-dom';
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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import { useQuery } from 'react-query';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
    const [quantity, setQuantity] = useState(1);
    const { params: {id} } = match;
    const classes = useStyles();

    const fetchPizza = async () => {
      return await (await fetch(`http://localhost:8000/api/pizza-info/${id}`, {headers: {'Content-Type': 'application/json', "Accept": "application/json",}})).json()
    }
  
    const {isFetching, data: pizza} = useQuery('fetchPizza', fetchPizza);
    if(isFetching){
      return <CircularProgress thickness={2} size={"20"} />;
    }
      return (
        <ContextData>
          {({ setCart, cart }) => (
            <div className={classes.container}>
                <Card className={classes.root} variant="outlined">
                <CardContent>
                  <div>
                    <Typography align="center" variant="h2" color="textPrimary" gutterBottom>
                      Pizza {pizza.name}
                    </Typography>
                  </div>
                  <div>
                    <span><img src={pizza.image_url} alt={pizza.name} style={{width: "40%"}}/></span>
                    <span style={{display: "inline-block", verticalAlign: "top", padding: "0 40px"}}>
                      <Typography className={classes.pos} variant="h4" color="textSecondary">
                          Ingredients:
                          <List component="nav">
                            { pizza.pizza_ingredients ? pizza.pizza_ingredients.map( ({ingredient}) => 
                              <ListItem divider key={ingredient}>
                                <ListItemText primary={ingredient} />
                              </ListItem>
                            ) : null}
                          </List>
                      </Typography>
                    </span>
                  </div>
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
                  error={quantity < 1}
                  style={{width: "5em", textAlign: "center"}}
                />
                <AddPizza setCart={setCart} cart={cart} pizza={pizza} quantity={quantity}/>
                <Link to="/checkout">
                  <Button
                    variant="contained"
                    color="default"
                    endIcon={<NextWeekOutlinedIcon/>}
                  >
                    Checkout
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

const AddPizza = ({setCart, cart, pizza, quantity}) => {
  const [open, setOpen] = React.useState(false);
  const [tooltipOpen, setMessage] = React.useState(false);

  const handleTooltipClose = () => {
    setMessage(false);
  };

  const handleTooltipOpen = () => {
    setMessage(true);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
       <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={tooltipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="Quantity MUST be positive greather than 0"
        >
          <Button
              variant="contained"
              color="primary"
              endIcon={<AddShoppingCartIcon/>}
              onClick={ () => {
                if(quantity < 1){
                  handleTooltipOpen();
                }
                else{
                  setCart([...cart, {...pizza, quantity}]);
                  handleClick();
                }
              }}
              minValue={1}
            >
              Add to shopping cart
          </Button>
        </Tooltip>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Pizza Added!"
        action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
        }
      />
    </div>
  );
}