import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import  { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
	// constuctor(props){
	//     super(props);
	//     this.state = { ... }
	// }
	state = {
		purchasing: false,
		loading: false,
		error: false
	}
	componentDidMount() {
		// axios.get('https://burger-7c9a6.firebaseio.com/ingredients.json')
		// 	.then(response => {
		// 		this.setState({ ingredients: response.data });
		// 	})
		// 	.catch(error => {
		// 		this.setState({ error: true })
		// 	});
	}

	updatePurchaseState(ingredients) {
		// const ingredients = {
		//     ...this.state.ingredients
		// };
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}

	purchasedCancelHandler = () => {
		this.setState({ purchasing: false });
	}

	purchasedContinuelHandler = () => {
		// console.log("you continue");
		this.props.history.push( '/checkout');
	}

	render() {
		const disabledInfo = {
			...this.props.ings
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />;
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={ this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						price={this.props.price}
						ordered={this.purchaseHandler} />
				</Aux>
			);
			orderSummary = <OrderSummary
				price={this.props.price}
				ingredients={this.props.ings}
				purchaseCancelled={this.purchasedCancelHandler}
				purchaseContinued={this.purchasedContinuelHandler} />;
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchasedCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings : state.ingredients,
		price : state.totalPrice
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded : (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName : ingName}),
		onIngredientRemoved : (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName : ingName})
	}
}

export default connect(mapStateToProps , mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios));


