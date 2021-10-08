import * as React from 'react';
import classes from './Toolbar.module.scss'
import Logo from '../../Logo'
import NavItems from '../NavItems'
import menuToggler from '../../../assets/images/menu-toggler.svg'

export interface IToolbarProps {
  sideDrawerShowed: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void),
  isAuth: boolean,
}

export default class Toolbar extends React.Component<IToolbarProps> {
  public render() {
    return (
      <header className={classes.toolbar}>
        <button onClick={this.props.sideDrawerShowed} className={classes.menuToggler}>
          <img src={menuToggler} alt="menu toggler"/>
        </button>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav className={[classes.nav, classes.desktopOnly].join(' ')}>
          <NavItems isAuth={this.props.isAuth} />
        </nav>
      </header>
    );
  }
}
