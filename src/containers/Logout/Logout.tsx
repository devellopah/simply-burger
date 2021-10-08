import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions/index'
import { AppState } from '../../store';

export interface ILogoutProps {
  logout: typeof logout,
}

const Logout = ({ logout }: ILogoutProps) => {

  useEffect(() => { logout() }, [logout])

  return <Redirect to="/" />
}

export default connect(
  (state:AppState) => ({ isAuth: state.auth.idToken !== null }),
  { logout }
)(Logout);
