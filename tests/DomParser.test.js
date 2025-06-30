import { describe, it, expect } from 'vitest';
import { DomParser } from '../src/DomParser';

describe('DomParser', () => {
  describe('parser', () => {
    it('should return a DOMParser instance', () => {
      const parser = DomParser.parser;
      expect(parser).toBeInstanceOf(DOMParser);
    });
  });

  describe('parse', () => {
    it('should parse HTML string into a document', () => {
      const html = '<div>Hello World</div>';
      const doc = DomParser.parse(html);
      
      expect(doc).toBeInstanceOf(Document);
      expect(doc.body.innerHTML).toContain('Hello World');
    });

    it('should parse XML string when type is specified', () => {
      const xml = '<root><item>Test</item></root>';
      const doc = DomParser.parse(xml, 'text/xml');
      
      expect(doc).toBeInstanceOf(Document);
      expect(doc.documentElement.nodeName).toBe('root');
    });

    it('should handle empty strings', () => {
      const doc = DomParser.parse('');
      expect(doc).toBeInstanceOf(Document);
    });
  });

  describe('htmlBody', () => {
    it('should return the body element from HTML string', () => {
      const html = '<html><body><div>Test Content</div></body></html>';
      const body = DomParser.htmlBody(html);
      
      expect(body).toBeInstanceOf(HTMLBodyElement);
      expect(body.innerHTML).toContain('Test Content');
    });

    it('should handle HTML fragments', () => {
      const html = '<div>Fragment</div>';
      const body = DomParser.htmlBody(html);
      
      expect(body).toBeInstanceOf(HTMLBodyElement);
      expect(body.innerHTML).toContain('Fragment');
    });

    it('should handle empty strings', () => {
      const body = DomParser.htmlBody('');
      expect(body).toBeInstanceOf(HTMLBodyElement);
    });
  });

  describe('getNodes', () => {
    it('should return child nodes from HTML string', () => {
      const html = '<div>First</div><span>Second</span>';
      const nodes = DomParser.getNodes(html);
      
      expect(nodes).toBeInstanceOf(NodeList);
      expect(nodes.length).toBe(2);
      expect(nodes[0].textContent).toBe('First');
      expect(nodes[1].textContent).toBe('Second');
    });

    it('should handle single node', () => {
      const html = '<div>Single Node</div>';
      const nodes = DomParser.getNodes(html);
      
      expect(nodes).toBeInstanceOf(NodeList);
      expect(nodes.length).toBe(1);
      expect(nodes[0].textContent).toBe('Single Node');
    });

    it('should handle text nodes', () => {
      const html = 'Just Text';
      const nodes = DomParser.getNodes(html);
      
      expect(nodes).toBeInstanceOf(NodeList);
      expect(nodes.length).toBe(1);
      expect(nodes[0].textContent).toBe('Just Text');
    });

    it('should handle empty strings', () => {
      const nodes = DomParser.getNodes('');
      expect(nodes).toBeInstanceOf(NodeList);
      expect(nodes.length).toBe(0);
    });
  });
});