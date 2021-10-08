import React from 'react';
import { useTranslation } from 'react-i18next'

import classes from './Order.module.scss';

type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

interface IOrderProps {
  name: string,
  ingredients: { [k in Ingredient]: number },
  price: number,
}

const Order: React.FunctionComponent<IOrderProps> = (props) => {
  let ingredients = []
  let name: Ingredient

  for(name in props.ingredients) {
    ingredients.push(
      {
        name,
        amount: props.ingredients[name]
      }
    )
  }

  const { t } = useTranslation()

  return (
    <div className={classes.Order}>
      <p>{t('order.name')}{props.name}</p>
      <p>{t('order.ingredients')}{
        ingredients.map((ig, i) =>
          <span key={ig.name}>{t(`ingredients.${ig.name}`)}({ig.amount}){i < (ingredients.length - 1) && ', '}</span>
        )}
      </p>
      <p>{t('order.price')}<strong>{props.price.toFixed(2)}$</strong></p>
    </div>
  );
};

export default Order;
