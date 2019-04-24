import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

export default class Nav extends Component {

  render() {
    // console.log('NAV PROPS', this.props)
    return (
        <div className='navContainer'>


        {this.props.backLink ? <Link to={this.props.backLink}>{'<'}</Link>
        : <div></div>}

        <h3>{this.props.pageTitle}</h3>

        {this.props.buttonAction ? <button onClick={this.props.buttonAction}>{this.props.buttonLabel}</button>
        
      : <div></div>}


            
            

        </div>
    );
  }
}

// const mapState = (reduxState) => {
//   return reduxState
// }
// export default connect(mapState)(Nav)