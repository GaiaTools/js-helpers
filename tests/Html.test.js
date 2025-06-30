import { describe, it, expect } from 'vitest';
import * as Html from '../src/Html';

describe('Html', () => {
  describe('createElement', () => {
    it('should create an element with the specified name', () => {
      const element = Html.createElement('div');
      expect(element.tagName.toLowerCase()).toBe('div');
    });

    it('should add content to the element', () => {
      const element = Html.createElement('div', 'Hello World');
      expect(element.textContent).toBe('Hello World');
    });

    it('should add attributes to the element', () => {
      const element = Html.createElement('div', 'Content', { 
        id: 'test-id', 
        class: 'test-class' 
      });

      expect(element.id).toBe('test-id');
      expect(element.className).toBe('test-class');
    });

    it('should handle void elements correctly', () => {
      const element = Html.createElement('img', 'This content should be ignored', { 
        src: 'test.jpg' 
      });

      expect(element.tagName.toLowerCase()).toBe('img');
      expect(element.src).toContain('test.jpg');
      expect(element.textContent).toBe('');
    });
  });

  describe('a', () => {
    it('should create an anchor element with text and URL', () => {
      const anchor = Html.a('Click me', 'https://example.com');

      expect(anchor.tagName.toLowerCase()).toBe('a');
      expect(anchor.textContent).toBe('Click me');
      expect(anchor.href).toContain('example.com');
    });

    it('should create an anchor without href if url is null', () => {
      const anchor = Html.a('No link', null);

      expect(anchor.tagName.toLowerCase()).toBe('a');
      expect(anchor.textContent).toBe('No link');
      expect(anchor.hasAttribute('href')).toBe(false);
    });

    it('should add additional attributes', () => {
      const anchor = Html.a('Link', 'https://example.com', { 
        id: 'test-link', 
        target: '_blank' 
      });

      expect(anchor.id).toBe('test-link');
      expect(anchor.target).toBe('_blank');
    });
  });

  describe('img', () => {
    it('should create an image element with src', () => {
      const image = Html.img('test.jpg');

      expect(image.tagName.toLowerCase()).toBe('img');
      expect(image.src).toContain('test.jpg');
    });

    it('should add additional attributes', () => {
      const image = Html.img('test.jpg', { 
        alt: 'Test image', 
        width: '100' 
      });

      expect(image.alt).toBe('Test image');
      expect(image.width).toBe(100);
    });
  });

  describe('form', () => {
    it('should create a form element with action and method', () => {
      const form = Html.form('/submit', 'post');

      expect(form.tagName.toLowerCase()).toBe('form');
      expect(form.action).toContain('/submit');
      expect(form.method).toBe('post');
    });

    it('should handle GET method with query parameters', () => {
      const form = Html.form('/search?q=test&page=1', 'get');

      expect(form.action).toContain('/search');
      expect(form.method).toBe('get');

      // Check for hidden inputs for query params
      const inputs = form.querySelectorAll('input[type="hidden"]');
      expect(inputs.length).toBe(2);

      const qInput = Array.from(inputs).find(input => input.name === 'q');
      const pageInput = Array.from(inputs).find(input => input.name === 'page');

      expect(qInput).toBeTruthy();
      expect(qInput.value).toBe('test');
      expect(pageInput).toBeTruthy();
      expect(pageInput.value).toBe('1');
    });
  });

  describe('button', () => {
    it('should create a button element with content', () => {
      const btn = Html.button('Click me');

      expect(btn.tagName.toLowerCase()).toBe('button');
      expect(btn.textContent).toBe('Click me');
      expect(btn.type).toBe('button');
    });

    it('should use provided type if specified', () => {
      const btn = Html.button('Submit', { type: 'submit' });

      expect(btn.type).toBe('submit');
    });
  });

  describe('input', () => {
    it('should create an input element with type, name and value', () => {
      const input = Html.input('text', 'username', 'john');

      expect(input.tagName.toLowerCase()).toBe('input');
      expect(input.type).toBe('text');
      expect(input.name).toBe('username');
      expect(input.value).toBe('john');
    });

    it('should add additional attributes', () => {
      const input = Html.input('text', 'username', '', { 
        placeholder: 'Enter username', 
        required: true 
      });

      expect(input.placeholder).toBe('Enter username');
      expect(input.required).toBe(true);
    });
  });

  describe('textInput', () => {
    it('should create a text input with name and value', () => {
      const input = Html.textInput('username', 'john');

      expect(input.type).toBe('text');
      expect(input.name).toBe('username');
      expect(input.value).toBe('john');
    });
  });

  describe('setAttributes', () => {
    it('should set attributes on an element', () => {
      const div = document.createElement('div');
      Html.setAttributes(div, { 
        id: 'test', 
        class: 'container', 
        'data-test': 'value' 
      });

      expect(div.id).toBe('test');
      expect(div.className).toBe('container');
      expect(div.getAttribute('data-test')).toBe('value');
    });

    it('should handle boolean attributes', () => {
      const input = document.createElement('input');
      Html.setAttributes(input, { 
        disabled: true, 
        required: false 
      });

      expect(input.disabled).toBe(true);
      expect(input.hasAttribute('required')).toBe(false);
    });
  });

  describe('addClass', () => {
    it('should add a class to an element', () => {
      const div = document.createElement('div');
      Html.addClass(div, 'test-class');

      expect(div.className).toBe('test-class');
    });

    it('should add multiple classes', () => {
      const div = document.createElement('div');
      Html.addClass(div, 'class1');
      Html.addClass(div, 'class2');

      expect(div.className).toBe('class1 class2');
    });

    it('should not add duplicate classes', () => {
      const div = document.createElement('div');
      div.className = 'existing';
      Html.addClass(div, 'existing');

      expect(div.className).toBe('existing');
    });
  });

  describe('removeClass', () => {
    it('should remove a class from an element', () => {
      const div = document.createElement('div');
      div.className = 'class1 class2';
      Html.removeClass(div, 'class1');

      expect(div.className).toBe('class2');
    });

    it('should handle non-existent classes', () => {
      const div = document.createElement('div');
      div.className = 'class1';
      Html.removeClass(div, 'class2');

      expect(div.className).toBe('class1');
    });
  });

  describe('table', () => {
    it('should create a table element', () => {
      const tableEl = Html.table();

      expect(tableEl.tagName.toLowerCase()).toBe('table');
    });

    it('should add content to the table', () => {
      const row = document.createElement('tr');
      const tableEl = Html.table(row);

      expect(tableEl.children.length).toBe(1);
      expect(tableEl.children[0].tagName.toLowerCase()).toBe('tr');
    });

    it('should add attributes to the table', () => {
      const tableEl = Html.table(null, { 
        id: 'data-table', 
        class: 'styled-table' 
      });

      expect(tableEl.id).toBe('data-table');
      expect(tableEl.className).toBe('styled-table');
    });
  });

  describe('tr', () => {
    it('should create a table row element', () => {
      const rowEl = Html.tr();

      expect(rowEl.tagName.toLowerCase()).toBe('tr');
    });

    it('should add content to the row', () => {
      const cell = document.createElement('td');
      const rowEl = Html.tr(cell);

      expect(rowEl.children.length).toBe(1);
      expect(rowEl.children[0].tagName.toLowerCase()).toBe('td');
    });
  });

  describe('td', () => {
    it('should create a table cell element', () => {
      const cellEl = Html.td('Cell content');

      expect(cellEl.tagName.toLowerCase()).toBe('td');
      expect(cellEl.textContent).toBe('Cell content');
    });

    it('should add attributes to the cell', () => {
      const cellEl = Html.td('Data', { 
        colspan: '2', 
        class: 'data-cell' 
      });

      expect(cellEl.getAttribute('colspan')).toBe('2');
      expect(cellEl.className).toBe('data-cell');
    });
  });

  describe('th', () => {
    it('should create a table header cell element', () => {
      const headerCellEl = Html.th('Header');

      expect(headerCellEl.tagName.toLowerCase()).toBe('th');
      expect(headerCellEl.textContent).toBe('Header');
    });

    it('should add attributes to the header cell', () => {
      const headerCellEl = Html.th('Header', { 
        scope: 'col', 
        class: 'header-cell' 
      });

      expect(headerCellEl.getAttribute('scope')).toBe('col');
      expect(headerCellEl.className).toBe('header-cell');
    });
  });

  describe('thead', () => {
    it('should create a table header section element', () => {
      const theadEl = Html.thead();

      expect(theadEl.tagName.toLowerCase()).toBe('thead');
    });

    it('should add content to the header section', () => {
      const row = document.createElement('tr');
      const theadEl = Html.thead(row);

      expect(theadEl.children.length).toBe(1);
      expect(theadEl.children[0].tagName.toLowerCase()).toBe('tr');
    });
  });

  describe('tbody', () => {
    it('should create a table body section element', () => {
      const tbodyEl = Html.tbody();

      expect(tbodyEl.tagName.toLowerCase()).toBe('tbody');
    });

    it('should add content to the body section', () => {
      const row = document.createElement('tr');
      const tbodyEl = Html.tbody(row);

      expect(tbodyEl.children.length).toBe(1);
      expect(tbodyEl.children[0].tagName.toLowerCase()).toBe('tr');
    });
  });

  describe('tfoot', () => {
    it('should create a table footer section element', () => {
      const tfootEl = Html.tfoot();

      expect(tfootEl.tagName.toLowerCase()).toBe('tfoot');
    });

    it('should add content to the footer section', () => {
      const row = document.createElement('tr');
      const tfootEl = Html.tfoot(row);

      expect(tfootEl.children.length).toBe(1);
      expect(tfootEl.children[0].tagName.toLowerCase()).toBe('tr');
    });
  });
});
