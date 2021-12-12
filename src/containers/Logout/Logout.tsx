import { useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/reducers/authSlice'
import { RootState } from '../../app/store';

export interface ILogoutProps {
  logout: typeof logout,
}

const Logout = ({ logout }: ILogoutProps) => {

  useEffect(() => { logout() }, [logout])

  return <Redirect to="/" />
}

export default connect(
  (state:RootState) => ({ isAuth: state.auth.idToken !== null }),
  { logout }
)(Logout);
