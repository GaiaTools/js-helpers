module.exports = class DomParser {
	static get parser() {
		return new DOMParser;
	}

	/**
	 * This converts a source document string into a DOM object
	 * 
	 * @see You can read more about the {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMParser |DOMParser} from the MDN
	 * @param {string} source - The source document
	 * @param {string} type - The MIME type of the source document 
	 * @returns {HTMLDocument|XMLDocument} - The document returned is either an HTML, SVG, or XML document
	 */
	static parse(source, type = 'text/html') {
		return this.parser.parseFromString(source, type);
	}

	/**
	 * @see {@link DomParser#parse}
	 * 
	 * @param {string} source - A string of HTML
	 * @returns {Object} - The HTML body element
	 */
	static htmlBody(source) {
		return this.parse(source).body;
	}

	/**
	 * @see {@link DomParser#parse}
	 * 
	 * @param {string} source - An HTML fragment  
	 * @returns {NodeList} - The HTML nodes from the source string
	 */
	static getNodes(source) {
		return this.parse(source).body.childNodes;
	}
};