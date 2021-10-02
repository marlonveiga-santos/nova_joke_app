import {render, screen} from "@testing-library/react";
import Setup from ".";

test("Renders setup joke id", () => {
  render(<Setup jokeId="1" />);
  const linkElement = screen.getByText("1");
  expect(linkElement).toBeInTheDocument();
});

test("Renders setup joke type", () => {
  render(<Setup jokeType="general" />);
  const linkElement = screen.getByText("general");
  expect(linkElement).toBeInTheDocument();
});

test("Renders setup joke setup", () => {
  render(<Setup jokeSetup="Joke body" />);
  const linkElement = screen.getByText(/joke body/i);
  expect(linkElement).toBeInTheDocument();
});