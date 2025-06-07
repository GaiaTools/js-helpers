# js-helpers

A collection of JavaScript helper functions and utilities for DOM manipulation, HTML generation, and object operations.

## Installation

```bash
npm install js-helpers
```

## Usage

### Import

```javascript
// Import everything
import * as jsHelpers from 'js-helpers';

// Import specific helpers
import { DomParser, ObjectHelper } from 'js-helpers';
import { createElement, a, img, form } from 'js-helpers';
```

## API Documentation

### DomParser

A utility class for parsing HTML strings into DOM objects.

```javascript
import { DomParser } from 'js-helpers';

// Parse HTML string into a DOM object
const dom = DomParser.parse('<div>Hello World</div>');

// Get the body element from an HTML string
const body = DomParser.htmlBody('<div>Hello World</div>');

// Get nodes from an HTML fragment
const nodes = DomParser.getNodes('<div>Hello</div><span>World</span>');
```

### ObjectHelper

A utility class for working with JavaScript objects.

```javascript
import { ObjectHelper } from 'js-helpers';

// Check if something is an object
const isObj = ObjectHelper.isObject({});  // true

// Deep merge objects
const obj1 = {message: {greeting: 'Hello', subject: 'World'}};
const obj2 = {message: {subject: "Doggo"}};
const merged = ObjectHelper.merge(obj1, obj2);
// Result: {message: {greeting: 'Hello', subject: 'Doggo'}}

// Remove a property from an object
const obj = {name: 'John', age: 30};
const age = ObjectHelper.remove(obj, 'age');
// age = 30, obj = {name: 'John'}

// Count properties in an object
const count = ObjectHelper.count({name: 'John', age: 30, city: 'New York'});
// count = 3
```

### HTML Helpers

A collection of functions for generating HTML elements.

For detailed documentation of all HTML helper functions, see the [HTML Helpers Documentation](docs/html-helpers.md).

```javascript
import { createElement, a, img, form, ul, ol } from 'js-helpers';

// Create an element
const div = createElement('div', 'Hello World', { class: 'greeting' });

// Create an anchor
const link = a('Example', 'http://example.com', { class: 'link' });

// Create an image
const image = img('path/to/image.jpg', { alt: 'Example Image' });

// Create a form
const myForm = form('/submit', 'post', { class: 'form' });

// Create lists
const unorderedList = ul(['Item 1', 'Item 2', 'Item 3'], { class: 'list' });
const orderedList = ol(['First', 'Second', 'Third'], { class: 'ordered-list' });
```

#### Form Elements

```javascript
import { 
  textInput, 
  passwordInput, 
  checkbox, 
  radio, 
  select, 
  textarea 
} from 'js-helpers';

// Create form inputs
const text = textInput('username', 'default-value', { placeholder: 'Enter username' });
const password = passwordInput('password', null, { required: true });
const check = checkbox('agree', true, { label: 'I agree to terms' });
const radioBtn = radio('gender', false, { value: 'male', label: 'Male' });

// Create a select box
const selectBox = select('country', 'us', {
  'us': 'United States',
  'ca': 'Canada',
  'mx': 'Mexico'
}, { required: true });

// Create a textarea
const comments = textarea('comments', 'Default text', { rows: 5, cols: 40 });
```

## License

UNLICENSED
