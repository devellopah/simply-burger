import React, { useState, useEffect } from 'react';
// import { browserHistory } from 'react-router-dom'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import axios from '../../axios-orders'
import Burger from '../../components/Burger'
import Controls from '../../components/Burger/components/Controls'
import OrderSummary from '../../components/Burger/components/OrderSummary'
import Modal from '../../components/ui/Modal'
import withError from '../../hoc/withError'
import { Ingredients } from '../../store/actions/types'
import { addIngredient, removeIngredient, initIngredients } from '../../store/actions'
import { AppState } from '../../store';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export interface IBurgerBuilderProps {
  history: any,
  ingredients: Ingredients,
  totalPrice: number,
  error: boolean,
  isAuth: boolean,
  addIngredient: typeof addIngredient,
  removeIngredient: typeof removeIngredient,
  initIngredients: typeof initIngredients,
}

export interface IBurgerBuilderState {
  isPurchasing: boolean,
  // loading: boolean,
}

const BurgerBuilder = (props: IBurgerBuilderProps, state: IBurgerBuilderState) => {
  const [isPurchasing, setisPurchasing] = useState(false)
  const { initIngredients } = props

  useEffect(() => { initIngredients() }, [initIngredients])

  const purchaseHandler = () => {
    props.isAuth
    ? setisPurchasing(true)
    : props.history.push('/auth')
  }

  const purchaseCancelHander = () => {
    setisPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    props.history.push('/checkout')
  }

  const orderSummary =
    <OrderSummary
      ingredients={props.ingredients}
      continued={purchaseContinueHandler}
      cancelled={purchaseCancelHander}
      price={props.totalPrice}
    />
  const content = <>
    <Burger ingredients={props.ingredients} />
    <Controls
      ingredients={props.ingredients}
      ingredientAdded={props.addIngredient}
      ingredientRemoved={props.removeIngredient}
      price={props.totalPrice}
      isPurchasing={isPurchasing}
      ordered={purchaseHandler}
      isAuth={props.isAuth}
    />
  </>
  const modal =
    <Modal show={isPurchasing} modalClosed={purchaseCancelHander}>
      {orderSummary}
    </Modal>

  return (
    <>
      {props.ingredients && modal}
      <HashLoader
        css={override}
        size={100}
        color={"#703b09"}
        loading={!props.ingredients}
      />
      {props.ingredients && content}
    </>
  )
}


export default withRouter(connect(
  (state: AppState) => ({ ...state.builder, isAuth: state.auth.idToken !== null }),
  { addIngredient, removeIngredient, initIngredients }
)(withError(BurgerBuilder, axios)))