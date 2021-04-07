import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

//TODO revise map and reduce
const burger = ( props ) => {
    let transformedIngredient = Object.keys(props.ingredients)
        .map(
            igKey => {
                return [...Array(props.ingredients[igKey])]
                    .map( ( _ , index) => {
                        return <BurgerIngredient 
                            key={igKey + index} 
                            type={igKey} 
                            />
                    })  
            } 
        ).reduce(
            (arr, el) => {
                return arr.concat(el)
            } , [] 
        ); 
    console.log(transformedIngredient.length);
    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please add ingredients</p>;
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;