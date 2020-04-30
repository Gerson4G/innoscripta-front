import React from 'react';
import { pizzaData } from '../data/pizzas';

const PizzaDetail = ({match}) => {
    const { params: {id} } = match;
    const pizza = pizzaData.find( pizza => pizza.id === parseInt(id, 10));
    return(
        <div>
            <div> Pizza Detail for {pizza.title}</div>    
            <div> Price: {pizza.price}</div>    
        </div>
    );
}

export default PizzaDetail;