import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from './home.reducer'

function Home({ number, increase, decrease }) {
  return (
    <div>
      Some state changes:
      {number}
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
    </div>
  )
}

export default connect(
  function (state) { console.log("state",state);return ({ number: state.home.number });},
  { increase, decrease }
)(Home)
