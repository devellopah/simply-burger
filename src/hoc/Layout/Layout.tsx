import React, { useState } from 'react';
import { connect } from 'react-redux'
import Toolbar from '../../components/navigation/Toolbar'
import SideDrawer from '../../components/navigation/SideDrawer'
import classes from './Layout.module.scss';
import { AppState } from '../../store';

export interface ILayoutProps {
  children: React.ReactNode,
  isAuth: boolean,
}

const Layout = (props: ILayoutProps) => {

  const [isDrawerShowed, showDrawer] = useState(false)
  const sideDrawerCloseHandler = () => showDrawer(false)
  const sideDrawerShowHandler = () => showDrawer(true)

  return (
    <>
      <Toolbar
        sideDrawerShowed={sideDrawerShowHandler}
        isAuth={props.isAuth}
      />
      <SideDrawer
        open={isDrawerShowed}
        isAuth={props.isAuth}
        closed={sideDrawerCloseHandler}
      />
      <main className={classes.content}>
        {props.children}
      </main>
    </>
  );
}

export default connect(
  (state: AppState) => ({ isAuth: state.auth.idToken !== null })
)(Layout)
