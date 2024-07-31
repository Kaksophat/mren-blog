import { configureStore , combineReducers} from '@reduxjs/toolkit'
import userreducer  from './user/userslice'
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import themereducer from "./theme/themeslice"
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({
  user : userreducer ,
  theme: themereducer
})


const persistConfig = {
  key : "root",
  storage,
  version:1


}

const persisteReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
    reducer : persisteReducer,
    middleware:(getDefaultMiddleware)=>
      getDefaultMiddleware({serializableCheck: false})

})

export const persistor = persistStore(store)