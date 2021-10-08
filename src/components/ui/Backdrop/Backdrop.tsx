import React from 'react';
import classes from './Backdrop.module.scss';

interface IBackdropProps {
  show: boolean,
  clicked: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void),
}

const Backdrop: React.FunctionComponent<IBackdropProps> = (props) => (
  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)

export default Backdrop;
