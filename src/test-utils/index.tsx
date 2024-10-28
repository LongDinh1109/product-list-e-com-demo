import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { setupStore, RootState, AppStore } from "../redux/store";
import { TextEncoder, TextDecoder } from "util";
import { ReadableStream, WritableStream, TransformStream } from "stream/web";
Object.assign(global, {
  TextDecoder,
  TextEncoder,
  ReadableStream,
  WritableStream,
  TransformStream,
});

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
