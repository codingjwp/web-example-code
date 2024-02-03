import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMM = [
  {
    id: 'p1', price: 6, title: 'My first Book', description: 'The first book I ever worte'
  },
  {
    id: 'p2', price: 4, title: 'My second Book', description: 'The second book I ever worte'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMM.map((item) =>
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        )}
      </ul>
    </section>
  );
};

export default Products;
