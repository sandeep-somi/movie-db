import { useDispatch } from "react-redux"
import { store } from "./store"

type TAppDispatch = typeof store.dispatch

const useAppDispatch = () => {
  const dispatch = useDispatch<TAppDispatch>()
  return {
    dispatch,
  };
}

export default useAppDispatch