import { Ingredients } from './../actions/types';
import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface Order {
  id?: string,
  ingredients: Ingredients,
  price: number,
  localId: string,
  orderData: object,
}

export interface OrderData {
  deliveryMethod: string,
  email: string,
  name: string,
  postal: string,
  street: string,
}

export interface OrderState {
  orders: object[],
  loading: boolean,
}

const initialState: OrderState = {
  orders: [],
  loading: false,
}

export const purchaseBurger = createAsyncThunk(
  'order/purchaseBurger',
  async ({ idToken, order, history }: { idToken: string, order: Order, history: any}) => {
    const response: { data: OrderData } = await axios.post(`https://react-burger-d4ed6.firebaseio.com/orders.json?auth=${idToken}`, order)
    // dispatch(purchaseBurgerSuccessed(order, response.data.name))
    history.push('/')
    return response.data
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

  },
})