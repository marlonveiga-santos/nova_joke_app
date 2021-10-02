import {render, screen} from "@testing-library/react";
import Punchline from ".";


test("Renders Punchline  joke punchline", () => {
  render(<Punchline jokePunchline="LoL" visible />);
  const punchline = screen.getByText(/lol/i);
  expect(punchline).toBeInTheDocument();
});

test("Not renders Punchline  joke punchline", () => {
  render(<Punchline jokePunchline="LoL" />);
  const punchline = screen.queryByText(/lol/i);
  expect(punchline).toBeNull();
});