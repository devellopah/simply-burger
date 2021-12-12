import { Ingredients } from './../actions/types';
import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Order {
  id?: string,
  ingredients: Ingredients,
  price: number,
  localId: string,
  orderData: OrderData,
}

export type Orders = Order[]
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
    history.push('/')
    return { order, id: response.data.name}
  }
)

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async ({ idToken, localId }: { idToken: string | null, localId: string}) => {
    const response: { data: Orders } = await axios.get('https://react-burger-d4ed6.firebaseio.com/orders.json', {
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
    return orders
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(purchaseBurger.pending, (state) => {
        state.loading = true
      })
      .addCase(purchaseBurger.fulfilled, (state, action) => {
        const order = { ...action.payload.order, id: action.payload.id }
        state.loading = false
        state.orders.push(order)
      })
      .addCase(purchaseBurger.rejected, (state) => {
        state.loading = false
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false
      })
  }
})

export default orderSlice.reducer