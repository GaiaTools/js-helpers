let htmlspecialchars = require('locutus/php/strings/htmlspecialchars');
let html_entity_decode = require('locutus/php/strings/html_entity_decode');
let empty = require('locutus/php/var/empty');
let ObjectHelper = require('./ObjectHelper');
let DomParser = require('./DomParser');

/**
 * @callback itemCallback
 * @param {int} index - The index position in the list of the current checkbox
 * @param {string} label - A label for the checkbox
 * @param {string} name - The name of the checkbox
 * @param {boolean} checked - Whether to check the checkbox
 * @param {string} value - The value of the checkbox
 * @returns {HTMLElement} - Customized checkbox HTML
 */

/**
 * @callback listCallback
 * @param {*} item -
 * @param {int} index - An array key of the current position in the items array
 */

/**
 * @var {Array} - A list of elements that do not allow for inner HTML
 */
let emptyElements = [
	'area',
	'base',
	'br',
	'col',
	'command',
	'embed',
	'hr',
	'img',
	'input',
	'keygen',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr',
];

/**
 * @var {Array} - A list of boolean attributes
 */
let booleanAttributes = ['required', 'readonly', 'disabled', 'checked'];

export default class Html {
	/**
	 * Encode HTML characters
	 * 
	 * @param {string} content - The string to encode
	 * @param {boolean} doubleEncode - Whether to double encode
	 */
	static encode(content, doubleEncode = true) {
		return htmlspecialchars(content, 'ENT_QUOTES', null, doubleEncode);
	}

	/**
	 * Decode HTML characters
	 * 
	 * @param {string} content - The string to decode
	 * @returns {string} - The decoded string
	 */
	static decode(content) {
		return html_entity_decode(content, 'ENT_QUOTES');
	}

	/**
	 * This will generate a complete HTML element with all attributes
	 * 
	 * @param {string} name - The name of the elment to be created
	 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The content used to populate the element
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A complete HTML element
	 * @see renderContent
	 * @see setAttributes
	 */
	static tag(name, content, options = {}) {
		let element = document.createElement(name);
		this.setAttributes(element, options);
		if(!emptyElements.includes(name)) {
			this.renderContent(element, content);
		}

		return element;
	}

	/**
	 * This is a shortcut to generate an anchor element
	 * 
	 * @example
	 * // returns an element object of an anchor <a href="http://example.com">Example</a>
	 * Html.a('Example', 'http://example.com');
	 * @example
	 * // returns an element object of an anchor <a class="button">Click Me</a>
	 * Html.a('Click Me', null, {'class': 'button'});
	 * 
	 * @param {string} text - The anchor text content
	 * @param {string} url - A path used to create the URL
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A complete anchor element
	 * @see tag
	 */
	static a(text, url, options = {}) {
		if(url !== null) {
			options.href = url;
		}

		return this.tag('a', text, options);
	}

	/**
	 * this is a shortcut to generate an image element
	 * 
	 * @param {string} src - An image URI to be set as the image source
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - a complete image element
	 * @see tag
	 */
	static img(src, options = {}) {
		options.src = src;

		return this.tag('img', null, options);
	}

	/**
	 * Generates a form element
	 * 
	 * @param {string} action - The action URL that the form submits to
	 * @param {string} method - The method the form uses in the submission
	 * @param {*} options - A name/value list of attributes to add to the element
	 */
	static form(action = '', method = 'post', options = {}) {
		let hiddenInputs = new DocumentFragment;
		
		let queryParamPos = action.indexOf('?');
		if(method === 'get' && queryParamPos > 0) {
			let queryParams = action.substring(queryParamPos + 1).split('&');
			for(let param of queryParams) {
				let separatorPos = param.indexOf('=');
				if(separatorPos > 0) {
					// substr is inclusive, substring is exclusive use substring to exclude the = from the value
					hiddenInputs.appendChild(this.hiddenInput(
						decodeURIComponent(param.substr(0, separatorPos)),
						decodeURIComponent(param.substr(separatorPos + 1))
					));
				}
				else {
					hiddenInputs.appendChild(this.hiddenInput(decodeURIComponent(param), ''));
				}
			}
			action = action.substr(0, queryParamPos);
		}

		options.action = action;
		options.method = method;
		return this.tag('form', hiddenInputs);
	}

