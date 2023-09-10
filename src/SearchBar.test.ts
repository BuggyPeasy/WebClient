import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const answerInputValue = 'answer';
  const answerInputName = 'user-search';

  let searchBar: SearchBar;
  let form: HTMLFormElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    searchBar = document.createElement('search-bar');
    document.body.append(searchBar);

    const _form = searchBar.querySelector('form');
    if (_form != null) form = _form;
    expect(form).toBeTruthy();

    const _input = searchBar.querySelector('input');
    if (_input != null) input = _input;
    expect(input).toBeTruthy();
  });

  afterEach(() => {
    document.body.removeChild(searchBar);
  });

  it('initialize everything correctly', () => {
    expect(searchBar).toBeTruthy();
  });

  it('should throw an error calling sumbit when not connected to DOM', () => {
    const test = document.createElement('search-bar');

    const cb = (): void => {
      test.submit();
    };

    expect(cb).toThrow(SearchBar.FORM_NOT_FOUND_ERROR);

    test.remove();
  });

  it('should read the input when the form is submitted', () => {
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();

    input.value = answerInputValue;

    searchBar.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      expect(formData.get(answerInputName)).toEqual(answerInputValue);
    });

    searchBar.submit();
  });

  it('should not call the submit event handler when the input is empty', () => {
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();

    const submitHandler = jest.fn().mockImplementation(e => e.preventDefault());
    input.value = '';

    searchBar.addEventListener('submit', submitHandler);
    searchBar.submit();

    expect(submitHandler).not.toHaveBeenCalled();
  });

  it('should throw an error when the input is null', () => {
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();

    input.remove();

    const cb = (): void => {
      searchBar.submit();
    };

    expect(cb).toThrow(SearchBar.INPUT_IS_NULL_ERROR);
  });
});
