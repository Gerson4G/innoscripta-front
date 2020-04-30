import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import '../css/App.css';
import pizzaImg from '../imgs/pizza.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
  },
  gridList: {
    width: 500,
    height: 450,
    padding: '15px',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const pizzaData = [
  {
    id: 1,
    img: pizzaImg,
    title: 'Margarita',
    price: 20,
  },
  {
    id: 2,
    img: pizzaImg,
    title: 'Granjera',
    price: 20,
  },
  {
    id: 3,
    img: pizzaImg,
    title: 'Tocineta',
    price: 20,
  },
  {
    id: 4,
    img: pizzaImg,
    title: 'FullPizza',
    price: 20,
  },
];

const Menu = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Pizza options</ListSubheader>
        </GridListTile>
        {pizzaData.map((pizza) => (
          <GridListTile key={pizza.img} className="menu-option">
            <Link to={`/pizza/${pizza.id}`}>
                <img src={pizza.img} alt={pizza.title} />
            </Link>
            <GridListTileBar
              title={pizza.title}
              subtitle={<span>Cost: {pizza.price}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${pizza.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
export default Menu;