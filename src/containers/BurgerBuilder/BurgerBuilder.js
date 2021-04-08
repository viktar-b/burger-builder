import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    } 

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        
        //state should be update in immutable way 
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    } 

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] === 0) return null;
        
        const newCount = this.state.ingredients[type] - 1;

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    } 

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] === 0)
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;