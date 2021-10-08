import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import HashLoader from "react-spinners/HashLoader";
import axios from '../../axios-orders'
import withError from '../../hoc/withError'
import Order from '../../components/Order'
import * as types from '../../store/actions/types'
import { AppState } from '../../store'
import { fetchOrders } from '../../store/actions/'

export interface IOrdersProps {
  orders: types.Orders,
  loading: boolean,
  idToken: string,
  localId: string,
  fetchOrders: typeof fetchOrders,
}

const Orders = ({ orders, loading, localId, fetchOrders }: IOrdersProps) => {

  useEffect(() => {
    fetchOrders(localStorage.getItem('idToken'), localId)
  }, [fetchOrders, localId])

  return loading
    ? <HashLoader size={100} color={"#703b09"} />
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
  (state: AppState) => ({
    ...state.order,
    idToken: state.auth.idToken,
    localId: state.auth.localId
  }),
  { fetchOrders }
)(withError(Orders, axios))