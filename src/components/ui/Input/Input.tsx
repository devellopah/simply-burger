import * as React from 'react';
import classes from './Input.module.scss'

interface IInputProps {
  elementType: string,
  type: string,
  name: string,
  value: string,
  placeholder: string,
  changed: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

const Input: React.FunctionComponent<IInputProps> = (props) => {

  let inputElement;

  switch(props.elementType) {
    case('input') :
      inputElement = <input className={classes.element} type={props.type} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.changed}/>
      break;
    case ('textarea'):
      inputElement = <textarea className={classes.element} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.changed}/>
      break;
    default:
      inputElement = <input className={classes.element} type={props.type} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.changed}/>
  }

  return (
    <p className={classes.field}>
      <label className={classes.label}>
        {inputElement}
      </label>
    </p>
  );
};

export default Input;
