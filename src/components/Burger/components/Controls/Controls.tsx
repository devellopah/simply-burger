import * as React from 'react';
import { useTranslation } from 'react-i18next'
import Control from './components/Control'
import classes from './Controls.module.scss'
import { Ingredient, Ingredients } from '../../../../store/actions/types'

const controls :{label: string, type: Ingredient}[] = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
]

export interface IControlsProps {
  ingredients: Ingredients,
  ingredientAdded: (type: Ingredient) => void,
  ingredientRemoved: (type: Ingredient) => void,
  ordered: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  price: number,
  isPurchasing: boolean,
  isAuth: boolean,
}

const Controls = (props: IControlsProps) => {
  const { t } = useTranslation()

  return (
    <div className={classes.Controls}>
      <p>{t('builder.price')} <strong>{props.price.toFixed(2)}$</strong></p>
      {controls.map(item =>
        <Control
          key={item.label}
          label={item.label}
          quantity={props.ingredients[item.type]}
          added={() => props.ingredientAdded(item.type)}
          removed={() => props.ingredientRemoved(item.type)}
        />
      )}
      <button
        disabled={!props.price}
        className={classes.OrderButton}
        onClick={props.ordered}
      >
        {props.isAuth ? t('claims.nowOrder') : t('claims.signinOrder')}
      </button>
    </div>
  );
}

export default Controls