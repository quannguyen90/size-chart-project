import { expect, describe, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@solidjs/testing-library";
import Guide from "../guide/index";

function setup() {
  render(() => <Guide />);
}

describe("Guide Search Bar and Paging UI", () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    setup();
  });

  it("renders search bar and no blue border on focus", () => {
    const input = screen.getByPlaceholderText(/search product types/i);
    expect(input).not.toBeNull();
    (input as HTMLInputElement).focus();
    expect((input as HTMLElement).className).not.toContain("focus:ring-2");
    expect((input as HTMLElement).className).toContain("focus:ring-0");
    expect((input as HTMLElement).className).toContain("focus:border-gray-300");
  });

  it("shows no Show More/Collapse button if only one page of product types", async () => {
    const input = screen.getByPlaceholderText(/search product types/i) as HTMLInputElement;
    fireEvent.input(input, { target: { value: "Classic Tee" } });
    await new Promise(r => setTimeout(r, 600));
    const button = screen.queryByText(/Show More|Collapse/i);
    expect(button).toBeNull();
  });

  it("shows Show More button if more than one page", async () => {
    await new Promise(r => setTimeout(r, 600));
    const button = screen.queryByText(/Show More/i);
    expect(button).not.toBeNull();
  });

  it("shows Collapse button after loading all pages", async () => {
    await new Promise(r => setTimeout(r, 600));
    let button = screen.queryByText(/Show More/i);
    expect(button).not.toBeNull();
    while (button) {
      fireEvent.click(button!);
      await new Promise(r => setTimeout(r, 100));
      button = screen.queryByText(/Show More/i);
    }
    const collapseBtn = screen.queryByText(/Collapse/i);
    expect(collapseBtn).not.toBeNull();
  });
});
