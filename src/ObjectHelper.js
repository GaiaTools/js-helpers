export class ObjectHelper {

	/**
     * Test if something is an object
     * 
     * @example 
     * var obj = {};
     * ObjectHelper.isObject(obj);
     * // returns true
     * 
     * @param {*} item - The item to test
     * @returns {boolean} - True or false whether the type item is an object
     */
	static isObject(item) {
		return item !== null && typeof item === 'object' && !Array.isArray(item) && typeof item !== 'function';
	}

	/**
     * Deep merge two objects it modifies the first object passed with following arguments and returns the modified object as well
     * 
     * @param {Object} target - The target to be modified
     * @param {...Object} sources - The objects that will be deeply merged
     * @returns {Object} - The modified target object
     * 
     * @example
     * var obj1 = {message: {greeting: 'Hello', subject: 'World'}};
     * var obj2 = {message: {subject: "Doggo"}};
     * ObjectHelper.merge(obj1, obj2) 
     * // returns {message: greeing: 'Hello', subject: 'Doggo'}
     */
	static merge(target, ...sources) {
		if (!this.isObject(target)) {
			throw new Error('Target must be an object');
		}

		sources.forEach(source => {
			if (this.isObject(source)) {
				Object.keys(source).forEach(key => {
					const srcValue = source[key];
					if (this.isObject(srcValue)) {
						if (!target[key] || !this.isObject(target[key])) {
							target[key] = {};
						}
						this.merge(target[key], srcValue);
					} else {
						target[key] = srcValue;
					}
				});
			}
		});

		return target;
	}

	/**
	 * 
	 * @param {Object} target - The object to extract the value from
	 * @param {string} property - The name of the property
	 * @param {string|null} defaultValue - The default value to be returned if the property does not exist
	 * @returns {*|null} - The value of the property, or the default value
	 */
	static remove(target, property, defaultValue = null) {
		if(this.isObject(target) && target.hasOwnProperty(property)) {
			let value = target[property];
			delete target[property];
			
			return value;
		}
		return defaultValue;
	}

	/**
	 * 
	 * @param {Ojbect} item - The object to count the properties
	 */
	static count(item) {
		return Object.keys(item).length;
	}

	/**
	 *
	 * @param {Object} target - the target object to instaniate
	 * @param {Object} config - the config value to pass to the new object
	 * @returns {*} - the instantiated object
	 */
	static createObject(target, config = {}) {
		return new target(config);
	}
}
