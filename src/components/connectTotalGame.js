import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import action from 'action.js'

export default connect(
  state => state.totalGame,
  dispatch => bindActionCreators(action, dispatch)
)