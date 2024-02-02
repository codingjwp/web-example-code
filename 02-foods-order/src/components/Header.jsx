import logo from '../assets/logo.jpg';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext'


export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartCounter = cartCtx?.items?.reduce((totalNumber, item) => {
    return totalNumber + item.quantity;
  }, 0)

  return (
    <>
      <header className='flex justify-between items-center py-12 px-[10%] text-[#ffc404]'>
        <div className='flex gap-4 items-center'>
          <img className='w-16 h-16 object-contain rounded-full border-[#ffc404] border-2' src={logo} alt="Foods order app"/>
          <h1 className='uppercase text-[2rem] tracking-[0.2rem]  m-0 font-bold'>ReactFood</h1>
        </div>
        <button type='button' className='text-2xl' onClick={userProgressCtx.showCart}>Cart( {cartCounter} )</button>
      </header>
    </>
  )
}