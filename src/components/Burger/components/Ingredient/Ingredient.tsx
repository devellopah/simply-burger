import classes from './Ingredient.module.scss';

export interface IIngredientProps {
  type: string,
}

const Ingredient = (props: IIngredientProps) => {
  let item = null

  switch (props.type) {
    case ('bread-bottom'):
      item = <div className={classes.BreadBottom}></div>
      break;
    case ('bread-top'):
      item = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      )
      break;
    case ('meat'):
      item = <div className={classes.Meat}></div>
      break;
    case ('cheese'):
      item = <div className={classes.Cheese}></div>
      break;
    case ('salad'):
      item = <div className={classes.Salad}></div>
      break;
    case ('bacon'):
      item = <div className={classes.Bacon}></div>
      break;
    default:
      item = null;
  }

  return item;
}

export default Ingredient