	/**
	 * Generates a form label element
	 * 
	 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The content used to populate the element
	 * @param {string} target - A string representing the ID of form control element
	 * @param {Object} options - A name/value list of attributes to add to the element
	 */
	static label(content, target = null, options = {}) {
		if(target) {
			options.for = target;
		}

		return this.tag('label', content, options);
	}

	/**
	 * Generates a generic button
	 * 
	 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The button content
	 * @param {Object} options - A name/value list of attributes to add to the element
	 */
	static button(content, options = {}) {
		if(!options.type) {
			options.type = 'button';
		}

		return this.tag('button', content, options);
	}

	/**
	 * Generates a reset button 
	 * 
	 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The button content
	 * @param {Object} options - A name/value list of attributes to add to the element
	 */
	static resetButton(content, options = {}) {
		options.type = 'reset';
		this.button(content, options);
	}

	/**
	 * Generates a submit button
	 * 
	 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The button content
	 * @param {Object} options - A name/value list of attributes to add to the element
	 */
	static submitButton(content, options = {}) {
		options.type = 'reset';
		this.button(content, options);
	}

	/**
	 * Generates an input element of a given type
	 * 
	 * @param {string} type - The type of input field to generate
	 * @param {string} name - The value of the name attribute
	 * @param {string} value - The value of the input field
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A generated input field
	 */
	static input(type, name, value, options = {}) {
		if(!options.type) {
			options.type = type;
		}
		options.name = name;
		options.value = value;

		return this.tag('input', null, options);
	}

	/**
	 * Generates an input button
	 * 
	 * @param {string} label - The text of the input button
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A generated input field
	 */
	static butonInput(label = 'Button', options = {}) {
		options.type = 'button';
		options.value = label;

		return this.tag('input', null, options);
	}

	/**
	 * Generates an submit input button
	 * 
	 * @param {string} label - The text of the input button
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A generated input field
	 */
	static submitInput(label = 'Submit', options = {}) {
		options.type = 'submit';
		options.value = label;

		return this.tag('input', null, options);
	}

	/**
	 * Generates a reset input button
	 * 
	 * @param {string} label - The text of the input button
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A generated input field
	 */
	static resetInput(label = 'Reset', options = {}) {
		options.type = 'reset';
		options.value = label;

		return this.tag('input', null, options);
	}

	/**
	 * Generates a text input field
	 * 
	 * @param {string} name - The value of the name attribute
	 * @param {string} value - The value of the input field
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A generated input field
	 */
	static textInput(name, value = null, options = {}) {
		return this.input('text', value, options);
	}

	/**
	 * Generates a hidden input field
	 * 
	 * @param {string} name - The value of the name attribute
	 * @param {string} value - The value of the input field
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A generated input field
	 */
	static hiddenInput(name, value = null, options = {}) {
		return this.input('hidden', name, value, options);
	}

	/**
	 * Generates a password input field
	 * 
	 * @param {string} name - The value of the name attribute
	 * @param {string} value - The value of the input field
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A generated input field
	 */
	static passwordInput(name, value = null, options = {}) {
		return this.input('password', value, options);
	}

	/**
	 * Generates a file input field
	 * 
	 * @param {string} name - The value of the name attribute
	 * @param {string} value - The value of the input field
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A generated input field
	 */
	static fileInput(name, value = null, options = {}) {
		return this.input('file', value, options);
	}

	/**
	 * Generates a text box field
	 * 
	 * @param {string} name - The value of the name attribute
	 * @param {string} value - The value of the attribute
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HTMLElement} - A generated input field
	 */
	static textarea(name, value = '', options = {}) {
		options.name = name;
		return this.tag('textarea', value, options);
	}

	/**
	 * Generates a radio button input
	 * 
	 * @param {string} name - The name attribute value of the radio
	 * @param {boolean} checked - Whether the radio is checked
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {HtmlElement} - A generated input field
	 */
	static radio(name, checked = false, options = {}) {
		return this.booleanInput('radio', name, checked, options);
	}

	/**
	 * Generates a checkbox button input
	 * 
	 * @param {string} name - The name attribute value of the checkbox
	 * @param {boolean} checked - Whether the checkbox is checked
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {DocumentFragment|HTMLElement} - A generated input field
	 */
	static checkbox(name, checked = false, options = {}) {
		return this.booleanInput('checkbox', name, checked, options);
	}

