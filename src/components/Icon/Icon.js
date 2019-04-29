import React from 'react'

import Edit from './Edit'



const Icon = props => {
    switch(props.name) {
      case "edit":
        return <Edit {...props} />;
    //   case "messages":
    //     return <Messages {...props} />;
      default:
        return <div />;
    }
  }
  export default Icon;