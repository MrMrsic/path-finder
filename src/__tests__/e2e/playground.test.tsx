/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Playground } from "../../routes/playground";
import { MemoryRouter } from "react-router";

describe("Playground", () => {
  it("topbar title renders", () => {
    render(
      <MemoryRouter>
        <Playground />
      </MemoryRouter>
    );
    const topbar = screen.getByTestId("topbar-title");
    expect(topbar).toHaveTextContent("SaunaCodeChallenge");
  });

  it("topbar dropdown renders", () => {
    render(
      <MemoryRouter>
        <Playground />
      </MemoryRouter>
    );
    const selectDropdown = screen.getByTestId("select-template-dropdown");
    expect(selectDropdown).toBeInTheDocument();
  });

  it("info panel renders", () => {
    render(
      <MemoryRouter>
        <Playground />
      </MemoryRouter>
    );
    const infoPanel = screen.getByLabelText("help-information");
    expect(infoPanel).toBeInTheDocument();
  });

  it("template selection renders expected path", async () => {
    const { getByRole, findByText, getByTestId } = render(
      <MemoryRouter>
        <Playground />
      </MemoryRouter>
    );
    const selectDropdown = getByRole("combobox");

    userEvent.click(selectDropdown);
    const option2 = await findByText("Go straight through intersections");

    fireEvent.click(option2);
    const expectedPath = getByTestId("expected-path");
    expect(expectedPath).toHaveTextContent("@|A+---B--+|+--C-+|-||+---D--+|x");
  });

  it("info panel renders", () => {
    render(
      <MemoryRouter>
        <Playground />
      </MemoryRouter>
    );
    const infoPanel = screen.getByLabelText("help-information");
    expect(infoPanel).toBeInTheDocument();
  });

  it("run successful simulation for simple custom path", async () => {
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <Playground />
      </MemoryRouter>
    );

    await getByTestId("array-table");

    const input_1_1 = getByLabelText("row-1-col-1-input");
    fireEvent.change(input_1_1, { target: { value: "@" } });

    const input_1_2 = getByLabelText("row-1-col-2-input");
    fireEvent.change(input_1_2, { target: { value: "-" } });

    const input_1_3 = getByLabelText("row-1-col-3-input");
    fireEvent.change(input_1_3, { target: { value: "x" } });

    const runSimulationBtn = getByTestId("run-simulation");
    fireEvent.click(runSimulationBtn);

    const resultsPath = getByTestId("results-path");
    expect(resultsPath).toHaveTextContent("@-x");
  });

  it("simulate broken path", async () => {
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <Playground />
      </MemoryRouter>
    );

    await getByTestId("array-table");

    const input_1_1 = getByLabelText("row-1-col-1-input");
    fireEvent.change(input_1_1, { target: { value: "@" } });

    const input_1_2 = getByLabelText("row-1-col-2-input");
    fireEvent.change(input_1_2, { target: { value: "-" } });

    const input_1_4 = getByLabelText("row-1-col-4-input");
    fireEvent.change(input_1_4, { target: { value: "x" } });

    const runSimulationBtn = getByTestId("run-simulation");
    fireEvent.click(runSimulationBtn);

    const errorsList = getByLabelText("errors-list");
    const { getAllByRole } = within(errorsList);
    const items = getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Broken path!");
  });
});
