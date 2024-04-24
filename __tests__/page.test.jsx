import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../src/app/page";

describe("Home", () => {
  it("Topページのタイトル確認", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "資格受験体験記",
    });

    expect(heading).toBeInTheDocument();
  });
});
