import { Grid2 } from "@mui/material";
import Card from "../Card";
import { Product } from "../../redux/slices/ProductSlice";


interface ProductsGridProps {
  products: Product[]
  status: string
  handleAddToCart: (product: any) => void
}

export default function ProductsGrid({products, status, handleAddToCart}: ProductsGridProps) {  
  return (
    <>
      <Grid2 container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
        {products.length > 0 && status !== "loading" &&
          products.map((product: any) => (
            <Grid2 key={product.id} size={{ mobile: 6, tablet: 4, laptop: 3 }}>
              <Card
                title={product.title}
                price={product.price}
                image={product.image}
                onAddToCart={()=>handleAddToCart(product)}
                category={product.category}
                rating={product.rating}
              />
            </Grid2>
          ))}
      </Grid2>
      
    </>
  );
}
