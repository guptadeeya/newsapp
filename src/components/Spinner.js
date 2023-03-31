import React, { Component } from 'react'
import loading from './loading.gif'

const Spinner = (props) => {

    return (
      <div className='text-center'>
        <img clas="my-3" src={loading} alt="loading"/>
      </div>
    )
  
}
export default Spinner
