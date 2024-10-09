// AddSynonymForm.test.jsx
import { mount } from "@vitest/react";
import userEvent from "@testing-library/user-event";
import AddSynonymForm from "./AddSynonymForm";

// Mock the addSynonym function
global.addSynonym = jest.fn();

describe("AddSynonymForm", () => {
  it("submits the form with wordA and wordB", async () => {
    const wordA = "testA";
    const wordB = "testB";

    const { getByLabelText, getByRole } = mount(<AddSynonymForm />);

    userEvent.type(getByLabelText("Word A"), wordA);
    userEvent.type(getByLabelText("Word B"), wordB);
    userEvent.click(getByRole("button"));

    // Wait for the next tick of the event loop
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check that addSynonym was called with the correct arguments
    expect(global.addSynonym).toHaveBeenCalledWith(wordA, wordB);
  });
});
