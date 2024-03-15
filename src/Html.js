import {isEmpty} from 'lodash';
import {ObjectHelper} from './ObjectHelper';
import {DomParser} from './DomParser';
import {encodeHTML} from 'entities';

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
const voidElements = [
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
const booleanAttributes = ['required', 'readonly', 'disabled', 'checked'];

/**
 * This will generate a complete HTML element with all attributes
 *
 * @param {string} name - The name of the element to be created
 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The content used to populate the element
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A complete HTML element
 * @see renderContent
 * @see setAttributes
 */
export function tag(name, content, options = {}) {
	const element = document.createElement(name);
	setAttributes(element, options);
	if(!voidElements.includes(name)) {
		renderContent(element, content);
	}

	return element;
}

/**
 * This is a shortcut to generate an anchor element
 *
 * @example
 * // returns an element object of an anchor <a href="http://example.com">Example</a>
 * a('Example', 'http://example.com');
 * @example
 * // returns an element object of an anchor <a class="button">Click Me</a>
 * a('Click Me', null, {'class': 'button'});
 *
 * @param {string} text - The anchor text content
 * @param {string} url - A path used to create the URL
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A complete anchor element
 * @see tag
 */
export function a(text, url, options = {}) {
	if(url !== null) {
		options.href = url;
	}

	return tag('a', text, options);
}

/**
 * This is a shortcut to generate an image element
 *
 * @param {string} src - An image URI to be set as the image source
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A complete image element
 * @see tag
 */
export function img(src, options = {}) {
	options.src = src;

	return tag('img', null, options);
}

/**
 * Generates a form element
 *
 * @param {string} action - The action URL that the form submits to
 * @param {string} method - The method the form uses in the submission
 * @param {Object} options - A name/value list of attributes to add to the element
 */
export function form(action = '', method = 'post', options = {}) {
	const hiddenInputs = new DocumentFragment();
	const queryParamPos = action.indexOf('?');
	if(method.toLowerCase() === 'get' && queryParamPos !== -1) {
		const queryParams = new URLSearchParams(action.substring(queryParamPos + 1));
		for(const [key, value] of queryParams) {
			hiddenInputs.appendChild(hiddenInput(decodeURIComponent(key), decodeURIComponent(value)));
		}
		action = action.substring(0, queryParamPos);
	}

	return tag('form', hiddenInputs, {...options, action, method});
}

/**
 * Generates a form label element
 *
 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The content used to populate the element
 * @param {string} target - A string representing the ID of form control element
 * @param {Object} options - A name/value list of attributes to add to the element
 */
export function label(content, target = null, options = {}) {
	if(target) {
		options.for = target;
	}

	return tag('label', content, options);
}

/**
 * Generates a generic button
 *
 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The button content
 * @param {Object} options - A name/value list of attributes to add to the element
 */
export function button(content, options = {}) {
	if(!options.type) {
		options.type = 'button';
	}

	return tag('button', content, options);
}

/**
 * Generates a reset button
 *
 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The button content
 * @param {Object} options - A name/value list of attributes to add to the element
 */
export function resetButton(content, options = {}) {
	options.type = 'reset';
	return button(content, options);
}

/**
 * Generates a submit button
 *
 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The button content
 * @param {Object} options - A name/value list of attributes to add to the element
 */
export function submitButton(content, options = {}) {
	options.type = 'submit';
	return button(content, options);
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
export function input(type, name, value, options = {}) {
	if(!options.type) {
		options.type = type;
	}
	options.name = name;
	options.value = value;

	return tag('input', null, options);
}

/**
 * Generates an input button
 *
 * @param {string} label - The text of the input button
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A generated input field
 */
export function buttonInput(label = 'Button', options = {}) {
	options.type = 'button';
	options.value = label;

	return tag('input', null, options);
}

/**
 * Generates an submit input button
 *
 * @param {string} label - The text of the input button
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A generated input field
 */
export function submitInput(label = 'Submit', options = {}) {
	options.type = 'submit';
	options.value = label;

	return tag('input', null, options);
}

/**
 * Generates a reset input button
 *
 * @param {string} label - The text of the input button
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A generated input field
 */
export function resetInput(label = 'Reset', options = {}) {
	options.type = 'reset';
	options.value = label;

	return tag('input', null, options);
}

/**
 * Generates a text input field
 *
 * @param {string} name - The value of the name attribute
 * @param {string|null} value - The value of the input field
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A generated input field
 */
export function textInput(name, value = null, options = {}) {
	return input('text', name, value, options);
}

/**
 * Generates a hidden input field
 *
 * @param {string} name - The value of the name attribute
 * @param {string|null} value - The value of the input field
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A generated input field
 */
export function hiddenInput(name, value = null, options = {}) {
	return input('hidden', name, value, options);
}

/**
 * Generates a password input field
 *
 * @param {string} name - The value of the name attribute
 * @param {string|null} value - The value of the input field
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A generated input field
 */
export function passwordInput(name, value = null, options = {}) {
	return input('password', name, value, options);
}

/**
 * Generates a file input field
 *
 * @param {string} name - The value of the name attribute
 * @param {string|null} value - The value of the input field
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A generated input field
 */
export function fileInput(name, value = null, options = {}) {
	return input('file', name, value, options);
}

/**
 * Generates a text box field
 *
 * @param {string} name - The value of the name attribute
 * @param {string} value - The value of the attribute
 * @param {Object} options - A name/value list of attributes to add to the element
 * @returns {HTMLElement} - A generated input field
 */
export function textarea(name, value = '', options = {}) {
	options.name = name;
	return tag('textarea', value, options);
}

/**
 * Generates a radio button input with an optional label.
 *
 * @param {string} name - The name attribute value of the radio button.
 * @param {boolean} checked - Whether the radio button is checked.
 * @param {Object} options - A name/value list of attributes to add to the element.
 * @param {string} options.value - The value attribute of the radio button. Defaults to '1'.
 * @param {Object} options.labelOptions - A name/value list of attributes to add to the label element, if created.
 * @param {string} options.label - The text for the label. If provided, a label element is created.
 * @param {boolean} options.encode - Whether to HTML-encode the label text. Defaults to true.
 * @returns {HTMLElement} - The generated radio button element, optionally wrapped in a label.
 */
export function radio(name, checked = false, options = {}) {
	return booleanInput('radio', name, checked, options);
}

/**
 * Generates a checkbox input with an optional label.
 *
 * @param {string} name - The name attribute value of the checkbox.
 * @param {boolean} checked - Whether the checkbox is checked.
 * @param {Object} options - A name/value list of attributes to add to the element.
 * @param {string} options.value - The value attribute of the checkbox. Defaults to '1'.
 * @param {Object} options.labelOptions - A name/value list of attributes to add to the label element, if created.
 * @param {string} options.label - The text for the label. If provided, a label element is created.
 * @param {boolean} options.encode - Whether to HTML-encode the label text. Defaults to true.
 * @returns {HTMLElement} - The generated checkbox element, optionally wrapped in a label.
 */
export function checkbox(name, checked = false, options = {}) {
	return booleanInput('checkbox', name, checked, options);
}

/**
 * Generates a boolean input of the given type
 *
 * @param {string} type - The type of input to be created; `radio` or `checkbox`
 * @param {string} name - The name attribute of the input element
 * @param {boolean} checked - The checked state of the input element
 * @param {Object} options - A name/value list of attributes to add to the element
 * @param {string} options.uncheck - A value for the unchecked state of a checkbox value. This will generate a hidden input with the value of this property.
 * @param {string} options.label - A label displayed next to the checkbox that is not HTML-encoded. The label wraps around the checkbox.
 * @param {string} options.labelOptions - An array of HTML attributes for the label tag.
 * @returns {DocumentFragment|HTMLElement} - The generated input elements
 */
export function booleanInput(type, name, checked = false, options = {}) {
	const elementOptions = { ...options, type, checked, name, value: options.value || '1' };
	if (options.uncheck) {
		const hiddenElement = hiddenInput(name, options.uncheck, { form: options.form });
	}

	let element = input(type, name, elementOptions.value, elementOptions);
	if (options.label) {
		const labelEl = document.createElement('label');
		labelEl.appendChild(element);
		const textNode = document.createTextNode(options.label);
		labelEl.appendChild(textNode);
		// Apply label options if any
		if (options.labelOptions) {
			setAttributes(labelEl, options.labelOptions);
		}
		element = labelEl; // Wrap the input in the label
	}

	return element;
}

/**
 * This will append the content to an element
 * The content type can be an HTMLElement or an array of HTMLElement, a DocumentFragment, or a string
 *
 * @param {HTMLElement} element - The element to append the content to
 * @param {HTMLElement|HTMLElement[]|DocumentFragment|string} content - The content used to populate the element
 */
export function renderContent(element, content) {
	if (Array.isArray(content) || content instanceof NodeList) {
		for (const childElement of content) {
			element.appendChild(childElement);
		}
	} else if (typeof content === 'object' && content !== null) {
		element.appendChild(content);
	} else if (typeof content === 'string') {
		element.textContent = content;
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
export function select(name, selection = null, items = {}, options = {}) {
	if (options.multiple) {
		return listBox(name, selection, items, options);
	}

	options.name = name;
	const selectOptions = renderSelectOptions(selection, items);
	return tag('select', selectOptions, options);
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
export function listBox(name, selection = null, items = {}, options = {}) {
	const fragment = new DocumentFragment();
	if (!options.size) options.size = 4;

	if (options.multiple && !name.endsWith('[]')) {
		name += '[]';
	}

	options.name = name;
	if (options.unselect) {
		fragment.appendChild(hiddenInput(name, options.unselect));
		delete options.unselect;
	}

	const selectOptions = renderSelectOptions(selection, items);
	fragment.appendChild(tag('select', selectOptions, options));
	return fragment;
}

/**
 * Renders options for a select element
 *
 * @param {string|string[]} selection - The value or values to be marked as selected
 * @param {Object} items - The items to be used as options in the select element, as a key-value pair where the key is the option value and the value is the display text
 * @param {Object} [options] - Additional options for rendering the select options
 * @returns {DocumentFragment} - A document fragment containing the <option> elements
 */
export function renderSelectOptions(selection, items, options = {}) {
	const fragment = document.createDocumentFragment();
	const selections = new Set(Array.isArray(selection) ? selection : [selection]);

	Object.entries(items).forEach(([value, text]) => {
		const optionElement = document.createElement('option');
		optionElement.value = value;
		optionElement.textContent = text;
		if (selections.has(value)) {
			optionElement.selected = true;
		}

		// Apply any additional option-specific attributes if provided
		if (options[value]) {
			setAttributes(optionElement, options[value]);
		}

		fragment.appendChild(optionElement);
	});

	return fragment;
}

/**
 * Generates a list of checkboxes
 *
 * @param {string} name - The name attribute of each checkbox
 * @param {string|string[]|null} selection - The selected checkboxes. A string for a single value or an array for multiple checkboxes
 * @param {Object} items - The data items to be used to generate the checkboxes.
 * The object keys are the checkbox values
 * @param {Object} options - A name/value list for the checkbox list container tag
 * @param {string} options.separator - A string to be used as a separator between the checkboxes
 * @param {string} options.unselect - A value to be used to unselect all checkboxes
 * @param {Object} options.itemOptions - A name/value list of attributes to add to each checkbox
 * @returns {DocumentFragment} - The list of checkboxes to return
 */
export function checkboxList(name, selection = null, items = {}, options = {}) {
	const fragment = new DocumentFragment();
	if (selection !== null) {
		selection = Array.isArray(selection) ? selection : [selection];
	}

	Object.entries(items).forEach(([value, label], index) => {
		const isChecked = selection && selection.includes(value);
		const checkboxEl = checkbox(name, isChecked, {
			value,
			label,
			...options.itemOptions, // Assume there's an options processing function if needed
		});
		fragment.appendChild(checkboxEl);

		// Optionally add a separator if specified
		if (options.separator && index < Object.keys(items).length - 1) {
			const separatorText = document.createTextNode(options.separator);
			fragment.appendChild(separatorText);
		}
	});

	// Unselect hidden input if necessary
	if (options.unselect !== undefined) {
		fragment.prepend(hiddenInput(name, options.unselect));
	}

	return fragment;
}

/**
 * Generates a list of radios
 *
 * @param {string} name - The name attribute of each radio field
 * @param {string|null} selection - The selected radio. A string for a single value or an array for multiple radios
 * @param {Object} items - The data items to be used to generate the radio.
 * The object keys are the radio values
 * @param {Object} options - A name/value list for the radio list container tag
 * @returns {DocumentFragment} - The list of radio to return
 */
export function radioList(name, selection = null, items = {}, options = {}) {
	const fragment = new DocumentFragment();
	const encode = options.encode !== false;
	const selectedValue = String(selection);

	Object.entries(items).forEach(([value, label], index) => {
		const isChecked = value === selectedValue;
		const radioElement = radio(name, isChecked, {
			value,
			label: encode ? encodeHTML(label) : label,
			...options.itemOptions
		});
		fragment.appendChild(radioElement);

		if (options.separator && index < Object.keys(items).length - 1) {
			fragment.appendChild(document.createTextNode(options.separator));
		}
	});

	if (options.unselect) {
		fragment.prepend(hiddenInput(name, options.unselect));
	}

	return fragment;
}

/**
 * Generates an unordered list
 *
 * @param {HTMLElement[]|string[]} items - An array of elements to append to the unordered list item
 * @param {Object} options - A name/value list for the list container tag
 * @returns {HTMLElement} - The generated list
 */
export function ul(items, options = {}) {
	const tagOption = options.tag || 'ul';
	const encode = options.encode !== false;
	const fragment = new DocumentFragment();

	items.forEach((item, index) => {
		const li = document.createElement('li');
		if (typeof item === 'string' && encode) {
			li.innerHTML = encodeHTML(item);
		} else if (item instanceof HTMLElement) {
			li.appendChild(item);
		} else {
			li.textContent = item.toString();
		}
		fragment.appendChild(li);
	});

	return tag(tagOption, fragment, options);
}

/**
 * Generates an ordered list
 *
 * @param {HTMLElement[]} items - An array of elements to append to the ordered list item
 * @param {Object} options - A name/value list for the list container tag
 * @returns {HTMLElement} - The generated list
 */
export function ol(items, options = {}) {
	options.tag = 'ol'; // Force tag to 'ol' for ordered lists
	return ul(items, options);
}

/**
 * Generates a text node
 *
 * @param {string} text - The text to be generated as a text node
 * @returns {Text} - Generated text node
 */
export function text(text) {
	return document.createTextNode(text);
}

/**
 * Sets the HTML element attributes
 *
 * @param {HTMLElement} element - The element to add attributes to
 * @param {Object} attributes - A name/value list of attributes to add to the element
 */
export function setAttributes(element, attributes = {}) {
	Object.entries(attributes).forEach(([name, value]) => {
		if (value === null || value === false) {
			return;
		}

		if (booleanAttributes.includes(name)) {
			element[name] = !!value;
		} else if (name === 'class' && Array.isArray(value)) {
			element.className = value.join(' ');
		} else if (name === 'style' && typeof value === 'object') {
			Object.assign(element.style, value);
		} else if (name.startsWith('data') && typeof value === 'object') {
			Object.entries(value).forEach(([dataKey, dataValue]) => {
				element.dataset[dataKey] = dataValue;
			});
		} else {
			element.setAttribute(name, value.toString());
		}
	});
}

/**
 * Add class names to an element
 *
 * @param {HTMLElement} element - The element to modify
 * @param {string[]} classList - An array of class names to add to the element
 */
export function addClass(element, classList) {
	element.classList.add(...classList);
}

/**
 * Remove class names from an element
 *
 * @param {HTMLElement} element - The element to modify
 * @param {string[]} classList - An array of class names to remove from the element
 */
export function removeClass(element, classList) {
	element.classList.remove(...classList);
}

