import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-burger-d4ed6.firebaseio.com/'
})