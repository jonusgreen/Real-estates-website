import React from 'react'
import classes from './navbar.module.css'
import {Link } from 'react-router-dom'
import { BsHouseDoor } from 'react-icons/bs';


export const Navbar = () => {
  return (
    <div className='class.container'>
      <div className={classes.wrapper}>
        <Link to='/' className={classes.left}>
        Real Estate <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
          <li className={classes.listItem}>Home</li>
          <li className={classes.listItem}>About</li>
          <li className={classes.listItem}>Featured</li>
          <li className={classes.listItem}>Contact</li>
        </ul>
        <div className={classes.right}>
          <Link to='/Signup'>Sign Up</Link>
          <Link to='/Signin'>Sign in</Link>
        </div>
      </div>
    </div>
  )
}
export default Navbar