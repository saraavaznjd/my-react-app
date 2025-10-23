import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { appDispatch,RootState } from "./store.js";

export const useAppDispatch : () => appDispatch = useDispatch
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector