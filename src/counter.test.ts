import { expect, describe, it, beforeEach } from "vitest";
import { setupCounter } from "./counter";

describe("setupCounter", () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    // Create a new button before each test
    button = document.createElement("button");
  });

  it("should initialize the counter to 0", () => {
    setupCounter(button);
    expect(button.innerHTML).toBe("count is 0");
  });

  it("should increment the counter on button click", () => {
    setupCounter(button);
    button.click();
    expect(button.innerHTML).toBe("count is 1");
    button.click();
    expect(button.innerHTML).toBe("count is 2");
  });

  it("should update the button text correctly after each click", () => {
    setupCounter(button);
    expect(button.innerHTML).toBe("count is 0");
    button.click();
    expect(button.innerHTML).toBe("count is 1");
    button.click();
    expect(button.innerHTML).toBe("count is 2");
    button.click();
    expect(button.innerHTML).toBe("count is 3");
  });
});
