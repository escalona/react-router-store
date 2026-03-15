import type { ReactElement } from "react";
import { render, type RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router";

interface RenderWithRouterOptions {
  route?: string;
}

export function renderWithRouter(
  ui: ReactElement,
  { route = "/" }: RenderWithRouterOptions = {},
): RenderResult {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}
