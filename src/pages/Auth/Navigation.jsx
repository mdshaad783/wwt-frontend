import React from 'react'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart, AiFillShop} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {Navigate} from 'react-router-dom'
import './Navigation.css'
import { useSelector,useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/usersApiSlice.js'
import { logout } from '../../redux/features/auth/authSlice.js'
import FavoritesCount from '../Products/FavoritesCount.jsx'
import { span } from 'prelude-ls'
import Logo from '../../svg/logo.svg';

const Navigation = () => {
  const {userInfo} = useSelector(state=>state.auth)
  const {cartItems} = useSelector((state)=>state.cart)
  const [dropdownOpen,setDropdownOpen] = useState(false)
  const [showSidebar,setShowSidebar] = useState(false)

  const toggleDropdown=()=>{
    setDropdownOpen(!dropdownOpen)
  }
  const toggleshowSidebar=()=>{
    setShowSidebar(!showSidebar)
  }
  const closeSidebar=()=>{
    setShowSidebar(false)
  }
  const dispatch = useDispatch()
  const navigate  = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async()=>{
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login")
    }catch(error){
        console.error(error);
      }
    }
  
  return (
    <div style={{zIndex:9999}} className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-gray-700 bg-gray-200 w-[4%] hover:w-[15%] h-[100vh]  fixed `}id='navigation-container'>

      <div className='flex flex-col justify-center space-y-4'>
        <Link to='/' className="flex items-center transition-transform transform flex-col">
          {/* <AiOutlineHome className='mr-2 mt-1' size={26}/> */}
          <img src={Logo} alt="" className="h-10 w-auto" />
          <span className="hidden nav-item-name font-bold shadow-lg px-1 mt-1 ">WalkWithTrends</span>{" "}
        </Link>
        <Link to='/' className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineHome className='mr-2 mt-[1rem]' size={26}/>
          <span className="hidden nav-item-name mt-4">HOME</span>{" "}
        </Link>

        <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineShopping className='mr-2 mt-[3rem]' size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>

        <Link to='/cart' className='flex relative'>
        <div className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShoppingCart className='mt-[3rem] mr-2' size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
        </div>
        <div className="absolute top-9">
          {cartItems.length > 0 && (
            <span>
              <span className="px-1 py-0 text-sm text-white bg-blue-500 rounded-full">
                {cartItems.reduce((a, c)=> a+c.qty, 0)}
              </span>
            </span>
          )}
        </div>

        </Link>

        <Link to='/favorite' className='flex relative transition-transform transform hover:translate-x-2'>
          <FaHeart className="mt-[3rem] mr-2" size={20}/>
          <span className="hidden nav-item-name mt-[3rem]">FAVOURITE</span>{" "}
          <FavoritesCount/>
        </Link>
      </div>

      <div className="relative">
        <button className="flex items-center text-gray-900 focus:outline-none" onClick={toggleDropdown}>
          {userInfo ? <span className="text-gray-900">{userInfo.username}</span>:(<></>)}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "" : "transform rotate-180"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
            <path 
              strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dropdownOpen ? "M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15":"M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"}
            />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo &&(
          <ul className={`absolute right-0 mt-2 mr-10 space-y-2 bg-gray-50 text-gray-900 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } `}>
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to='/admin/dashboard' className="block px-4 py-2 hover:bg-gray-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to='/admin/productlist' className="block px-4 py-2 hover:bg-gray-200">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to='/admin/categorylist' className="block px-4 py-2 hover:bg-gray-200">
                    Category
                  </Link>
                </li>
                <li>
                  <Link to='/admin/orderlist' className="block px-4 py-2 hover:bg-gray-200">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to='/admin/userlist' className="block px-4 py-2 hover:bg-gray-200">
                    Users
                  </Link>
                </li>
                
              </>
            )}
            <li>
                  <Link to='/profile' className="block px-4 py-2 hover:bg-gray-200">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                    Logout
                  </button>
                </li>
          </ul>
        )}
      </div>
        {!userInfo && (
      <ul>
        <li>
        <Link to='/login' className="flex items-center mt-5 transition-transform transform hover:translate-x-2">
          <AiOutlineLogin className="mr-2 mt-[4px]" size={26}/>
          <span className="hidden nav-item-name">LOGIN</span>{}
        </Link>
        </li>

        <li>
        <Link to='/register' className="flex items-center mt-5 transition-transform transform hover:translate-x-2">
          <AiOutlineUserAdd size={26}/>
          <span className="hidden nav-item-name">REGISTER</span>{}
        </Link>
        </li>

      </ul>
        )}
    </div>
  )
}

export default Navigation