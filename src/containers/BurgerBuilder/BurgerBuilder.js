import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    } 

    updatePurchaseState = (updatedIngredients) => {
        const sum = Object.keys(updatedIngredients).map(
            igKey => {
                return updatedIngredients[igKey];
            }
        ).reduce(
            (sum, el) => {
                return sum + el;
            }, 0);
        
        this.setState({purchaseable: sum > 0})
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

        this.updatePurchaseState(updatedIngredients);
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

        this.updatePurchaseState(updatedIngredients);
    } 

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancellHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = (props) => {
        alert('Hey');
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] === 0)
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancellHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        purchaseCancelled={this.purchaseCancellHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    order={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;