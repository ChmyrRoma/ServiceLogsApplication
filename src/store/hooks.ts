import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, StoreType } from "./store";

export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
