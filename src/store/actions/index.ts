import axios from 'axios'
import * as types from './types'
import { Dispatch } from 'redux'

export const setIngredients = (ingredients: types.Ingredients) => ({ type: types.SET_INGREDIENTS, ingredients })
export const addIngredient = (ingredient: types.Ingredient) => ({ type: types.ADD_INGREDIENT, ingredient })
export const removeIngredient = (ingredient: types.Ingredient) => ({ type: types.REMOVE_INGREDIENT, ingredient })
export const fetchIngredientsFailed = () => ({ type: types.FETCH_INGREDIENTS_FAILED })

export const purchaseBurgerStarted = () => ({ type: types.PURCHASE_BURGER_STARTED })
export const purchaseBurgerSuccessed = (order:types.Order, id:string) => ({ type: types.PURCHASE_BURGER_SUCCESSED, order, id })
export const purchaseBurgerFailed = (error:object) => ({ type: types.PURCHASE_BURGER_FAILED, error })

export const fetchOrdersStarted = () => ({ type: types.FETCH_ORDERS_STARTED })
export const fetchOrdersSuccessed = (orders: types.Orders) => ({ type: types.FETCH_ORDERS_SUCCESSED, orders })
export const fetchOrdersFailed = (error: object) => ({ type: types.FETCH_ORDERS_FAILED, error })

export const authStarted = () => ({ type: types.AUTH_STARTED })
export const authSuccessed = (localId :string, idToken :string) => ({ type: types.AUTH_SUCCESSED, localId, idToken })
export const authFailed = (error: object) => ({ type: types.AUTH_FAILED, error })

export const logout = () => {
  localStorage.removeItem('idToken')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('localId')

  return { type: types.AUTH_LOGOUT }
}

const checkAuthTimeout = (expiresIn: number, dispatch:Dispatch) => setTimeout(() => dispatch(logout()), expiresIn * 1000);

export const logInMaybe = (): types.AppThunk => dispatch => {
  const idToken = localStorage.getItem('idToken')
  if (!idToken) return dispatch(logout())
  const expirationDate = new Date(localStorage.getItem('expirationDate')!)
  if (expirationDate > new Date()) {
    dispatch(authSuccessed(localStorage.getItem('localId')!, idToken))
    checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000, dispatch)
  } else {
    dispatch(logout())
  }
}

export const authenticate = ({ email, password, isLogin }: {email: string, password: string, isLogin: boolean}): types.AppThunk => async dispatch => {
  try {
    dispatch(authStarted())
    const API_KEY = 'AIzaSyD77mZ0A4HPCD8-heTNpvq3nWEnOvq_qNo'
    const payload = { email, password, returnSecureToken: true}
    const { data: { localId, idToken, expiresIn } } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? 'signInWithPassword' : 'signUp'}?key=${API_KEY}`, payload)
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('localId', localId)
    localStorage.setItem('expirationDate', '' + expirationDate)
    dispatch(authSuccessed(localId, idToken))
    checkAuthTimeout(expiresIn, dispatch)
  } catch (error) {
    dispatch(authFailed(error.response.data.error))
  }
}

export const initIngredients = (): types.AppThunk => async dispatch => {
  try {
    const response = await axios.get('https://react-burger-d4ed6.firebaseio.com/ingredients.json')
    const ingredients:types.Ingredients = response.data
    dispatch(setIngredients(ingredients))
  } catch (error) {
    dispatch(fetchIngredientsFailed())
  }
}

export const purchaseBurger = (idToken:string, order:types.Order, history: any): types.AppThunk => async dispatch => {
  try {
    dispatch(purchaseBurgerStarted())
    const response = await axios.post(`https://react-burger-d4ed6.firebaseio.com/orders.json?auth=${idToken}`, order)
    dispatch(purchaseBurgerSuccessed(order, response.data.name))
    history.push('/')
  } catch (error) {
    dispatch(purchaseBurgerFailed(error))
  }
}

export const fetchOrders = (idToken:string|null, localId:string): types.AppThunk => async dispatch => {
  try {
    dispatch(fetchOrdersStarted())
    const response = await axios.get('https://react-burger-d4ed6.firebaseio.com/orders.json', {
      params: {
        auth: idToken,
        orderBy: '"localId"',
        equalTo: `"${localId}"`,
      }
    })
    const orders = []
    for (let key in response.data) {
      orders.push({ ...response.data[key], id: key })
    }
    dispatch(fetchOrdersSuccessed(orders))
  } catch (error) {
    dispatch(fetchOrdersFailed(error))
  }
}