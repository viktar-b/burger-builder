import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render(){

        const ingredientSummary = Object.keys(this.props.ingredients).map(
            (igKey,index) => {
                return <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>
                            {igKey}
                        </span>:
                        {' ' + this.props.ingredients[igKey]}
                    </li>
            }
        );

        return(
            <Aux>
                <h3>Your order</h3>
                <p>Ingredient summary:</p>
                <ul>
                    {ingredientSummary}
                </ul>

                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>

                <Button
                    btnType="Danger"
                    clicked={this.props.purchaseCancelled}
                >
                    Cancel
                </Button>

                <Button
                    btnType="Success"
                    clicked={this.props.purchaseContinued}
                >
                    Continue
                </Button>
            </Aux>
        );
    }
};

export default OrderSummary;