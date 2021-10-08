import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary'
import ContactData from '../Checkout/ContactData'
import { Ingredients } from '../../store/actions/types'
import { addIngredient, removeIngredient } from '../../store/actions'
import { AppState } from '../../store';

export interface ICheckoutProps {
  location: any,
  match: any,
  history: any,
  ingredients: Ingredients,
  totalPrice: number,
}

const Checkout = (props: ICheckoutProps) => {
  const handleSummaryContinue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.history.push({ pathname: `${props.history.location.pathname}/contact-data` })
  }

  return props.ingredients ? (
    <>
      <CheckoutSummary ingredients={props.ingredients} clicked={handleSummaryContinue}/>
      <Route path={props.match.path + '/contact-data'} component={ContactData} />
    </>
  ) : <Redirect to="/" />
}

const mapStateToProps = (state: AppState) => ({
  ingredients: state.builder.ingredients!,
  totalPrice: state.builder.totalPrice,
})

export default connect(mapStateToProps, { addIngredient, removeIngredient })(Checkout)