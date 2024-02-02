import { useContext } from "react";
import { fomatterDallarToWon } from "../utils/fommeter";
import CartContext from '../store/CartContext'
import Button from "./Button";

export default function Card({food}) {
  const cartCtx = useContext(CartContext);

  function handleAddCart() {
    cartCtx.addItem(food);
  }

  return (
    <section className="bg-[#1d1a16] rounded-2xl overflow-hidden text-center shadow-sm">
      <article className="flex flex-col justify-between h-full">
        <img className="w-full h-80 object-cover" src={`http://localhost:3000/${food.image}`} alt={name} />
        <h3 className="text-2xl font-bold my-3 mx-0">{food.name}</h3>
        <div className="inline-block bg-[#312c1d] text-[#ffc404] text-[0.9rem] font-bold py-2 px-8 mx-auto my-0 rounded">
          {fomatterDallarToWon(food.price)}
        </div>
        <p className="m-4">{food.description}</p>
        <Button cssType="fill" addStyle=" mb-6 mx-auto" onClick={handleAddCart}>Add to Cart</Button>
      </article>
    </section>
  )
}