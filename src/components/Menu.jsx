import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useQuery } from 'react-query';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../css/App.css';

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
    height: 800,
    padding: '15px',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const Menu = () => {
  const classes = useStyles();

  const fetchPizzas = async () => {
    return await (await fetch(`https://innoscripta-back.herokuapp.com/api/pizza-info`, {headers: {'Content-Type': 'application/json', "Accept": "application/json",}})).json()
  }

  const {isFetching, data: pizzaData} = useQuery('fetchPizza', fetchPizzas);

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <Typography variant="h6" className={classes.title}>
                YUMMI PIZZA
          </Typography>
        </GridListTile>
        {(isFetching || !Array.isArray(pizzaData)) ? <CircularProgress thickness={2} size={"20"} /> : pizzaData.map((pizza) => (
          <GridListTile key={pizza.id} className="menu-option">
            <Link to={`/pizza/${pizza.id}`}>
                <img src={pizza.image_url} alt={pizza.name} style={{"height": "100%"}}/>
            </Link>
            <GridListTileBar
              title={pizza.name}
              subtitle={<span>Cost: {pizza.cost}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${pizza.name}`} className={classes.icon}>
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