import { AnyAction, combineReducers } from '@reduxjs/toolkit';

import { serviceLogsSlice, IServiceLogsReducer } from "./serviceLog";

export interface StoreState {
    serviceLogs: IServiceLogsReducer
}

export const combinedReducers = combineReducers({
    [serviceLogsSlice.name]: serviceLogsSlice.reducer,
});

export type Store = ReturnType<typeof combinedReducers>;

const rootReducer = (state: Store, action: AnyAction) => combinedReducers(state, action);

export default rootReducer;
