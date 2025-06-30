import { describe, it, expect } from 'vitest';
import { ObjectHelper } from '../src/ObjectHelper';

describe('ObjectHelper', () => {
  describe('isObject', () => {
    it('should return true for plain objects', () => {
      expect(ObjectHelper.isObject({})).toBe(true);
      expect(ObjectHelper.isObject({ a: 1 })).toBe(true);
    });

    it('should return false for arrays', () => {
      expect(ObjectHelper.isObject([])).toBe(false);
      expect(ObjectHelper.isObject([1, 2, 3])).toBe(false);
    });

    it('should return false for null', () => {
      expect(ObjectHelper.isObject(null)).toBe(false);
    });

    it('should return false for functions', () => {
      expect(ObjectHelper.isObject(() => {})).toBe(false);
      expect(ObjectHelper.isObject(function() {})).toBe(false);
    });

    it('should return false for primitives', () => {
      expect(ObjectHelper.isObject(1)).toBe(false);
      expect(ObjectHelper.isObject('string')).toBe(false);
      expect(ObjectHelper.isObject(true)).toBe(false);
      expect(ObjectHelper.isObject(undefined)).toBe(false);
    });
  });

  describe('merge', () => {
    it('should merge objects at the top level', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 3, c: 4 };
      const result = ObjectHelper.merge(obj1, obj2);
      
      expect(result).toEqual({ a: 1, b: 3, c: 4 });
      expect(result).toBe(obj1); // Should modify the first object
    });

    it('should deep merge nested objects', () => {
      const obj1 = { a: { x: 1, y: 2 }, b: 2 };
      const obj2 = { a: { y: 3, z: 4 }, c: 5 };
      const result = ObjectHelper.merge(obj1, obj2);
      
      expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 2, c: 5 });
      expect(result).toBe(obj1); // Should modify the first object
    });

    it('should handle multiple sources', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const obj3 = { c: 3 };
      const result = ObjectHelper.merge(obj1, obj2, obj3);
      
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should throw an error if target is not an object', () => {
      expect(() => ObjectHelper.merge(null, {})).toThrow('Target must be an object');
      expect(() => ObjectHelper.merge(1, {})).toThrow('Target must be an object');
      expect(() => ObjectHelper.merge('string', {})).toThrow('Target must be an object');
    });

    it('should ignore non-object sources', () => {
      const obj = { a: 1 };
      const result = ObjectHelper.merge(obj, null, 1, 'string');
      
      expect(result).toEqual({ a: 1 });
    });
  });

  describe('remove', () => {
    it('should remove a property and return its value', () => {
      const obj = { a: 1, b: 2 };
      const value = ObjectHelper.remove(obj, 'a');
      
      expect(value).toBe(1);
      expect(obj).toEqual({ b: 2 });
    });

    it('should return the default value if property does not exist', () => {
      const obj = { a: 1 };
      const value = ObjectHelper.remove(obj, 'b', 'default');
      
      expect(value).toBe('default');
      expect(obj).toEqual({ a: 1 });
    });

    it('should return undefined if property does not exist and no default is provided', () => {
      const obj = { a: 1 };
      const value = ObjectHelper.remove(obj, 'b');
      
      expect(value).toBeUndefined();
      expect(obj).toEqual({ a: 1 });
    });

    it('should handle non-object targets', () => {
      const value = ObjectHelper.remove(null, 'a', 'default');
      expect(value).toBe('default');
    });
  });

  describe('count', () => {
    it('should count the number of properties in an object', () => {
      expect(ObjectHelper.count({})).toBe(0);
      expect(ObjectHelper.count({ a: 1 })).toBe(1);
      expect(ObjectHelper.count({ a: 1, b: 2, c: 3 })).toBe(3);
    });
  });
});