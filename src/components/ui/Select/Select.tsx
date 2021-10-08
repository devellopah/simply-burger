import * as React from 'react';
import classes from './Select.module.scss'

interface ISelectProps {
  elementType: string,
  value: string,
  label: string,
  name: string,
  options: {
    value: string,
    text: string,
  }[],
  changed: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

const Select: React.FunctionComponent<ISelectProps> = (props) => {
  return (
    <p className={classes.field}>
      <label className={classes.label}>
        <span>{props.label}</span>
        <select name={props.name} className={classes.select} value={props.value} onChange={props.changed}>
          {props.options.map(el =>
            <option value={el.value} key={el.value}>{el.text}</option>
          )}
        </select>
      </label>
    </p>
  );
};

export default Select;
