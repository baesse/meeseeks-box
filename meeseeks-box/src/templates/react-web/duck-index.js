const ducksTemplateIndexDefault = `
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
const appReducer = history =>
  combineReducers({
   
  });
const Reducers = history => appReducer(history);
export default Reducers;
`
module.exports.ducksTemplateIndexDefault = ducksTemplateIndexDefault
