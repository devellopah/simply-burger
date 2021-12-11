import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../app/store';

export const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.75,
  meat: 1.5,
  bacon: 1,
}
export type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

export interface Ingredients {
  salad: number,
  bacon: number,
  cheese: number,
  meat: number,
}
export interface BuilderState {
  ingredients: Ingredients | null,
  totalPrice: number,
  error: boolean,
}

export interface ResPayload {
  data: Ingredients
}

const initialState: BuilderState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
}

export const fetchIngredients = createAsyncThunk(
  'builder/fetchIngredients',
  async () => {
    const response: ResPayload = await axios.get('https://react-burger-d4ed6.firebaseio.com/ingredients.json')
    // dispatch(setIngredients(response.data.ingredients))
    return response.data
    // try {
    // }
    // catch (error) {
    //   dispatch(fetchIngredientsFailed())
    // }
  }
)

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      if(state.ingredients) {
        state.ingredients[action.payload] += 1
      }
      state.totalPrice += INGREDIENT_PRICES[action.payload]
    },
    removeIngredient: (state, action: PayloadAction<Ingredient>) => {
      if(state.ingredients) {
        state.ingredients[action.payload] -= 1
      }
      state.totalPrice -= INGREDIENT_PRICES[action.payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload ?? null
        state.totalPrice = 0
        state.error = false
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.error = true
      })
  }
})

export const { addIngredient, removeIngredient } = builderSlice.actions
export default builderSlice.reducer
