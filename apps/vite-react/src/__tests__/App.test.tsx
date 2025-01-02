import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import App from "../App";

describe("App", () => {
  it("should mount the App component", () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll("svg")).toHaveLength(4);
  });
});
