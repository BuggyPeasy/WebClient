import type SearchBar from "./SearchBar";

import "./AnswerForm";

describe("SearchBar", () => {

  let form: HTMLFormElement;
  let searchBar: SearchBar;
  let input: HTMLInputElement;

  beforeEach(() => {
    searchBar = document.createElement("search-bar");
    form = searchBar.querySelector("form");
    input = searchBar.querySelector("input");
    document.body.append(searchBar);
  });

  afterEach(() => {
    document.body.removeChild(searchBar);
  });

  it("should initialize correctly", () => {
    expect(searchBar).toBeTruthy();
  });

  it("should handle submit event", (done) => {
    const submitHandler = jest.fn();

    searchBar.addEventListener("submit", submitHandler);

    searchBar.querySelector("form").submit();

    setTimeout(() => {
      expect(submitHandler).toHaveBeenCalled();
      done();
    });
  });

  it("the read the submitted input when the form is entered", (done) => {
    searchBar.querySelector("input").value = "value";

    searchBar.querySelector("form").submit();

    const formData = new FormData(form);

    expect(formData.get("value")).toEqual("value");
  });

})