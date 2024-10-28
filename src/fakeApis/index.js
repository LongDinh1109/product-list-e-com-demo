import { createServer } from "miragejs";
import products from "./products.json";
import categories from "./categories.json";
export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = "api";

      this.get("/products", (schema, request) => {
        const page = parseInt(request.queryParams.page || 1);
        const pageSize = parseInt(request.queryParams.pageSize || 5);
        const filter = request.queryParams.filter
          ? JSON.parse(request.queryParams.filter)
          : {
              price: "all",
              category: "all",
              rating: "all",
            };
        const sort = request.queryParams.sort || "";

        const filteredProducts = products.filter((product) => {
          return Object.keys(filter).every((key) => {
            if (filter[key] === "all") return true;

            if (key === "category") {
              return (
                product[key] ===
                categories.find((category) => category.id === filter[key]).name
              );
            }
            if (key === "rating") {
              if (filter[key] === 0) return true;
              return product[key] === filter[key];
            }
            if (key === "price") {
              const [min, max] = filter[key];
              return product[key] >= min && product[key] <= max;
            }
            return true;
          });
        });

        const sortedProducts = filteredProducts.sort((a, b) => {
          switch (sort) {
            case "price-desc":
              return b.price - a.price;
            case "price-asc":
              return a.price - b.price;
            case "rating-desc":
              return a.rating - b.rating;
            case "rating-asc":
              return b.rating - a.rating;
            case "name-asc":
              return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            case "name-desc":
              return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
            default:
              return 0;
          }
        });

        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
        const total = filteredProducts.length;

        return {
          products: paginatedProducts,
          pagination: {
            total,
            page: page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
          },
        };
      });

      this.get("/products/search", (schema, request) => {
        const search = request.queryParams.search;       

        if (!search) {
          return {
            products: [],
            total: 0,
          };
        }

        const searchResults = products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        );
        
        return {
          products: searchResults,
          total: searchResults.length,
        };
      });

      this.get("/categories", () => {
        return {
          data: categories,
        };
      });
    },
  });

  return server;
}
