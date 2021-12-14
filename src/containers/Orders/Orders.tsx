import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import HashLoader from "react-spinners/HashLoader";
import axios from '../../axios-orders'
import withError from '../../hoc/withError'
import Order from '../../components/Order'
import { RootState } from '../../store'
import { Orders as OrdersType, fetchOrders } from '../../store/reducers/orderSlice'
import tw from '../../services/tailwind'

export interface IOrdersProps {
  orders: OrdersType,
  loading: boolean,
  idToken: string,
  localId: string,
  fetchOrders: typeof fetchOrders,
}

const Orders = ({ orders, loading, localId, fetchOrders }: IOrdersProps) => {

  useEffect(() => {
    const idToken = localStorage.getItem('idToken')
    fetchOrders({ idToken, localId })
  }, [fetchOrders, localId])

  return loading
    ? <HashLoader size={100} color={tw.theme.colors.yellow['900']} />
    : <div>
        {orders.map(order =>
          <Order
            key={order.id}
            price={+order.price}
            ingredients={order.ingredients}
            name={order.orderData.name}
          />
        )}
      </div>
}

export default connect(
  (state: RootState) => ({
    ...state.order,
    idToken: state.auth.idToken,
    localId: state.auth.localId
  }),
  { fetchOrders }
)(withError(Orders, axios))