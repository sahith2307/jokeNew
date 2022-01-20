import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React, { useState as useStateSpy } from "react";

import JokeTeller from "../jokeTeller";
import { fireEvent, getByRole, render, screen } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("<JokePage />", () => {
  let wrapper;
  const setState = jest.fn();

  beforeEach(() => {
    useStateSpy.mockImplementation((init) => [init, setState]);
    wrapper = Enzyme.mount(<JokeTeller />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("text", () => {
    const languages = ["en", "cs", "de", "pt", "es", "fr"];
    it("2dhdh", () => {
      languages.map((each) =>
        wrapper
          .find("#languages")
          .props()
          .onChange({ target: { value: each } })
      );

      expect(setState).toHaveBeenCalledWith("es");
    });
  });
  describe("any", () => {
    it("showID", () => {
      wrapper
        .find("#any-id")
        .props()
        .onChange({ target: { value: "Any" } });
      // expect(wrapper.find("#any-id").value).toBe("Any");
      expect(setState).toHaveBeenCalledWith("Any");
      wrapper
        .find("#custom-Id")
        .props()
        .onChange({ target: { value: "Custom" } });
      expect(setState).toHaveBeenCalledWith("Custom");
    });
  });
  describe("custom", () => {
    const catList = [
      "Christmas",
      "Misc",
      "Dark",
      "Programming",
      "Pun",
      "Spooky",
    ];
    it("showID", async () => {
      console.log(wrapper.html());
      render(<JokeTeller/>)
      const follow = await screen.findByTestId("Spooky");
      expect(follow.exists()).toBe(true);

      // catList.map((each) =>
      //   wrapper
      //     .find(`#${each}`)
      //     .props()
      //     .onChange({ target: { checked: false } })
      // );
    });
  });
});
