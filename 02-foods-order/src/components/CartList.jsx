export default function CartList({name, price, count, addItem, removeItem}) {
  const btnClasses = "flex justify-center items-center text-base w-6 h-6 rounded-full border-none bg-[#312c1d] text-[#ffc404] hover:bg-[#1d1a16] hover:text-[#ffab04] active:bg-[#1d1a16] active:text-[#ffab04]";
  return (
    <li className="flex justify-between items-center my-2 mx-0">
      <p className="m-0">{name} - {count} x {price}</p>
      <div className="flex gap-4 items-center">
        <button className={btnClasses} type="button" onClick={removeItem}>-</button>
        <p className="m-0">{count}</p>
        <button className={btnClasses} type="button" onClick={addItem}>+</button>
      </div>
    </li>
  ) 
}