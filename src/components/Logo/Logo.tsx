import React from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.scss'

interface ILogoProps {
}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  return (
    <NavLink exact to="/" className={classes.logo}>
      <img src={logo} alt="logo" className={classes.img} />
    </NavLink>
  );
};

export default Logo;