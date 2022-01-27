/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React, { useState as useStateSpy } from "react";
import userEvent from "@testing-library/user-event";
import JokeTeller from "../jokeTeller";
import {
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./../../App";
import { wait } from "@testing-library/user-event/dist/utils";
describe("abc", () => {
  const Mock = () => {
    return <App />;
  };

  test("async", async () => {
    render(<Mock />);
    await waitFor(
      async () => {
        const e = await screen.findByTestId("nsfw");
        expect(e).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
  test("search", () => {
    render(<App />);
    const search = screen.getByTestId("contains");
    expect(search).toBeInTheDocument();
    fireEvent.change(search, { target: { value: "abc" } });
    expect(search.value).toEqual("abc");
  });
  describe("low", () => {
    test("low", () => {
      render(<App />);
      const low = screen.getByTestId("lowRange");
      expect(low).toBeInTheDocument();
      fireEvent.change(low, { target: { value: "1" } });
      expect(low.value).toEqual("1");
      const api = screen.getByTestId("api");
      expect(api.textContent).toContain("1");
    });
  });
  describe("high", () => {
    test("high", () => {
      render(<App />);
      const high = screen.getByTestId("highRange");
      expect(high).toBeInTheDocument();
      fireEvent.change(high, { target: { value: "7" } });
      expect(high.value).toEqual("7");
      const api = screen.getByTestId("api");
      expect(api.textContent).toContain("7");
    });
  });
  describe("amount", () => {
    test("amount", () => {
      render(<App />);
      const amount = screen.getByTestId("amount");
      expect(amount).toBeInTheDocument();
      fireEvent.change(amount, { target: { value: "9" } });
      expect(amount.value).toEqual("9");
      const api = screen.getByTestId("api");
      expect(api.textContent).toContain("9");
    });
  });
  describe("cat", () => {
    test("async", async () => {
      render(<Mock />);
      await waitFor(
        async () => {
          const e = await screen.findByTestId("Spooky-id");
          expect(e).toBeInTheDocument();
          fireEvent.change(e, { target: { checked: true } });
          expect(e.checked).toEqual(true);
        },
        { timeout: 6000 }
      );
    });
  });
  describe("categories", () => {
    test("any", () => {
      render(<Mock />);
      const any = screen.getByTestId("any");
      expect(any).toBeInTheDocument();
      expect(any.checked).toEqual(true);
      fireEvent.click(any);
      expect(any.checked).toEqual(true);
      const api = screen.getByTestId("api");
      expect(api.textContent).toContain("Any");
    }, 10000);
    test("custom", () => {
      render(<Mock />);
      const custom = screen.getByTestId("custom");
      expect(custom).toBeInTheDocument();
      expect(custom.checked).toEqual(false);
      fireEvent.click(custom);
      expect(custom.checked).toEqual(true);
      const api = screen.getByTestId("api");
      expect(api.textContent).not.toContain("Any");
    });
  });
  describe("languages", () => {
    const languages = ["en", "cs", "de", "pt", "es", "fr"];
    test("df", async () => {
      render(<Mock />);
      await waitFor(async () => {
        const language = await screen.findByTestId("languages");
        expect(language).toBeInTheDocument();
        fireEvent.change(language, { target: { value: "fr" } });
        expect(language.value).toEqual("fr");
        const api = screen.getByTestId("api");
        expect(api.textContent).toContain("fr");
        
      });
    });
  });
  describe("type", () => {
    test("type", async () => {
      render(<Mock />);
      await waitFor(
        async () => {
          const type = await screen.findByTestId("single");
          fireEvent.click(type);
          expect(type.value).toEqual("single");
        },
        { timeout: 5000 }
      );
      const api = screen.getByTestId("api");
      expect(api.textContent).not.toContain("single");
    }, 10000);
  });
  describe("change", () => {
    test("type", async () => {
      render(<Mock />);
      let type;
      let e;
      let j;
      const custom = screen.getByTestId("custom");
      fireEvent.click(custom);
      await waitFor(
        async () => {
          e = await screen.findByTestId("Spooky-id");
          j = await screen.findByTestId("Misc-id");
          type = await screen.findByTestId("api");
        },
        { timeout: 5000 }
      );

      fireEvent.click(e);
      fireEvent.click(j);
      expect(e.checked).toEqual(true);
      expect(type.textContent).toContain("Spooky");
      expect(type.textContent).toContain("Misc");
    }, 10000);
  });
  describe("check parts", () => {
    test("type", async () => {
      render(<Mock />);
      const send = screen.getByTestId("sendRequest");
      const joke = screen.getByTestId("joke");

      fireEvent.click(send);
      await waitFor(
        async () => {
          expect(joke.textContent).toContain(" ");
          if (joke.textContent.endsWith("Delivery")) {
            expect(screen.getByTestId("twopartTest")).toBeInTheDocument();
          }
          console.log(joke.textContent);
        },
        { timeout: 5000 }
      );
    }, 10000);
  });
  describe("checkParts", () => {
    test("type", async () => {
      render(<Mock />);
      const send = screen.getByTestId("sendRequest");
      let joke;

      const amount = screen.getByTestId("amount");
      fireEvent.change(amount, { target: { value: "9" } });
      fireEvent.click(send);
      await waitFor(
        async () => {
          joke = screen.getByTestId("joke");
          expect(joke.textContent).toContain(" ");
          if (joke.textContent.endsWith("Delivery")) {
            expect(screen.getByTestId("twopartTest")).toBeInTheDocument();
          }
        },
        { timeout: 5000 }
      );

      console.log(joke.textContent);
    }, 10000);
  });
});
