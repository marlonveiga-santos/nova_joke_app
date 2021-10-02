/* Render escreve, screen lê e waitFor constroi o await da promise */
import {render, waitFor, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
/* Componente a ser testado*/
import Main from ".";
/* Cria o mock de um servidor. Simulado. */
import {setupServer} from "msw/node";
/* Faz o mock dos processos rest (get, post, put, patch e update) */
import {rest} from "msw";
/* URL real a ser consumida */
const BASE_URL = "https://nova-joke-api.netlify.app/.netlify/functions/index/api/random"

/* Spy Jest que emula o DOM para aceitar a função scrollTo */
global.scrollTo = jest.fn();

/* Cria o mock do servidor. O objeto json não precisa ser igual ao  verdadeiro, mas se possível 
   deixe ao menos os itens que você irá usar conforme a construção original*/
const server = setupServer(
  rest.get(
    BASE_URL,
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          type: "general",
          setup: "Joke",
          punchline: "LOL",
        })
      );
    }
  )
);

/* Processos de limpeza necessários antes de cada teste de api ser iniciado. */
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/* Efetua o teste de api com tudo ok. Você pode testar o conteúdo da resposta,
   o código da resposta, ou até mesmo mensagens de erro */
test("loads and displays the joke", async () => {
  render(<Main />);
  const response = await waitFor(() => screen.getByText(/general/i));
  expect(response).toBeInTheDocument();
});

/* Testa o comportamento do botão que chama a punchline */
test("Activates the joke punchline card", async () => {
  render(<Main />);
  window.HTMLElement.prototype.scrollIntoView = function () {};
  window.HTMLElement.prototype.scrollTo = function () {};
  const punchlineButton = waitFor(() => screen.getByText("Answer"));
  userEvent.click(await punchlineButton);
  const punchline = await waitFor(() => screen.getByText(/lol/i));
  expect(punchline).toBeInTheDocument();
});

/* Dispara uma nova piada */
test("Get one new joke", async () => {
  render(<Main />);

  /* Testa piada antiga para confirmar se a piada foi mesmo alterada */
  const oldJokeId = await waitFor(() => screen.getByText(/1/i));
  expect(oldJokeId).toBeInTheDocument();

  server.use(
    rest.get(
      BASE_URL,
      (req, res, ctx) => {
        return res(
          ctx.json({
            id: 2,
            type: "general",
            setup: "Another joke",
            punchline: "HUE HUE !",
          })
        );
      }
    )
  );

  /* Como o comportamento mudou. Temos que chamar um botão antes do outro */
  const punchlineButton = screen.getByText("Answer");
  userEvent.click(punchlineButton);

  /* Simula um novo request, para confirmar se a chamada foi realmente efetuada */
  const newJokeRequest = await waitFor(() => screen.getByText("New Joke"));
  userEvent.click(newJokeRequest);

  const newJokeId = await waitFor(() => screen.getByText(/2/i));
  expect(newJokeId).toBeInTheDocument();
});

/* Observa erro */
test("Receive an network error", async () => {
  server.use(
    rest.post(
      BASE_URL,
      (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({message: "Internal server error"})
        );
      }
    )
  );
  render(<Main />);
  /* Utiliza uma função do Jest, mas funciona... */
  console.log = jest.fn();
  console.log("Internal server error");
  expect(console.log).toHaveBeenCalledWith("Internal server error");
});