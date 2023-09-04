import type SearchBar from './SearchBar';

import './AnswerForm';

describe('SearchBar', () => {
  let form: HTMLFormElement | null; // FIXME:
  let searchBar: SearchBar;
  let input: HTMLInputElement | null; // FIXME

  beforeEach(() => {
    searchBar = document.createElement('search-bar');
    form = searchBar.querySelector('form');
    input = searchBar.querySelector('input');
    document.body.append(searchBar);
  });

  afterEach(() => {
    document.body.removeChild(searchBar);
  });

  it('should initialize correctly', () => {
    expect(searchBar).toBeTruthy();
  });

  it('should handle submit event', done => {
    if (form == null) return;

    const submitHandler = jest.fn();
    searchBar.addEventListener('submit', submitHandler);

    form.submit();

    setTimeout(() => {
      expect(submitHandler).toHaveBeenCalled();
      done();
    });
  });

  it('the read the submitted input when the form is entered', done => {
    if (form == null) return;
    if (input == null) return;

    input.value = 'value';

    form.submit();

    const formData = new FormData(form);

    expect(formData.get('value')).toEqual('value');
  });
});
