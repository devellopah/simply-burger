import React from 'react'
import { useTranslation } from 'react-i18next'

import Burger from '../../Burger'
import Button from '../../ui/Button'
import classes from './CheckoutSummary.module.scss'
import { Ingredients } from '../../../store/actions/types'

interface ICheckoutSummaryProps {
  ingredients: Ingredients,
  clicked: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const CheckoutSummary: React.FunctionComponent<ICheckoutSummaryProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div className={classes.CheckoutSummary}>
      <h1>{t('builder.checkout')}</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
        {/* <Button btnType="danger">{t('actions.cancel')}</Button> */}
        <Button btnType="success" clicked={props.clicked}>{t('actions.continue')}</Button>
    </div>
  )
}

export default CheckoutSummary
