/// <reference lib="dom" />

import { describe, expect, beforeEach, afterEach, it, mock } from 'bun:test';

import SearchBar from '../src/SearchBar';

describe('SearchBar Component', () => {
  const answerInputValue = 'answer';
  const answerInputName = 'user-search';

  let searchBar: SearchBar;
  let form: HTMLFormElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    searchBar = document.createElement('search-bar');
    document.body.appendChild(searchBar);

    const _form = searchBar.querySelector('form');
    if (_form != null) form = _form;
    form.submit = () => {
      form.dispatchEvent(new SubmitEvent('submit', { bubbles: true }));
    };

    const _input = searchBar.querySelector('input');
    if (_input != null) input = _input;
  });

  afterEach(() => {
    document.body.removeChild(searchBar);
  });

  it('should initialize everything correctly', () => {
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

  it('should read the input when the form is submitted', done => {
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();

    input.value = answerInputValue;

    searchBar.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new window.FormData(form);
      expect(formData.get(answerInputName)).toEqual(answerInputValue);
      done();
    });

    searchBar.submit();
  });

  it('should call the submit handler when user enters a non-empty response', () => {
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();

    const submitHandler = mock(e => e.preventDefault());
    input.value = answerInputValue;

    searchBar.addEventListener('submit', submitHandler);
    searchBar.submit();

    expect(submitHandler).toHaveBeenCalled();
  });

  it('should not call the submit event handler when the input is empty', () => {
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();

    const submitHandler = mock(e => e.preventDefault());
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

    expect(cb).toThrow(SearchBar.INPUT_NOT_FOUND_ERROR);
  });
});
