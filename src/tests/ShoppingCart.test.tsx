import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ShoppingCartPage from "../components/ShoppingCart/index";
import { renderWithProviders } from "../test-utils";
import { RootState } from "../redux/store";
import {CartState} from "../redux/slices/CartSlice";

describe("ShoppingCart Component", () => {
  const initialState : Partial<RootState>= {
    cart: {
      items: [{ id: 1, title: "Test Item", price: 10.99, quantity: 2 }],
      totalAmount: 21.98,
      totalQuantity: 2
    } as CartState,
  };

  // test('renders cart items and total', () => {
  //   const store = mockStore(initialState);
  //   render(
  //     <Provider store={store}>
  //       <ShoppingCartPage onClose={() => {}} />
  //     </Provider>
  //   );

  //   expect(screen.getByText('Test Item')).toBeInTheDocument();
  //   expect(screen.getByText('Total: $21.98')).toBeInTheDocument();
  // });
  test("renders cart items and total", () => {
    renderWithProviders(<ShoppingCartPage onClose={() => {}} />,{
      preloadedState: initialState
    });

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Total: $21.98")).toBeInTheDocument();
  });
});
