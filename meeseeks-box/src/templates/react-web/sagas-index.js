
const sagaTemplateIndex = `
import { all } from "redux-saga/effects";
function* Sagas() {
  yield all([]);
}
export default Sagas;
`
module.exports.sagaTemplateIndex = sagaTemplateIndex
