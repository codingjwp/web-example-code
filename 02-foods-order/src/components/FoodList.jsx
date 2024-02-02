import { useFetch } from "../hooks/useFetch";
import Card from "./Card";
import Error from "./Error";

const requestConfig = {};

export default function FoodList() {
  const { isFetching, error, data } = useFetch('http://localhost:3000/meals', requestConfig, []);

  return (
    <>
      <main className="meal">
        {isFetching && <div className="text-[#ffc404] text-xl font-bold text-center">Data fetch Loading....</div>}
        {error.hasError && <Error title="Failed to fetch foods" message={error.message} />}
        {(!isFetching && !error.hasError && data) 
          && data.map((food) => 
            <Card key={food.id} food={food} />)}
      </main>
    </>
  )
}