	/**
	 * Generates a boolean input of the given type
	 * 
	 * @param {string} type - The type of of input to be created; `radio` or `checkbox`
	 * @param {string} name - The name attribute of the input element
	 * @param {boolean} checked - The checked state of the input element
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @param {string} options.uncheck - A value for the unchecked state of a checkbox value
	 * This will generate a hidden input with the value of this property
	 * @param {string} options.label - A label displayed next to the checkbox that is not HTML-encoded
	 * The label wraps around the checkbox
	 * @param {string} options.labelOptions - An array of HTML attributes for the label tag.
	 * This is useless if you have not set the label property
	 * @returns {DocumentFragment|HTMLElement} - The generated input elements
	 */
	static booleanInput(type, name, checked = false, options = {}) {
		options.checked = checked;
		let fragment = new DocumentFragment;
		
		let value = options.value ? options.value : 1;

		if(options.uncheck) {
			let hiddenOptions = {};
			if(options.form) {
				hiddenOptions.form = options.form;
			}
			fragment.appendChild(this.hiddenInput(name, options.uncheck, hiddenOptions));
			delete options.uncheck;
		}

		if(options.label) {
			let label = options.label;
			let labelOptions = options.labelOptions ? options.labelOptions : {};
			delete options.label;
			return this.label([this.input(type, name, value, options), this.text(label)], null, labelOptions);
		}

		fragment.appendChild(this.input(type, name, value, options));

		return fragment;
	}

	/**
	 * This will append the content to an element
	 * The content type can be an HTMLElement or an array of HTMLElement, a DocumentFragment, or a string
	 * 
	 * @param {HTMLElement} element - The element to append the content to
	 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The content used to populate the element
	 */
	static renderContent(element, content) {
		if(Array.isArray(content) || content instanceof NodeList) {
			for(let childElement of content) {
				element.appendChild(childElement);
			}
		}
		else if(typeof content === 'object') {
			element.appendChild(content);
		}
		else if(typeof content === 'string') {
			element.innerHTML = content;
		}
	}

	/**
	 * Generates a select box
	 * 
	 * @param {string} name - The name of the select box
	 * @param {string|string[]} selection - A string or array of strings to set the selected value(s)
	 * @param {Object} items - A key/value pair for the option value and text
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {DocumentFragment} - The generated select box
	 */
	static select(name, selection = null, items = {}, options = {}) {
		if(options.multiple) {
			return this.listBox(name, selection, items, options);
		}

		options.name = name;
		delete options.unselect;
		let selectOptions = this.renderSelectOptions(selection, items, options);
		return this.tag('select', selectOptions, options);
	}

	/**
	 * Generates a select list box
	 * 
	 * @param {string} name - The name of the select box
	 * @param {string|string[]} selection - A string or array of strings to set the selected value(s)
	 * @param {Object} items - A key/value pair for the option value and text
	 * @param {Object} options - A name/value list of attributes to add to the element
	 * @returns {DocumentFragment} - The generated select box
	 */
	static listBox(name, selection = null, items = {}, options = {}) {
		let fragment = new DocumentFragment;
		if(!options.size) {
			options.size = 4;
		}

		if(options.multiple && name && name.substr(-2, 2) === '[]') {
			name += '[]';
		}
		
		options.name = name;
		if(options.unselect) {
			if(name && name.substring(-2, 2).indexOf('[]') === 0) {
				name = name.substr(0, name.length - 2);
			}
			fragment.appendChild(this.hiddenInput(name, options.unselect));
			delete options.unselect;
		}

		let selectOptions = this.renderSelectOptions(selection, items, options);
		fragment.appendChild(this.tag('select', selectOptions, options));
		return fragment;
	}

