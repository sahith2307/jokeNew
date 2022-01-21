import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React, { useState as useStateSpy } from "react";
import userEvent from "@testing-library/user-event";

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
  describe("contains", () => {
    it("contains", () => {
      console.log(wrapper.html());
      render(<JokeTeller />);
      expect(wrapper.find("#contains").exists()).toBe(true);
      wrapper
        .find("#contains")
        .props()
        .onChange({ target: { value: "ry" } });
      expect(setState).toHaveBeenCalledWith("ry");
    });
  });
  describe("amount", () => {
    it("amount", () => {
      console.log(wrapper.html());
      render(<JokeTeller />);
      expect(wrapper.find("#amount").exists()).toBe(true);
      wrapper
        .find("#amount")
        .props()
        .onChange({ target: { value: "1" } });
      expect(setState).toHaveBeenCalledWith("1");
    });
  });
  describe("range", () => {
    it("range", () => {
      console.log(wrapper.html());
      render(<JokeTeller />);
      expect(wrapper.find("#lowRange").exists()).toBe(true);
      wrapper
        .find("#lowRange")
        .props()
        .onChange({ target: { value: "3" } });
      expect(setState).toHaveBeenCalledWith("3");
      expect(wrapper.find("#highRange").exists()).toBe(true);
      wrapper
        .find("#highRange")
        .props()
        .onChange({ target: { value: "6" } });
      expect(setState).toHaveBeenCalledWith("6");
    });
  });
  describe("types", () => {
    it("range", () => {
      console.log(wrapper.html());
      render(<JokeTeller />);
      expect(wrapper.find("#single").exists()).toBe(true);
      // wrapper
      //   .find("#single")
      //   .props()
      //   .onChange({ target: { checked: true } });
      
      expect(wrapper.find("#twopart").exists()).toBe(true);
      expect(wrapper.find("#single").props().checked).toEqual(true);
      wrapper
        .find("#highRange")
        .props()
        .onChange({ target: { value: "6" } });
      expect(setState).toHaveBeenCalledWith("6");
    });
  });
});
