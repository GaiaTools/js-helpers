# HTML Helpers Documentation

This document provides detailed information about all the HTML helper functions available in the js-helpers library.

## Table of Contents

- [Basic Elements](#basic-elements)
  - [createElement](#createelement)
  - [a](#a)
  - [img](#img)
  - [text](#text)
- [Form Elements](#form-elements)
  - [form](#form)
  - [label](#label)
  - [button](#button)
  - [resetButton](#resetbutton)
  - [submitButton](#submitbutton)
  - [input](#input)
  - [textInput](#textinput)
  - [hiddenInput](#hiddeninput)
  - [passwordInput](#passwordinput)
  - [fileInput](#fileinput)
  - [textarea](#textarea)
  - [radio](#radio)
  - [checkbox](#checkbox)
  - [booleanInput](#booleaninput)
  - [buttonInput](#buttoninput)
  - [submitInput](#submitinput)
  - [resetInput](#resetinput)
- [Select Elements](#select-elements)
  - [select](#select)
  - [listBox](#listbox)
  - [renderSelectOptions](#renderselectoptions)
  - [checkboxList](#checkboxlist)
  - [radioList](#radiolist)
- [List Elements](#list-elements)
  - [ul](#ul)
  - [ol](#ol)
- [Table Elements](#table-elements)
  - [table](#table)
  - [tr](#tr)
  - [td](#td)
  - [th](#th)
  - [thead](#thead)
  - [tbody](#tbody)
  - [tfoot](#tfoot)
- [Utility Functions](#utility-functions)
  - [renderContent](#rendercontent)
  - [setAttributes](#setattributes)
  - [addClass](#addclass)
  - [removeClass](#removeclass)

## Basic Elements

### createElement

Generates a complete HTML element with all attributes.

```javascript
createElement(name, content, options = {})
```

**Parameters:**
- `name` (string): The name of the element to be created
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The content used to populate the element
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A complete HTML element

**Example:**
```javascript
const div = createElement('div', 'Hello World', { class: 'greeting' });
```

### a

A shortcut to generate an anchor element.

```javascript
a(text, url, options = {})
```

**Parameters:**
- `text` (string): The anchor text content
- `url` (string): A path used to create the URL
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A complete anchor element

**Examples:**
```javascript
// Returns an element object of an anchor <a href="http://example.com">Example</a>
const link1 = a('Example', 'http://example.com');

// Returns an element object of an anchor <a class="button">Click Me</a>
const link2 = a('Click Me', null, {'class': 'button'});
```

### img

A shortcut to generate an image element.

```javascript
img(src, options = {})
```

**Parameters:**
- `src` (string): An image URI to be set as the image source
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A complete image element

**Example:**
```javascript
const image = img('path/to/image.jpg', { alt: 'Example Image' });
```

### text

Generates a text node.

```javascript
text(text)
```

**Parameters:**
- `text` (string): The text to be generated as a text node

**Returns:**
- (Text): Generated text node

**Example:**
```javascript
const textNode = text('Hello World');
```

## Form Elements

### form

Generates a form element.

```javascript
form(action = '', method = 'post', options = {})
```

**Parameters:**
- `action` (string): The action URL that the form submits to
- `method` (string): The method the form uses in the submission
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A complete form element

**Example:**
```javascript
const myForm = form('/submit', 'post', { class: 'contact-form' });
```

### label

Generates a form label element.

```javascript
label(content, target = null, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The content used to populate the element
- `target` (string): A string representing the ID of form control element
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A complete label element

**Example:**
```javascript
const nameLabel = label('Your Name:', 'name-input', { class: 'form-label' });
```

### button

Generates a generic button.

```javascript
button(content, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The button content
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A complete button element

**Example:**
```javascript
const btn = button('Click Me', { class: 'btn', onclick: 'handleClick()' });
```

### resetButton

Generates a reset button.

```javascript
resetButton(content, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The button content
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A complete reset button element

**Example:**
```javascript
const resetBtn = resetButton('Reset Form', { class: 'btn-reset' });
```

### submitButton

Generates a submit button.

```javascript
submitButton(content, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The button content
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A complete submit button element

**Example:**
```javascript
const submitBtn = submitButton('Submit Form', { class: 'btn-submit' });
```

### input

Generates an input element of a given type.

```javascript
input(type, name, value, options = {})
```

**Parameters:**
- `type` (string): The type of input field to generate
- `name` (string): The value of the name attribute
- `value` (string): The value of the input field
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A generated input field

**Example:**
```javascript
const emailInput = input('email', 'user_email', '', { required: true, placeholder: 'Enter your email' });
```

### textInput

Generates a text input field.

```javascript
textInput(name, value = null, options = {})
```

**Parameters:**
- `name` (string): The value of the name attribute
- `value` (string|null): The value of the input field
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A generated input field

**Example:**
```javascript
const nameInput = textInput('username', '', { placeholder: 'Enter username' });
```

### hiddenInput

Generates a hidden input field.

```javascript
hiddenInput(name, value = null, options = {})
```

**Parameters:**
- `name` (string): The value of the name attribute
- `value` (string|null): The value of the input field
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A generated input field

**Example:**
```javascript
const csrfToken = hiddenInput('csrf_token', 'abc123xyz');
```

### passwordInput

Generates a password input field.

```javascript
passwordInput(name, value = null, options = {})
```

**Parameters:**
- `name` (string): The value of the name attribute
- `value` (string|null): The value of the input field
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A generated input field

**Example:**
```javascript
const pwdInput = passwordInput('password', null, { required: true, placeholder: 'Enter password' });
```

### fileInput

Generates a file input field.

```javascript
fileInput(name, value = null, options = {})
```

**Parameters:**
- `name` (string): The value of the name attribute
- `value` (string|null): The value of the input field
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A generated input field

**Example:**
```javascript
const uploadInput = fileInput('profile_picture', null, { accept: 'image/*' });
```

### textarea

Generates a text box field.

```javascript
textarea(name, value = '', options = {})
```

**Parameters:**
- `name` (string): The value of the name attribute
- `value` (string): The value of the attribute
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A generated input field

**Example:**
```javascript
const comments = textarea('comments', 'Default text', { rows: 5, cols: 40 });
```

### radio

Generates a radio button input with an optional label.

```javascript
radio(name, checked = false, options = {})
```

**Parameters:**
- `name` (string): The name attribute value of the radio button
- `checked` (boolean): Whether the radio button is checked
- `options` (Object): A name/value list of attributes to add to the element
  - `value` (string): The value attribute of the radio button. Defaults to '1'
  - `labelOptions` (Object): A name/value list of attributes to add to the label element, if created
  - `label` (string): The text for the label. If provided, a label element is created
  - `encode` (boolean): Whether to HTML-encode the label text. Defaults to true

**Returns:**
- (HTMLElement): The generated radio button element, optionally wrapped in a label

**Example:**
```javascript
const maleRadio = radio('gender', false, { value: 'male', label: 'Male' });
```

### checkbox

Generates a checkbox input with an optional label.

```javascript
checkbox(name, checked = false, options = {})
```

**Parameters:**
- `name` (string): The name attribute value of the checkbox
- `checked` (boolean): Whether the checkbox is checked
- `options` (Object): A name/value list of attributes to add to the element
  - `value` (string): The value attribute of the checkbox. Defaults to '1'
  - `labelOptions` (Object): A name/value list of attributes to add to the label element, if created
  - `label` (string): The text for the label. If provided, a label element is created
  - `encode` (boolean): Whether to HTML-encode the label text. Defaults to true

**Returns:**
- (HTMLElement): The generated checkbox element, optionally wrapped in a label

**Example:**
```javascript
const agreeCheckbox = checkbox('agree', true, { label: 'I agree to terms' });
```

### booleanInput

Generates a boolean input of the given type.

```javascript
booleanInput(type, name, checked = false, options = {})
```

**Parameters:**
- `type` (string): The type of input to be created; `radio` or `checkbox`
- `name` (string): The name attribute of the input element
- `checked` (boolean): The checked state of the input element
- `options` (Object): A name/value list of attributes to add to the element
  - `value` (string): The value of the input element. Defaults to '1'
  - `uncheck` (string): A value for the unchecked state of a checkbox value. This will generate a hidden input with the value of this property
  - `label` (string): A label displayed next to the checkbox that is not HTML-encoded. The label wraps around the checkbox
  - `labelOptions` (Object): An array of HTML attributes for the label tag

**Returns:**
- (DocumentFragment|HTMLElement): The generated input elements

**Example:**
```javascript
const customCheckbox = booleanInput('checkbox', 'newsletter', true, { 
  value: 'subscribe', 
  label: 'Subscribe to newsletter',
  labelOptions: { class: 'checkbox-label' }
});
```

### buttonInput

Generates an input button.

```javascript
buttonInput(label = 'Button', options = {})
```

**Parameters:**
- `label` (string): The text of the input button
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A generated input field

**Example:**
```javascript
const btn = buttonInput('Click Me', { class: 'btn', onclick: 'handleClick()' });
```

### submitInput

Generates a submit input button.

```javascript
submitInput(label = 'Submit', options = {})
```

**Parameters:**
- `label` (string): The text of the input button
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A generated input field

**Example:**
```javascript
const submitBtn = submitInput('Send Message', { class: 'btn-submit' });
```

### resetInput

Generates a reset input button.

```javascript
resetInput(label = 'Reset', options = {})
```

**Parameters:**
- `label` (string): The text of the input button
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): A generated input field

**Example:**
```javascript
const resetBtn = resetInput('Clear Form', { class: 'btn-reset' });
```

## Select Elements

### select

Generates a select box.

```javascript
select(name, selection = null, items = {}, options = {})
```

**Parameters:**
- `name` (string): The name of the select box
- `selection` (string|string[]): A string or array of strings to set the selected value(s)
- `items` (Object): A key/value pair for the option value and text
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (DocumentFragment): The generated select box

**Example:**
```javascript
const countrySelect = select('country', 'us', {
  'us': 'United States',
  'ca': 'Canada',
  'mx': 'Mexico'
}, { required: true });
```

### listBox

Generates a select list box.

```javascript
listBox(name, selection = null, items = {}, options = {})
```

**Parameters:**
- `name` (string): The name of the select box
- `selection` (string|string[]): A string or array of strings to set the selected value(s)
- `items` (Object): A key/value pair for the option value and text
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (DocumentFragment): The generated select box

**Example:**
```javascript
const fruitListBox = listBox('fruits', ['apple', 'orange'], {
  'apple': 'Apple',
  'orange': 'Orange',
  'banana': 'Banana',
  'grape': 'Grape'
}, { multiple: true, size: 4 });
```

### renderSelectOptions

Renders options for a select element.

```javascript
renderSelectOptions(selection, items, options = {})
```

**Parameters:**
- `selection` (string|string[]): The value or values to be marked as selected
- `items` (Object): The items to be used as options in the select element, as a key-value pair where the key is the option value and the value is the display text
- `options` (Object): Additional options for rendering the select options

**Returns:**
- (DocumentFragment): A document fragment containing the <option> elements

**Example:**
```javascript
const options = renderSelectOptions('medium', {
  'small': 'Small',
  'medium': 'Medium',
  'large': 'Large'
});
```

### checkboxList

Generates a list of checkboxes.

```javascript
checkboxList(name, selection = null, items = {}, options = {})
```

**Parameters:**
- `name` (string): The name attribute of each checkbox
- `selection` (string|string[]|null): The selected checkboxes. A string for a single value or an array for multiple checkboxes
- `items` (Object): The data items to be used to generate the checkboxes. The object keys are the checkbox values
- `options` (Object): A name/value list for the checkbox list container tag
  - `separator` (string): A string to be used as a separator between the checkboxes
  - `unselect` (string): A value to be used to unselect all checkboxes
  - `itemOptions` (Object): A name/value list of attributes to add to each checkbox

**Returns:**
- (DocumentFragment): The list of checkboxes to return

**Example:**
```javascript
const toppings = checkboxList('toppings[]', ['cheese', 'pepperoni'], {
  'cheese': 'Cheese',
  'pepperoni': 'Pepperoni',
  'mushrooms': 'Mushrooms',
  'olives': 'Olives'
}, { separator: ' | ', unselect: 'none' });
```

### radioList

Generates a list of radios.

```javascript
radioList(name, selection = null, items = {}, options = {})
```

**Parameters:**
- `name` (string): The name attribute of each radio field
- `selection` (string|null): The selected radio. A string for a single value or an array for multiple radios
- `items` (Object): The data items to be used to generate the radio. The object keys are the radio values
- `options` (Object): A name/value list for the radio list container tag

**Returns:**
- (DocumentFragment): The list of radio to return

**Example:**
```javascript
const sizeOptions = radioList('size', 'medium', {
  'small': 'Small',
  'medium': 'Medium',
  'large': 'Large'
}, { separator: '<br>', encode: true });
```

## List Elements

### ul

Generates an unordered list.

```javascript
ul(items, options = {})
```

**Parameters:**
- `items` (HTMLElement[]|string[]): An array of elements to append to the unordered list item
- `options` (Object): A name/value list for the list container tag

**Returns:**
- (HTMLElement): The generated list

**Example:**
```javascript
const fruitList = ul(['Apple', 'Banana', 'Orange'], { class: 'fruit-list' });
```

### ol

Generates an ordered list.

```javascript
ol(items, options = {})
```

**Parameters:**
- `items` (HTMLElement[]): An array of elements to append to the ordered list item
- `options` (Object): A name/value list for the list container tag

**Returns:**
- (HTMLElement): The generated list

**Example:**
```javascript
const steps = ol(['Mix ingredients', 'Pour into pan', 'Bake for 30 minutes'], { class: 'recipe-steps' });
```

## Table Elements

### table

Generates a table element.

```javascript
table(content, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The content to be placed inside the table
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): The generated table element

**Example:**
```javascript
const tableEl = table(tbody, { class: 'data-table', id: 'user-table' });
```

### tr

Generates a table row element.

```javascript
tr(content, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The content to be placed inside the row
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): The generated table row element

**Example:**
```javascript
const rowEl = tr([td('John'), td('Doe'), td('30')], { class: 'user-row' });
```

### td

Generates a table cell element.

```javascript
td(content, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The content to be placed inside the cell
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): The generated table cell element

**Example:**
```javascript
const cellEl = td('Cell content', { class: 'data-cell', colspan: '2' });
```

### th

Generates a table header cell element.

```javascript
th(content, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The content to be placed inside the header cell
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): The generated table header cell element

**Example:**
```javascript
const headerCellEl = th('Name', { class: 'header-cell', scope: 'col' });
```

### thead

Generates a table header section element.

```javascript
thead(content, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The content to be placed inside the header section
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): The generated table header section element

**Example:**
```javascript
const headerRow = tr([th('Name'), th('Email'), th('Age')]);
const theadEl = thead(headerRow, { class: 'table-header' });
```

### tbody

Generates a table body section element.

```javascript
tbody(content, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The content to be placed inside the body section
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): The generated table body section element

**Example:**
```javascript
const row1 = tr([td('John'), td('john@example.com'), td('30')]);
const row2 = tr([td('Jane'), td('jane@example.com'), td('25')]);
const tbodyEl = tbody([row1, row2], { class: 'table-body' });
```

### tfoot

Generates a table footer section element.

```javascript
tfoot(content, options = {})
```

**Parameters:**
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The content to be placed inside the footer section
- `options` (Object): A name/value list of attributes to add to the element

**Returns:**
- (HTMLElement): The generated table footer section element

**Example:**
```javascript
const footerRow = tr(td('Total: 2 users', { colspan: '3' }));
const tfootEl = tfoot(footerRow, { class: 'table-footer' });
```

## Utility Functions

### renderContent

Appends content to an element. The content type can be an HTMLElement or an array of HTMLElement, a DocumentFragment, or a string.

```javascript
renderContent(element, content)
```

**Parameters:**
- `element` (HTMLElement): The element to append the content to
- `content` (HTMLElement|HTMLElement[]|DocumentFragment|string): The content used to populate the element

**Example:**
```javascript
const div = document.createElement('div');
renderContent(div, 'Hello World');
```

### setAttributes

Sets the HTML element attributes.

```javascript
setAttributes(element, attributes = {})
```

**Parameters:**
- `element` (HTMLElement): The element to add attributes to
- `attributes` (Object): A name/value list of attributes to add to the element

**Example:**
```javascript
const div = document.createElement('div');
setAttributes(div, { 
  class: 'container', 
  id: 'main', 
  style: { color: 'red', fontSize: '16px' } 
});
```

### addClass

Add class names to an element.

```javascript
addClass(element, classList)
```

**Parameters:**
- `element` (HTMLElement): The element to modify
- `classList` (string[]): An array of class names to add to the element

**Example:**
```javascript
const div = document.createElement('div');
addClass(div, ['active', 'highlight']);
```

### removeClass

Remove class names from an element.

```javascript
removeClass(element, classList)
```

**Parameters:**
- `element` (HTMLElement): The element to modify
- `classList` (string[]): An array of class names to remove from the element

**Example:**
```javascript
const div = document.createElement('div');
div.className = 'active highlight';
removeClass(div, ['active']);
// div now only has 'highlight' class
```
