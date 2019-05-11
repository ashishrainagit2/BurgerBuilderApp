import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
// import {withRouter} from 'react-router-dom';

const burger = (props) =>{
    let transformedIngredients = Object.keys(props.ingredients) //["salad", "bacon", "cheese", "meat"]
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_ , i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr , el) => {
        return  arr.concat(el)
    } , []);


    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding Ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                {transformedIngredients}
                <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;
// export default withRouter(burger);