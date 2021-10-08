import * as React from 'react';
import { useTranslation } from 'react-i18next'
import Button from '../../../../../ui/Button'
import classes from './Control.module.scss'

export interface IControlProps {
  label: string,
  quantity: number,
  added: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  removed: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const Control = (props: IControlProps) => {
  const { t } = useTranslation()

  return (
    <div className={classes.Control}>
      <div className={classes.label}>{t(`ingredients.${props.label.toLowerCase()}`)}</div>
      <Button className={classes.less} clicked={props.removed} disabled={!props.quantity} >{t('controls.less')}</Button>
      <Button className={classes.more} clicked={props.added} >{t('controls.more')}</Button>
    </div>
  );
}

export default Control