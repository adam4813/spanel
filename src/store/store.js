import { createStore } from "redux";
import { rootReducer } from "../reducers/index";

// Create store with reducers and initial state .
const initialState = { list: { list: ["a", "b", "C"] } };
const store = createStore(rootReducer, initialState);

export { store };
