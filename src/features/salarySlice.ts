import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Stooge = 'month' | 'day' | 'hour' | 'mrot';
export interface Values {
  input: number;
  checkNDFL: boolean;
  stooge: Stooge;
  salaryOnHands: number;
  ndfl: number;
  salaryInMonth: number;
  salaryOnDay: number;
  salaryOnHour: number;
}

const initialState: Values = {
  input: 0,
  checkNDFL: true,
  stooge: 'month',
  ndfl: 0,
  salaryOnHands: 0,
  salaryInMonth: 0,
  salaryOnDay: 0,
  salaryOnHour: 0,
};

function ndflOun(params: number): number {
  return +((params * 13) / 87).toFixed();
}
function ndflIn(params: number): number {
  return +((params / 100) * 13).toFixed();
}

export const salarySlice = createSlice({
  name: 'salary',
  initialState,
  reducers: {
    inputValue: (state, action: PayloadAction<number>) => {
      state.input = action.payload;
      if (state.checkNDFL) {
        state.salaryOnHands = state.input;
        state.salaryInMonth = state.input + ndflOun(action.payload);
        state.ndfl = ndflOun(action.payload);
      } else {
        state.salaryInMonth = action.payload - ndflIn(action.payload);
        state.salaryOnHands = action.payload;
        state.ndfl = ndflIn(action.payload);
      }
    },
    withNDFL: (state, action: PayloadAction<boolean>) => {
      state.checkNDFL = action.payload;
      state.ndfl = ndflOun(state.input);
      if (state.checkNDFL) {
        state.salaryOnHands = state.input;
        state.salaryInMonth = state.input + ndflOun(state.input);
      } else {
        state.salaryOnHands = state.input - ndflIn(state.input);
        state.ndfl = ndflIn(state.input);
        state.salaryInMonth = state.input;
      }
    },
    inStooge: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'month':
          state.salaryOnDay = state.input;
          break;
        case 'day':
          state.salaryOnDay = +(state.input / 24).toFixed();
          break;
        case 'hour':
          state.salaryOnDay = +(state.input / 192).toFixed();
          break;
        default:
          return state;
      }
    },
  },
});

export const { inputValue, withNDFL, inStooge } = salarySlice.actions;
export default salarySlice.reducer;
