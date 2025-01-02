import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import App from "../App.vue";

describe("App", () => {
  it("should mount the App component", () => {
    const wrapper = mount(App);

    expect(wrapper.findAll("svg")).toHaveLength(4);
  });
});