	/**
	 * Generates a list of checkboxes
	 * 
	 * @param {string} name - The name attribute of each checkbox
	 * @param {string|string[]|null} selection - The selected checkboxes. An string for a single value or an array for multiple checkboxes
	 * @param {Object} items - The data items to be used to generate the checkboxes.
	 * The object keys are the checkbox values
	 * @param {Object} options - A name/value list for the checkbox list container tag
	 * The options parameter handles theses properties specially
	 * @param {string|false} options.tag - The tag used to generate the wrapper or false to render without a container
	 * @param {string} options.unselect - The default value that's submitted if no checkbox is checked
	 * @param {boolean} options.encode - Wehther to HTML-encode the checkbox labels; defaults to true. 
	 * Ignored if `item` is false
	 * @param {string} options.separator - HTML string that's used to separate items
	 * @param {Object} options.itemOptions - The options for generating the checkbox [[checkbox()]]
	 * @param {itemCallback} options.item - A callback function to customize the HTML generation of each item in the items object. 
	 * It must return a DocumentFragment containing a single checkbox input or an HTMLElement checkbox input
	 * @returns {DocumentFragment} - The list of checkboxes to return
	 */
	static checkboxList(name, selection = null, items = {}, options = {}) {
		if(name.substr(-2) !== '[]') {
			name += '[]';
		}
		if(Array.isArray(selection)) {
			selection = selection.map(value => value.toString());
		}

		let formatter = ObjectHelper.remove(options, 'item');
		let itemOptions = ObjectHelper.remove(options, 'itemOptions', {});
		let encode = ObjectHelper.remove(options, 'encode', true);
		let separator = this.text(ObjectHelper.remove(options, 'separator', '\n'));
		let tag = ObjectHelper.remove(options, 'tag', 'div');

		let fragment = new DocumentFragment;
		let index = 0;

		// `value` in this context is the checkbox value, not the object property value
		for(let value in items) {
			let label = items[value];
			let checked = selection !== null && (value === selection || Array.isArray(selection) && selection.includes(value));
			if(formatter !== null) {
				fragment.appendChild(formatter(index, label, checked, name, value));
			}
			else {
				fragment.appendChild(this.checkbox(name, checked, ObjectHelper.merge(itemOptions, {
					value: value, 
					label: encode ? this.encode(label) : label
				})));
			}
			index++;

			fragment.appendChild(separator.cloneNode());
		}

		if(options.hasOwnProperty('unselect')) {
			let name = name.substr(0, name.length - 2) === '[]' ? name.substr(0, -2) : name;
			let hidden = this.hiddenInput(name, options['unselect']);
			delete options.unselect;
			fragment.appendChild(hidden);
		}

		if(tag === false) {
			return fragment;
		}

		return this.tag(tag, fragment, options);
	}

	/**
	 * Generates a list of radios
	 * 
	 * @param {string} name - The name attribute of each radio field
	 * @param {string|null} selection - The selected radio. An string for a single value or an array for multiple radios
	 * @param {Object} items - The data items to be used to generate the radio.
	 * The object keys are the radio values
	 * @param {Object} options - A name/value list for the radio list container tag
	 * The options parameter handles theses properties specially
	 * @param {string|false} options.tag - The tag used to generate the wrapper or false to render without a container
	 * @param {string} options.unselect - The default value that's submitted if no radio is checked
	 * @param {boolean} options.encode - Wehther to HTML-encode the radio labels; defaults to true. 
	 * Ignored if `item` is false
	 * @param {string} options.separator - HTML string that's used to separate items
	 * @param {Object} options.itemOptions - The options for generating the radio [[radio()]]
	 * @param {itemCallback} options.item - A callback function to customize the HTML generation of each item in the items object. 
	 * It must return a DocumentFragment containing a single radio input or an HTMLElement radio input
	 * @returns {DocumentFragment} - The list of radio to return
	 */
	static radioList(name, selection = null, items = {}, options = {}) {
		if(Array.isArray(selection)) {
			selection = selection.map(value => value.toString());
		}

		let formatter = ObjectHelper.remove(options, 'item');
		let itemOptions = ObjectHelper.remove(options, 'itemOptions', {});
		let encode = ObjectHelper.remove(options, 'encode', true);
		let separator = DomParser.getNodes(ObjectHelper.remove(options, 'separator', '')).item(0);
		let tag = ObjectHelper.remove(options, 'tag', 'div');

		let fragment = new DocumentFragment;
		let index = 0;

		if(options.hasOwnProperty('unselect')) {
			let hidden = this.hiddenInput(name, options['unselect']);
			delete options.unselect;
			fragment.appendChild(hidden);
		}

		// `value` in this context is the checkbox value, not the object property value
		for(let value in items) {
			let label = items[value];
			let checked = selection !== null && value === selection;
			if(formatter !== null) {
				fragment.appendChild(formatter(index, label, checked, name, value));
			}
			else {
				fragment.appendChild(this.radio(name, checked, ObjectHelper.merge(itemOptions, {
					value: value, 
					label: encode ? this.encode(label) : label
				})));
			}
			index++;

			if(separator) {
				fragment.appendChild(separator.cloneNode());
			}
		}

		if(tag === false) {
			return fragment;
		}

		return this.tag(tag, fragment, options);
	}

