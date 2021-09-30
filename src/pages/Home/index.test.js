import {render} from "@testing-library/react";
import Home from ".";
test("Renders Home snapshot", () => {
  /* Escreve o componente Home atual como um React.Fragment permitindo a comparação com snapshot */
  const {asFragment} = render(<Home />);

  /* Compara o fragmento com a snapshot existente */
  expect(asFragment(<Home />)).toMatchSnapshot();
});