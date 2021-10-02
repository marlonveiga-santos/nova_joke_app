import {render} from "@testing-library/react";
import Home from ".";

/* Spy Jest que emula o DOM para aceitar a função scrollTo */
global.scrollTo = jest.fn();

test("Renders Home snapshot", () => {
  /* Escreve o componente Home atual como um React.Fragment permitindo a comparação com snapshot */
  const {asFragment} = render(<Home />);

  /* Compara o fragmento com a snapshot existente */
  expect(asFragment(<Home />)).toMatchSnapshot();
});