	/**
	 * Genertates an unordered list
	 * 
	 * @param {HTMLElement[]} items - An array of elements to append to the unordered list item
	 * @param {Object} options - A name/value list for the list container tag
	 * @param {boolean} options.encode - Whether to encode the list items
	 * @param {string} options.separator - An HTML string that separates items
	 * @param {Object} options.itemOptions - The HTML attributes for the `li` tags
	 * @param {listCallback} options.item - A callback that's used to customize the list item.
	 */
	static ul(items, options = {}) {
		let tag = ObjectHelper.remove(options, 'tag', 'ul');
		let encode = ObjectHelper.remove(options, 'encode', true);
		let formatter = ObjectHelper.remove(options, 'item');
		let separator = DomParser.getNodes(ObjectHelper.remove(options, 'separator', '\n')).item(0);
		let itemOptions = ObjectHelper.remove(options, 'itemOptions', {});
		
		if(empty(items)) {
			return this.tag(tag, '', options);
		}

		let fragment = new DocumentFragment;

		for(let idx in items) {
			let item = items[idx];
			if(formatter !== null) {
				fragment.appendChild(formatter(item, idx));
			}
			else {
				fragment.appendChild(this.tag('li', encode ? this.encode(item) : item, itemOptions));
			}
			
			if(separator) {
				fragment.appendChild(separator.cloneNode());
			}
		}

		return this.tag(tag, fragment, options);
	}

	/**
	 * Generates an ordered list
	 * 
	 * @param {HTMLElement[]} items - An array of elements to append to the ordered list item
	 * @param {Object} options - A name/value list for the list container tag
	 * @param {boolean} options.encode - Whether to encode the list items
	 * @param {string} options.separator - An HTML string that separates items
	 * @param {Object} options.itemOptions - The HTML attributes for the `li` tags
	 * @param {listCallback} options.item - a callback that's used to customize the list item
	 */
	static ol(items, options = {}) {
		options['tag'] = 'ol';
		return this.ul(items, options);
	}
	
	/**
	 * 
	 * @param {string} text - The text to be generated as a text node
	 * @returns {Text} - Generated text node
	 */
	static text(text) {
		return document.createTextNode(text);
	}

	/**
	 * Sets the HTML element attributes
	 * Attributes that are null or false will not be set
	 * 
	 * @param {HTMLElement} element - The element to add attributes to
	 * @param {Object} attributes - A name/value list of attributes to add to the element
	 */
	static setAttributes(element, attributes = {}) {
		if(typeof element !== 'object' || typeof attributes !== 'object') {
			return;
		}
	
		for(let name in attributes) {
			let value = attributes[name];
	
			// name must be a string
			if(Number(name)) {
				continue;
			}

			if(typeof value === 'boolean' && booleanAttributes.includes(name)) {
				if(value) {
					element[name] = true;
					continue;
				}
			}
			else if(value && typeof value === 'object') {
				if(name === 'class' && Array.isArray(value)) {
					element.className = value.join(' ');
				}
				else if(name === 'data') {
					for(let name in value ) {
						let value = value[name];
						if(value === true) {
							element.dataset[name] = '';
						}
						else if(value !== '') {
							element.dataset[name] = value;
						}
					}
				}
			}
			else if(value !== '') {
				element.setAttribute(name, value);
			}
		}
	}

	/**
	 * Add class names to an element
	 * 
	 * @param {HTMLElement} element - The element to modify
	 * @param {string[]} classList - An array of class names to add to the element
	 */
	static addClass(element, classList) {
		element.classList.add(...classList);
	}

	/**
	 * Remove class names from an element
	 * 
	 * @param {HTMLElement} element - The element to modify
	 * @param {string[]} classList - An array of class names to remove from the element
	 */
	static removeClass(element, classList) {
		element.classList.remove(...classList);
	}
}