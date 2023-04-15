import React from 'react'

const Footer = () => {
  return (
    <div className='main-footer' style={style.mainFooter}>
      <footer>
        <h3>LuisDevLipe</h3>
      </footer>
    </div>
  )
}
const style= {
  mainFooter:{
    height:"150px",
    width:"100%",
    background:"lightgrey",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
  }
}
export default Footer