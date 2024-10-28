import { screen } from "@testing-library/react";
import { Sort } from "../components/Sort/index";
import { renderWithProviders } from "../test-utils";

describe("Sort Component", () => {
  test("renders sort component", () => {
    renderWithProviders(<Sort />);
    expect(screen.getByText("Sort by")).toBeInTheDocument();
  });
});
