import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from '../../../ui/Button'
import { Ingredient, Ingredients } from '../../../../store/actions/types'

interface IOrderSummaryProps {
  ingredients: Ingredients,
  continued: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  cancelled: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  price: number,
}

const OrderSummary: React.FunctionComponent<IOrderSummaryProps> = (props) => {
  const { t } = useTranslation()

  const ingredientSummary = Object.keys(props.ingredients)
    .map((key) => {
        const ingredient = key as Ingredient
        return (
          <li key={ingredient}><span>{t(`ingredients.${ingredient}`)}</span>: {props.ingredients[ingredient]}</li>
        )
      })

  return (
    <>
      <h3>{t('precheckout.title')}</h3>
      <p>{t('precheckout.text')}</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>{t('precheckout.price')} <strong>{props.price.toFixed(2)}$</strong></p>
      <p>{t('precheckout.continue')}</p>
      <Button btnType="danger" clicked={props.cancelled}>{t('actions.cancel')}</Button>
      <Button btnType="success" clicked={props.continued}>{t('actions.continue')}</Button>
    </>
  )
}

export default OrderSummary
