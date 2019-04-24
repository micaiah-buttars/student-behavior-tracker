import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Nav extends Component {

  render() {
    console.log('NAV PROPS', this.props)
    return (
        <div>
            <h1>nav</h1>
            

        </div>
    );
  }
}

// const mapState = (reduxState) => {
//   return reduxState
// }
// export default connect(mapState)(Nav)