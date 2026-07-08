(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("PerspectiveClient"), require("React"), require("ReactDOM"), require("mobxReact"));
	else if(typeof define === 'function' && define.amd)
		define("WARGoetzComponents", ["PerspectiveClient", "React", "ReactDOM", "mobxReact"], factory);
	else if(typeof exports === 'object')
		exports["WARGoetzComponents"] = factory(require("PerspectiveClient"), require("React"), require("ReactDOM"), require("mobxReact"));
	else
		root["WARGoetzComponents"] = factory(root["PerspectiveClient"], root["React"], root["ReactDOM"], root["mobxReact"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__inductiveautomation_perspective_client__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__, __WEBPACK_EXTERNAL_MODULE_mobx_react__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/dompurify/dist/purify.cjs.js":
/*!*******************************************************!*\
  !*** ../../node_modules/dompurify/dist/purify.cjs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
/*! @license DOMPurify 3.4.2 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.2/LICENSE */



const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object; // eslint-disable-line import/no-mutable-exports
let {
  apply,
  construct
} = typeof Reflect !== 'undefined' && Reflect;
if (!freeze) {
  freeze = function freeze(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const arrayIsArray = Array.isArray;
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const numberToString = unapply(Number.prototype.toString);
const booleanToString = unapply(Boolean.prototype.toString);
const bigintToString = typeof BigInt === 'undefined' ? null : unapply(BigInt.prototype.toString);
const symbolToString = typeof Symbol === 'undefined' ? null : unapply(Symbol.prototype.toString);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const objectToString = unapply(Object.prototype.toString);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
/**
 * Creates a new function that calls the given function with a specified thisArg and arguments.
 *
 * @param func - The function to be wrapped and called.
 * @returns A new function that calls the given function with a specified thisArg and arguments.
 */
function unapply(func) {
  return function (thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
/**
 * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
 *
 * @param func - The constructor function to be wrapped and called.
 * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
 */
function unconstruct(Func) {
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
/**
 * Add properties to a lookup table
 *
 * @param set - The set to which elements will be added.
 * @param array - The array containing elements to be added to the set.
 * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
 * @returns The modified set with added elements.
 */
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf(set, null);
  }
  if (!arrayIsArray(array)) {
    return set;
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === 'string') {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
/**
 * Clean up an array to harden against CSPP
 *
 * @param array - The array to be cleaned.
 * @returns The cleaned version of the array
 */
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
/**
 * Shallow clone an object
 *
 * @param object - The object to be cloned.
 * @returns A new object that copies the original.
 */
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (arrayIsArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === 'object' && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
/**
 * Convert non-node values into strings without depending on direct property access.
 *
 * @param value - The value to stringify.
 * @returns A string representation of the provided value.
 */
function stringifyValue(value) {
  switch (typeof value) {
    case 'string':
      {
        return value;
      }
    case 'number':
      {
        return numberToString(value);
      }
    case 'boolean':
      {
        return booleanToString(value);
      }
    case 'bigint':
      {
        return bigintToString ? bigintToString(value) : '0';
      }
    case 'symbol':
      {
        return symbolToString ? symbolToString(value) : 'Symbol()';
      }
    case 'undefined':
      {
        return objectToString(value);
      }
    case 'function':
    case 'object':
      {
        if (value === null) {
          return objectToString(value);
        }
        const valueAsRecord = value;
        const valueToString = lookupGetter(valueAsRecord, 'toString');
        if (typeof valueToString === 'function') {
          const stringified = valueToString(valueAsRecord);
          return typeof stringified === 'string' ? stringified : objectToString(stringified);
        }
        return objectToString(value);
      }
    default:
      {
        return objectToString(value);
      }
  }
}
/**
 * This method automatically checks if the prop is function or getter and behaves accordingly.
 *
 * @param object - The object to look up the getter function in its prototype chain.
 * @param prop - The property name for which to find the getter function.
 * @returns The getter function found in the prototype chain or a fallback function.
 */
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === 'function') {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
function isRegex(value) {
  try {
    regExpTest(value, '');
    return true;
  } catch (_unused) {
    return false;
  }
}

const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'search', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);
const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'enterkeyhint', 'exportparts', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'inputmode', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'part', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);
// List of SVG elements that are disallowed by default.
// We still need to know them so that we can do namespace
// checks properly in case one wants to add them to
// allow-list.
const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);
// Similarly to SVG, we want to know all MathML elements,
// even those that we disallow by default.
const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
const text = freeze(['#text']);

const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'exportparts', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inert', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'part', 'pattern', 'placeholder', 'playsinline', 'popover', 'popovertarget', 'popovertargetaction', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'slot', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'wrap', 'xmlns']);
const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'amplitude', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'exponent', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'mask-type', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'slope', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'tablevalues', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnalign', 'columnlines', 'columnspacing', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lquote', 'lspace', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

// eslint-disable-next-line unicorn/better-regex
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm); // eslint-disable-line unicorn/better-regex
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);

var EXPRESSIONS = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ARIA_ATTR: ARIA_ATTR,
    ATTR_WHITESPACE: ATTR_WHITESPACE,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT,
    DATA_ATTR: DATA_ATTR,
    DOCTYPE_NAME: DOCTYPE_NAME,
    ERB_EXPR: ERB_EXPR,
    IS_ALLOWED_URI: IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
    MUSTACHE_EXPR: MUSTACHE_EXPR,
    TMPLIT_EXPR: TMPLIT_EXPR
});

/* eslint-disable @typescript-eslint/indent */
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
const NODE_TYPE = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9};
const getGlobal = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};
/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param trustedTypes The policy factory.
 * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
 * @return The policy created (or null, if Trusted Types
 * are not supported or creating the policy failed).
 */
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  }
  // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.
  let suffix = null;
  const ATTR_NAME = 'data-tt-policy-suffix';
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html) {
        return html;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};
const _createHooksMap = function _createHooksMap() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
  const DOMPurify = root => createDOMPurify(root);
  DOMPurify.version = '3.4.2';
  DOMPurify.removed = [];
  if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document
  } = window;
  const originalDocument = document;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
  const remove = lookupGetter(ElementPrototype, 'remove');
  const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
  const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
  const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.
  if (typeof HTMLTemplateElement === 'function') {
    const template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = '';
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  /**
   * Expose whether this browser supports running the full DOMPurify.
   */
  DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
  const {
    MUSTACHE_EXPR,
    ERB_EXPR,
    TMPLIT_EXPR,
    DATA_ATTR,
    ARIA_ATTR,
    IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE,
    CUSTOM_ELEMENT
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */
  /* allowed element names */
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  /* Allowed attribute names */
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  /*
   * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
   * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
   * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
   * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
   */
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  let FORBID_TAGS = null;
  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  let FORBID_ATTR = null;
  /* Config object to store ADD_TAGS/ADD_ATTR functions (when used as functions) */
  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  /* Decide if ARIA attributes are okay */
  let ALLOW_ARIA_ATTR = true;
  /* Decide if custom data attributes are okay */
  let ALLOW_DATA_ATTR = true;
  /* Decide if unknown protocols are okay */
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  /* Decide if self-closing tags in attributes are allowed.
   * Usually removed due to a mXSS issue in jQuery 3.0 */
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  let SAFE_FOR_TEMPLATES = false;
  /* Output should be safe even for XML used within HTML and alike.
   * This means, DOMPurify removes comments when containing risky content.
   */
  let SAFE_FOR_XML = true;
  /* Decide if document with <html>... should be returned */
  let WHOLE_DOCUMENT = false;
  /* Track whether config is already set on this instance of DOMPurify. */
  let SET_CONFIG = false;
  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  let FORCE_BODY = false;
  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  let RETURN_DOM = false;
  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */
  let RETURN_DOM_FRAGMENT = false;
  /* Try to return a Trusted Type object instead of a string, return a string in
   * case Trusted Types are not supported  */
  let RETURN_TRUSTED_TYPE = false;
  /* Output should be free from DOM clobbering attacks?
   * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
   */
  let SANITIZE_DOM = true;
  /* Achieve full DOM Clobbering protection by isolating the namespace of named
   * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
   *
   * HTML/DOM spec rules that enable DOM Clobbering:
   *   - Named Access on Window (§7.3.3)
   *   - DOM Tree Accessors (§3.1.5)
   *   - Form Element Parent-Child Relations (§4.10.3)
   *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
   *   - HTMLCollection (§4.2.10.2)
   *
   * Namespace isolation is implemented by prefixing `id` and `name` attributes
   * with a constant string, i.e., `user-content-`
   */
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
  /* Keep element content when removing element? */
  let KEEP_CONTENT = true;
  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */
  let IN_PLACE = false;
  /* Allow usage of profiles like html, svg and mathMl */
  let USE_PROFILES = {};
  /* Tags to ignore content of when KEEP_CONTENT is true */
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
  /* Tags that are safe for data: URIs */
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
  /* Attributes safe for values like "javascript:" */
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
  const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  /* Document namespace */
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  /* Allowed XHTML+XML namespaces */
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
  let HTML_INTEGRATION_POINTS = addToSet({}, ['annotation-xml']);
  // Certain elements are allowed in both SVG and HTML
  // namespace. We need to specify them explicitly
  // so that they don't get erroneously deleted from
  // HTML namespace.
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
  /* Parsing of strict XHTML documents */
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
  const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
  let transformCaseFunc = null;
  /* Keep a reference to config to pass to hooks */
  let CONFIG = null;
  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */
  const formElement = document.createElement('form');
  const isRegexOrFunction = function isRegexOrFunction(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  /**
   * _parseConfig
   *
   * @param cfg optional config literal
   */
  // eslint-disable-next-line complexity
  const _parseConfig = function _parseConfig() {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    /* Shield configuration object from tampering */
    if (!cfg || typeof cfg !== 'object') {
      cfg = {};
    }
    /* Shield configuration object from prototype pollution */
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE =
    // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
    transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
    /* Set configuration parameters */
    ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') && arrayIsArray(cfg.ALLOWED_TAGS) ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') && arrayIsArray(cfg.ALLOWED_ATTR) ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') && arrayIsArray(cfg.ALLOWED_NAMESPACES) ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') && arrayIsArray(cfg.ADD_URI_SAFE_ATTR) ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') && arrayIsArray(cfg.ADD_DATA_URI_TAGS) ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') && arrayIsArray(cfg.FORBID_CONTENTS) ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') && arrayIsArray(cfg.FORBID_TAGS) ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') && arrayIsArray(cfg.FORBID_ATTR) ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === 'object' ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
    IN_PLACE = cfg.IN_PLACE || false; // Default false
    IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI; // Default regexp
    NAMESPACE = typeof cfg.NAMESPACE === 'string' ? cfg.NAMESPACE : HTML_NAMESPACE; // Default HTML namespace
    MATHML_TEXT_INTEGRATION_POINTS = objectHasOwnProperty(cfg, 'MATHML_TEXT_INTEGRATION_POINTS') && cfg.MATHML_TEXT_INTEGRATION_POINTS && typeof cfg.MATHML_TEXT_INTEGRATION_POINTS === 'object' ? clone(cfg.MATHML_TEXT_INTEGRATION_POINTS) : addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']); // Default built-in map
    HTML_INTEGRATION_POINTS = objectHasOwnProperty(cfg, 'HTML_INTEGRATION_POINTS') && cfg.HTML_INTEGRATION_POINTS && typeof cfg.HTML_INTEGRATION_POINTS === 'object' ? clone(cfg.HTML_INTEGRATION_POINTS) : addToSet({}, ['annotation-xml']); // Default built-in map
    const customElementHandling = objectHasOwnProperty(cfg, 'CUSTOM_ELEMENT_HANDLING') && cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING === 'object' ? clone(cfg.CUSTOM_ELEMENT_HANDLING) : create(null);
    CUSTOM_ELEMENT_HANDLING = create(null);
    if (objectHasOwnProperty(customElementHandling, 'tagNameCheck') && isRegexOrFunction(customElementHandling.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck; // Default undefined
    }
    if (objectHasOwnProperty(customElementHandling, 'attributeNameCheck') && isRegexOrFunction(customElementHandling.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck; // Default undefined
    }
    if (objectHasOwnProperty(customElementHandling, 'allowCustomizedBuiltInElements') && typeof customElementHandling.allowCustomizedBuiltInElements === 'boolean') {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements; // Default undefined
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = create(null);
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    /* Always reset function-based ADD_TAGS / ADD_ATTR checks to prevent
     * leaking across calls when switching from function to array config */
    EXTRA_ELEMENT_HANDLING.tagCheck = null;
    EXTRA_ELEMENT_HANDLING.attributeCheck = null;
    /* Merge configuration parameters */
    if (objectHasOwnProperty(cfg, 'ADD_TAGS')) {
      if (typeof cfg.ADD_TAGS === 'function') {
        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      } else if (arrayIsArray(cfg.ADD_TAGS)) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (objectHasOwnProperty(cfg, 'ADD_ATTR')) {
      if (typeof cfg.ADD_ATTR === 'function') {
        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      } else if (arrayIsArray(cfg.ADD_ATTR)) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') && arrayIsArray(cfg.ADD_URI_SAFE_ATTR)) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (objectHasOwnProperty(cfg, 'FORBID_CONTENTS') && arrayIsArray(cfg.FORBID_CONTENTS)) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (objectHasOwnProperty(cfg, 'ADD_FORBID_CONTENTS') && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
    }
    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }
    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
    }
    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      // Overwrite existing TrustedTypes policy.
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      // Sign local variables required by `sanitize`.
      emptyHTML = trustedTypesPolicy.createHTML('');
    } else {
      // Uninitialized policy, attempt to initialize the internal dompurify policy.
      if (trustedTypesPolicy === undefined) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      // If creating the internal policy succeeded sign internal variables.
      if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
        emptyHTML = trustedTypesPolicy.createHTML('');
      }
    }
    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  /* Keep track of all possible SVG and MathML tags
   * so that we can perform the namespace checks
   * correctly. */
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  /**
   * @param element a DOM element whose namespace is being checked
   * @returns Return false if the element has a
   *  namespace that a spec-compliant parser would never
   *  return. Return true otherwise.
   */
  const _checkValidNamespace = function _checkValidNamespace(element) {
    let parent = getParentNode(element);
    // In JSDOM, if we're inside shadow DOM, then parentNode
    // can be null. We just simulate parent in this case.
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: 'template'
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      // The only way to switch from HTML namespace to SVG
      // is via <svg>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'svg';
      }
      // The only way to switch from MathML to SVG is via`
      // svg if parent is either <annotation-xml> or MathML
      // text integration points.
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      // We only allow elements that are defined in SVG
      // spec. All others are disallowed in SVG namespace.
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      // The only way to switch from HTML namespace to MathML
      // is via <math>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'math';
      }
      // The only way to switch from SVG to MathML is via
      // <math> and HTML integration points
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
      }
      // We only allow elements that are defined in MathML
      // spec. All others are disallowed in MathML namespace.
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      // The only way to switch from SVG to HTML is via
      // HTML integration points, and from MathML to HTML
      // is via MathML text integration points
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      // We disallow tags that are specific for MathML
      // or SVG and should never appear in HTML namespace
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    // For XHTML and XML documents that support custom namespaces
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    // The code should never reach this place (this means
    // that the element somehow got namespace that is not
    // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
    // Return false just in case.
    return false;
  };
  /**
   * _forceRemove
   *
   * @param node a DOM node
   */
  const _forceRemove = function _forceRemove(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      getParentNode(node).removeChild(node);
    } catch (_) {
      remove(node);
    }
  };
  /**
   * _removeAttribute
   *
   * @param name an Attribute name
   * @param element a DOM node
   */
  const _removeAttribute = function _removeAttribute(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    // We void attribute values for unremovable "is" attributes
    if (name === 'is') {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {}
      } else {
        try {
          element.setAttribute(name, '');
        } catch (_) {}
      }
    }
  };
  /**
   * _initDocument
   *
   * @param dirty - a string of dirty markup
   * @return a DOM, filled with the dirty markup
   */
  const _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
      // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    /*
     * Use the DOMParser API by default, fallback later if needs be
     * DOMParser not work for svg when has multiple root element.
     */
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {}
    }
    /* Use createHTMLDocument in case DOMParser is not available */
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, 'template', null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
        // Syntax error if dirtyPayload is invalid xml
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    /* Work on whole document or just its body */
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  /**
   * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
   *
   * @param root The root element or node to start traversing on.
   * @return The created NodeIterator
   */
  const _createNodeIterator = function _createNodeIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root,
    // eslint-disable-next-line no-bitwise
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
  };
  /**
   * _isClobbered
   *
   * @param element element to check for clobbering attacks
   * @return true if clobbered, false if safe
   */
  const _isClobbered = function _isClobbered(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function');
  };
  /**
   * Checks whether the given object is a DOM node.
   *
   * @param value object to check whether it's a DOM node
   * @return true is object is a DOM node
   */
  const _isNode = function _isNode(value) {
    return typeof Node === 'function' && value instanceof Node;
  };
  function _executeHooks(hooks, currentNode, data) {
    arrayForEach(hooks, hook => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   * @param currentNode to check for permission to exist
   * @return true if node was killed, false if left alive
   */
  const _sanitizeElements = function _sanitizeElements(currentNode) {
    let content = null;
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Now let's check the element's type and name */
    const tagName = transformCaseFunc(currentNode.nodeName);
    /* Execute a hook if present */
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    /* Detect mXSS attempts abusing namespace confusion */
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove risky CSS construction leading to mXSS */
    if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && tagName === 'style' && _isNode(currentNode.firstElementChild)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove any occurrence of processing instructions */
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove any kind of possibly harmful comments */
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove element if anything forbids its presence */
    if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
      /* Check if we have a custom element to handle */
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      /* Keep content except for bad-listed elements */
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    /* Check whether element has a valid namespace */
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Make sure that older browsers don't get fallback-tag mXSS */
    if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      /* Get the element's text content */
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        content = stringReplace(content, expr, ' ');
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  /**
   * _isValidAttribute
   *
   * @param lcTag Lowercase tag name of containing element.
   * @param lcName Lowercase attribute name.
   * @param value Attribute value.
   * @return Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity
  const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* FORBID_ATTR must always win, even if ADD_ATTR predicate would allow it */
    if (FORBID_ATTR[lcName]) {
      return false;
    }
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }
    const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (!nameIsPermitted || FORBID_ATTR[lcName]) {
      if (
      // First condition does a very basic check if a) it's basically a valid custom element tagname AND
      // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
      _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) ||
      // Alternative, second condition checks if it's an `is`-attribute, AND
      // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
        return false;
      }
      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
      return false;
    } else ;
    return true;
  };
  /* Names the HTML spec reserves from valid-custom-element-name; these must
   * never be treated as basic custom elements even when a permissive
   * CUSTOM_ELEMENT_HANDLING.tagNameCheck is configured. */
  const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, ['annotation-xml', 'color-profile', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'missing-glyph']);
  /**
   * _isBasicCustomElement
   * checks if at least one dash is included in tagName, and it's not the first char
   * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
   *
   * @param tagName name of the tag of the node to sanitize
   * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
   */
  const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
    return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT, tagName);
  };
  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param currentNode to sanitize
   */
  const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    /* Check if we have attributes; if not we might have a text node */
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: undefined
    };
    let l = attributes.length;
    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === 'value' ? initValue : stringTrim(initValue);
      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Full DOM Clobbering protection via namespace isolation,
       * Prefix id and name attributes with `user-content-`
       */
      if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name') && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
        // Remove the attribute with this value
        _removeAttribute(name, currentNode);
        // Prefix the value and later re-create the attribute with the sanitized value
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      // Else: already prefixed, leave the attribute alone — the prefix is
      // itself the clobbering protection, and re-applying it is incorrect.
      /* Work around a security issue with comments inside attributes */
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Make sure we cannot easily use animated hrefs, even if animations are allowed */
      if (lcName === 'attributename' && stringMatch(value, 'href')) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Did the hooks approve of the attribute? */
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Work around a security issue in jQuery 3.0 */
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          value = stringReplace(value, expr, ' ');
        });
      }
      /* Is `value` valid for this attribute? */
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Handle attributes that require Trusted Types */
      if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
        if (namespaceURI) ; else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case 'TrustedHTML':
              {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
            case 'TrustedScriptURL':
              {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
          }
        }
      }
      /* Handle invalid data-* attribute set by try-catching it */
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  /**
   * _sanitizeShadowDOM
   *
   * @param fragment to iterate over recursively
   */
  const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      /* Sanitize tags and elements */
      _sanitizeElements(shadowNode);
      /* Check attributes next */
      _sanitizeAttributes(shadowNode);
      /* Deep shadow DOM detected */
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = '<!-->';
    }
    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      dirty = stringifyValue(dirty);
      if (typeof dirty !== 'string') {
        throw typeErrorCreate('dirty is not a string, aborting');
      }
    }
    /* Return dirty HTML if DOMPurify cannot run */
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    /* Assign config vars */
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    /* Clean up removed elements */
    DOMPurify.removed = [];
    /* Check if dirty is correctly typed for IN_PLACE */
    if (typeof dirty === 'string') {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      /* Do some early pre-sanitization to avoid unsafe root nodes */
      const nn = dirty.nodeName;
      if (typeof nn === 'string') {
        const tagName = transformCaseFunc(nn);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
        }
      }
    } else if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!---->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
      // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf('<') === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      /* Initialize the document to work on */
      body = _initDocument(dirty);
      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
      }
    }
    /* Remove first element node (ours) if FORCE_BODY is set */
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    /* Get node iterator */
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    /* Now start iterating over the created document */
    while (currentNode = nodeIterator.nextNode()) {
      /* Sanitize tags and elements */
      _sanitizeElements(currentNode);
      /* Check attributes next */
      _sanitizeAttributes(currentNode);
      /* Shadow DOM detected, sanitize it */
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(currentNode.content);
      }
    }
    /* If we sanitized `dirty` in-place, return it. */
    if (IN_PLACE) {
      return dirty;
    }
    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (SAFE_FOR_TEMPLATES) {
        body.normalize();
        let html = body.innerHTML;
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          html = stringReplace(html, expr, ' ');
        });
        body.innerHTML = html;
      }
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        /*
          AdoptNode() is not used because internal state is not reset
          (e.g. the past names map of a HTMLFormElement), this is safe
          in theory but we would rather not risk another attack vector.
          The state that is cloned by importNode() is explicitly defined
          by the specs.
        */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    /* Serialize doctype if allowed */
    if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
    }
    /* Sanitize final string template-safe */
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        serializedHTML = stringReplace(serializedHTML, expr, ' ');
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function () {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function (entryPoint, hookFunction) {
    if (hookFunction !== undefined) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function (entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function () {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();

module.exports = purify;
//# sourceMappingURL=purify.cjs.js.map


/***/ }),

/***/ "../../node_modules/html-to-image/es/apply-style.js":
/*!**********************************************************!*\
  !*** ../../node_modules/html-to-image/es/apply-style.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyle": () => (/* binding */ applyStyle)
/* harmony export */ });
function applyStyle(node, options) {
    const { style } = node;
    if (options.backgroundColor) {
        style.backgroundColor = options.backgroundColor;
    }
    if (options.width) {
        style.width = `${options.width}px`;
    }
    if (options.height) {
        style.height = `${options.height}px`;
    }
    const manual = options.style;
    if (manual != null) {
        Object.keys(manual).forEach((key) => {
            style[key] = manual[key];
        });
    }
    return node;
}
//# sourceMappingURL=apply-style.js.map

/***/ }),

/***/ "../../node_modules/html-to-image/es/clone-node.js":
/*!*********************************************************!*\
  !*** ../../node_modules/html-to-image/es/clone-node.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cloneNode": () => (/* binding */ cloneNode)
/* harmony export */ });
/* harmony import */ var _clone_pseudos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clone-pseudos */ "../../node_modules/html-to-image/es/clone-pseudos.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "../../node_modules/html-to-image/es/util.js");
/* harmony import */ var _mimes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mimes */ "../../node_modules/html-to-image/es/mimes.js");
/* harmony import */ var _dataurl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataurl */ "../../node_modules/html-to-image/es/dataurl.js");




async function cloneCanvasElement(canvas) {
    const dataURL = canvas.toDataURL();
    if (dataURL === 'data:,') {
        return canvas.cloneNode(false);
    }
    return (0,_util__WEBPACK_IMPORTED_MODULE_1__.createImage)(dataURL);
}
async function cloneVideoElement(video, options) {
    if (video.currentSrc) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL();
        return (0,_util__WEBPACK_IMPORTED_MODULE_1__.createImage)(dataURL);
    }
    const poster = video.poster;
    const contentType = (0,_mimes__WEBPACK_IMPORTED_MODULE_2__.getMimeType)(poster);
    const dataURL = await (0,_dataurl__WEBPACK_IMPORTED_MODULE_3__.resourceToDataURL)(poster, contentType, options);
    return (0,_util__WEBPACK_IMPORTED_MODULE_1__.createImage)(dataURL);
}
async function cloneIFrameElement(iframe, options) {
    var _a;
    try {
        if ((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body) {
            return (await cloneNode(iframe.contentDocument.body, options, true));
        }
    }
    catch (_b) {
        // Failed to clone iframe
    }
    return iframe.cloneNode(false);
}
async function cloneSingleNode(node, options) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(node, HTMLCanvasElement)) {
        return cloneCanvasElement(node);
    }
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(node, HTMLVideoElement)) {
        return cloneVideoElement(node, options);
    }
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(node, HTMLIFrameElement)) {
        return cloneIFrameElement(node, options);
    }
    return node.cloneNode(isSVGElement(node));
}
const isSlotElement = (node) => node.tagName != null && node.tagName.toUpperCase() === 'SLOT';
const isSVGElement = (node) => node.tagName != null && node.tagName.toUpperCase() === 'SVG';
async function cloneChildren(nativeNode, clonedNode, options) {
    var _a, _b;
    if (isSVGElement(clonedNode)) {
        return clonedNode;
    }
    let children = [];
    if (isSlotElement(nativeNode) && nativeNode.assignedNodes) {
        children = (0,_util__WEBPACK_IMPORTED_MODULE_1__.toArray)(nativeNode.assignedNodes());
    }
    else if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLIFrameElement) &&
        ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) {
        children = (0,_util__WEBPACK_IMPORTED_MODULE_1__.toArray)(nativeNode.contentDocument.body.childNodes);
    }
    else {
        children = (0,_util__WEBPACK_IMPORTED_MODULE_1__.toArray)(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
    }
    if (children.length === 0 ||
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLVideoElement)) {
        return clonedNode;
    }
    await children.reduce((deferred, child) => deferred
        .then(() => cloneNode(child, options))
        .then((clonedChild) => {
        if (clonedChild) {
            clonedNode.appendChild(clonedChild);
        }
    }), Promise.resolve());
    return clonedNode;
}
function cloneCSSStyle(nativeNode, clonedNode, options) {
    const targetStyle = clonedNode.style;
    if (!targetStyle) {
        return;
    }
    const sourceStyle = window.getComputedStyle(nativeNode);
    if (sourceStyle.cssText) {
        targetStyle.cssText = sourceStyle.cssText;
        targetStyle.transformOrigin = sourceStyle.transformOrigin;
    }
    else {
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.getStyleProperties)(options).forEach((name) => {
            let value = sourceStyle.getPropertyValue(name);
            if (name === 'font-size' && value.endsWith('px')) {
                const reducedFont = Math.floor(parseFloat(value.substring(0, value.length - 2))) - 0.1;
                value = `${reducedFont}px`;
            }
            if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLIFrameElement) &&
                name === 'display' &&
                value === 'inline') {
                value = 'block';
            }
            if (name === 'd' && clonedNode.getAttribute('d')) {
                value = `path(${clonedNode.getAttribute('d')})`;
            }
            targetStyle.setProperty(name, value, sourceStyle.getPropertyPriority(name));
        });
    }
}
function cloneInputValue(nativeNode, clonedNode) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLTextAreaElement)) {
        clonedNode.innerHTML = nativeNode.value;
    }
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLInputElement)) {
        clonedNode.setAttribute('value', nativeNode.value);
    }
}
function cloneSelectValue(nativeNode, clonedNode) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLSelectElement)) {
        const clonedSelect = clonedNode;
        const selectedOption = Array.from(clonedSelect.children).find((child) => nativeNode.value === child.getAttribute('value'));
        if (selectedOption) {
            selectedOption.setAttribute('selected', '');
        }
    }
}
function decorate(nativeNode, clonedNode, options) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(clonedNode, Element)) {
        cloneCSSStyle(nativeNode, clonedNode, options);
        (0,_clone_pseudos__WEBPACK_IMPORTED_MODULE_0__.clonePseudoElements)(nativeNode, clonedNode, options);
        cloneInputValue(nativeNode, clonedNode);
        cloneSelectValue(nativeNode, clonedNode);
    }
    return clonedNode;
}
async function ensureSVGSymbols(clone, options) {
    const uses = clone.querySelectorAll ? clone.querySelectorAll('use') : [];
    if (uses.length === 0) {
        return clone;
    }
    const processedDefs = {};
    for (let i = 0; i < uses.length; i++) {
        const use = uses[i];
        const id = use.getAttribute('xlink:href');
        if (id) {
            const exist = clone.querySelector(id);
            const definition = document.querySelector(id);
            if (!exist && definition && !processedDefs[id]) {
                // eslint-disable-next-line no-await-in-loop
                processedDefs[id] = (await cloneNode(definition, options, true));
            }
        }
    }
    const nodes = Object.values(processedDefs);
    if (nodes.length) {
        const ns = 'http://www.w3.org/1999/xhtml';
        const svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('xmlns', ns);
        svg.style.position = 'absolute';
        svg.style.width = '0';
        svg.style.height = '0';
        svg.style.overflow = 'hidden';
        svg.style.display = 'none';
        const defs = document.createElementNS(ns, 'defs');
        svg.appendChild(defs);
        for (let i = 0; i < nodes.length; i++) {
            defs.appendChild(nodes[i]);
        }
        clone.appendChild(svg);
    }
    return clone;
}
async function cloneNode(node, options, isRoot) {
    if (!isRoot && options.filter && !options.filter(node)) {
        return null;
    }
    return Promise.resolve(node)
        .then((clonedNode) => cloneSingleNode(clonedNode, options))
        .then((clonedNode) => cloneChildren(node, clonedNode, options))
        .then((clonedNode) => decorate(node, clonedNode, options))
        .then((clonedNode) => ensureSVGSymbols(clonedNode, options));
}
//# sourceMappingURL=clone-node.js.map

/***/ }),

/***/ "../../node_modules/html-to-image/es/clone-pseudos.js":
/*!************************************************************!*\
  !*** ../../node_modules/html-to-image/es/clone-pseudos.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clonePseudoElements": () => (/* binding */ clonePseudoElements)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "../../node_modules/html-to-image/es/util.js");

function formatCSSText(style) {
    const content = style.getPropertyValue('content');
    return `${style.cssText} content: '${content.replace(/'|"/g, '')}';`;
}
function formatCSSProperties(style, options) {
    return (0,_util__WEBPACK_IMPORTED_MODULE_0__.getStyleProperties)(options)
        .map((name) => {
        const value = style.getPropertyValue(name);
        const priority = style.getPropertyPriority(name);
        return `${name}: ${value}${priority ? ' !important' : ''};`;
    })
        .join(' ');
}
function getPseudoElementStyle(className, pseudo, style, options) {
    const selector = `.${className}:${pseudo}`;
    const cssText = style.cssText
        ? formatCSSText(style)
        : formatCSSProperties(style, options);
    return document.createTextNode(`${selector}{${cssText}}`);
}
function clonePseudoElement(nativeNode, clonedNode, pseudo, options) {
    const style = window.getComputedStyle(nativeNode, pseudo);
    const content = style.getPropertyValue('content');
    if (content === '' || content === 'none') {
        return;
    }
    const className = (0,_util__WEBPACK_IMPORTED_MODULE_0__.uuid)();
    try {
        clonedNode.className = `${clonedNode.className} ${className}`;
    }
    catch (err) {
        return;
    }
    const styleElement = document.createElement('style');
    styleElement.appendChild(getPseudoElementStyle(className, pseudo, style, options));
    clonedNode.appendChild(styleElement);
}
function clonePseudoElements(nativeNode, clonedNode, options) {
    clonePseudoElement(nativeNode, clonedNode, ':before', options);
    clonePseudoElement(nativeNode, clonedNode, ':after', options);
}
//# sourceMappingURL=clone-pseudos.js.map

/***/ }),

/***/ "../../node_modules/html-to-image/es/dataurl.js":
/*!******************************************************!*\
  !*** ../../node_modules/html-to-image/es/dataurl.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAsDataURL": () => (/* binding */ fetchAsDataURL),
/* harmony export */   "isDataUrl": () => (/* binding */ isDataUrl),
/* harmony export */   "makeDataUrl": () => (/* binding */ makeDataUrl),
/* harmony export */   "resourceToDataURL": () => (/* binding */ resourceToDataURL)
/* harmony export */ });
function getContentFromDataUrl(dataURL) {
    return dataURL.split(/,/)[1];
}
function isDataUrl(url) {
    return url.search(/^(data:)/) !== -1;
}
function makeDataUrl(content, mimeType) {
    return `data:${mimeType};base64,${content}`;
}
async function fetchAsDataURL(url, init, process) {
    const res = await fetch(url, init);
    if (res.status === 404) {
        throw new Error(`Resource "${res.url}" not found`);
    }
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = () => {
            try {
                resolve(process({ res, result: reader.result }));
            }
            catch (error) {
                reject(error);
            }
        };
        reader.readAsDataURL(blob);
    });
}
const cache = {};
function getCacheKey(url, contentType, includeQueryParams) {
    let key = url.replace(/\?.*/, '');
    if (includeQueryParams) {
        key = url;
    }
    // font resource
    if (/ttf|otf|eot|woff2?/i.test(key)) {
        key = key.replace(/.*\//, '');
    }
    return contentType ? `[${contentType}]${key}` : key;
}
async function resourceToDataURL(resourceUrl, contentType, options) {
    const cacheKey = getCacheKey(resourceUrl, contentType, options.includeQueryParams);
    if (cache[cacheKey] != null) {
        return cache[cacheKey];
    }
    // ref: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
    if (options.cacheBust) {
        // eslint-disable-next-line no-param-reassign
        resourceUrl += (/\?/.test(resourceUrl) ? '&' : '?') + new Date().getTime();
    }
    let dataURL;
    try {
        const content = await fetchAsDataURL(resourceUrl, options.fetchRequestInit, ({ res, result }) => {
            if (!contentType) {
                // eslint-disable-next-line no-param-reassign
                contentType = res.headers.get('Content-Type') || '';
            }
            return getContentFromDataUrl(result);
        });
        dataURL = makeDataUrl(content, contentType);
    }
    catch (error) {
        dataURL = options.imagePlaceholder || '';
        let msg = `Failed to fetch resource: ${resourceUrl}`;
        if (error) {
            msg = typeof error === 'string' ? error : error.message;
        }
        if (msg) {
            console.warn(msg);
        }
    }
    cache[cacheKey] = dataURL;
    return dataURL;
}
//# sourceMappingURL=dataurl.js.map

/***/ }),

/***/ "../../node_modules/html-to-image/es/embed-images.js":
/*!***********************************************************!*\
  !*** ../../node_modules/html-to-image/es/embed-images.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "embedImages": () => (/* binding */ embedImages)
/* harmony export */ });
/* harmony import */ var _embed_resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./embed-resources */ "../../node_modules/html-to-image/es/embed-resources.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "../../node_modules/html-to-image/es/util.js");
/* harmony import */ var _dataurl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataurl */ "../../node_modules/html-to-image/es/dataurl.js");
/* harmony import */ var _mimes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mimes */ "../../node_modules/html-to-image/es/mimes.js");




async function embedProp(propName, node, options) {
    var _a;
    const propValue = (_a = node.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
    if (propValue) {
        const cssString = await (0,_embed_resources__WEBPACK_IMPORTED_MODULE_0__.embedResources)(propValue, null, options);
        node.style.setProperty(propName, cssString, node.style.getPropertyPriority(propName));
        return true;
    }
    return false;
}
async function embedBackground(clonedNode, options) {
    ;
    (await embedProp('background', clonedNode, options)) ||
        (await embedProp('background-image', clonedNode, options));
    (await embedProp('mask', clonedNode, options)) ||
        (await embedProp('-webkit-mask', clonedNode, options)) ||
        (await embedProp('mask-image', clonedNode, options)) ||
        (await embedProp('-webkit-mask-image', clonedNode, options));
}
async function embedImageNode(clonedNode, options) {
    const isImageElement = (0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(clonedNode, HTMLImageElement);
    if (!(isImageElement && !(0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.isDataUrl)(clonedNode.src)) &&
        !((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(clonedNode, SVGImageElement) &&
            !(0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.isDataUrl)(clonedNode.href.baseVal))) {
        return;
    }
    const url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;
    const dataURL = await (0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.resourceToDataURL)(url, (0,_mimes__WEBPACK_IMPORTED_MODULE_3__.getMimeType)(url), options);
    await new Promise((resolve, reject) => {
        clonedNode.onload = resolve;
        clonedNode.onerror = options.onImageErrorHandler
            ? (...attributes) => {
                try {
                    resolve(options.onImageErrorHandler(...attributes));
                }
                catch (error) {
                    reject(error);
                }
            }
            : reject;
        const image = clonedNode;
        if (image.decode) {
            image.decode = resolve;
        }
        if (image.loading === 'lazy') {
            image.loading = 'eager';
        }
        if (isImageElement) {
            clonedNode.srcset = '';
            clonedNode.src = dataURL;
        }
        else {
            clonedNode.href.baseVal = dataURL;
        }
    });
}
async function embedChildren(clonedNode, options) {
    const children = (0,_util__WEBPACK_IMPORTED_MODULE_1__.toArray)(clonedNode.childNodes);
    const deferreds = children.map((child) => embedImages(child, options));
    await Promise.all(deferreds).then(() => clonedNode);
}
async function embedImages(clonedNode, options) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(clonedNode, Element)) {
        await embedBackground(clonedNode, options);
        await embedImageNode(clonedNode, options);
        await embedChildren(clonedNode, options);
    }
}
//# sourceMappingURL=embed-images.js.map

/***/ }),

/***/ "../../node_modules/html-to-image/es/embed-resources.js":
/*!**************************************************************!*\
  !*** ../../node_modules/html-to-image/es/embed-resources.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "embed": () => (/* binding */ embed),
/* harmony export */   "embedResources": () => (/* binding */ embedResources),
/* harmony export */   "parseURLs": () => (/* binding */ parseURLs),
/* harmony export */   "shouldEmbed": () => (/* binding */ shouldEmbed)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "../../node_modules/html-to-image/es/util.js");
/* harmony import */ var _mimes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mimes */ "../../node_modules/html-to-image/es/mimes.js");
/* harmony import */ var _dataurl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataurl */ "../../node_modules/html-to-image/es/dataurl.js");



const URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
const URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
const FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function toRegex(url) {
    // eslint-disable-next-line no-useless-escape
    const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
    return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, 'g');
}
function parseURLs(cssText) {
    const urls = [];
    cssText.replace(URL_REGEX, (raw, quotation, url) => {
        urls.push(url);
        return raw;
    });
    return urls.filter((url) => !(0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.isDataUrl)(url));
}
async function embed(cssText, resourceURL, baseURL, options, getContentFromUrl) {
    try {
        const resolvedURL = baseURL ? (0,_util__WEBPACK_IMPORTED_MODULE_0__.resolveUrl)(resourceURL, baseURL) : resourceURL;
        const contentType = (0,_mimes__WEBPACK_IMPORTED_MODULE_1__.getMimeType)(resourceURL);
        let dataURL;
        if (getContentFromUrl) {
            const content = await getContentFromUrl(resolvedURL);
            dataURL = (0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.makeDataUrl)(content, contentType);
        }
        else {
            dataURL = await (0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.resourceToDataURL)(resolvedURL, contentType, options);
        }
        return cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`);
    }
    catch (error) {
        // pass
    }
    return cssText;
}
function filterPreferredFontFormat(str, { preferredFontFormat }) {
    return !preferredFontFormat
        ? str
        : str.replace(FONT_SRC_REGEX, (match) => {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match) || [];
                if (!format) {
                    return '';
                }
                if (format === preferredFontFormat) {
                    return `src: ${src};`;
                }
            }
        });
}
function shouldEmbed(url) {
    return url.search(URL_REGEX) !== -1;
}
async function embedResources(cssText, baseUrl, options) {
    if (!shouldEmbed(cssText)) {
        return cssText;
    }
    const filteredCSSText = filterPreferredFontFormat(cssText, options);
    const urls = parseURLs(filteredCSSText);
    return urls.reduce((deferred, url) => deferred.then((css) => embed(css, url, baseUrl, options)), Promise.resolve(filteredCSSText));
}
//# sourceMappingURL=embed-resources.js.map

/***/ }),

/***/ "../../node_modules/html-to-image/es/embed-webfonts.js":
/*!*************************************************************!*\
  !*** ../../node_modules/html-to-image/es/embed-webfonts.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "embedWebFonts": () => (/* binding */ embedWebFonts),
/* harmony export */   "getWebFontCSS": () => (/* binding */ getWebFontCSS)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "../../node_modules/html-to-image/es/util.js");
/* harmony import */ var _dataurl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataurl */ "../../node_modules/html-to-image/es/dataurl.js");
/* harmony import */ var _embed_resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./embed-resources */ "../../node_modules/html-to-image/es/embed-resources.js");



const cssFetchCache = {};
async function fetchCSS(url) {
    let cache = cssFetchCache[url];
    if (cache != null) {
        return cache;
    }
    const res = await fetch(url);
    const cssText = await res.text();
    cache = { url, cssText };
    cssFetchCache[url] = cache;
    return cache;
}
async function embedFonts(data, options) {
    let cssText = data.cssText;
    const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
    const fontLocs = cssText.match(/url\([^)]+\)/g) || [];
    const loadFonts = fontLocs.map(async (loc) => {
        let url = loc.replace(regexUrl, '$1');
        if (!url.startsWith('https://')) {
            url = new URL(url, data.url).href;
        }
        return (0,_dataurl__WEBPACK_IMPORTED_MODULE_1__.fetchAsDataURL)(url, options.fetchRequestInit, ({ result }) => {
            cssText = cssText.replace(loc, `url(${result})`);
            return [loc, result];
        });
    });
    return Promise.all(loadFonts).then(() => cssText);
}
function parseCSS(source) {
    if (source == null) {
        return [];
    }
    const result = [];
    const commentsRegex = /(\/\*[\s\S]*?\*\/)/gi;
    // strip out comments
    let cssText = source.replace(commentsRegex, '');
    // eslint-disable-next-line prefer-regex-literals
    const keyframesRegex = new RegExp('((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})', 'gi');
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const matches = keyframesRegex.exec(cssText);
        if (matches === null) {
            break;
        }
        result.push(matches[0]);
    }
    cssText = cssText.replace(keyframesRegex, '');
    const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
    // to match css & media queries together
    const combinedCSSRegex = '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]' +
        '*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})';
    // unified regex
    const unifiedRegex = new RegExp(combinedCSSRegex, 'gi');
    // eslint-disable-next-line no-constant-condition
    while (true) {
        let matches = importRegex.exec(cssText);
        if (matches === null) {
            matches = unifiedRegex.exec(cssText);
            if (matches === null) {
                break;
            }
            else {
                importRegex.lastIndex = unifiedRegex.lastIndex;
            }
        }
        else {
            unifiedRegex.lastIndex = importRegex.lastIndex;
        }
        result.push(matches[0]);
    }
    return result;
}
async function getCSSRules(styleSheets, options) {
    const ret = [];
    const deferreds = [];
    // First loop inlines imports
    styleSheets.forEach((sheet) => {
        if ('cssRules' in sheet) {
            try {
                (0,_util__WEBPACK_IMPORTED_MODULE_0__.toArray)(sheet.cssRules || []).forEach((item, index) => {
                    if (item.type === CSSRule.IMPORT_RULE) {
                        let importIndex = index + 1;
                        const url = item.href;
                        const deferred = fetchCSS(url)
                            .then((metadata) => embedFonts(metadata, options))
                            .then((cssText) => parseCSS(cssText).forEach((rule) => {
                            try {
                                sheet.insertRule(rule, rule.startsWith('@import')
                                    ? (importIndex += 1)
                                    : sheet.cssRules.length);
                            }
                            catch (error) {
                                console.error('Error inserting rule from remote css', {
                                    rule,
                                    error,
                                });
                            }
                        }))
                            .catch((e) => {
                            console.error('Error loading remote css', e.toString());
                        });
                        deferreds.push(deferred);
                    }
                });
            }
            catch (e) {
                const inline = styleSheets.find((a) => a.href == null) || document.styleSheets[0];
                if (sheet.href != null) {
                    deferreds.push(fetchCSS(sheet.href)
                        .then((metadata) => embedFonts(metadata, options))
                        .then((cssText) => parseCSS(cssText).forEach((rule) => {
                        inline.insertRule(rule, inline.cssRules.length);
                    }))
                        .catch((err) => {
                        console.error('Error loading remote stylesheet', err);
                    }));
                }
                console.error('Error inlining remote css file', e);
            }
        }
    });
    return Promise.all(deferreds).then(() => {
        // Second loop parses rules
        styleSheets.forEach((sheet) => {
            if ('cssRules' in sheet) {
                try {
                    (0,_util__WEBPACK_IMPORTED_MODULE_0__.toArray)(sheet.cssRules || []).forEach((item) => {
                        ret.push(item);
                    });
                }
                catch (e) {
                    console.error(`Error while reading CSS rules from ${sheet.href}`, e);
                }
            }
        });
        return ret;
    });
}
function getWebFontRules(cssRules) {
    return cssRules
        .filter((rule) => rule.type === CSSRule.FONT_FACE_RULE)
        .filter((rule) => (0,_embed_resources__WEBPACK_IMPORTED_MODULE_2__.shouldEmbed)(rule.style.getPropertyValue('src')));
}
async function parseWebFontRules(node, options) {
    if (node.ownerDocument == null) {
        throw new Error('Provided element is not within a Document');
    }
    const styleSheets = (0,_util__WEBPACK_IMPORTED_MODULE_0__.toArray)(node.ownerDocument.styleSheets);
    const cssRules = await getCSSRules(styleSheets, options);
    return getWebFontRules(cssRules);
}
function normalizeFontFamily(font) {
    return font.trim().replace(/["']/g, '');
}
function getUsedFonts(node) {
    const fonts = new Set();
    function traverse(node) {
        const fontFamily = node.style.fontFamily || getComputedStyle(node).fontFamily;
        fontFamily.split(',').forEach((font) => {
            fonts.add(normalizeFontFamily(font));
        });
        Array.from(node.children).forEach((child) => {
            if (child instanceof HTMLElement) {
                traverse(child);
            }
        });
    }
    traverse(node);
    return fonts;
}
async function getWebFontCSS(node, options) {
    const rules = await parseWebFontRules(node, options);
    const usedFonts = getUsedFonts(node);
    const cssTexts = await Promise.all(rules
        .filter((rule) => usedFonts.has(normalizeFontFamily(rule.style.fontFamily)))
        .map((rule) => {
        const baseUrl = rule.parentStyleSheet
            ? rule.parentStyleSheet.href
            : null;
        return (0,_embed_resources__WEBPACK_IMPORTED_MODULE_2__.embedResources)(rule.cssText, baseUrl, options);
    }));
    return cssTexts.join('\n');
}
async function embedWebFonts(clonedNode, options) {
    const cssText = options.fontEmbedCSS != null
        ? options.fontEmbedCSS
        : options.skipFonts
            ? null
            : await getWebFontCSS(clonedNode, options);
    if (cssText) {
        const styleNode = document.createElement('style');
        const sytleContent = document.createTextNode(cssText);
        styleNode.appendChild(sytleContent);
        if (clonedNode.firstChild) {
            clonedNode.insertBefore(styleNode, clonedNode.firstChild);
        }
        else {
            clonedNode.appendChild(styleNode);
        }
    }
}
//# sourceMappingURL=embed-webfonts.js.map

/***/ }),

/***/ "../../node_modules/html-to-image/es/index.js":
/*!****************************************************!*\
  !*** ../../node_modules/html-to-image/es/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFontEmbedCSS": () => (/* binding */ getFontEmbedCSS),
/* harmony export */   "toBlob": () => (/* binding */ toBlob),
/* harmony export */   "toCanvas": () => (/* binding */ toCanvas),
/* harmony export */   "toJpeg": () => (/* binding */ toJpeg),
/* harmony export */   "toPixelData": () => (/* binding */ toPixelData),
/* harmony export */   "toPng": () => (/* binding */ toPng),
/* harmony export */   "toSvg": () => (/* binding */ toSvg)
/* harmony export */ });
/* harmony import */ var _clone_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clone-node */ "../../node_modules/html-to-image/es/clone-node.js");
/* harmony import */ var _embed_images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./embed-images */ "../../node_modules/html-to-image/es/embed-images.js");
/* harmony import */ var _apply_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apply-style */ "../../node_modules/html-to-image/es/apply-style.js");
/* harmony import */ var _embed_webfonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./embed-webfonts */ "../../node_modules/html-to-image/es/embed-webfonts.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "../../node_modules/html-to-image/es/util.js");





async function toSvg(node, options = {}) {
    const { width, height } = (0,_util__WEBPACK_IMPORTED_MODULE_4__.getImageSize)(node, options);
    const clonedNode = (await (0,_clone_node__WEBPACK_IMPORTED_MODULE_0__.cloneNode)(node, options, true));
    await (0,_embed_webfonts__WEBPACK_IMPORTED_MODULE_3__.embedWebFonts)(clonedNode, options);
    await (0,_embed_images__WEBPACK_IMPORTED_MODULE_1__.embedImages)(clonedNode, options);
    (0,_apply_style__WEBPACK_IMPORTED_MODULE_2__.applyStyle)(clonedNode, options);
    const datauri = await (0,_util__WEBPACK_IMPORTED_MODULE_4__.nodeToDataURL)(clonedNode, width, height);
    return datauri;
}
async function toCanvas(node, options = {}) {
    const { width, height } = (0,_util__WEBPACK_IMPORTED_MODULE_4__.getImageSize)(node, options);
    const svg = await toSvg(node, options);
    const img = await (0,_util__WEBPACK_IMPORTED_MODULE_4__.createImage)(svg);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const ratio = options.pixelRatio || (0,_util__WEBPACK_IMPORTED_MODULE_4__.getPixelRatio)();
    const canvasWidth = options.canvasWidth || width;
    const canvasHeight = options.canvasHeight || height;
    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;
    if (!options.skipAutoScale) {
        (0,_util__WEBPACK_IMPORTED_MODULE_4__.checkCanvasDimensions)(canvas);
    }
    canvas.style.width = `${canvasWidth}`;
    canvas.style.height = `${canvasHeight}`;
    if (options.backgroundColor) {
        context.fillStyle = options.backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
}
async function toPixelData(node, options = {}) {
    const { width, height } = (0,_util__WEBPACK_IMPORTED_MODULE_4__.getImageSize)(node, options);
    const canvas = await toCanvas(node, options);
    const ctx = canvas.getContext('2d');
    return ctx.getImageData(0, 0, width, height).data;
}
async function toPng(node, options = {}) {
    const canvas = await toCanvas(node, options);
    return canvas.toDataURL();
}
async function toJpeg(node, options = {}) {
    const canvas = await toCanvas(node, options);
    return canvas.toDataURL('image/jpeg', options.quality || 1);
}
async function toBlob(node, options = {}) {
    const canvas = await toCanvas(node, options);
    const blob = await (0,_util__WEBPACK_IMPORTED_MODULE_4__.canvasToBlob)(canvas);
    return blob;
}
async function getFontEmbedCSS(node, options = {}) {
    return (0,_embed_webfonts__WEBPACK_IMPORTED_MODULE_3__.getWebFontCSS)(node, options);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/html-to-image/es/mimes.js":
/*!****************************************************!*\
  !*** ../../node_modules/html-to-image/es/mimes.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMimeType": () => (/* binding */ getMimeType)
/* harmony export */ });
const WOFF = 'application/font-woff';
const JPEG = 'image/jpeg';
const mimes = {
    woff: WOFF,
    woff2: WOFF,
    ttf: 'application/font-truetype',
    eot: 'application/vnd.ms-fontobject',
    png: 'image/png',
    jpg: JPEG,
    jpeg: JPEG,
    gif: 'image/gif',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    webp: 'image/webp',
};
function getExtension(url) {
    const match = /\.([^./]*?)$/g.exec(url);
    return match ? match[1] : '';
}
function getMimeType(url) {
    const extension = getExtension(url).toLowerCase();
    return mimes[extension] || '';
}
//# sourceMappingURL=mimes.js.map

/***/ }),

/***/ "../../node_modules/html-to-image/es/util.js":
/*!***************************************************!*\
  !*** ../../node_modules/html-to-image/es/util.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canvasToBlob": () => (/* binding */ canvasToBlob),
/* harmony export */   "checkCanvasDimensions": () => (/* binding */ checkCanvasDimensions),
/* harmony export */   "createImage": () => (/* binding */ createImage),
/* harmony export */   "delay": () => (/* binding */ delay),
/* harmony export */   "getImageSize": () => (/* binding */ getImageSize),
/* harmony export */   "getPixelRatio": () => (/* binding */ getPixelRatio),
/* harmony export */   "getStyleProperties": () => (/* binding */ getStyleProperties),
/* harmony export */   "isInstanceOfElement": () => (/* binding */ isInstanceOfElement),
/* harmony export */   "nodeToDataURL": () => (/* binding */ nodeToDataURL),
/* harmony export */   "resolveUrl": () => (/* binding */ resolveUrl),
/* harmony export */   "svgToDataURL": () => (/* binding */ svgToDataURL),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "uuid": () => (/* binding */ uuid)
/* harmony export */ });
function resolveUrl(url, baseUrl) {
    // url is absolute already
    if (url.match(/^[a-z]+:\/\//i)) {
        return url;
    }
    // url is absolute already, without protocol
    if (url.match(/^\/\//)) {
        return window.location.protocol + url;
    }
    // dataURI, mailto:, tel:, etc.
    if (url.match(/^[a-z]+:/i)) {
        return url;
    }
    const doc = document.implementation.createHTMLDocument();
    const base = doc.createElement('base');
    const a = doc.createElement('a');
    doc.head.appendChild(base);
    doc.body.appendChild(a);
    if (baseUrl) {
        base.href = baseUrl;
    }
    a.href = url;
    return a.href;
}
const uuid = (() => {
    // generate uuid for className of pseudo elements.
    // We should not use GUIDs, otherwise pseudo elements sometimes cannot be captured.
    let counter = 0;
    // ref: http://stackoverflow.com/a/6248722/2519373
    const random = () => 
    // eslint-disable-next-line no-bitwise
    `0000${((Math.random() * 36 ** 4) << 0).toString(36)}`.slice(-4);
    return () => {
        counter += 1;
        return `u${random()}${counter}`;
    };
})();
function delay(ms) {
    return (args) => new Promise((resolve) => {
        setTimeout(() => resolve(args), ms);
    });
}
function toArray(arrayLike) {
    const arr = [];
    for (let i = 0, l = arrayLike.length; i < l; i++) {
        arr.push(arrayLike[i]);
    }
    return arr;
}
let styleProps = null;
function getStyleProperties(options = {}) {
    if (styleProps) {
        return styleProps;
    }
    if (options.includeStyleProperties) {
        styleProps = options.includeStyleProperties;
        return styleProps;
    }
    styleProps = toArray(window.getComputedStyle(document.documentElement));
    return styleProps;
}
function px(node, styleProperty) {
    const win = node.ownerDocument.defaultView || window;
    const val = win.getComputedStyle(node).getPropertyValue(styleProperty);
    return val ? parseFloat(val.replace('px', '')) : 0;
}
function getNodeWidth(node) {
    const leftBorder = px(node, 'border-left-width');
    const rightBorder = px(node, 'border-right-width');
    return node.clientWidth + leftBorder + rightBorder;
}
function getNodeHeight(node) {
    const topBorder = px(node, 'border-top-width');
    const bottomBorder = px(node, 'border-bottom-width');
    return node.clientHeight + topBorder + bottomBorder;
}
function getImageSize(targetNode, options = {}) {
    const width = options.width || getNodeWidth(targetNode);
    const height = options.height || getNodeHeight(targetNode);
    return { width, height };
}
function getPixelRatio() {
    let ratio;
    let FINAL_PROCESS;
    try {
        FINAL_PROCESS = process;
    }
    catch (e) {
        // pass
    }
    const val = FINAL_PROCESS && FINAL_PROCESS.env
        ? FINAL_PROCESS.env.devicePixelRatio
        : null;
    if (val) {
        ratio = parseInt(val, 10);
        if (Number.isNaN(ratio)) {
            ratio = 1;
        }
    }
    return ratio || window.devicePixelRatio || 1;
}
// @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#maximum_canvas_size
const canvasDimensionLimit = 16384;
function checkCanvasDimensions(canvas) {
    if (canvas.width > canvasDimensionLimit ||
        canvas.height > canvasDimensionLimit) {
        if (canvas.width > canvasDimensionLimit &&
            canvas.height > canvasDimensionLimit) {
            if (canvas.width > canvas.height) {
                canvas.height *= canvasDimensionLimit / canvas.width;
                canvas.width = canvasDimensionLimit;
            }
            else {
                canvas.width *= canvasDimensionLimit / canvas.height;
                canvas.height = canvasDimensionLimit;
            }
        }
        else if (canvas.width > canvasDimensionLimit) {
            canvas.height *= canvasDimensionLimit / canvas.width;
            canvas.width = canvasDimensionLimit;
        }
        else {
            canvas.width *= canvasDimensionLimit / canvas.height;
            canvas.height = canvasDimensionLimit;
        }
    }
}
function canvasToBlob(canvas, options = {}) {
    if (canvas.toBlob) {
        return new Promise((resolve) => {
            canvas.toBlob(resolve, options.type ? options.type : 'image/png', options.quality ? options.quality : 1);
        });
    }
    return new Promise((resolve) => {
        const binaryString = window.atob(canvas
            .toDataURL(options.type ? options.type : undefined, options.quality ? options.quality : undefined)
            .split(',')[1]);
        const len = binaryString.length;
        const binaryArray = new Uint8Array(len);
        for (let i = 0; i < len; i += 1) {
            binaryArray[i] = binaryString.charCodeAt(i);
        }
        resolve(new Blob([binaryArray], {
            type: options.type ? options.type : 'image/png',
        }));
    });
}
function createImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            img.decode().then(() => {
                requestAnimationFrame(() => resolve(img));
            });
        };
        img.onerror = reject;
        img.crossOrigin = 'anonymous';
        img.decoding = 'async';
        img.src = url;
    });
}
async function svgToDataURL(svg) {
    return Promise.resolve()
        .then(() => new XMLSerializer().serializeToString(svg))
        .then(encodeURIComponent)
        .then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
}
async function nodeToDataURL(node, width, height) {
    const xmlns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(xmlns, 'svg');
    const foreignObject = document.createElementNS(xmlns, 'foreignObject');
    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${height}`);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    foreignObject.setAttribute('width', '100%');
    foreignObject.setAttribute('height', '100%');
    foreignObject.setAttribute('x', '0');
    foreignObject.setAttribute('y', '0');
    foreignObject.setAttribute('externalResourcesRequired', 'true');
    svg.appendChild(foreignObject);
    foreignObject.appendChild(node);
    return svgToDataURL(svg);
}
const isInstanceOfElement = (node, instance) => {
    if (node instanceof instance)
        return true;
    const nodePrototype = Object.getPrototypeOf(node);
    if (nodePrototype === null)
        return false;
    return (nodePrototype.constructor.name === instance.name ||
        isInstanceOfElement(nodePrototype, instance));
};
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/reactflow/dist/style.css":
/*!***********************************************!*\
  !*** ./node_modules/reactflow/dist/style.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/reactflow/dist/umd/index.js":
/*!**************************************************!*\
  !*** ./node_modules/reactflow/dist/umd/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

!function(e,t){ true?t(exports,__webpack_require__(/*! react */ "react"),__webpack_require__(/*! react-dom */ "react-dom")):0}(this,(function(e,t,n){"use strict";function o(e){if("string"==typeof e||"number"==typeof e)return""+e;let t="";if(Array.isArray(e))for(let n,r=0;r<e.length;r++)""!==(n=o(e[r]))&&(t+=(t&&" ")+n);else for(let n in e)e[n]&&(t+=(t&&" ")+n);return t}function r(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var i,a,s,l={},c={},u={},d={get exports(){return u},set exports(e){u=e}},h={};function f(){return a||(a=1,function(e){e.exports=function(){if(i)return h;i=1;var e=t,n="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},o=e.useState,r=e.useEffect,a=e.useLayoutEffect,s=e.useDebugValue;function l(e){var t=e.getSnapshot;e=e.value;try{var o=t();return!n(e,o)}catch(e){return!0}}var c="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),i=o({inst:{value:n,getSnapshot:t}}),c=i[0].inst,u=i[1];return a((function(){c.value=n,c.getSnapshot=t,l(c)&&u({inst:c})}),[e,n,t]),r((function(){return l(c)&&u({inst:c}),e((function(){l(c)&&u({inst:c})}))}),[e]),s(n),n};return h.useSyncExternalStore=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:c,h}()}(d)),u}
/**
   * @license React
   * use-sync-external-store-shim/with-selector.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */!function(e){e.exports=function(){if(s)return c;s=1;var e=t,n=f(),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},r=n.useSyncExternalStore,i=e.useRef,a=e.useEffect,l=e.useMemo,u=e.useDebugValue;return c.useSyncExternalStoreWithSelector=function(e,t,n,s,c){var d=i(null);if(null===d.current){var h={hasValue:!1,value:null};d.current=h}else h=d.current;d=l((function(){function e(e){if(!a){if(a=!0,r=e,e=s(e),void 0!==c&&h.hasValue){var t=h.value;if(c(t,e))return i=t}return i=e}if(t=i,o(r,e))return t;var n=s(e);return void 0!==c&&c(t,n)?t:(r=e,i=n)}var r,i,a=!1,l=void 0===n?null:n;return[function(){return e(t())},null===l?void 0:function(){return e(l())}]}),[t,n,s,c]);var f=r(e,d[0],d[1]);return a((function(){h.hasValue=!0,h.value=f}),[f]),u(f),f},c}()}({get exports(){return l},set exports(e){l=e}});var g=r(l);const p=e=>{let t;const n=new Set,o=(e,o)=>{const r="function"==typeof e?e(t):e;if(!Object.is(r,t)){const e=t;t=(null!=o?o:"object"!=typeof r)?r:Object.assign({},t,r),n.forEach((n=>n(t,e)))}},r=()=>t,i={setState:o,getState:r,subscribe:e=>(n.add(e),()=>n.delete(e)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}};return t=e(o,r,i),i},{useSyncExternalStoreWithSelector:m}=g;function y(e,n=e.getState,o){const r=m(e.subscribe,e.getState,e.getServerState||e.getState,n,o);return t.useDebugValue(r),r}const v=(e,t)=>{const n=(e=>e?p(e):p)(e),o=(e,o=t)=>y(n,e,o);return Object.assign(o,n),o};function b(e,t){if(Object.is(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(const[n,o]of e)if(!Object.is(o,t.get(n)))return!1;return!0}if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0}const n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(let o=0;o<n.length;o++)if(!Object.prototype.hasOwnProperty.call(t,n[o])||!Object.is(e[n[o]],t[n[o]]))return!1;return!0}var w={value:()=>{}};function S(){for(var e,t=0,n=arguments.length,o={};t<n;++t){if(!(e=arguments[t]+"")||e in o||/[\s.]/.test(e))throw new Error("illegal type: "+e);o[e]=[]}return new x(o)}function x(e){this._=e}function E(e,t){return e.trim().split(/^|\s+/).map((function(e){var n="",o=e.indexOf(".");if(o>=0&&(n=e.slice(o+1),e=e.slice(0,o)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:n}}))}function C(e,t){for(var n,o=0,r=e.length;o<r;++o)if((n=e[o]).name===t)return n.value}function _(e,t,n){for(var o=0,r=e.length;o<r;++o)if(e[o].name===t){e[o]=w,e=e.slice(0,o).concat(e.slice(o+1));break}return null!=n&&e.push({name:t,value:n}),e}x.prototype=S.prototype={constructor:x,on:function(e,t){var n,o=this._,r=E(e+"",o),i=-1,a=r.length;if(!(arguments.length<2)){if(null!=t&&"function"!=typeof t)throw new Error("invalid callback: "+t);for(;++i<a;)if(n=(e=r[i]).type)o[n]=_(o[n],e.name,t);else if(null==t)for(n in o)o[n]=_(o[n],e.name,null);return this}for(;++i<a;)if((n=(e=r[i]).type)&&(n=C(o[n],e.name)))return n},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new x(e)},call:function(e,t){if((n=arguments.length-2)>0)for(var n,o,r=new Array(n),i=0;i<n;++i)r[i]=arguments[i+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(i=0,n=(o=this._[e]).length;i<n;++i)o[i].value.apply(t,r)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var o=this._[e],r=0,i=o.length;r<i;++r)o[r].value.apply(t,n)}};var N="http://www.w3.org/1999/xhtml",M={svg:"http://www.w3.org/2000/svg",xhtml:N,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function k(e){var t=e+="",n=t.indexOf(":");return n>=0&&"xmlns"!==(t=e.slice(0,n))&&(e=e.slice(n+1)),M.hasOwnProperty(t)?{space:M[t],local:e}:e}function P(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===N&&t.documentElement.namespaceURI===N?t.createElement(e):t.createElementNS(n,e)}}function A(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function O(e){var t=k(e);return(t.local?A:P)(t)}function R(){}function I(e){return null==e?R:function(){return this.querySelector(e)}}function z(e){return null==e?[]:Array.isArray(e)?e:Array.from(e)}function D(){return[]}function B(e){return null==e?D:function(){return this.querySelectorAll(e)}}function $(e){return function(){return this.matches(e)}}function T(e){return function(t){return t.matches(e)}}var V=Array.prototype.find;function H(){return this.firstElementChild}var L=Array.prototype.filter;function X(){return Array.from(this.children)}function Y(e){return new Array(e.length)}function F(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}function W(e){return function(){return e}}function Z(e,t,n,o,r,i){for(var a,s=0,l=t.length,c=i.length;s<c;++s)(a=t[s])?(a.__data__=i[s],o[s]=a):n[s]=new F(e,i[s]);for(;s<l;++s)(a=t[s])&&(r[s]=a)}function K(e,t,n,o,r,i,a){var s,l,c,u=new Map,d=t.length,h=i.length,f=new Array(d);for(s=0;s<d;++s)(l=t[s])&&(f[s]=c=a.call(l,l.__data__,s,t)+"",u.has(c)?r[s]=l:u.set(c,l));for(s=0;s<h;++s)c=a.call(e,i[s],s,i)+"",(l=u.get(c))?(o[s]=l,l.__data__=i[s],u.delete(c)):n[s]=new F(e,i[s]);for(s=0;s<d;++s)(l=t[s])&&u.get(f[s])===l&&(r[s]=l)}function j(e){return e.__data__}function q(e){return"object"==typeof e&&"length"in e?e:Array.from(e)}function U(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function G(e){return function(){this.removeAttribute(e)}}function Q(e){return function(){this.removeAttributeNS(e.space,e.local)}}function J(e,t){return function(){this.setAttribute(e,t)}}function ee(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function te(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttribute(e):this.setAttribute(e,n)}}function ne(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function oe(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function re(e){return function(){this.style.removeProperty(e)}}function ie(e,t,n){return function(){this.style.setProperty(e,t,n)}}function ae(e,t,n){return function(){var o=t.apply(this,arguments);null==o?this.style.removeProperty(e):this.style.setProperty(e,o,n)}}function se(e,t){return e.style.getPropertyValue(t)||oe(e).getComputedStyle(e,null).getPropertyValue(t)}function le(e){return function(){delete this[e]}}function ce(e,t){return function(){this[e]=t}}function ue(e,t){return function(){var n=t.apply(this,arguments);null==n?delete this[e]:this[e]=n}}function de(e){return e.trim().split(/^|\s+/)}function he(e){return e.classList||new fe(e)}function fe(e){this._node=e,this._names=de(e.getAttribute("class")||"")}function ge(e,t){for(var n=he(e),o=-1,r=t.length;++o<r;)n.add(t[o])}function pe(e,t){for(var n=he(e),o=-1,r=t.length;++o<r;)n.remove(t[o])}function me(e){return function(){ge(this,e)}}function ye(e){return function(){pe(this,e)}}function ve(e,t){return function(){(t.apply(this,arguments)?ge:pe)(this,e)}}function be(){this.textContent=""}function we(e){return function(){this.textContent=e}}function Se(e){return function(){var t=e.apply(this,arguments);this.textContent=null==t?"":t}}function xe(){this.innerHTML=""}function Ee(e){return function(){this.innerHTML=e}}function Ce(e){return function(){var t=e.apply(this,arguments);this.innerHTML=null==t?"":t}}function _e(){this.nextSibling&&this.parentNode.appendChild(this)}function Ne(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Me(){return null}function ke(){var e=this.parentNode;e&&e.removeChild(this)}function Pe(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Ae(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Oe(e){return e.trim().split(/^|\s+/).map((function(e){var t="",n=e.indexOf(".");return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}}))}function Re(e){return function(){var t=this.__on;if(t){for(var n,o=0,r=-1,i=t.length;o<i;++o)n=t[o],e.type&&n.type!==e.type||n.name!==e.name?t[++r]=n:this.removeEventListener(n.type,n.listener,n.options);++r?t.length=r:delete this.__on}}}function Ie(e,t,n){return function(){var o,r=this.__on,i=function(e){return function(t){e.call(this,t,this.__data__)}}(t);if(r)for(var a=0,s=r.length;a<s;++a)if((o=r[a]).type===e.type&&o.name===e.name)return this.removeEventListener(o.type,o.listener,o.options),this.addEventListener(o.type,o.listener=i,o.options=n),void(o.value=t);this.addEventListener(e.type,i,n),o={type:e.type,name:e.name,value:t,listener:i,options:n},r?r.push(o):this.__on=[o]}}function ze(e,t,n){var o=oe(e),r=o.CustomEvent;"function"==typeof r?r=new r(t,n):(r=o.document.createEvent("Event"),n?(r.initEvent(t,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(t,!1,!1)),e.dispatchEvent(r)}function De(e,t){return function(){return ze(this,e,t)}}function Be(e,t){return function(){return ze(this,e,t.apply(this,arguments))}}F.prototype={constructor:F,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}},fe.prototype={add:function(e){this._names.indexOf(e)<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};var $e=[null];function Te(e,t){this._groups=e,this._parents=t}function Ve(){return new Te([[document.documentElement]],$e)}function He(e){return"string"==typeof e?new Te([[document.querySelector(e)]],[document.documentElement]):new Te([[e]],$e)}function Le(e,t){if(e=function(e){let t;for(;t=e.sourceEvent;)e=t;return e}(e),void 0===t&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var o=n.createSVGPoint();return o.x=e.clientX,o.y=e.clientY,[(o=o.matrixTransform(t.getScreenCTM().inverse())).x,o.y]}if(t.getBoundingClientRect){var r=t.getBoundingClientRect();return[e.clientX-r.left-t.clientLeft,e.clientY-r.top-t.clientTop]}}return[e.pageX,e.pageY]}Te.prototype=Ve.prototype={constructor:Te,select:function(e){"function"!=typeof e&&(e=I(e));for(var t=this._groups,n=t.length,o=new Array(n),r=0;r<n;++r)for(var i,a,s=t[r],l=s.length,c=o[r]=new Array(l),u=0;u<l;++u)(i=s[u])&&(a=e.call(i,i.__data__,u,s))&&("__data__"in i&&(a.__data__=i.__data__),c[u]=a);return new Te(o,this._parents)},selectAll:function(e){e="function"==typeof e?function(e){return function(){return z(e.apply(this,arguments))}}(e):B(e);for(var t=this._groups,n=t.length,o=[],r=[],i=0;i<n;++i)for(var a,s=t[i],l=s.length,c=0;c<l;++c)(a=s[c])&&(o.push(e.call(a,a.__data__,c,s)),r.push(a));return new Te(o,r)},selectChild:function(e){return this.select(null==e?H:function(e){return function(){return V.call(this.children,e)}}("function"==typeof e?e:T(e)))},selectChildren:function(e){return this.selectAll(null==e?X:function(e){return function(){return L.call(this.children,e)}}("function"==typeof e?e:T(e)))},filter:function(e){"function"!=typeof e&&(e=$(e));for(var t=this._groups,n=t.length,o=new Array(n),r=0;r<n;++r)for(var i,a=t[r],s=a.length,l=o[r]=[],c=0;c<s;++c)(i=a[c])&&e.call(i,i.__data__,c,a)&&l.push(i);return new Te(o,this._parents)},data:function(e,t){if(!arguments.length)return Array.from(this,j);var n=t?K:Z,o=this._parents,r=this._groups;"function"!=typeof e&&(e=W(e));for(var i=r.length,a=new Array(i),s=new Array(i),l=new Array(i),c=0;c<i;++c){var u=o[c],d=r[c],h=d.length,f=q(e.call(u,u&&u.__data__,c,o)),g=f.length,p=s[c]=new Array(g),m=a[c]=new Array(g),y=l[c]=new Array(h);n(u,d,p,m,y,f,t);for(var v,b,w=0,S=0;w<g;++w)if(v=p[w]){for(w>=S&&(S=w+1);!(b=m[S])&&++S<g;);v._next=b||null}}return(a=new Te(a,o))._enter=s,a._exit=l,a},enter:function(){return new Te(this._enter||this._groups.map(Y),this._parents)},exit:function(){return new Te(this._exit||this._groups.map(Y),this._parents)},join:function(e,t,n){var o=this.enter(),r=this,i=this.exit();return"function"==typeof e?(o=e(o))&&(o=o.selection()):o=o.append(e+""),null!=t&&(r=t(r))&&(r=r.selection()),null==n?i.remove():n(i),o&&r?o.merge(r).order():r},merge:function(e){for(var t=e.selection?e.selection():e,n=this._groups,o=t._groups,r=n.length,i=o.length,a=Math.min(r,i),s=new Array(r),l=0;l<a;++l)for(var c,u=n[l],d=o[l],h=u.length,f=s[l]=new Array(h),g=0;g<h;++g)(c=u[g]||d[g])&&(f[g]=c);for(;l<r;++l)s[l]=n[l];return new Te(s,this._parents)},selection:function(){return this},order:function(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var o,r=e[t],i=r.length-1,a=r[i];--i>=0;)(o=r[i])&&(a&&4^o.compareDocumentPosition(a)&&a.parentNode.insertBefore(o,a),a=o);return this},sort:function(e){function t(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n}e||(e=U);for(var n=this._groups,o=n.length,r=new Array(o),i=0;i<o;++i){for(var a,s=n[i],l=s.length,c=r[i]=new Array(l),u=0;u<l;++u)(a=s[u])&&(c[u]=a);c.sort(t)}return new Te(r,this._parents).order()},call:function(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this},nodes:function(){return Array.from(this)},node:function(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var o=e[t],r=0,i=o.length;r<i;++r){var a=o[r];if(a)return a}return null},size:function(){let e=0;for(const t of this)++e;return e},empty:function(){return!this.node()},each:function(e){for(var t=this._groups,n=0,o=t.length;n<o;++n)for(var r,i=t[n],a=0,s=i.length;a<s;++a)(r=i[a])&&e.call(r,r.__data__,a,i);return this},attr:function(e,t){var n=k(e);if(arguments.length<2){var o=this.node();return n.local?o.getAttributeNS(n.space,n.local):o.getAttribute(n)}return this.each((null==t?n.local?Q:G:"function"==typeof t?n.local?ne:te:n.local?ee:J)(n,t))},style:function(e,t,n){return arguments.length>1?this.each((null==t?re:"function"==typeof t?ae:ie)(e,t,null==n?"":n)):se(this.node(),e)},property:function(e,t){return arguments.length>1?this.each((null==t?le:"function"==typeof t?ue:ce)(e,t)):this.node()[e]},classed:function(e,t){var n=de(e+"");if(arguments.length<2){for(var o=he(this.node()),r=-1,i=n.length;++r<i;)if(!o.contains(n[r]))return!1;return!0}return this.each(("function"==typeof t?ve:t?me:ye)(n,t))},text:function(e){return arguments.length?this.each(null==e?be:("function"==typeof e?Se:we)(e)):this.node().textContent},html:function(e){return arguments.length?this.each(null==e?xe:("function"==typeof e?Ce:Ee)(e)):this.node().innerHTML},raise:function(){return this.each(_e)},lower:function(){return this.each(Ne)},append:function(e){var t="function"==typeof e?e:O(e);return this.select((function(){return this.appendChild(t.apply(this,arguments))}))},insert:function(e,t){var n="function"==typeof e?e:O(e),o=null==t?Me:"function"==typeof t?t:I(t);return this.select((function(){return this.insertBefore(n.apply(this,arguments),o.apply(this,arguments)||null)}))},remove:function(){return this.each(ke)},clone:function(e){return this.select(e?Ae:Pe)},datum:function(e){return arguments.length?this.property("__data__",e):this.node().__data__},on:function(e,t,n){var o,r,i=Oe(e+""),a=i.length;if(!(arguments.length<2)){for(s=t?Ie:Re,o=0;o<a;++o)this.each(s(i[o],t,n));return this}var s=this.node().__on;if(s)for(var l,c=0,u=s.length;c<u;++c)for(o=0,l=s[c];o<a;++o)if((r=i[o]).type===l.type&&r.name===l.name)return l.value},dispatch:function(e,t){return this.each(("function"==typeof t?Be:De)(e,t))},[Symbol.iterator]:function*(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var o,r=e[t],i=0,a=r.length;i<a;++i)(o=r[i])&&(yield o)}};const Xe={passive:!1},Ye={capture:!0,passive:!1};function Fe(e){e.stopImmediatePropagation()}function We(e){e.preventDefault(),e.stopImmediatePropagation()}function Ze(e){var t=e.document.documentElement,n=He(e).on("dragstart.drag",We,Ye);"onselectstart"in t?n.on("selectstart.drag",We,Ye):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function Ke(e,t){var n=e.document.documentElement,o=He(e).on("dragstart.drag",null);t&&(o.on("click.drag",We,Ye),setTimeout((function(){o.on("click.drag",null)}),0)),"onselectstart"in n?o.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}var je=e=>()=>e;function qe(e,{sourceEvent:t,subject:n,target:o,identifier:r,active:i,x:a,y:s,dx:l,dy:c,dispatch:u}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},subject:{value:n,enumerable:!0,configurable:!0},target:{value:o,enumerable:!0,configurable:!0},identifier:{value:r,enumerable:!0,configurable:!0},active:{value:i,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:s,enumerable:!0,configurable:!0},dx:{value:l,enumerable:!0,configurable:!0},dy:{value:c,enumerable:!0,configurable:!0},_:{value:u}})}function Ue(e){return!e.ctrlKey&&!e.button}function Ge(){return this.parentNode}function Qe(e,t){return null==t?{x:e.x,y:e.y}:t}function Je(){return navigator.maxTouchPoints||"ontouchstart"in this}function et(){var e,t,n,o,r=Ue,i=Ge,a=Qe,s=Je,l={},c=S("start","drag","end"),u=0,d=0;function h(e){e.on("mousedown.drag",f).filter(s).on("touchstart.drag",m).on("touchmove.drag",y,Xe).on("touchend.drag touchcancel.drag",v).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function f(a,s){if(!o&&r.call(this,a,s)){var l=b(this,i.call(this,a,s),a,s,"mouse");l&&(He(a.view).on("mousemove.drag",g,Ye).on("mouseup.drag",p,Ye),Ze(a.view),Fe(a),n=!1,e=a.clientX,t=a.clientY,l("start",a))}}function g(o){if(We(o),!n){var r=o.clientX-e,i=o.clientY-t;n=r*r+i*i>d}l.mouse("drag",o)}function p(e){He(e.view).on("mousemove.drag mouseup.drag",null),Ke(e.view,n),We(e),l.mouse("end",e)}function m(e,t){if(r.call(this,e,t)){var n,o,a=e.changedTouches,s=i.call(this,e,t),l=a.length;for(n=0;n<l;++n)(o=b(this,s,e,t,a[n].identifier,a[n]))&&(Fe(e),o("start",e,a[n]))}}function y(e){var t,n,o=e.changedTouches,r=o.length;for(t=0;t<r;++t)(n=l[o[t].identifier])&&(We(e),n("drag",e,o[t]))}function v(e){var t,n,r=e.changedTouches,i=r.length;for(o&&clearTimeout(o),o=setTimeout((function(){o=null}),500),t=0;t<i;++t)(n=l[r[t].identifier])&&(Fe(e),n("end",e,r[t]))}function b(e,t,n,o,r,i){var s,d,f,g=c.copy(),p=Le(i||n,t);if(null!=(f=a.call(e,new qe("beforestart",{sourceEvent:n,target:h,identifier:r,active:u,x:p[0],y:p[1],dx:0,dy:0,dispatch:g}),o)))return s=f.x-p[0]||0,d=f.y-p[1]||0,function n(i,a,c){var m,y=p;switch(i){case"start":l[r]=n,m=u++;break;case"end":delete l[r],--u;case"drag":p=Le(c||a,t),m=u}g.call(i,e,new qe(i,{sourceEvent:a,subject:f,target:h,identifier:r,active:m,x:p[0]+s,y:p[1]+d,dx:p[0]-y[0],dy:p[1]-y[1],dispatch:g}),o)}}return h.filter=function(e){return arguments.length?(r="function"==typeof e?e:je(!!e),h):r},h.container=function(e){return arguments.length?(i="function"==typeof e?e:je(e),h):i},h.subject=function(e){return arguments.length?(a="function"==typeof e?e:je(e),h):a},h.touchable=function(e){return arguments.length?(s="function"==typeof e?e:je(!!e),h):s},h.on=function(){var e=c.on.apply(c,arguments);return e===c?h:e},h.clickDistance=function(e){return arguments.length?(d=(e=+e)*e,h):Math.sqrt(d)},h}function tt(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function nt(e,t){var n=Object.create(e.prototype);for(var o in t)n[o]=t[o];return n}function ot(){}qe.prototype.on=function(){var e=this._.on.apply(this._,arguments);return e===this._?this:e};var rt=.7,it=1/rt,at="\\s*([+-]?\\d+)\\s*",st="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",lt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",ct=/^#([0-9a-f]{3,8})$/,ut=new RegExp(`^rgb\\(${at},${at},${at}\\)$`),dt=new RegExp(`^rgb\\(${lt},${lt},${lt}\\)$`),ht=new RegExp(`^rgba\\(${at},${at},${at},${st}\\)$`),ft=new RegExp(`^rgba\\(${lt},${lt},${lt},${st}\\)$`),gt=new RegExp(`^hsl\\(${st},${lt},${lt}\\)$`),pt=new RegExp(`^hsla\\(${st},${lt},${lt},${st}\\)$`),mt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function yt(){return this.rgb().formatHex()}function vt(){return this.rgb().formatRgb()}function bt(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=ct.exec(e))?(n=t[1].length,t=parseInt(t[1],16),6===n?wt(t):3===n?new Ct(t>>8&15|t>>4&240,t>>4&15|240&t,(15&t)<<4|15&t,1):8===n?St(t>>24&255,t>>16&255,t>>8&255,(255&t)/255):4===n?St(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|240&t,((15&t)<<4|15&t)/255):null):(t=ut.exec(e))?new Ct(t[1],t[2],t[3],1):(t=dt.exec(e))?new Ct(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=ht.exec(e))?St(t[1],t[2],t[3],t[4]):(t=ft.exec(e))?St(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=gt.exec(e))?At(t[1],t[2]/100,t[3]/100,1):(t=pt.exec(e))?At(t[1],t[2]/100,t[3]/100,t[4]):mt.hasOwnProperty(e)?wt(mt[e]):"transparent"===e?new Ct(NaN,NaN,NaN,0):null}function wt(e){return new Ct(e>>16&255,e>>8&255,255&e,1)}function St(e,t,n,o){return o<=0&&(e=t=n=NaN),new Ct(e,t,n,o)}function xt(e){return e instanceof ot||(e=bt(e)),e?new Ct((e=e.rgb()).r,e.g,e.b,e.opacity):new Ct}function Et(e,t,n,o){return 1===arguments.length?xt(e):new Ct(e,t,n,null==o?1:o)}function Ct(e,t,n,o){this.r=+e,this.g=+t,this.b=+n,this.opacity=+o}function _t(){return`#${Pt(this.r)}${Pt(this.g)}${Pt(this.b)}`}function Nt(){const e=Mt(this.opacity);return`${1===e?"rgb(":"rgba("}${kt(this.r)}, ${kt(this.g)}, ${kt(this.b)}${1===e?")":`, ${e})`}`}function Mt(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function kt(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function Pt(e){return((e=kt(e))<16?"0":"")+e.toString(16)}function At(e,t,n,o){return o<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new Rt(e,t,n,o)}function Ot(e){if(e instanceof Rt)return new Rt(e.h,e.s,e.l,e.opacity);if(e instanceof ot||(e=bt(e)),!e)return new Rt;if(e instanceof Rt)return e;var t=(e=e.rgb()).r/255,n=e.g/255,o=e.b/255,r=Math.min(t,n,o),i=Math.max(t,n,o),a=NaN,s=i-r,l=(i+r)/2;return s?(a=t===i?(n-o)/s+6*(n<o):n===i?(o-t)/s+2:(t-n)/s+4,s/=l<.5?i+r:2-i-r,a*=60):s=l>0&&l<1?0:a,new Rt(a,s,l,e.opacity)}function Rt(e,t,n,o){this.h=+e,this.s=+t,this.l=+n,this.opacity=+o}function It(e){return(e=(e||0)%360)<0?e+360:e}function zt(e){return Math.max(0,Math.min(1,e||0))}function Dt(e,t,n){return 255*(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)}tt(ot,bt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:yt,formatHex:yt,formatHex8:function(){return this.rgb().formatHex8()},formatHsl:function(){return Ot(this).formatHsl()},formatRgb:vt,toString:vt}),tt(Ct,Et,nt(ot,{brighter(e){return e=null==e?it:Math.pow(it,e),new Ct(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=null==e?rt:Math.pow(rt,e),new Ct(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Ct(kt(this.r),kt(this.g),kt(this.b),Mt(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:_t,formatHex:_t,formatHex8:function(){return`#${Pt(this.r)}${Pt(this.g)}${Pt(this.b)}${Pt(255*(isNaN(this.opacity)?1:this.opacity))}`},formatRgb:Nt,toString:Nt})),tt(Rt,(function(e,t,n,o){return 1===arguments.length?Ot(e):new Rt(e,t,n,null==o?1:o)}),nt(ot,{brighter(e){return e=null==e?it:Math.pow(it,e),new Rt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=null==e?rt:Math.pow(rt,e),new Rt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+360*(this.h<0),t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,o=n+(n<.5?n:1-n)*t,r=2*n-o;return new Ct(Dt(e>=240?e-240:e+120,r,o),Dt(e,r,o),Dt(e<120?e+240:e-120,r,o),this.opacity)},clamp(){return new Rt(It(this.h),zt(this.s),zt(this.l),Mt(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=Mt(this.opacity);return`${1===e?"hsl(":"hsla("}${It(this.h)}, ${100*zt(this.s)}%, ${100*zt(this.l)}%${1===e?")":`, ${e})`}`}}));var Bt=e=>()=>e;function $t(e){return 1==(e=+e)?Tt:function(t,n){return n-t?function(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(o){return Math.pow(e+o*t,n)}}(t,n,e):Bt(isNaN(t)?n:t)}}function Tt(e,t){var n=t-e;return n?function(e,t){return function(n){return e+n*t}}(e,n):Bt(isNaN(e)?t:e)}var Vt=function e(t){var n=$t(t);function o(e,t){var o=n((e=Et(e)).r,(t=Et(t)).r),r=n(e.g,t.g),i=n(e.b,t.b),a=Tt(e.opacity,t.opacity);return function(t){return e.r=o(t),e.g=r(t),e.b=i(t),e.opacity=a(t),e+""}}return o.gamma=e,o}(1);function Ht(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var Lt=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Xt=new RegExp(Lt.source,"g");function Yt(e,t){var n,o,r,i=Lt.lastIndex=Xt.lastIndex=0,a=-1,s=[],l=[];for(e+="",t+="";(n=Lt.exec(e))&&(o=Xt.exec(t));)(r=o.index)>i&&(r=t.slice(i,r),s[a]?s[a]+=r:s[++a]=r),(n=n[0])===(o=o[0])?s[a]?s[a]+=o:s[++a]=o:(s[++a]=null,l.push({i:a,x:Ht(n,o)})),i=Xt.lastIndex;return i<t.length&&(r=t.slice(i),s[a]?s[a]+=r:s[++a]=r),s.length<2?l[0]?function(e){return function(t){return e(t)+""}}(l[0].x):function(e){return function(){return e}}(t):(t=l.length,function(e){for(var n,o=0;o<t;++o)s[(n=l[o]).i]=n.x(e);return s.join("")})}var Ft,Wt=180/Math.PI,Zt={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Kt(e,t,n,o,r,i){var a,s,l;return(a=Math.sqrt(e*e+t*t))&&(e/=a,t/=a),(l=e*n+t*o)&&(n-=e*l,o-=t*l),(s=Math.sqrt(n*n+o*o))&&(n/=s,o/=s,l/=s),e*o<t*n&&(e=-e,t=-t,l=-l,a=-a),{translateX:r,translateY:i,rotate:Math.atan2(t,e)*Wt,skewX:Math.atan(l)*Wt,scaleX:a,scaleY:s}}function jt(e,t,n,o){function r(e){return e.length?e.pop()+" ":""}return function(i,a){var s=[],l=[];return i=e(i),a=e(a),function(e,o,r,i,a,s){if(e!==r||o!==i){var l=a.push("translate(",null,t,null,n);s.push({i:l-4,x:Ht(e,r)},{i:l-2,x:Ht(o,i)})}else(r||i)&&a.push("translate("+r+t+i+n)}(i.translateX,i.translateY,a.translateX,a.translateY,s,l),function(e,t,n,i){e!==t?(e-t>180?t+=360:t-e>180&&(e+=360),i.push({i:n.push(r(n)+"rotate(",null,o)-2,x:Ht(e,t)})):t&&n.push(r(n)+"rotate("+t+o)}(i.rotate,a.rotate,s,l),function(e,t,n,i){e!==t?i.push({i:n.push(r(n)+"skewX(",null,o)-2,x:Ht(e,t)}):t&&n.push(r(n)+"skewX("+t+o)}(i.skewX,a.skewX,s,l),function(e,t,n,o,i,a){if(e!==n||t!==o){var s=i.push(r(i)+"scale(",null,",",null,")");a.push({i:s-4,x:Ht(e,n)},{i:s-2,x:Ht(t,o)})}else 1===n&&1===o||i.push(r(i)+"scale("+n+","+o+")")}(i.scaleX,i.scaleY,a.scaleX,a.scaleY,s,l),i=a=null,function(e){for(var t,n=-1,o=l.length;++n<o;)s[(t=l[n]).i]=t.x(e);return s.join("")}}}var qt=jt((function(e){const t=new("function"==typeof DOMMatrix?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Zt:Kt(t.a,t.b,t.c,t.d,t.e,t.f)}),"px, ","px)","deg)"),Ut=jt((function(e){return null==e?Zt:(Ft||(Ft=document.createElementNS("http://www.w3.org/2000/svg","g")),Ft.setAttribute("transform",e),(e=Ft.transform.baseVal.consolidate())?Kt((e=e.matrix).a,e.b,e.c,e.d,e.e,e.f):Zt)}),", ",")",")");function Gt(e){return((e=Math.exp(e))+1/e)/2}var Qt,Jt,en=function e(t,n,o){function r(e,r){var i,a,s=e[0],l=e[1],c=e[2],u=r[0],d=r[1],h=r[2],f=u-s,g=d-l,p=f*f+g*g;if(p<1e-12)a=Math.log(h/c)/t,i=function(e){return[s+e*f,l+e*g,c*Math.exp(t*e*a)]};else{var m=Math.sqrt(p),y=(h*h-c*c+o*p)/(2*c*n*m),v=(h*h-c*c-o*p)/(2*h*n*m),b=Math.log(Math.sqrt(y*y+1)-y),w=Math.log(Math.sqrt(v*v+1)-v);a=(w-b)/t,i=function(e){var o,r=e*a,i=Gt(b),u=c/(n*m)*(i*(o=t*r+b,((o=Math.exp(2*o))-1)/(o+1))-function(e){return((e=Math.exp(e))-1/e)/2}(b));return[s+u*f,l+u*g,c*i/Gt(t*r+b)]}}return i.duration=1e3*a*t/Math.SQRT2,i}return r.rho=function(t){var n=Math.max(.001,+t),o=n*n;return e(n,o,o*o)},r}(Math.SQRT2,2,4),tn=0,nn=0,on=0,rn=0,an=0,sn=0,ln="object"==typeof performance&&performance.now?performance:Date,cn="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function un(){return an||(cn(dn),an=ln.now()+sn)}function dn(){an=0}function hn(){this._call=this._time=this._next=null}function fn(e,t,n){var o=new hn;return o.restart(e,t,n),o}function gn(){an=(rn=ln.now())+sn,tn=nn=0;try{!function(){un(),++tn;for(var e,t=Qt;t;)(e=an-t._time)>=0&&t._call.call(void 0,e),t=t._next;--tn}()}finally{tn=0,function(){var e,t,n=Qt,o=1/0;for(;n;)n._call?(o>n._time&&(o=n._time),e=n,n=n._next):(t=n._next,n._next=null,n=e?e._next=t:Qt=t);Jt=e,mn(o)}(),an=0}}function pn(){var e=ln.now(),t=e-rn;t>1e3&&(sn-=t,rn=e)}function mn(e){tn||(nn&&(nn=clearTimeout(nn)),e-an>24?(e<1/0&&(nn=setTimeout(gn,e-ln.now()-sn)),on&&(on=clearInterval(on))):(on||(rn=ln.now(),on=setInterval(pn,1e3)),tn=1,cn(gn)))}function yn(e,t,n){var o=new hn;return t=null==t?0:+t,o.restart((n=>{o.stop(),e(n+t)}),t,n),o}hn.prototype=fn.prototype={constructor:hn,restart:function(e,t,n){if("function"!=typeof e)throw new TypeError("callback is not a function");n=(null==n?un():+n)+(null==t?0:+t),this._next||Jt===this||(Jt?Jt._next=this:Qt=this,Jt=this),this._call=e,this._time=n,mn()},stop:function(){this._call&&(this._call=null,this._time=1/0,mn())}};var vn=S("start","end","cancel","interrupt"),bn=[];function wn(e,t,n,o,r,i){var a=e.__transition;if(a){if(n in a)return}else e.__transition={};!function(e,t,n){var o,r=e.__transition;function i(e){n.state=1,n.timer.restart(a,n.delay,n.time),n.delay<=e&&a(e-n.delay)}function a(i){var c,u,d,h;if(1!==n.state)return l();for(c in r)if((h=r[c]).name===n.name){if(3===h.state)return yn(a);4===h.state?(h.state=6,h.timer.stop(),h.on.call("interrupt",e,e.__data__,h.index,h.group),delete r[c]):+c<t&&(h.state=6,h.timer.stop(),h.on.call("cancel",e,e.__data__,h.index,h.group),delete r[c])}if(yn((function(){3===n.state&&(n.state=4,n.timer.restart(s,n.delay,n.time),s(i))})),n.state=2,n.on.call("start",e,e.__data__,n.index,n.group),2===n.state){for(n.state=3,o=new Array(d=n.tween.length),c=0,u=-1;c<d;++c)(h=n.tween[c].value.call(e,e.__data__,n.index,n.group))&&(o[++u]=h);o.length=u+1}}function s(t){for(var r=t<n.duration?n.ease.call(null,t/n.duration):(n.timer.restart(l),n.state=5,1),i=-1,a=o.length;++i<a;)o[i].call(e,r);5===n.state&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){for(var o in n.state=6,n.timer.stop(),delete r[t],r)return;delete e.__transition}r[t]=n,n.timer=fn(i,0,n.time)}(e,n,{name:t,index:o,group:r,on:vn,tween:bn,time:i.time,delay:i.delay,duration:i.duration,ease:i.ease,timer:null,state:0})}function Sn(e,t){var n=En(e,t);if(n.state>0)throw new Error("too late; already scheduled");return n}function xn(e,t){var n=En(e,t);if(n.state>3)throw new Error("too late; already running");return n}function En(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function Cn(e,t){var n,o,r,i=e.__transition,a=!0;if(i){for(r in t=null==t?null:t+"",i)(n=i[r]).name===t?(o=n.state>2&&n.state<5,n.state=6,n.timer.stop(),n.on.call(o?"interrupt":"cancel",e,e.__data__,n.index,n.group),delete i[r]):a=!1;a&&delete e.__transition}}function _n(e,t){var n,o;return function(){var r=xn(this,e),i=r.tween;if(i!==n)for(var a=0,s=(o=n=i).length;a<s;++a)if(o[a].name===t){(o=o.slice()).splice(a,1);break}r.tween=o}}function Nn(e,t,n){var o,r;if("function"!=typeof n)throw new Error;return function(){var i=xn(this,e),a=i.tween;if(a!==o){r=(o=a).slice();for(var s={name:t,value:n},l=0,c=r.length;l<c;++l)if(r[l].name===t){r[l]=s;break}l===c&&r.push(s)}i.tween=r}}function Mn(e,t,n){var o=e._id;return e.each((function(){var e=xn(this,o);(e.value||(e.value={}))[t]=n.apply(this,arguments)})),function(e){return En(e,o).value[t]}}function kn(e,t){var n;return("number"==typeof t?Ht:t instanceof bt?Vt:(n=bt(t))?(t=n,Vt):Yt)(e,t)}function Pn(e){return function(){this.removeAttribute(e)}}function An(e){return function(){this.removeAttributeNS(e.space,e.local)}}function On(e,t,n){var o,r,i=n+"";return function(){var a=this.getAttribute(e);return a===i?null:a===o?r:r=t(o=a,n)}}function Rn(e,t,n){var o,r,i=n+"";return function(){var a=this.getAttributeNS(e.space,e.local);return a===i?null:a===o?r:r=t(o=a,n)}}function In(e,t,n){var o,r,i;return function(){var a,s,l=n(this);if(null!=l)return(a=this.getAttribute(e))===(s=l+"")?null:a===o&&s===r?i:(r=s,i=t(o=a,l));this.removeAttribute(e)}}function zn(e,t,n){var o,r,i;return function(){var a,s,l=n(this);if(null!=l)return(a=this.getAttributeNS(e.space,e.local))===(s=l+"")?null:a===o&&s===r?i:(r=s,i=t(o=a,l));this.removeAttributeNS(e.space,e.local)}}function Dn(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function Bn(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function $n(e,t){var n,o;function r(){var r=t.apply(this,arguments);return r!==o&&(n=(o=r)&&Bn(e,r)),n}return r._value=t,r}function Tn(e,t){var n,o;function r(){var r=t.apply(this,arguments);return r!==o&&(n=(o=r)&&Dn(e,r)),n}return r._value=t,r}function Vn(e,t){return function(){Sn(this,e).delay=+t.apply(this,arguments)}}function Hn(e,t){return t=+t,function(){Sn(this,e).delay=t}}function Ln(e,t){return function(){xn(this,e).duration=+t.apply(this,arguments)}}function Xn(e,t){return t=+t,function(){xn(this,e).duration=t}}function Yn(e,t){if("function"!=typeof t)throw new Error;return function(){xn(this,e).ease=t}}function Fn(e,t,n){var o,r,i=function(e){return(e+"").trim().split(/^|\s+/).every((function(e){var t=e.indexOf(".");return t>=0&&(e=e.slice(0,t)),!e||"start"===e}))}(t)?Sn:xn;return function(){var a=i(this,e),s=a.on;s!==o&&(r=(o=s).copy()).on(t,n),a.on=r}}var Wn=Ve.prototype.constructor;function Zn(e){return function(){this.style.removeProperty(e)}}function Kn(e,t,n){return function(o){this.style.setProperty(e,t.call(this,o),n)}}function jn(e,t,n){var o,r;function i(){var i=t.apply(this,arguments);return i!==r&&(o=(r=i)&&Kn(e,i,n)),o}return i._value=t,i}function qn(e){return function(t){this.textContent=e.call(this,t)}}function Un(e){var t,n;function o(){var o=e.apply(this,arguments);return o!==n&&(t=(n=o)&&qn(o)),t}return o._value=e,o}var Gn=0;function Qn(e,t,n,o){this._groups=e,this._parents=t,this._name=n,this._id=o}function Jn(){return++Gn}var eo=Ve.prototype;Qn.prototype={constructor:Qn,select:function(e){var t=this._name,n=this._id;"function"!=typeof e&&(e=I(e));for(var o=this._groups,r=o.length,i=new Array(r),a=0;a<r;++a)for(var s,l,c=o[a],u=c.length,d=i[a]=new Array(u),h=0;h<u;++h)(s=c[h])&&(l=e.call(s,s.__data__,h,c))&&("__data__"in s&&(l.__data__=s.__data__),d[h]=l,wn(d[h],t,n,h,d,En(s,n)));return new Qn(i,this._parents,t,n)},selectAll:function(e){var t=this._name,n=this._id;"function"!=typeof e&&(e=B(e));for(var o=this._groups,r=o.length,i=[],a=[],s=0;s<r;++s)for(var l,c=o[s],u=c.length,d=0;d<u;++d)if(l=c[d]){for(var h,f=e.call(l,l.__data__,d,c),g=En(l,n),p=0,m=f.length;p<m;++p)(h=f[p])&&wn(h,t,n,p,f,g);i.push(f),a.push(l)}return new Qn(i,a,t,n)},selectChild:eo.selectChild,selectChildren:eo.selectChildren,filter:function(e){"function"!=typeof e&&(e=$(e));for(var t=this._groups,n=t.length,o=new Array(n),r=0;r<n;++r)for(var i,a=t[r],s=a.length,l=o[r]=[],c=0;c<s;++c)(i=a[c])&&e.call(i,i.__data__,c,a)&&l.push(i);return new Qn(o,this._parents,this._name,this._id)},merge:function(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,o=t.length,r=n.length,i=Math.min(o,r),a=new Array(o),s=0;s<i;++s)for(var l,c=t[s],u=n[s],d=c.length,h=a[s]=new Array(d),f=0;f<d;++f)(l=c[f]||u[f])&&(h[f]=l);for(;s<o;++s)a[s]=t[s];return new Qn(a,this._parents,this._name,this._id)},selection:function(){return new Wn(this._groups,this._parents)},transition:function(){for(var e=this._name,t=this._id,n=Jn(),o=this._groups,r=o.length,i=0;i<r;++i)for(var a,s=o[i],l=s.length,c=0;c<l;++c)if(a=s[c]){var u=En(a,t);wn(a,e,n,c,s,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Qn(o,this._parents,e,n)},call:eo.call,nodes:eo.nodes,node:eo.node,size:eo.size,empty:eo.empty,each:eo.each,on:function(e,t){var n=this._id;return arguments.length<2?En(this.node(),n).on.on(e):this.each(Fn(n,e,t))},attr:function(e,t){var n=k(e),o="transform"===n?Ut:kn;return this.attrTween(e,"function"==typeof t?(n.local?zn:In)(n,o,Mn(this,"attr."+e,t)):null==t?(n.local?An:Pn)(n):(n.local?Rn:On)(n,o,t))},attrTween:function(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(null==t)return this.tween(n,null);if("function"!=typeof t)throw new Error;var o=k(e);return this.tween(n,(o.local?$n:Tn)(o,t))},style:function(e,t,n){var o="transform"==(e+="")?qt:kn;return null==t?this.styleTween(e,function(e,t){var n,o,r;return function(){var i=se(this,e),a=(this.style.removeProperty(e),se(this,e));return i===a?null:i===n&&a===o?r:r=t(n=i,o=a)}}(e,o)).on("end.style."+e,Zn(e)):"function"==typeof t?this.styleTween(e,function(e,t,n){var o,r,i;return function(){var a=se(this,e),s=n(this),l=s+"";return null==s&&(this.style.removeProperty(e),l=s=se(this,e)),a===l?null:a===o&&l===r?i:(r=l,i=t(o=a,s))}}(e,o,Mn(this,"style."+e,t))).each(function(e,t){var n,o,r,i,a="style."+t,s="end."+a;return function(){var l=xn(this,e),c=l.on,u=null==l.value[a]?i||(i=Zn(t)):void 0;c===n&&r===u||(o=(n=c).copy()).on(s,r=u),l.on=o}}(this._id,e)):this.styleTween(e,function(e,t,n){var o,r,i=n+"";return function(){var a=se(this,e);return a===i?null:a===o?r:r=t(o=a,n)}}(e,o,t),n).on("end.style."+e,null)},styleTween:function(e,t,n){var o="style."+(e+="");if(arguments.length<2)return(o=this.tween(o))&&o._value;if(null==t)return this.tween(o,null);if("function"!=typeof t)throw new Error;return this.tween(o,jn(e,t,null==n?"":n))},text:function(e){return this.tween("text","function"==typeof e?function(e){return function(){var t=e(this);this.textContent=null==t?"":t}}(Mn(this,"text",e)):function(e){return function(){this.textContent=e}}(null==e?"":e+""))},textTween:function(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(null==e)return this.tween(t,null);if("function"!=typeof e)throw new Error;return this.tween(t,Un(e))},remove:function(){return this.on("end.remove",function(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}(this._id))},tween:function(e,t){var n=this._id;if(e+="",arguments.length<2){for(var o,r=En(this.node(),n).tween,i=0,a=r.length;i<a;++i)if((o=r[i]).name===e)return o.value;return null}return this.each((null==t?_n:Nn)(n,e,t))},delay:function(e){var t=this._id;return arguments.length?this.each(("function"==typeof e?Vn:Hn)(t,e)):En(this.node(),t).delay},duration:function(e){var t=this._id;return arguments.length?this.each(("function"==typeof e?Ln:Xn)(t,e)):En(this.node(),t).duration},ease:function(e){var t=this._id;return arguments.length?this.each(Yn(t,e)):En(this.node(),t).ease},easeVarying:function(e){if("function"!=typeof e)throw new Error;return this.each(function(e,t){return function(){var n=t.apply(this,arguments);if("function"!=typeof n)throw new Error;xn(this,e).ease=n}}(this._id,e))},end:function(){var e,t,n=this,o=n._id,r=n.size();return new Promise((function(i,a){var s={value:a},l={value:function(){0==--r&&i()}};n.each((function(){var n=xn(this,o),r=n.on;r!==e&&((t=(e=r).copy())._.cancel.push(s),t._.interrupt.push(s),t._.end.push(l)),n.on=t})),0===r&&i()}))},[Symbol.iterator]:eo[Symbol.iterator]};var to={time:null,delay:0,duration:250,ease:function(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}};function no(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}Ve.prototype.interrupt=function(e){return this.each((function(){Cn(this,e)}))},Ve.prototype.transition=function(e){var t,n;e instanceof Qn?(t=e._id,e=e._name):(t=Jn(),(n=to).time=un(),e=null==e?null:e+"");for(var o=this._groups,r=o.length,i=0;i<r;++i)for(var a,s=o[i],l=s.length,c=0;c<l;++c)(a=s[c])&&wn(a,e,t,c,s,n||no(a,t));return new Qn(o,this._parents,e,t)};var oo=e=>()=>e;function ro(e,{sourceEvent:t,target:n,transform:o,dispatch:r}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},transform:{value:o,enumerable:!0,configurable:!0},_:{value:r}})}function io(e,t,n){this.k=e,this.x=t,this.y=n}io.prototype={constructor:io,scale:function(e){return 1===e?this:new io(this.k*e,this.x,this.y)},translate:function(e,t){return 0===e&0===t?this:new io(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var ao=new io(1,0,0);function so(e){e.stopImmediatePropagation()}function lo(e){e.preventDefault(),e.stopImmediatePropagation()}function co(e){return!(e.ctrlKey&&"wheel"!==e.type||e.button)}function uo(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e).hasAttribute("viewBox")?[[(e=e.viewBox.baseVal).x,e.y],[e.x+e.width,e.y+e.height]]:[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]:[[0,0],[e.clientWidth,e.clientHeight]]}function ho(){return this.__zoom||ao}function fo(e){return-e.deltaY*(1===e.deltaMode?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function go(){return navigator.maxTouchPoints||"ontouchstart"in this}function po(e,t,n){var o=e.invertX(t[0][0])-n[0][0],r=e.invertX(t[1][0])-n[1][0],i=e.invertY(t[0][1])-n[0][1],a=e.invertY(t[1][1])-n[1][1];return e.translate(r>o?(o+r)/2:Math.min(0,o)||Math.max(0,r),a>i?(i+a)/2:Math.min(0,i)||Math.max(0,a))}function mo(){var e,t,n,o=co,r=uo,i=po,a=fo,s=go,l=[0,1/0],c=[[-1/0,-1/0],[1/0,1/0]],u=250,d=en,h=S("start","zoom","end"),f=500,g=0,p=10;function m(e){e.property("__zoom",ho).on("wheel.zoom",C,{passive:!1}).on("mousedown.zoom",_).on("dblclick.zoom",N).filter(s).on("touchstart.zoom",M).on("touchmove.zoom",k).on("touchend.zoom touchcancel.zoom",P).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function y(e,t){return(t=Math.max(l[0],Math.min(l[1],t)))===e.k?e:new io(t,e.x,e.y)}function v(e,t,n){var o=t[0]-n[0]*e.k,r=t[1]-n[1]*e.k;return o===e.x&&r===e.y?e:new io(e.k,o,r)}function b(e){return[(+e[0][0]+ +e[1][0])/2,(+e[0][1]+ +e[1][1])/2]}function w(e,t,n,o){e.on("start.zoom",(function(){x(this,arguments).event(o).start()})).on("interrupt.zoom end.zoom",(function(){x(this,arguments).event(o).end()})).tween("zoom",(function(){var e=this,i=arguments,a=x(e,i).event(o),s=r.apply(e,i),l=null==n?b(s):"function"==typeof n?n.apply(e,i):n,c=Math.max(s[1][0]-s[0][0],s[1][1]-s[0][1]),u=e.__zoom,h="function"==typeof t?t.apply(e,i):t,f=d(u.invert(l).concat(c/u.k),h.invert(l).concat(c/h.k));return function(e){if(1===e)e=h;else{var t=f(e),n=c/t[2];e=new io(n,l[0]-t[0]*n,l[1]-t[1]*n)}a.zoom(null,e)}}))}function x(e,t,n){return!n&&e.__zooming||new E(e,t)}function E(e,t){this.that=e,this.args=t,this.active=0,this.sourceEvent=null,this.extent=r.apply(e,t),this.taps=0}function C(e,...t){if(o.apply(this,arguments)){var n=x(this,t).event(e),r=this.__zoom,s=Math.max(l[0],Math.min(l[1],r.k*Math.pow(2,a.apply(this,arguments)))),u=Le(e);if(n.wheel)n.mouse[0][0]===u[0]&&n.mouse[0][1]===u[1]||(n.mouse[1]=r.invert(n.mouse[0]=u)),clearTimeout(n.wheel);else{if(r.k===s)return;n.mouse=[u,r.invert(u)],Cn(this),n.start()}lo(e),n.wheel=setTimeout(d,150),n.zoom("mouse",i(v(y(r,s),n.mouse[0],n.mouse[1]),n.extent,c))}function d(){n.wheel=null,n.end()}}function _(e,...t){if(!n&&o.apply(this,arguments)){var r=e.currentTarget,a=x(this,t,!0).event(e),s=He(e.view).on("mousemove.zoom",h,!0).on("mouseup.zoom",f,!0),l=Le(e,r),u=e.clientX,d=e.clientY;Ze(e.view),so(e),a.mouse=[l,this.__zoom.invert(l)],Cn(this),a.start()}function h(e){if(lo(e),!a.moved){var t=e.clientX-u,n=e.clientY-d;a.moved=t*t+n*n>g}a.event(e).zoom("mouse",i(v(a.that.__zoom,a.mouse[0]=Le(e,r),a.mouse[1]),a.extent,c))}function f(e){s.on("mousemove.zoom mouseup.zoom",null),Ke(e.view,a.moved),lo(e),a.event(e).end()}}function N(e,...t){if(o.apply(this,arguments)){var n=this.__zoom,a=Le(e.changedTouches?e.changedTouches[0]:e,this),s=n.invert(a),l=n.k*(e.shiftKey?.5:2),d=i(v(y(n,l),a,s),r.apply(this,t),c);lo(e),u>0?He(this).transition().duration(u).call(w,d,a,e):He(this).call(m.transform,d,a,e)}}function M(n,...r){if(o.apply(this,arguments)){var i,a,s,l,c=n.touches,u=c.length,d=x(this,r,n.changedTouches.length===u).event(n);for(so(n),a=0;a<u;++a)l=[l=Le(s=c[a],this),this.__zoom.invert(l),s.identifier],d.touch0?d.touch1||d.touch0[2]===l[2]||(d.touch1=l,d.taps=0):(d.touch0=l,i=!0,d.taps=1+!!e);e&&(e=clearTimeout(e)),i&&(d.taps<2&&(t=l[0],e=setTimeout((function(){e=null}),f)),Cn(this),d.start())}}function k(e,...t){if(this.__zooming){var n,o,r,a,s=x(this,t).event(e),l=e.changedTouches,u=l.length;for(lo(e),n=0;n<u;++n)r=Le(o=l[n],this),s.touch0&&s.touch0[2]===o.identifier?s.touch0[0]=r:s.touch1&&s.touch1[2]===o.identifier&&(s.touch1[0]=r);if(o=s.that.__zoom,s.touch1){var d=s.touch0[0],h=s.touch0[1],f=s.touch1[0],g=s.touch1[1],p=(p=f[0]-d[0])*p+(p=f[1]-d[1])*p,m=(m=g[0]-h[0])*m+(m=g[1]-h[1])*m;o=y(o,Math.sqrt(p/m)),r=[(d[0]+f[0])/2,(d[1]+f[1])/2],a=[(h[0]+g[0])/2,(h[1]+g[1])/2]}else{if(!s.touch0)return;r=s.touch0[0],a=s.touch0[1]}s.zoom("touch",i(v(o,r,a),s.extent,c))}}function P(e,...o){if(this.__zooming){var r,i,a=x(this,o).event(e),s=e.changedTouches,l=s.length;for(so(e),n&&clearTimeout(n),n=setTimeout((function(){n=null}),f),r=0;r<l;++r)i=s[r],a.touch0&&a.touch0[2]===i.identifier?delete a.touch0:a.touch1&&a.touch1[2]===i.identifier&&delete a.touch1;if(a.touch1&&!a.touch0&&(a.touch0=a.touch1,delete a.touch1),a.touch0)a.touch0[1]=this.__zoom.invert(a.touch0[0]);else if(a.end(),2===a.taps&&(i=Le(i,this),Math.hypot(t[0]-i[0],t[1]-i[1])<p)){var c=He(this).on("dblclick.zoom");c&&c.apply(this,arguments)}}}return m.transform=function(e,t,n,o){var r=e.selection?e.selection():e;r.property("__zoom",ho),e!==r?w(e,t,n,o):r.interrupt().each((function(){x(this,arguments).event(o).start().zoom(null,"function"==typeof t?t.apply(this,arguments):t).end()}))},m.scaleBy=function(e,t,n,o){m.scaleTo(e,(function(){var e=this.__zoom.k,n="function"==typeof t?t.apply(this,arguments):t;return e*n}),n,o)},m.scaleTo=function(e,t,n,o){m.transform(e,(function(){var e=r.apply(this,arguments),o=this.__zoom,a=null==n?b(e):"function"==typeof n?n.apply(this,arguments):n,s=o.invert(a),l="function"==typeof t?t.apply(this,arguments):t;return i(v(y(o,l),a,s),e,c)}),n,o)},m.translateBy=function(e,t,n,o){m.transform(e,(function(){return i(this.__zoom.translate("function"==typeof t?t.apply(this,arguments):t,"function"==typeof n?n.apply(this,arguments):n),r.apply(this,arguments),c)}),null,o)},m.translateTo=function(e,t,n,o,a){m.transform(e,(function(){var e=r.apply(this,arguments),a=this.__zoom,s=null==o?b(e):"function"==typeof o?o.apply(this,arguments):o;return i(ao.translate(s[0],s[1]).scale(a.k).translate("function"==typeof t?-t.apply(this,arguments):-t,"function"==typeof n?-n.apply(this,arguments):-n),e,c)}),o,a)},E.prototype={event:function(e){return e&&(this.sourceEvent=e),this},start:function(){return 1==++this.active&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(e,t){return this.mouse&&"mouse"!==e&&(this.mouse[1]=t.invert(this.mouse[0])),this.touch0&&"touch"!==e&&(this.touch0[1]=t.invert(this.touch0[0])),this.touch1&&"touch"!==e&&(this.touch1[1]=t.invert(this.touch1[0])),this.that.__zoom=t,this.emit("zoom"),this},end:function(){return 0==--this.active&&(delete this.that.__zooming,this.emit("end")),this},emit:function(e){var t=He(this.that).datum();h.call(e,this.that,new ro(e,{sourceEvent:this.sourceEvent,target:m,type:e,transform:this.that.__zoom,dispatch:h}),t)}},m.wheelDelta=function(e){return arguments.length?(a="function"==typeof e?e:oo(+e),m):a},m.filter=function(e){return arguments.length?(o="function"==typeof e?e:oo(!!e),m):o},m.touchable=function(e){return arguments.length?(s="function"==typeof e?e:oo(!!e),m):s},m.extent=function(e){return arguments.length?(r="function"==typeof e?e:oo([[+e[0][0],+e[0][1]],[+e[1][0],+e[1][1]]]),m):r},m.scaleExtent=function(e){return arguments.length?(l[0]=+e[0],l[1]=+e[1],m):[l[0],l[1]]},m.translateExtent=function(e){return arguments.length?(c[0][0]=+e[0][0],c[1][0]=+e[1][0],c[0][1]=+e[0][1],c[1][1]=+e[1][1],m):[[c[0][0],c[0][1]],[c[1][0],c[1][1]]]},m.constrain=function(e){return arguments.length?(i=e,m):i},m.duration=function(e){return arguments.length?(u=+e,m):u},m.interpolate=function(e){return arguments.length?(d=e,m):d},m.on=function(){var e=h.on.apply(h,arguments);return e===h?m:e},m.clickDistance=function(e){return arguments.length?(g=(e=+e)*e,m):Math.sqrt(g)},m.tapDistance=function(e){return arguments.length?(p=+e,m):p},m}io.prototype;const yo=t.createContext(null),vo=yo.Provider,bo=e=>`Node type "${e}" not found. Using fallback type "default".`,wo=()=>"The React Flow parent container needs a width and a height to render the graph.",So=()=>"Only child nodes can use a parent extent.",xo=e=>`Marker type "${e}" doesn't exist.`,Eo=(e,t)=>`Couldn't create edge for ${e?"target":"source"} handle id: "${e?t.targetHandle:t.sourceHandle}", edge id: ${t.id}.`,Co=()=>"Handle: No node id found. Make sure to only use a Handle inside a custom Node.",_o=e=>`Edge type "${e}" not found. Using fallback type "default".`,No=e=>`Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,Mo=(()=>"[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001")();function ko(e,n){const o=t.useContext(yo);if(null===o)throw new Error(Mo);return y(o,e,n)}const Po=()=>{const e=t.useContext(yo);if(null===e)throw new Error(Mo);return t.useMemo((()=>({getState:e.getState,setState:e.setState,subscribe:e.subscribe,destroy:e.destroy})),[e])},Ao=e=>e.userSelectionActive?"none":"all";function Oo({position:e,children:n,className:r,style:i,...a}){const s=ko(Ao),l=`${e}`.split("-");return t.createElement("div",{className:o(["react-flow__panel",r,...l]),style:{...i,pointerEvents:s},...a},n)}function Ro({proOptions:e,position:n="bottom-right"}){return e?.hideAttribution?null:t.createElement(Oo,{position:n,className:"react-flow__attribution","data-message":"Please only hide this attribution when you are subscribed to React Flow Pro: https://reactflow.dev/pro"},t.createElement("a",{href:"https://reactflow.dev",target:"_blank",rel:"noopener noreferrer","aria-label":"React Flow attribution"},"React Flow"))}var Io=t.memo((({x:e,y:n,label:r,labelStyle:i={},labelShowBg:a=!0,labelBgStyle:s={},labelBgPadding:l=[2,4],labelBgBorderRadius:c=2,children:u,className:d,...h})=>{const f=t.useRef(null),[g,p]=t.useState({x:0,y:0,width:0,height:0}),m=o(["react-flow__edge-textwrapper",d]);return t.useEffect((()=>{if(f.current){const e=f.current.getBBox();p({x:e.x,y:e.y,width:e.width,height:e.height})}}),[r]),void 0!==r&&r?t.createElement("g",{transform:`translate(${e-g.width/2} ${n-g.height/2})`,className:m,visibility:g.width?"visible":"hidden",...h},a&&t.createElement("rect",{width:g.width+2*l[0],x:-l[0],y:-l[1],height:g.height+2*l[1],className:"react-flow__edge-textbg",style:s,rx:c,ry:c}),t.createElement("text",{className:"react-flow__edge-text",y:g.height/2,dy:"0.3em",ref:f,style:i},r),u):null}));const zo=e=>({width:e.offsetWidth,height:e.offsetHeight}),Do=(e,t=0,n=1)=>Math.min(Math.max(e,t),n),Bo=(e={x:0,y:0},t)=>({x:Do(e.x,t[0][0],t[1][0]),y:Do(e.y,t[0][1],t[1][1])}),$o=(e,t,n)=>e<t?Do(Math.abs(e-t),1,50)/50:e>n?-Do(Math.abs(e-n),1,50)/50:0,To=(e,t)=>[20*$o(e.x,35,t.width-35),20*$o(e.y,35,t.height-35)],Vo=e=>e.getRootNode?.()||window?.document,Ho=(e,t)=>({x:Math.min(e.x,t.x),y:Math.min(e.y,t.y),x2:Math.max(e.x2,t.x2),y2:Math.max(e.y2,t.y2)}),Lo=({x:e,y:t,width:n,height:o})=>({x:e,y:t,x2:e+n,y2:t+o}),Xo=({x:e,y:t,x2:n,y2:o})=>({x:e,y:t,width:n-e,height:o-t}),Yo=e=>({...e.positionAbsolute||{x:0,y:0},width:e.width||0,height:e.height||0}),Fo=(e,t)=>Xo(Ho(Lo(e),Lo(t))),Wo=(e,t)=>{const n=Math.max(0,Math.min(e.x+e.width,t.x+t.width)-Math.max(e.x,t.x)),o=Math.max(0,Math.min(e.y+e.height,t.y+t.height)-Math.max(e.y,t.y));return Math.ceil(n*o)},Zo=e=>!isNaN(e)&&isFinite(e),Ko=Symbol.for("internals"),jo=["Enter"," ","Escape"];function qo(e){const t=((e=>"nativeEvent"in e)(e)?e.nativeEvent:e).composedPath?.()?.[0]||e.target;return["INPUT","SELECT","TEXTAREA"].includes(t?.nodeName)||t?.hasAttribute("contenteditable")||!!t?.closest(".nokey")}const Uo=e=>"clientX"in e,Go=(e,t)=>{const n=Uo(e),o=n?e.clientX:e.touches?.[0].clientX,r=n?e.clientY:e.touches?.[0].clientY;return{x:o-(t?.left??0),y:r-(t?.top??0)}},Qo=()=>"undefined"!=typeof navigator&&navigator?.userAgent?.indexOf("Mac")>=0,Jo=({id:e,path:n,labelX:o,labelY:r,label:i,labelStyle:a,labelShowBg:s,labelBgStyle:l,labelBgPadding:c,labelBgBorderRadius:u,style:d,markerEnd:h,markerStart:f,interactionWidth:g=20})=>t.createElement(t.Fragment,null,t.createElement("path",{id:e,style:d,d:n,fill:"none",className:"react-flow__edge-path",markerEnd:h,markerStart:f}),g&&t.createElement("path",{d:n,fill:"none",strokeOpacity:0,strokeWidth:g,className:"react-flow__edge-interaction"}),i&&Zo(o)&&Zo(r)?t.createElement(Io,{x:o,y:r,label:i,labelStyle:a,labelShowBg:s,labelBgStyle:l,labelBgPadding:c,labelBgBorderRadius:u}):null);Jo.displayName="BaseEdge";function er(e,t,n){return void 0===n?n:o=>{const r=t().edges.find((t=>t.id===e));r&&n(o,{...r})}}function tr({sourceX:e,sourceY:t,targetX:n,targetY:o}){const r=Math.abs(n-e)/2,i=n<e?n+r:n-r,a=Math.abs(o-t)/2;return[i,o<t?o+a:o-a,r,a]}function nr({sourceX:e,sourceY:t,targetX:n,targetY:o,sourceControlX:r,sourceControlY:i,targetControlX:a,targetControlY:s}){const l=.125*e+.375*r+.375*a+.125*n,c=.125*t+.375*i+.375*s+.125*o;return[l,c,Math.abs(l-e),Math.abs(c-t)]}var or,rr,ir,ar,sr,lr;function cr({pos:t,x1:n,y1:o,x2:r,y2:i}){return t===e.Position.Left||t===e.Position.Right?[.5*(n+r),o]:[n,.5*(o+i)]}function ur({sourceX:t,sourceY:n,sourcePosition:o=e.Position.Bottom,targetX:r,targetY:i,targetPosition:a=e.Position.Top}){const[s,l]=cr({pos:o,x1:t,y1:n,x2:r,y2:i}),[c,u]=cr({pos:a,x1:r,y1:i,x2:t,y2:n}),[d,h,f,g]=nr({sourceX:t,sourceY:n,targetX:r,targetY:i,sourceControlX:s,sourceControlY:l,targetControlX:c,targetControlY:u});return[`M${t},${n} C${s},${l} ${c},${u} ${r},${i}`,d,h,f,g]}e.ConnectionMode=void 0,(or=e.ConnectionMode||(e.ConnectionMode={})).Strict="strict",or.Loose="loose",e.PanOnScrollMode=void 0,(rr=e.PanOnScrollMode||(e.PanOnScrollMode={})).Free="free",rr.Vertical="vertical",rr.Horizontal="horizontal",e.SelectionMode=void 0,(ir=e.SelectionMode||(e.SelectionMode={})).Partial="partial",ir.Full="full",e.ConnectionLineType=void 0,(ar=e.ConnectionLineType||(e.ConnectionLineType={})).Bezier="default",ar.Straight="straight",ar.Step="step",ar.SmoothStep="smoothstep",ar.SimpleBezier="simplebezier",e.MarkerType=void 0,(sr=e.MarkerType||(e.MarkerType={})).Arrow="arrow",sr.ArrowClosed="arrowclosed",e.Position=void 0,(lr=e.Position||(e.Position={})).Left="left",lr.Top="top",lr.Right="right",lr.Bottom="bottom";const dr=t.memo((({sourceX:n,sourceY:o,targetX:r,targetY:i,sourcePosition:a=e.Position.Bottom,targetPosition:s=e.Position.Top,label:l,labelStyle:c,labelShowBg:u,labelBgStyle:d,labelBgPadding:h,labelBgBorderRadius:f,style:g,markerEnd:p,markerStart:m,interactionWidth:y})=>{const[v,b,w]=ur({sourceX:n,sourceY:o,sourcePosition:a,targetX:r,targetY:i,targetPosition:s});return t.createElement(Jo,{path:v,labelX:b,labelY:w,label:l,labelStyle:c,labelShowBg:u,labelBgStyle:d,labelBgPadding:h,labelBgBorderRadius:f,style:g,markerEnd:p,markerStart:m,interactionWidth:y})}));dr.displayName="SimpleBezierEdge";const hr={[e.Position.Left]:{x:-1,y:0},[e.Position.Right]:{x:1,y:0},[e.Position.Top]:{x:0,y:-1},[e.Position.Bottom]:{x:0,y:1}},fr=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2));function gr({source:t,sourcePosition:n=e.Position.Bottom,target:o,targetPosition:r=e.Position.Top,center:i,offset:a}){const s=hr[n],l=hr[r],c={x:t.x+s.x*a,y:t.y+s.y*a},u={x:o.x+l.x*a,y:o.y+l.y*a},d=(({source:t,sourcePosition:n=e.Position.Bottom,target:o})=>n===e.Position.Left||n===e.Position.Right?t.x<o.x?{x:1,y:0}:{x:-1,y:0}:t.y<o.y?{x:0,y:1}:{x:0,y:-1})({source:c,sourcePosition:n,target:u}),h=0!==d.x?"x":"y",f=d[h];let g,p,m=[];const y={x:0,y:0},v={x:0,y:0},[b,w,S,x]=tr({sourceX:t.x,sourceY:t.y,targetX:o.x,targetY:o.y});if(s[h]*l[h]==-1){g=i.x??b,p=i.y??w;const e=[{x:g,y:c.y},{x:g,y:u.y}],t=[{x:c.x,y:p},{x:u.x,y:p}];m=s[h]===f?"x"===h?e:t:"x"===h?t:e}else{const e=[{x:c.x,y:u.y}],i=[{x:u.x,y:c.y}];if(m="x"===h?s.x===f?i:e:s.y===f?e:i,n===r){const e=Math.abs(t[h]-o[h]);if(e<=a){const n=Math.min(a-1,a-e);s[h]===f?y[h]=(c[h]>t[h]?-1:1)*n:v[h]=(u[h]>o[h]?-1:1)*n}}if(n!==r){const t="x"===h?"y":"x",n=s[h]===l[t],o=c[t]>u[t],r=c[t]<u[t];(1===s[h]&&(!n&&o||n&&r)||1!==s[h]&&(!n&&r||n&&o))&&(m="x"===h?e:i)}const d={x:c.x+y.x,y:c.y+y.y},b={x:u.x+v.x,y:u.y+v.y};Math.max(Math.abs(d.x-m[0].x),Math.abs(b.x-m[0].x))>=Math.max(Math.abs(d.y-m[0].y),Math.abs(b.y-m[0].y))?(g=(d.x+b.x)/2,p=m[0].y):(g=m[0].x,p=(d.y+b.y)/2)}return[[t,{x:c.x+y.x,y:c.y+y.y},...m,{x:u.x+v.x,y:u.y+v.y},o],g,p,S,x]}function pr({sourceX:t,sourceY:n,sourcePosition:o=e.Position.Bottom,targetX:r,targetY:i,targetPosition:a=e.Position.Top,borderRadius:s=5,centerX:l,centerY:c,offset:u=20}){const[d,h,f,g,p]=gr({source:{x:t,y:n},sourcePosition:o,target:{x:r,y:i},targetPosition:a,center:{x:l,y:c},offset:u});return[d.reduce(((e,t,n)=>{let o="";return o=n>0&&n<d.length-1?function(e,t,n,o){const r=Math.min(fr(e,t)/2,fr(t,n)/2,o),{x:i,y:a}=t;if(e.x===i&&i===n.x||e.y===a&&a===n.y)return`L${i} ${a}`;if(e.y===a)return`L ${i+r*(e.x<n.x?-1:1)},${a}Q ${i},${a} ${i},${a+r*(e.y<n.y?1:-1)}`;const s=e.x<n.x?1:-1;return`L ${i},${a+r*(e.y<n.y?-1:1)}Q ${i},${a} ${i+r*s},${a}`}(d[n-1],t,d[n+1],s):`${0===n?"M":"L"}${t.x} ${t.y}`,e+=o}),""),h,f,g,p]}const mr=t.memo((({sourceX:n,sourceY:o,targetX:r,targetY:i,label:a,labelStyle:s,labelShowBg:l,labelBgStyle:c,labelBgPadding:u,labelBgBorderRadius:d,style:h,sourcePosition:f=e.Position.Bottom,targetPosition:g=e.Position.Top,markerEnd:p,markerStart:m,pathOptions:y,interactionWidth:v})=>{const[b,w,S]=pr({sourceX:n,sourceY:o,sourcePosition:f,targetX:r,targetY:i,targetPosition:g,borderRadius:y?.borderRadius,offset:y?.offset});return t.createElement(Jo,{path:b,labelX:w,labelY:S,label:a,labelStyle:s,labelShowBg:l,labelBgStyle:c,labelBgPadding:u,labelBgBorderRadius:d,style:h,markerEnd:p,markerStart:m,interactionWidth:v})}));mr.displayName="SmoothStepEdge";const yr=t.memo((e=>t.createElement(mr,{...e,pathOptions:t.useMemo((()=>({borderRadius:0,offset:e.pathOptions?.offset})),[e.pathOptions?.offset])})));function vr({sourceX:e,sourceY:t,targetX:n,targetY:o}){const[r,i,a,s]=tr({sourceX:e,sourceY:t,targetX:n,targetY:o});return[`M ${e},${t}L ${n},${o}`,r,i,a,s]}yr.displayName="StepEdge";const br=t.memo((({sourceX:e,sourceY:n,targetX:o,targetY:r,label:i,labelStyle:a,labelShowBg:s,labelBgStyle:l,labelBgPadding:c,labelBgBorderRadius:u,style:d,markerEnd:h,markerStart:f,interactionWidth:g})=>{const[p,m,y]=vr({sourceX:e,sourceY:n,targetX:o,targetY:r});return t.createElement(Jo,{path:p,labelX:m,labelY:y,label:i,labelStyle:a,labelShowBg:s,labelBgStyle:l,labelBgPadding:c,labelBgBorderRadius:u,style:d,markerEnd:h,markerStart:f,interactionWidth:g})}));function wr(e,t){return e>=0?.5*e:25*t*Math.sqrt(-e)}function Sr({pos:t,x1:n,y1:o,x2:r,y2:i,c:a}){switch(t){case e.Position.Left:return[n-wr(n-r,a),o];case e.Position.Right:return[n+wr(r-n,a),o];case e.Position.Top:return[n,o-wr(o-i,a)];case e.Position.Bottom:return[n,o+wr(i-o,a)]}}function xr({sourceX:t,sourceY:n,sourcePosition:o=e.Position.Bottom,targetX:r,targetY:i,targetPosition:a=e.Position.Top,curvature:s=.25}){const[l,c]=Sr({pos:o,x1:t,y1:n,x2:r,y2:i,c:s}),[u,d]=Sr({pos:a,x1:r,y1:i,x2:t,y2:n,c:s}),[h,f,g,p]=nr({sourceX:t,sourceY:n,targetX:r,targetY:i,sourceControlX:l,sourceControlY:c,targetControlX:u,targetControlY:d});return[`M${t},${n} C${l},${c} ${u},${d} ${r},${i}`,h,f,g,p]}br.displayName="StraightEdge";const Er=t.memo((({sourceX:n,sourceY:o,targetX:r,targetY:i,sourcePosition:a=e.Position.Bottom,targetPosition:s=e.Position.Top,label:l,labelStyle:c,labelShowBg:u,labelBgStyle:d,labelBgPadding:h,labelBgBorderRadius:f,style:g,markerEnd:p,markerStart:m,pathOptions:y,interactionWidth:v})=>{const[b,w,S]=xr({sourceX:n,sourceY:o,sourcePosition:a,targetX:r,targetY:i,targetPosition:s,curvature:y?.curvature});return t.createElement(Jo,{path:b,labelX:w,labelY:S,label:l,labelStyle:c,labelShowBg:u,labelBgStyle:d,labelBgPadding:h,labelBgBorderRadius:f,style:g,markerEnd:p,markerStart:m,interactionWidth:v})}));Er.displayName="BezierEdge";const Cr=t.createContext(null),_r=Cr.Provider;Cr.Consumer;const Nr=()=>t.useContext(Cr),Mr=e=>"id"in e&&"source"in e&&"target"in e,kr=e=>"id"in e&&!("source"in e)&&!("target"in e),Pr=({source:e,sourceHandle:t,target:n,targetHandle:o})=>`reactflow__edge-${e}${t||""}-${n}${o||""}`,Ar=(e,t)=>{if(void 0===e)return"";if("string"==typeof e)return e;return`${t?`${t}__`:""}${Object.keys(e).sort().map((t=>`${t}=${e[t]}`)).join("&")}`},Or=(e,t)=>{if(!e.source||!e.target)return t;let n;return n=Mr(e)?{...e}:{...e,id:Pr(e)},((e,t)=>t.some((t=>!(t.source!==e.source||t.target!==e.target||t.sourceHandle!==e.sourceHandle&&(t.sourceHandle||e.sourceHandle)||t.targetHandle!==e.targetHandle&&(t.targetHandle||e.targetHandle)))))(n,t)?t:t.concat(n)},Rr=(e,t,n,o={shouldReplaceId:!0})=>{const{id:r,...i}=e;if(!t.source||!t.target)return n;if(!n.find((e=>e.id===r)))return n;const a={...i,id:o.shouldReplaceId?Pr(t):r,source:t.source,target:t.target,sourceHandle:t.sourceHandle,targetHandle:t.targetHandle};return n.filter((e=>e.id!==r)).concat(a)},Ir=({x:e,y:t},[n,o,r],i,[a,s])=>{const l={x:(e-n)/r,y:(t-o)/r};return i?{x:a*Math.round(l.x/a),y:s*Math.round(l.y/s)}:l},zr=({x:e,y:t},[n,o,r])=>({x:e*r+n,y:t*r+o}),Dr=(e,t=[0,0])=>{if(!e)return{x:0,y:0,positionAbsolute:{x:0,y:0}};const n=(e.width??0)*t[0],o=(e.height??0)*t[1],r={x:e.position.x-n,y:e.position.y-o};return{...r,positionAbsolute:e.positionAbsolute?{x:e.positionAbsolute.x-n,y:e.positionAbsolute.y-o}:r}},Br=(e,t=[0,0])=>{if(0===e.length)return{x:0,y:0,width:0,height:0};const n=e.reduce(((e,n)=>{const{x:o,y:r}=Dr(n,t).positionAbsolute;return Ho(e,Lo({x:o,y:r,width:n.width||0,height:n.height||0}))}),{x:1/0,y:1/0,x2:-1/0,y2:-1/0});return Xo(n)},$r=(e,t,[n,o,r]=[0,0,1],i=!1,a=!1,s=[0,0])=>{const l={x:(t.x-n)/r,y:(t.y-o)/r,width:t.width/r,height:t.height/r},c=[];return e.forEach((e=>{const{width:t,height:n,selectable:o=!0,hidden:r=!1}=e;if(a&&!o||r)return!1;const{positionAbsolute:u}=Dr(e,s),d={x:u.x,y:u.y,width:t||0,height:n||0},h=Wo(l,d);(void 0===t||void 0===n||null===t||null===n||i&&h>0||h>=(t||0)*(n||0)||e.dragging)&&c.push(e)})),c},Tr=(e,t)=>{const n=e.map((e=>e.id));return t.filter((e=>n.includes(e.source)||n.includes(e.target)))},Vr=(e,t,n,o,r,i=.1)=>{const a=t/(e.width*(1+i)),s=n/(e.height*(1+i)),l=Math.min(a,s),c=Do(l,o,r);return{x:t/2-(e.x+e.width/2)*c,y:n/2-(e.y+e.height/2)*c,zoom:c}},Hr=(e,t=0)=>e.transition().duration(t);function Lr(e,t,n,o){return(t[n]||[]).reduce(((t,r)=>(`${e.id}-${r.id}-${n}`!==o&&t.push({id:r.id||null,type:n,nodeId:e.id,x:(e.positionAbsolute?.x??0)+r.x+r.width/2,y:(e.positionAbsolute?.y??0)+r.y+r.height/2}),t)),[])}const Xr={source:null,target:null,sourceHandle:null,targetHandle:null},Yr=()=>({handleDomNode:null,isValid:!1,connection:Xr,endHandle:null});function Fr(t,n,o,r,i,a,s){const l="target"===i,c=s.querySelector(`.react-flow__handle[data-id="${t?.nodeId}-${t?.id}-${t?.type}"]`),u={...Yr(),handleDomNode:c};if(c){const t=Wr(void 0,c),i=c.getAttribute("data-nodeid"),s=c.getAttribute("data-handleid"),d=c.classList.contains("connectable"),h=c.classList.contains("connectableend"),f={source:l?i:o,sourceHandle:l?s:r,target:l?o:i,targetHandle:l?r:s};u.connection=f;d&&h&&(n===e.ConnectionMode.Strict?l&&"source"===t||!l&&"target"===t:i!==o||s!==r)&&(u.endHandle={nodeId:i,handleId:s,type:t},u.isValid=a(f))}return u}function Wr(e,t){return e||(t?.classList.contains("target")?"target":t?.classList.contains("source")?"source":null)}function Zr(e){e?.classList.remove("valid","connecting","react-flow__handle-valid","react-flow__handle-connecting")}function Kr(e,t){let n=null;return t?n="valid":e&&!t&&(n="invalid"),n}function jr({event:e,handleId:t,nodeId:n,onConnect:o,isTarget:r,getState:i,setState:a,isValidConnection:s,edgeUpdaterType:l,onReconnectEnd:c}){const u=Vo(e.target),{connectionMode:d,domNode:h,autoPanOnConnect:f,connectionRadius:g,onConnectStart:p,panBy:m,getNodes:y,cancelConnection:v}=i();let b,w=0;const{x:S,y:x}=Go(e),E=u?.elementFromPoint(S,x),C=Wr(l,E),_=h?.getBoundingClientRect();if(!_||!C)return;let N,M=Go(e,_),k=!1,P=null,A=!1,O=null;const R=function({nodes:e,nodeId:t,handleId:n,handleType:o}){return e.reduce(((e,r)=>{if(r[Ko]){const{handleBounds:i}=r[Ko];let a=[],s=[];i&&(a=Lr(r,i,"source",`${t}-${n}-${o}`),s=Lr(r,i,"target",`${t}-${n}-${o}`)),e.push(...a,...s)}return e}),[])}({nodes:y(),nodeId:n,handleId:t,handleType:C}),I=()=>{if(!f)return;const[e,t]=To(M,_);m({x:e,y:t}),w=requestAnimationFrame(I)};function z(e){const{transform:o}=i();M=Go(e,_);const{handle:l,validHandleResult:c}=function(e,t,n,o,r,i){const{x:a,y:s}=Go(e),l=t.elementsFromPoint(a,s).find((e=>e.classList.contains("react-flow__handle")));if(l){const e=l.getAttribute("data-nodeid");if(e){const t=Wr(void 0,l),o=l.getAttribute("data-handleid"),a=i({nodeId:e,id:o,type:t});if(a){const i=r.find((n=>n.nodeId===e&&n.type===t&&n.id===o));return{handle:{id:o,type:t,nodeId:e,x:i?.x||n.x,y:i?.y||n.y},validHandleResult:a}}}}let c=[],u=1/0;if(r.forEach((e=>{const t=Math.sqrt((e.x-n.x)**2+(e.y-n.y)**2);if(t<=o){const n=i(e);t<=u&&(t<u?c=[{handle:e,validHandleResult:n}]:t===u&&c.push({handle:e,validHandleResult:n}),u=t)}})),!c.length)return{handle:null,validHandleResult:Yr()};if(1===c.length)return c[0];const d=c.some((({validHandleResult:e})=>e.isValid)),h=c.some((({handle:e})=>"target"===e.type));return c.find((({handle:e,validHandleResult:t})=>h?"target"===e.type:!d||t.isValid))||c[0]}(e,u,Ir(M,o,!1,[1,1]),g,R,(e=>Fr(e,d,n,t,r?"target":"source",s,u)));if(b=l,k||(I(),k=!0),O=c.handleDomNode,P=c.connection,A=c.isValid,a({connectionPosition:b&&A?zr({x:b.x,y:b.y},o):M,connectionStatus:Kr(!!b,A),connectionEndHandle:c.endHandle}),!b&&!A&&!O)return Zr(N);P.source!==P.target&&O&&(Zr(N),N=O,O.classList.add("connecting","react-flow__handle-connecting"),O.classList.toggle("valid",A),O.classList.toggle("react-flow__handle-valid",A))}function D(e){(b||O)&&P&&A&&o?.(P),i().onConnectEnd?.(e),l&&c?.(e),Zr(N),v(),cancelAnimationFrame(w),k=!1,A=!1,P=null,O=null,u.removeEventListener("mousemove",z),u.removeEventListener("mouseup",D),u.removeEventListener("touchmove",z),u.removeEventListener("touchend",D)}a({connectionPosition:M,connectionStatus:null,connectionNodeId:n,connectionHandleId:t,connectionHandleType:C,connectionStartHandle:{nodeId:n,handleId:t,type:C},connectionEndHandle:null}),p?.(e,{nodeId:n,handleId:t,handleType:C}),u.addEventListener("mousemove",z),u.addEventListener("mouseup",D),u.addEventListener("touchmove",z),u.addEventListener("touchend",D)}const qr=()=>!0,Ur=e=>({connectionStartHandle:e.connectionStartHandle,connectOnClick:e.connectOnClick,noPanClassName:e.noPanClassName}),Gr=t.forwardRef((({type:n="source",position:r=e.Position.Top,isValidConnection:i,isConnectable:a=!0,isConnectableStart:s=!0,isConnectableEnd:l=!0,id:c,onConnect:u,children:d,className:h,onMouseDown:f,onTouchStart:g,...p},m)=>{const y=c||null,v="target"===n,w=Po(),S=Nr(),{connectOnClick:x,noPanClassName:E}=ko(Ur,b),{connecting:C,clickConnecting:_}=ko(((e,t,n)=>o=>{const{connectionStartHandle:r,connectionEndHandle:i,connectionClickStartHandle:a}=o;return{connecting:r?.nodeId===e&&r?.handleId===t&&r?.type===n||i?.nodeId===e&&i?.handleId===t&&i?.type===n,clickConnecting:a?.nodeId===e&&a?.handleId===t&&a?.type===n}})(S,y,n),b);S||w.getState().onError?.("010",Co());const N=e=>{const{defaultEdgeOptions:t,onConnect:n,hasDefaultEdges:o}=w.getState(),r={...t,...e};if(o){const{edges:e,setEdges:t}=w.getState();t(Or(r,e))}n?.(r),u?.(r)},M=e=>{if(!S)return;const t=Uo(e);s&&(t&&0===e.button||!t)&&jr({event:e,handleId:y,nodeId:S,onConnect:N,isTarget:v,getState:w.getState,setState:w.setState,isValidConnection:i||w.getState().isValidConnection||qr}),t?f?.(e):g?.(e)};return t.createElement("div",{"data-handleid":y,"data-nodeid":S,"data-handlepos":r,"data-id":`${S}-${y}-${n}`,className:o(["react-flow__handle",`react-flow__handle-${r}`,"nodrag",E,h,{source:!v,target:v,connectable:a,connectablestart:s,connectableend:l,connecting:_,connectionindicator:a&&(s&&!C||l&&C)}]),onMouseDown:M,onTouchStart:M,onClick:x?e=>{const{onClickConnectStart:t,onClickConnectEnd:o,connectionClickStartHandle:r,connectionMode:a,isValidConnection:l}=w.getState();if(!S||!r&&!s)return;if(!r)return t?.(e,{nodeId:S,handleId:y,handleType:n}),void w.setState({connectionClickStartHandle:{nodeId:S,type:n,handleId:y}});const c=Vo(e.target),u=i||l||qr,{connection:d,isValid:h}=Fr({nodeId:S,id:y,type:n},a,r.nodeId,r.handleId||null,r.type,u,c);h&&N(d),o?.(e),w.setState({connectionClickStartHandle:null})}:void 0,ref:m,...p},d)}));Gr.displayName="Handle";var Qr=t.memo(Gr);const Jr=({data:n,isConnectable:o,targetPosition:r=e.Position.Top,sourcePosition:i=e.Position.Bottom})=>t.createElement(t.Fragment,null,t.createElement(Qr,{type:"target",position:r,isConnectable:o}),n?.label,t.createElement(Qr,{type:"source",position:i,isConnectable:o}));Jr.displayName="DefaultNode";var ei=t.memo(Jr);const ti=({data:n,isConnectable:o,sourcePosition:r=e.Position.Bottom})=>t.createElement(t.Fragment,null,n?.label,t.createElement(Qr,{type:"source",position:r,isConnectable:o}));ti.displayName="InputNode";var ni=t.memo(ti);const oi=({data:n,isConnectable:o,targetPosition:r=e.Position.Top})=>t.createElement(t.Fragment,null,t.createElement(Qr,{type:"target",position:r,isConnectable:o}),n?.label);oi.displayName="OutputNode";var ri=t.memo(oi);const ii=()=>null;ii.displayName="GroupNode";const ai=e=>({selectedNodes:e.getNodes().filter((e=>e.selected)),selectedEdges:e.edges.filter((e=>e.selected)).map((e=>({...e})))}),si=e=>e.id;function li(e,t){return b(e.selectedNodes.map(si),t.selectedNodes.map(si))&&b(e.selectedEdges.map(si),t.selectedEdges.map(si))}const ci=t.memo((({onSelectionChange:e})=>{const n=Po(),{selectedNodes:o,selectedEdges:r}=ko(ai,li);return t.useEffect((()=>{const t={nodes:o,edges:r};e?.(t),n.getState().onSelectionChange.forEach((e=>e(t)))}),[o,r,e]),null}));ci.displayName="SelectionListener";const ui=e=>!!e.onSelectionChange;function di({onSelectionChange:e}){const n=ko(ui);return e||n?t.createElement(ci,{onSelectionChange:e}):null}const hi=e=>({setNodes:e.setNodes,setEdges:e.setEdges,setDefaultNodesAndEdges:e.setDefaultNodesAndEdges,setMinZoom:e.setMinZoom,setMaxZoom:e.setMaxZoom,setTranslateExtent:e.setTranslateExtent,setNodeExtent:e.setNodeExtent,reset:e.reset});function fi(e,n){t.useEffect((()=>{void 0!==e&&n(e)}),[e])}function gi(e,n,o){t.useEffect((()=>{void 0!==n&&o({[e]:n})}),[n])}const pi=({nodes:e,edges:n,defaultNodes:o,defaultEdges:r,onConnect:i,onConnectStart:a,onConnectEnd:s,onClickConnectStart:l,onClickConnectEnd:c,nodesDraggable:u,nodesConnectable:d,nodesFocusable:h,edgesFocusable:f,edgesUpdatable:g,elevateNodesOnSelect:p,minZoom:m,maxZoom:y,nodeExtent:v,onNodesChange:w,onEdgesChange:S,elementsSelectable:x,connectionMode:E,snapGrid:C,snapToGrid:_,translateExtent:N,connectOnClick:M,defaultEdgeOptions:k,fitView:P,fitViewOptions:A,onNodesDelete:O,onEdgesDelete:R,onNodeDrag:I,onNodeDragStart:z,onNodeDragStop:D,onSelectionDrag:B,onSelectionDragStart:$,onSelectionDragStop:T,noPanClassName:V,nodeOrigin:H,rfId:L,autoPanOnConnect:X,autoPanOnNodeDrag:Y,onError:F,connectionRadius:W,isValidConnection:Z,nodeDragThreshold:K})=>{const{setNodes:j,setEdges:q,setDefaultNodesAndEdges:U,setMinZoom:G,setMaxZoom:Q,setTranslateExtent:J,setNodeExtent:ee,reset:te}=ko(hi,b),ne=Po();return t.useEffect((()=>{const e=r?.map((e=>({...e,...k})));return U(o,e),()=>{te()}}),[]),gi("defaultEdgeOptions",k,ne.setState),gi("connectionMode",E,ne.setState),gi("onConnect",i,ne.setState),gi("onConnectStart",a,ne.setState),gi("onConnectEnd",s,ne.setState),gi("onClickConnectStart",l,ne.setState),gi("onClickConnectEnd",c,ne.setState),gi("nodesDraggable",u,ne.setState),gi("nodesConnectable",d,ne.setState),gi("nodesFocusable",h,ne.setState),gi("edgesFocusable",f,ne.setState),gi("edgesUpdatable",g,ne.setState),gi("elementsSelectable",x,ne.setState),gi("elevateNodesOnSelect",p,ne.setState),gi("snapToGrid",_,ne.setState),gi("snapGrid",C,ne.setState),gi("onNodesChange",w,ne.setState),gi("onEdgesChange",S,ne.setState),gi("connectOnClick",M,ne.setState),gi("fitViewOnInit",P,ne.setState),gi("fitViewOnInitOptions",A,ne.setState),gi("onNodesDelete",O,ne.setState),gi("onEdgesDelete",R,ne.setState),gi("onNodeDrag",I,ne.setState),gi("onNodeDragStart",z,ne.setState),gi("onNodeDragStop",D,ne.setState),gi("onSelectionDrag",B,ne.setState),gi("onSelectionDragStart",$,ne.setState),gi("onSelectionDragStop",T,ne.setState),gi("noPanClassName",V,ne.setState),gi("nodeOrigin",H,ne.setState),gi("rfId",L,ne.setState),gi("autoPanOnConnect",X,ne.setState),gi("autoPanOnNodeDrag",Y,ne.setState),gi("onError",F,ne.setState),gi("connectionRadius",W,ne.setState),gi("isValidConnection",Z,ne.setState),gi("nodeDragThreshold",K,ne.setState),fi(e,j),fi(n,q),fi(m,G),fi(y,Q),fi(N,J),fi(v,ee),null},mi={display:"none"},yi={position:"absolute",width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0px, 0px, 0px, 0px)",clipPath:"inset(100%)"},vi="react-flow__node-desc",bi="react-flow__edge-desc",wi=e=>e.ariaLiveMessage;function Si({rfId:e}){const n=ko(wi);return t.createElement("div",{id:`react-flow__aria-live-${e}`,"aria-live":"assertive","aria-atomic":"true",style:yi},n)}function xi({rfId:e,disableKeyboardA11y:n}){return t.createElement(t.Fragment,null,t.createElement("div",{id:`${vi}-${e}`,style:mi},"Press enter or space to select a node.",!n&&"You can then use the arrow keys to move the node around."," Press delete to remove it and escape to cancel."," "),t.createElement("div",{id:`${bi}-${e}`,style:mi},"Press enter or space to select an edge. You can then press delete to remove it or escape to cancel."),!n&&t.createElement(Si,{rfId:e}))}var Ei=(e=null,n={actInsideInputWithModifier:!0})=>{const[o,r]=t.useState(!1),i=t.useRef(!1),a=t.useRef(new Set([])),[s,l]=t.useMemo((()=>{if(null!==e){const t=(Array.isArray(e)?e:[e]).filter((e=>"string"==typeof e)).map((e=>e.split("+"))),n=t.reduce(((e,t)=>e.concat(...t)),[]);return[t,n]}return[[],[]]}),[e]);return t.useEffect((()=>{const t="undefined"!=typeof document?document:null,o=n?.target||t;if(null!==e){const e=e=>{i.current=e.ctrlKey||e.metaKey||e.shiftKey;if((!i.current||i.current&&!n.actInsideInputWithModifier)&&qo(e))return!1;const t=_i(e.code,l);a.current.add(e[t]),Ci(s,a.current,!1)&&(e.preventDefault(),r(!0))},t=e=>{if((!i.current||i.current&&!n.actInsideInputWithModifier)&&qo(e))return!1;const t=_i(e.code,l);Ci(s,a.current,!0)?(r(!1),a.current.clear()):a.current.delete(e[t]),"Meta"===e.key&&a.current.clear(),i.current=!1},c=()=>{a.current.clear(),r(!1)};return o?.addEventListener("keydown",e),o?.addEventListener("keyup",t),window.addEventListener("blur",c),()=>{o?.removeEventListener("keydown",e),o?.removeEventListener("keyup",t),window.removeEventListener("blur",c)}}}),[e,r]),o};function Ci(e,t,n){return e.filter((e=>n||e.length===t.size)).some((e=>e.every((e=>t.has(e)))))}function _i(e,t){return t.includes(e)?"code":"key"}function Ni(e,t,n,o){const r=e.parentNode||e.parentId;if(!r)return n;const i=t.get(r),a=Dr(i,o);return Ni(i,t,{x:(n.x??0)+a.x,y:(n.y??0)+a.y,z:(i[Ko]?.z??0)>(n.z??0)?i[Ko]?.z??0:n.z??0},o)}function Mi(e,t,n){e.forEach((o=>{const r=o.parentNode||o.parentId;if(r&&!e.has(r))throw new Error(`Parent node ${r} not found`);if(r||n?.[o.id]){const{x:r,y:i,z:a}=Ni(o,e,{...o.position,z:o[Ko]?.z??0},t);o.positionAbsolute={x:r,y:i},o[Ko].z=a,n?.[o.id]&&(o[Ko].isParent=!0)}}))}function ki(e,t,n,o){const r=new Map,i={},a=o?1e3:0;return e.forEach((e=>{const n=(Zo(e.zIndex)?e.zIndex:0)+(e.selected?a:0),o=t.get(e.id),s={...e,positionAbsolute:{x:e.position.x,y:e.position.y}},l=e.parentNode||e.parentId;l&&(i[l]=!0);const c=o?.type&&o?.type!==e.type;Object.defineProperty(s,Ko,{enumerable:!1,value:{handleBounds:c?void 0:o?.[Ko]?.handleBounds,z:n}}),r.set(e.id,s)})),Mi(r,n,i),r}function Pi(e,t={}){const{getNodes:n,width:o,height:r,minZoom:i,maxZoom:a,d3Zoom:s,d3Selection:l,fitViewOnInitDone:c,fitViewOnInit:u,nodeOrigin:d}=e(),h=t.initial&&!c&&u;if(s&&l&&(h||!t.initial)){const e=n().filter((e=>{const n=t.includeHiddenNodes?e.width&&e.height:!e.hidden;return t.nodes?.length?n&&t.nodes.some((t=>t.id===e.id)):n})),c=e.every((e=>e.width&&e.height));if(e.length>0&&c){const n=Br(e,d),{x:c,y:u,zoom:h}=Vr(n,o,r,t.minZoom??i,t.maxZoom??a,t.padding??.1),f=ao.translate(c,u).scale(h);return"number"==typeof t.duration&&t.duration>0?s.transform(Hr(l,t.duration),f):s.transform(l,f),!0}}return!1}function Ai(e,t){return e.forEach((e=>{const n=t.get(e.id);n&&t.set(n.id,{...n,[Ko]:n[Ko],selected:e.selected})})),new Map(t)}function Oi(e,t){return t.map((t=>{const n=e.find((e=>e.id===t.id));return n&&(t.selected=n.selected),t}))}function Ri({changedNodes:e,changedEdges:t,get:n,set:o}){const{nodeInternals:r,edges:i,onNodesChange:a,onEdgesChange:s,hasDefaultNodes:l,hasDefaultEdges:c}=n();e?.length&&(l&&o({nodeInternals:Ai(e,r)}),a?.(e)),t?.length&&(c&&o({edges:Oi(t,i)}),s?.(t))}const Ii=()=>{},zi={zoomIn:Ii,zoomOut:Ii,zoomTo:Ii,getZoom:()=>1,setViewport:Ii,getViewport:()=>({x:0,y:0,zoom:1}),fitView:()=>!1,setCenter:Ii,fitBounds:Ii,project:e=>e,screenToFlowPosition:e=>e,flowToScreenPosition:e=>e,viewportInitialized:!1},Di=e=>({d3Zoom:e.d3Zoom,d3Selection:e.d3Selection});function Bi(){const e=(()=>{const e=Po(),{d3Zoom:n,d3Selection:o}=ko(Di,b),r=t.useMemo((()=>o&&n?{zoomIn:e=>n.scaleBy(Hr(o,e?.duration),1.2),zoomOut:e=>n.scaleBy(Hr(o,e?.duration),1/1.2),zoomTo:(e,t)=>n.scaleTo(Hr(o,t?.duration),e),getZoom:()=>e.getState().transform[2],setViewport:(t,r)=>{const[i,a,s]=e.getState().transform,l=ao.translate(t.x??i,t.y??a).scale(t.zoom??s);n.transform(Hr(o,r?.duration),l)},getViewport:()=>{const[t,n,o]=e.getState().transform;return{x:t,y:n,zoom:o}},fitView:t=>Pi(e.getState,t),setCenter:(t,r,i)=>{const{width:a,height:s,maxZoom:l}=e.getState(),c=void 0!==i?.zoom?i.zoom:l,u=a/2-t*c,d=s/2-r*c,h=ao.translate(u,d).scale(c);n.transform(Hr(o,i?.duration),h)},fitBounds:(t,r)=>{const{width:i,height:a,minZoom:s,maxZoom:l}=e.getState(),{x:c,y:u,zoom:d}=Vr(t,i,a,s,l,r?.padding??.1),h=ao.translate(c,u).scale(d);n.transform(Hr(o,r?.duration),h)},project:t=>{const{transform:n,snapToGrid:o,snapGrid:r}=e.getState();return console.warn("[DEPRECATED] `project` is deprecated. Instead use `screenToFlowPosition`. There is no need to subtract the react flow bounds anymore! https://reactflow.dev/api-reference/types/react-flow-instance#screen-to-flow-position"),Ir(t,n,o,r)},screenToFlowPosition:t=>{const{transform:n,snapToGrid:o,snapGrid:r,domNode:i}=e.getState();if(!i)return t;const{x:a,y:s}=i.getBoundingClientRect(),l={x:t.x-a,y:t.y-s};return Ir(l,n,o,r)},flowToScreenPosition:t=>{const{transform:n,domNode:o}=e.getState();if(!o)return t;const{x:r,y:i}=o.getBoundingClientRect(),a=zr(t,n);return{x:a.x+r,y:a.y+i}},viewportInitialized:!0}:zi),[n,o]);return r})(),n=Po(),o=t.useCallback((()=>n.getState().getNodes().map((e=>({...e})))),[]),r=t.useCallback((e=>n.getState().nodeInternals.get(e)),[]),i=t.useCallback((()=>{const{edges:e=[]}=n.getState();return e.map((e=>({...e})))}),[]),a=t.useCallback((e=>{const{edges:t=[]}=n.getState();return t.find((t=>t.id===e))}),[]),s=t.useCallback((e=>{const{getNodes:t,setNodes:o,hasDefaultNodes:r,onNodesChange:i}=n.getState(),a=t(),s="function"==typeof e?e(a):e;if(r)o(s);else if(i){i(0===s.length?a.map((e=>({type:"remove",id:e.id}))):s.map((e=>({item:e,type:"reset"}))))}}),[]),l=t.useCallback((e=>{const{edges:t=[],setEdges:o,hasDefaultEdges:r,onEdgesChange:i}=n.getState(),a="function"==typeof e?e(t):e;if(r)o(a);else if(i){i(0===a.length?t.map((e=>({type:"remove",id:e.id}))):a.map((e=>({item:e,type:"reset"}))))}}),[]),c=t.useCallback((e=>{const t=Array.isArray(e)?e:[e],{getNodes:o,setNodes:r,hasDefaultNodes:i,onNodesChange:a}=n.getState();if(i){r([...o(),...t])}else if(a){a(t.map((e=>({item:e,type:"add"}))))}}),[]),u=t.useCallback((e=>{const t=Array.isArray(e)?e:[e],{edges:o=[],setEdges:r,hasDefaultEdges:i,onEdgesChange:a}=n.getState();if(i)r([...o,...t]);else if(a){a(t.map((e=>({item:e,type:"add"}))))}}),[]),d=t.useCallback((()=>{const{getNodes:e,edges:t=[],transform:o}=n.getState(),[r,i,a]=o;return{nodes:e().map((e=>({...e}))),edges:t.map((e=>({...e}))),viewport:{x:r,y:i,zoom:a}}}),[]),h=t.useCallback((({nodes:e,edges:t})=>{const{nodeInternals:o,getNodes:r,edges:i,hasDefaultNodes:a,hasDefaultEdges:s,onNodesDelete:l,onEdgesDelete:c,onNodesChange:u,onEdgesChange:d}=n.getState(),h=(e||[]).map((e=>e.id)),f=(t||[]).map((e=>e.id)),g=r().reduce(((e,t)=>{const n=t.parentNode||t.parentId,o=!h.includes(t.id)&&n&&e.find((e=>e.id===n));return("boolean"!=typeof t.deletable||t.deletable)&&(h.includes(t.id)||o)&&e.push(t),e}),[]),p=i.filter((e=>"boolean"!=typeof e.deletable||e.deletable)),m=p.filter((e=>f.includes(e.id)));if(g||m){const e=Tr(g,p),t=[...m,...e],r=t.reduce(((e,t)=>(e.includes(t.id)||e.push(t.id),e)),[]);if((s||a)&&(s&&n.setState({edges:i.filter((e=>!r.includes(e.id)))}),a&&(g.forEach((e=>{o.delete(e.id)})),n.setState({nodeInternals:new Map(o)}))),r.length>0&&(c?.(t),d&&d(r.map((e=>({id:e,type:"remove"}))))),g.length>0&&(l?.(g),u)){u(g.map((e=>({id:e.id,type:"remove"}))))}}}),[]),f=t.useCallback((e=>{const t=Zo((o=e).width)&&Zo(o.height)&&Zo(o.x)&&Zo(o.y);var o;const r=t?null:n.getState().nodeInternals.get(e.id);if(!t&&!r)return[null,null,t];return[t?e:Yo(r),r,t]}),[]),g=t.useCallback(((e,t=!0,o)=>{const[r,i,a]=f(e);return r?(o||n.getState().getNodes()).filter((e=>{if(!(a||e.id!==i.id&&e.positionAbsolute))return!1;const n=Yo(e),o=Wo(n,r);return t&&o>0||o>=r.width*r.height})):[]}),[]),p=t.useCallback(((e,t,n=!0)=>{const[o]=f(e);if(!o)return!1;const r=Wo(o,t);return n&&r>0||r>=o.width*o.height}),[]);return t.useMemo((()=>({...e,getNodes:o,getNode:r,getEdges:i,getEdge:a,setNodes:s,setEdges:l,addNodes:c,addEdges:u,toObject:d,deleteElements:h,getIntersectingNodes:g,isNodeIntersecting:p})),[e,o,r,i,a,s,l,c,u,d,h,g,p])}const $i={actInsideInputWithModifier:!1};const Ti={position:"absolute",width:"100%",height:"100%",top:0,left:0},Vi=e=>({x:e.x,y:e.y,zoom:e.k}),Hi=(e,t)=>e.target.closest(`.${t}`),Li=(e,t)=>2===t&&Array.isArray(e)&&e.includes(2),Xi=e=>{const t=e.ctrlKey&&Qo()?10:1;return-e.deltaY*(1===e.deltaMode?.05:e.deltaMode?1:.002)*t},Yi=e=>({d3Zoom:e.d3Zoom,d3Selection:e.d3Selection,d3ZoomHandler:e.d3ZoomHandler,userSelectionActive:e.userSelectionActive}),Fi=({onMove:n,onMoveStart:o,onMoveEnd:r,onPaneContextMenu:i,zoomOnScroll:a=!0,zoomOnPinch:s=!0,panOnScroll:l=!1,panOnScrollSpeed:c=.5,panOnScrollMode:u=e.PanOnScrollMode.Free,zoomOnDoubleClick:d=!0,elementsSelectable:h,panOnDrag:f=!0,defaultViewport:g,translateExtent:p,minZoom:m,maxZoom:y,zoomActivationKeyCode:v,preventScrolling:w=!0,children:S,noWheelClassName:x,noPanClassName:E})=>{const C=t.useRef(),_=Po(),N=t.useRef(!1),M=t.useRef(!1),k=t.useRef(null),P=t.useRef({x:0,y:0,zoom:0}),{d3Zoom:A,d3Selection:O,d3ZoomHandler:R,userSelectionActive:I}=ko(Yi,b),z=Ei(v),D=t.useRef(0),B=t.useRef(!1),$=t.useRef();return function(e){const n=Po();t.useEffect((()=>{let t;const o=()=>{if(!e.current)return;const t=zo(e.current);0!==t.height&&0!==t.width||n.getState().onError?.("004",wo()),n.setState({width:t.width||500,height:t.height||500})};return o(),window.addEventListener("resize",o),e.current&&(t=new ResizeObserver((()=>o())),t.observe(e.current)),()=>{window.removeEventListener("resize",o),t&&e.current&&t.unobserve(e.current)}}),[])}(k),t.useEffect((()=>{if(k.current){const e=k.current.getBoundingClientRect(),t=mo().scaleExtent([m,y]).translateExtent(p),n=He(k.current).call(t),o=ao.translate(g.x,g.y).scale(Do(g.zoom,m,y)),r=[[0,0],[e.width,e.height]],i=t.constrain()(o,r,p);t.transform(n,i),t.wheelDelta(Xi),_.setState({d3Zoom:t,d3Selection:n,d3ZoomHandler:n.on("wheel.zoom"),transform:[i.x,i.y,i.k],domNode:k.current.closest(".react-flow")})}}),[]),t.useEffect((()=>{O&&A&&(!l||z||I?void 0!==R&&O.on("wheel.zoom",(function(e,t){if(!w&&"wheel"===e.type&&!e.ctrlKey||Hi(e,x))return null;e.preventDefault(),R.call(this,e,t)}),{passive:!1}):O.on("wheel.zoom",(t=>{if(Hi(t,x))return!1;t.preventDefault(),t.stopImmediatePropagation();const i=O.property("__zoom").k||1;if(t.ctrlKey&&s){const e=Le(t),n=Xi(t),o=i*Math.pow(2,n);return void A.scaleTo(O,o,e,t)}const a=1===t.deltaMode?20:1;let l=u===e.PanOnScrollMode.Vertical?0:t.deltaX*a,d=u===e.PanOnScrollMode.Horizontal?0:t.deltaY*a;!Qo()&&t.shiftKey&&u!==e.PanOnScrollMode.Vertical&&(l=t.deltaY*a,d=0),A.translateBy(O,-l/i*c,-d/i*c,{internal:!0});const h=Vi(O.property("__zoom")),{onViewportChangeStart:f,onViewportChange:g,onViewportChangeEnd:p}=_.getState();clearTimeout($.current),B.current||(B.current=!0,o?.(t,h),f?.(h)),B.current&&(n?.(t,h),g?.(h),$.current=setTimeout((()=>{r?.(t,h),p?.(h),B.current=!1}),150))}),{passive:!1}))}),[I,l,u,O,A,R,z,s,w,x,o,n,r]),t.useEffect((()=>{A&&A.on("start",(e=>{if(!e.sourceEvent||e.sourceEvent.internal)return null;D.current=e.sourceEvent?.button;const{onViewportChangeStart:t}=_.getState(),n=Vi(e.transform);N.current=!0,P.current=n,"mousedown"===e.sourceEvent?.type&&_.setState({paneDragging:!0}),t?.(n),o?.(e.sourceEvent,n)}))}),[A,o]),t.useEffect((()=>{A&&(I&&!N.current?A.on("zoom",null):I||A.on("zoom",(e=>{const{onViewportChange:t}=_.getState();if(_.setState({transform:[e.transform.x,e.transform.y,e.transform.k]}),M.current=!(!i||!Li(f,D.current??0)),(n||t)&&!e.sourceEvent?.internal){const o=Vi(e.transform);t?.(o),n?.(e.sourceEvent,o)}})))}),[I,A,n,f,i]),t.useEffect((()=>{A&&A.on("end",(e=>{if(!e.sourceEvent||e.sourceEvent.internal)return null;const{onViewportChangeEnd:t}=_.getState();if(N.current=!1,_.setState({paneDragging:!1}),i&&Li(f,D.current??0)&&!M.current&&i(e.sourceEvent),M.current=!1,(r||t)&&(n=P.current,o=e.transform,n.x!==o.x||n.y!==o.y||n.zoom!==o.k)){const n=Vi(e.transform);P.current=n,clearTimeout(C.current),C.current=setTimeout((()=>{t?.(n),r?.(e.sourceEvent,n)}),l?150:0)}var n,o}))}),[A,l,f,r,i]),t.useEffect((()=>{A&&A.filter((e=>{const t=z||a,n=s&&e.ctrlKey;if((!0===f||Array.isArray(f)&&f.includes(1))&&1===e.button&&"mousedown"===e.type&&(Hi(e,"react-flow__node")||Hi(e,"react-flow__edge")))return!0;if(!(f||t||l||d||s))return!1;if(I)return!1;if(!d&&"dblclick"===e.type)return!1;if(Hi(e,x)&&"wheel"===e.type)return!1;if(Hi(e,E)&&("wheel"!==e.type||l&&"wheel"===e.type&&!z))return!1;if(!s&&e.ctrlKey&&"wheel"===e.type)return!1;if(!t&&!l&&!n&&"wheel"===e.type)return!1;if(!f&&("mousedown"===e.type||"touchstart"===e.type))return!1;if(Array.isArray(f)&&!f.includes(e.button)&&"mousedown"===e.type)return!1;const o=Array.isArray(f)&&f.includes(e.button)||!e.button||e.button<=1;return(!e.ctrlKey||"wheel"===e.type)&&o}))}),[I,A,a,s,l,d,f,h,z]),t.createElement("div",{className:"react-flow__renderer",ref:k,style:Ti},S)},Wi=e=>({userSelectionActive:e.userSelectionActive,userSelectionRect:e.userSelectionRect});function Zi(){const{userSelectionActive:e,userSelectionRect:n}=ko(Wi,b);return e&&n?t.createElement("div",{className:"react-flow__selection react-flow__container",style:{width:n.width,height:n.height,transform:`translate(${n.x}px, ${n.y}px)`}}):null}function Ki(e,t){const n=t.parentNode||t.parentId,o=e.find((e=>e.id===n));if(o){const e=t.position.x+t.width-o.width,n=t.position.y+t.height-o.height;if(e>0||n>0||t.position.x<0||t.position.y<0){if(o.style={...o.style}||{},o.style.width=o.style.width??o.width,o.style.height=o.style.height??o.height,e>0&&(o.style.width+=e),n>0&&(o.style.height+=n),t.position.x<0){const e=Math.abs(t.position.x);o.position.x=o.position.x-e,o.style.width+=e,t.position.x=0}if(t.position.y<0){const e=Math.abs(t.position.y);o.position.y=o.position.y-e,o.style.height+=e,t.position.y=0}o.width=o.style.width,o.height=o.style.height}}}function ji(e,t){if(e.some((e=>"reset"===e.type)))return e.filter((e=>"reset"===e.type)).map((e=>e.item));const n=e.filter((e=>"add"===e.type)).map((e=>e.item));return t.reduce(((t,n)=>{const o=e.filter((e=>e.id===n.id));if(0===o.length)return t.push(n),t;const r={...n};for(const e of o)if(e)switch(e.type){case"select":r.selected=e.selected;break;case"position":void 0!==e.position&&(r.position=e.position),void 0!==e.positionAbsolute&&(r.positionAbsolute=e.positionAbsolute),void 0!==e.dragging&&(r.dragging=e.dragging),r.expandParent&&Ki(t,r);break;case"dimensions":void 0!==e.dimensions&&(r.width=e.dimensions.width,r.height=e.dimensions.height),void 0!==e.updateStyle&&(r.style={...r.style||{},...e.dimensions}),"boolean"==typeof e.resizing&&(r.resizing=e.resizing),r.expandParent&&Ki(t,r);break;case"remove":return t}return t.push(r),t}),n)}function qi(e,t){return ji(e,t)}function Ui(e,t){return ji(e,t)}const Gi=(e,t)=>({id:e,type:"select",selected:t});function Qi(e,t){return e.reduce(((e,n)=>{const o=t.includes(n.id);return!n.selected&&o?(n.selected=!0,e.push(Gi(n.id,!0))):n.selected&&!o&&(n.selected=!1,e.push(Gi(n.id,!1))),e}),[])}const Ji=(e,t)=>n=>{n.target===t.current&&e?.(n)},ea=e=>({userSelectionActive:e.userSelectionActive,elementsSelectable:e.elementsSelectable,dragging:e.paneDragging}),ta=t.memo((({isSelecting:n,selectionMode:r=e.SelectionMode.Full,panOnDrag:i,onSelectionStart:a,onSelectionEnd:s,onPaneClick:l,onPaneContextMenu:c,onPaneScroll:u,onPaneMouseEnter:d,onPaneMouseMove:h,onPaneMouseLeave:f,children:g})=>{const p=t.useRef(null),m=Po(),y=t.useRef(0),v=t.useRef(0),w=t.useRef(),{userSelectionActive:S,elementsSelectable:x,dragging:E}=ko(ea,b),C=()=>{m.setState({userSelectionActive:!1,userSelectionRect:null}),y.current=0,v.current=0},_=e=>{l?.(e),m.getState().resetSelectedElements(),m.setState({nodesSelectionActive:!1})},N=u?e=>u(e):void 0,M=x&&(n||S);return t.createElement("div",{className:o(["react-flow__pane",{dragging:E,selection:n}]),onClick:M?void 0:Ji(_,p),onContextMenu:Ji((e=>{Array.isArray(i)&&i?.includes(2)?e.preventDefault():c?.(e)}),p),onWheel:Ji(N,p),onMouseEnter:M?void 0:d,onMouseDown:M?e=>{const{resetSelectedElements:t,domNode:o}=m.getState();if(w.current=o?.getBoundingClientRect(),!x||!n||0!==e.button||e.target!==p.current||!w.current)return;const{x:r,y:i}=Go(e,w.current);t(),m.setState({userSelectionRect:{width:0,height:0,startX:r,startY:i,x:r,y:i}}),a?.(e)}:void 0,onMouseMove:M?t=>{const{userSelectionRect:o,nodeInternals:i,edges:a,transform:s,onNodesChange:l,onEdgesChange:c,nodeOrigin:u,getNodes:d}=m.getState();if(!n||!w.current||!o)return;m.setState({userSelectionActive:!0,nodesSelectionActive:!1});const h=Go(t,w.current),f=o.startX??0,g=o.startY??0,p={...o,x:h.x<f?h.x:f,y:h.y<g?h.y:g,width:Math.abs(h.x-f),height:Math.abs(h.y-g)},b=d(),S=$r(i,p,s,r===e.SelectionMode.Partial,!0,u),x=Tr(S,a).map((e=>e.id)),E=S.map((e=>e.id));if(y.current!==E.length){y.current=E.length;const e=Qi(b,E);e.length&&l?.(e)}if(v.current!==x.length){v.current=x.length;const e=Qi(a,x);e.length&&c?.(e)}m.setState({userSelectionRect:p})}:h,onMouseUp:M?e=>{if(0!==e.button)return;const{userSelectionRect:t}=m.getState();!S&&t&&e.target===p.current&&_?.(e),m.setState({nodesSelectionActive:y.current>0}),C(),s?.(e)}:void 0,onMouseLeave:M?e=>{S&&(m.setState({nodesSelectionActive:y.current>0}),s?.(e)),C()}:f,ref:p,style:Ti},g,t.createElement(Zi,null))}));function na(e,t){const n=e.parentNode||e.parentId;if(!n)return!1;const o=t.get(n);return!!o&&(!!o.selected||na(o,t))}function oa(e,t,n){let o=e;do{if(o?.matches(t))return!0;if(o===n.current)return!1;o=o.parentElement}while(o);return!1}function ra(e,t,n,o){return Array.from(e.values()).filter((n=>(n.selected||n.id===o)&&(!n.parentNode||n.parentId||!na(n,e))&&(n.draggable||t&&void 0===n.draggable))).map((e=>({id:e.id,position:e.position||{x:0,y:0},positionAbsolute:e.positionAbsolute||{x:0,y:0},distance:{x:n.x-(e.positionAbsolute?.x??0),y:n.y-(e.positionAbsolute?.y??0)},delta:{x:0,y:0},extent:e.extent,parentNode:e.parentNode||e.parentId,parentId:e.parentNode||e.parentId,width:e.width,height:e.height,expandParent:e.expandParent})))}function ia(e,t,n,o,r=[0,0],i){const a=function(e,t){return t&&"parent"!==t?[t[0],[t[1][0]-(e.width||0),t[1][1]-(e.height||0)]]:t}(e,e.extent||o);let s=a;const l=e.parentNode||e.parentId;if("parent"!==e.extent||e.expandParent){if(e.extent&&l&&"parent"!==e.extent){const t=n.get(l),{x:o,y:i}=Dr(t,r).positionAbsolute;s=[[e.extent[0][0]+o,e.extent[0][1]+i],[e.extent[1][0]+o,e.extent[1][1]+i]]}}else if(l&&e.width&&e.height){const t=n.get(l),{x:o,y:i}=Dr(t,r).positionAbsolute;s=t&&Zo(o)&&Zo(i)&&Zo(t.width)&&Zo(t.height)?[[o+e.width*r[0],i+e.height*r[1]],[o+t.width-e.width+e.width*r[0],i+t.height-e.height+e.height*r[1]]]:s}else i?.("005",So()),s=a;let c={x:0,y:0};if(l){const e=n.get(l);c=Dr(e,r).positionAbsolute}const u=s&&"parent"!==s?Bo(t,s):t;return{position:{x:u.x-c.x,y:u.y-c.y},positionAbsolute:u}}function aa({nodeId:e,dragItems:t,nodeInternals:n}){const o=t.map((e=>({...n.get(e.id),position:e.position,positionAbsolute:e.positionAbsolute})));return[e?o.find((t=>t.id===e)):o[0],o]}ta.displayName="Pane";const sa=(e,t,n,o)=>{const r=t.querySelectorAll(e);if(!r||!r.length)return null;const i=Array.from(r),a=t.getBoundingClientRect(),s=a.width*o[0],l=a.height*o[1];return i.map((e=>{const t=e.getBoundingClientRect();return{id:e.getAttribute("data-handleid"),position:e.getAttribute("data-handlepos"),x:(t.left-a.left-s)/n,y:(t.top-a.top-l)/n,...zo(e)}}))};function la(e,t,n){return void 0===n?n:o=>{const r=t().nodeInternals.get(e);r&&n(o,{...r})}}function ca({id:e,store:t,unselect:n=!1,nodeRef:o}){const{addSelectedNodes:r,unselectNodesAndEdges:i,multiSelectionActive:a,nodeInternals:s,onError:l}=t.getState(),c=s.get(e);c?(t.setState({nodesSelectionActive:!1}),c.selected?(n||c.selected&&a)&&(i({nodes:[c],edges:[]}),requestAnimationFrame((()=>o?.current?.blur()))):r([e])):l?.("012",No(e))}function ua(){const e=Po(),n=t.useCallback((({sourceEvent:t})=>{const{transform:n,snapGrid:o,snapToGrid:r}=e.getState(),i=t.touches?t.touches[0].clientX:t.clientX,a=t.touches?t.touches[0].clientY:t.clientY,s={x:(i-n[0])/n[2],y:(a-n[1])/n[2]};return{xSnapped:r?o[0]*Math.round(s.x/o[0]):s.x,ySnapped:r?o[1]*Math.round(s.y/o[1]):s.y,...s}}),[]);return n}function da(e){return(t,n,o)=>e?.(t,o)}function ha({nodeRef:e,disabled:n=!1,noDragClassName:o,handleSelector:r,nodeId:i,isSelectable:a,selectNodesOnDrag:s}){const l=Po(),[c,u]=t.useState(!1),d=t.useRef([]),h=t.useRef({x:null,y:null}),f=t.useRef(0),g=t.useRef(null),p=t.useRef({x:0,y:0}),m=t.useRef(null),y=t.useRef(!1),v=t.useRef(!1),b=t.useRef(!1),w=ua();return t.useEffect((()=>{if(e?.current){const t=He(e.current),c=({x:e,y:t})=>{const{nodeInternals:n,onNodeDrag:o,onSelectionDrag:r,updateNodePositions:a,nodeExtent:s,snapGrid:c,snapToGrid:f,nodeOrigin:g,onError:p}=l.getState();h.current={x:e,y:t};let y=!1,v={x:0,y:0,x2:0,y2:0};if(d.current.length>1&&s){const e=Br(d.current,g);v=Lo(e)}if(d.current=d.current.map((o=>{const r={x:e-o.distance.x,y:t-o.distance.y};f&&(r.x=c[0]*Math.round(r.x/c[0]),r.y=c[1]*Math.round(r.y/c[1]));const i=[[s[0][0],s[0][1]],[s[1][0],s[1][1]]];d.current.length>1&&s&&!o.extent&&(i[0][0]=o.positionAbsolute.x-v.x+s[0][0],i[1][0]=o.positionAbsolute.x+(o.width??0)-v.x2+s[1][0],i[0][1]=o.positionAbsolute.y-v.y+s[0][1],i[1][1]=o.positionAbsolute.y+(o.height??0)-v.y2+s[1][1]);const a=ia(o,r,n,i,g,p);return y=y||o.position.x!==a.position.x||o.position.y!==a.position.y,o.position=a.position,o.positionAbsolute=a.positionAbsolute,o})),!y)return;a(d.current,!0,!0),u(!0);const b=i?o:da(r);if(b&&m.current){const[e,t]=aa({nodeId:i,dragItems:d.current,nodeInternals:n});b(m.current,e,t)}},S=()=>{if(!g.current)return;const[e,t]=To(p.current,g.current);if(0!==e||0!==t){const{transform:n,panBy:o}=l.getState();h.current.x=(h.current.x??0)-e/n[2],h.current.y=(h.current.y??0)-t/n[2],o({x:e,y:t})&&c(h.current)}f.current=requestAnimationFrame(S)},x=t=>{const{nodeInternals:n,multiSelectionActive:o,nodesDraggable:r,unselectNodesAndEdges:c,onNodeDragStart:u,onSelectionDragStart:f}=l.getState();v.current=!0;const g=i?u:da(f);s&&a||o||!i||n.get(i)?.selected||c(),i&&a&&s&&ca({id:i,store:l,nodeRef:e});const p=w(t);if(h.current=p,d.current=ra(n,r,p,i),g&&d.current){const[e,o]=aa({nodeId:i,dragItems:d.current,nodeInternals:n});g(t.sourceEvent,e,o)}};if(!n){const n=et().on("start",(e=>{const{domNode:t,nodeDragThreshold:n}=l.getState();0===n&&x(e),b.current=!1;const o=w(e);h.current=o,g.current=t?.getBoundingClientRect()||null,p.current=Go(e.sourceEvent,g.current)})).on("drag",(e=>{const t=w(e),{autoPanOnNodeDrag:n,nodeDragThreshold:o}=l.getState();if("touchmove"===e.sourceEvent.type&&e.sourceEvent.touches.length>1&&(b.current=!0),!b.current){if(!y.current&&v.current&&n&&(y.current=!0,S()),!v.current){const n=t.xSnapped-(h?.current?.x??0),r=t.ySnapped-(h?.current?.y??0);Math.sqrt(n*n+r*r)>o&&x(e)}(h.current.x!==t.xSnapped||h.current.y!==t.ySnapped)&&d.current&&v.current&&(m.current=e.sourceEvent,p.current=Go(e.sourceEvent,g.current),c(t))}})).on("end",(e=>{if(v.current&&!b.current&&(u(!1),y.current=!1,v.current=!1,cancelAnimationFrame(f.current),d.current)){const{updateNodePositions:t,nodeInternals:n,onNodeDragStop:o,onSelectionDragStop:r}=l.getState(),a=i?o:da(r);if(t(d.current,!1,!1),a){const[t,o]=aa({nodeId:i,dragItems:d.current,nodeInternals:n});a(e.sourceEvent,t,o)}}})).filter((t=>{const n=t.target;return!t.button&&(!o||!oa(n,`.${o}`,e))&&(!r||oa(n,r,e))}));return t.call(n),()=>{t.on(".drag",null)}}t.on(".drag",null)}}),[e,n,o,r,a,l,i,s,w]),c}function fa(){const e=Po();return t.useCallback((t=>{const{nodeInternals:n,nodeExtent:o,updateNodePositions:r,getNodes:i,snapToGrid:a,snapGrid:s,onError:l,nodesDraggable:c}=e.getState(),u=i().filter((e=>e.selected&&(e.draggable||c&&void 0===e.draggable))),d=a?s[0]:5,h=a?s[1]:5,f=t.isShiftPressed?4:1,g=t.x*d*f,p=t.y*h*f;r(u.map((e=>{if(e.positionAbsolute){const t={x:e.positionAbsolute.x+g,y:e.positionAbsolute.y+p};a&&(t.x=s[0]*Math.round(t.x/s[0]),t.y=s[1]*Math.round(t.y/s[1]));const{positionAbsolute:r,position:i}=ia(e,t,n,o,void 0,l);e.position=i,e.positionAbsolute=r}return e})),!0,!1)}),[])}const ga={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}};var pa=e=>{const n=({id:n,type:r,data:i,xPos:a,yPos:s,xPosOrigin:l,yPosOrigin:c,selected:u,onClick:d,onMouseEnter:h,onMouseMove:f,onMouseLeave:g,onContextMenu:p,onDoubleClick:m,style:y,className:v,isDraggable:b,isSelectable:w,isConnectable:S,isFocusable:x,selectNodesOnDrag:E,sourcePosition:C,targetPosition:_,hidden:N,resizeObserver:M,dragHandle:k,zIndex:P,isParent:A,noDragClassName:O,noPanClassName:R,initialized:I,disableKeyboardA11y:z,ariaLabel:D,rfId:B,hasHandleBounds:$})=>{const T=Po(),V=t.useRef(null),H=t.useRef(null),L=t.useRef(C),X=t.useRef(_),Y=t.useRef(r),F=w||b||d||h||f||g,W=fa(),Z=la(n,T.getState,h),K=la(n,T.getState,f),j=la(n,T.getState,g),q=la(n,T.getState,p),U=la(n,T.getState,m);t.useEffect((()=>()=>{H.current&&(M?.unobserve(H.current),H.current=null)}),[]),t.useEffect((()=>{if(V.current&&!N){const e=V.current;I&&$&&H.current===e||(H.current&&M?.unobserve(H.current),M?.observe(e),H.current=e)}}),[N,I,$]),t.useEffect((()=>{const e=Y.current!==r,t=L.current!==C,o=X.current!==_;V.current&&(e||t||o)&&(e&&(Y.current=r),t&&(L.current=C),o&&(X.current=_),T.getState().updateNodeDimensions([{id:n,nodeElement:V.current,forceUpdate:!0}]))}),[n,r,C,_]);const G=ha({nodeRef:V,disabled:N||!b,noDragClassName:O,handleSelector:k,nodeId:n,isSelectable:w,selectNodesOnDrag:E});return N?null:t.createElement("div",{className:o(["react-flow__node",`react-flow__node-${r}`,{[R]:b},v,{selected:u,selectable:w,parent:A,dragging:G}]),ref:V,style:{zIndex:P,transform:`translate(${l}px,${c}px)`,pointerEvents:F?"all":"none",visibility:I?"visible":"hidden",...y},"data-id":n,"data-testid":`rf__node-${n}`,onMouseEnter:Z,onMouseMove:K,onMouseLeave:j,onContextMenu:q,onClick:e=>{const{nodeDragThreshold:t}=T.getState();if(w&&(!E||!b||t>0)&&ca({id:n,store:T,nodeRef:V}),d){const t=T.getState().nodeInternals.get(n);t&&d(e,{...t})}},onDoubleClick:U,onKeyDown:x?e=>{if(!qo(e)&&!z)if(jo.includes(e.key)&&w){const t="Escape"===e.key;ca({id:n,store:T,unselect:t,nodeRef:V})}else b&&u&&Object.prototype.hasOwnProperty.call(ga,e.key)&&(T.setState({ariaLiveMessage:`Moved selected node ${e.key.replace("Arrow","").toLowerCase()}. New position, x: ${~~a}, y: ${~~s}`}),W({x:ga[e.key].x,y:ga[e.key].y,isShiftPressed:e.shiftKey}))}:void 0,tabIndex:x?0:void 0,role:x?"button":void 0,"aria-describedby":z?void 0:`${vi}-${B}`,"aria-label":D},t.createElement(_r,{value:n},t.createElement(e,{id:n,data:i,type:r,xPos:a,yPos:s,selected:u,isConnectable:S,sourcePosition:C,targetPosition:_,dragging:G,dragHandle:k,zIndex:P})))};return n.displayName="NodeWrapper",t.memo(n)};const ma=e=>{const t=e.getNodes().filter((e=>e.selected));return{...Br(t,e.nodeOrigin),transformString:`translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`,userSelectionActive:e.userSelectionActive}};var ya=t.memo((function({onSelectionContextMenu:e,noPanClassName:n,disableKeyboardA11y:r}){const i=Po(),{width:a,height:s,x:l,y:c,transformString:u,userSelectionActive:d}=ko(ma,b),h=fa(),f=t.useRef(null);if(t.useEffect((()=>{r||f.current?.focus({preventScroll:!0})}),[r]),ha({nodeRef:f}),d||!a||!s)return null;const g=e?t=>{const n=i.getState().getNodes().filter((e=>e.selected));e(t,n)}:void 0;return t.createElement("div",{className:o(["react-flow__nodesselection","react-flow__container",n]),style:{transform:u}},t.createElement("div",{ref:f,className:"react-flow__nodesselection-rect",onContextMenu:g,tabIndex:r?void 0:-1,onKeyDown:r?void 0:e=>{Object.prototype.hasOwnProperty.call(ga,e.key)&&h({x:ga[e.key].x,y:ga[e.key].y,isShiftPressed:e.shiftKey})},style:{width:a,height:s,top:c,left:l}}))}));const va=e=>e.nodesSelectionActive,ba=({children:e,onPaneClick:n,onPaneMouseEnter:o,onPaneMouseMove:r,onPaneMouseLeave:i,onPaneContextMenu:a,onPaneScroll:s,deleteKeyCode:l,onMove:c,onMoveStart:u,onMoveEnd:d,selectionKeyCode:h,selectionOnDrag:f,selectionMode:g,onSelectionStart:p,onSelectionEnd:m,multiSelectionKeyCode:y,panActivationKeyCode:v,zoomActivationKeyCode:b,elementsSelectable:w,zoomOnScroll:S,zoomOnPinch:x,panOnScroll:E,panOnScrollSpeed:C,panOnScrollMode:_,zoomOnDoubleClick:N,panOnDrag:M,defaultViewport:k,translateExtent:P,minZoom:A,maxZoom:O,preventScrolling:R,onSelectionContextMenu:I,noWheelClassName:z,noPanClassName:D,disableKeyboardA11y:B})=>{const $=ko(va),T=Ei(h),V=Ei(v),H=V||M,L=V||E,X=T||f&&!0!==H;return(({deleteKeyCode:e,multiSelectionKeyCode:n})=>{const o=Po(),{deleteElements:r}=Bi(),i=Ei(e,$i),a=Ei(n);t.useEffect((()=>{if(i){const{edges:e,getNodes:t}=o.getState(),n=t().filter((e=>e.selected)),i=e.filter((e=>e.selected));r({nodes:n,edges:i}),o.setState({nodesSelectionActive:!1})}}),[i]),t.useEffect((()=>{o.setState({multiSelectionActive:a})}),[a])})({deleteKeyCode:l,multiSelectionKeyCode:y}),t.createElement(Fi,{onMove:c,onMoveStart:u,onMoveEnd:d,onPaneContextMenu:a,elementsSelectable:w,zoomOnScroll:S,zoomOnPinch:x,panOnScroll:L,panOnScrollSpeed:C,panOnScrollMode:_,zoomOnDoubleClick:N,panOnDrag:!T&&H,defaultViewport:k,translateExtent:P,minZoom:A,maxZoom:O,zoomActivationKeyCode:b,preventScrolling:R,noWheelClassName:z,noPanClassName:D},t.createElement(ta,{onSelectionStart:p,onSelectionEnd:m,onPaneClick:n,onPaneMouseEnter:o,onPaneMouseMove:r,onPaneMouseLeave:i,onPaneContextMenu:a,onPaneScroll:s,panOnDrag:H,isSelecting:!!X,selectionMode:g},e,$&&t.createElement(ya,{onSelectionContextMenu:I,noPanClassName:D,disableKeyboardA11y:B})))};ba.displayName="FlowRenderer";var wa=t.memo(ba);function Sa(e){return{...{input:pa(e.input||ni),default:pa(e.default||ei),output:pa(e.output||ri),group:pa(e.group||ii)},...Object.keys(e).filter((e=>!["input","default","output","group"].includes(e))).reduce(((t,n)=>(t[n]=pa(e[n]||ei),t)),{})}}const xa=e=>({nodesDraggable:e.nodesDraggable,nodesConnectable:e.nodesConnectable,nodesFocusable:e.nodesFocusable,elementsSelectable:e.elementsSelectable,updateNodeDimensions:e.updateNodeDimensions,onError:e.onError}),Ea=n=>{const{nodesDraggable:o,nodesConnectable:r,nodesFocusable:i,elementsSelectable:a,updateNodeDimensions:s,onError:l}=ko(xa,b),c=(u=n.onlyRenderVisibleElements,ko(t.useCallback((e=>u?$r(e.nodeInternals,{x:0,y:0,width:e.width,height:e.height},e.transform,!0):e.getNodes()),[u])));var u;const d=t.useRef(),h=t.useMemo((()=>{if("undefined"==typeof ResizeObserver)return null;const e=new ResizeObserver((e=>{const t=e.map((e=>({id:e.target.getAttribute("data-id"),nodeElement:e.target,forceUpdate:!0})));s(t)}));return d.current=e,e}),[]);return t.useEffect((()=>()=>{d?.current?.disconnect()}),[]),t.createElement("div",{className:"react-flow__nodes",style:Ti},c.map((s=>{let c=s.type||"default";n.nodeTypes[c]||(l?.("003",bo(c)),c="default");const u=n.nodeTypes[c]||n.nodeTypes.default,d=!!(s.draggable||o&&void 0===s.draggable),f=!!(s.selectable||a&&void 0===s.selectable),g=!!(s.connectable||r&&void 0===s.connectable),p=!!(s.focusable||i&&void 0===s.focusable),m=n.nodeExtent?Bo(s.positionAbsolute,n.nodeExtent):s.positionAbsolute,y=m?.x??0,v=m?.y??0,b=(({x:e,y:t,width:n,height:o,origin:r})=>n&&o?r[0]<0||r[1]<0||r[0]>1||r[1]>1?{x:e,y:t}:{x:e-n*r[0],y:t-o*r[1]}:{x:e,y:t})({x:y,y:v,width:s.width??0,height:s.height??0,origin:n.nodeOrigin});return t.createElement(u,{key:s.id,id:s.id,className:s.className,style:s.style,type:c,data:s.data,sourcePosition:s.sourcePosition||e.Position.Bottom,targetPosition:s.targetPosition||e.Position.Top,hidden:s.hidden,xPos:y,yPos:v,xPosOrigin:b.x,yPosOrigin:b.y,selectNodesOnDrag:n.selectNodesOnDrag,onClick:n.onNodeClick,onMouseEnter:n.onNodeMouseEnter,onMouseMove:n.onNodeMouseMove,onMouseLeave:n.onNodeMouseLeave,onContextMenu:n.onNodeContextMenu,onDoubleClick:n.onNodeDoubleClick,selected:!!s.selected,isDraggable:d,isSelectable:f,isConnectable:g,isFocusable:p,resizeObserver:h,dragHandle:s.dragHandle,zIndex:s[Ko]?.z??0,isParent:!!s[Ko]?.isParent,noDragClassName:n.noDragClassName,noPanClassName:n.noPanClassName,initialized:!!s.width&&!!s.height,rfId:n.rfId,disableKeyboardA11y:n.disableKeyboardA11y,ariaLabel:s.ariaLabel,hasHandleBounds:!!s[Ko]?.handleBounds})})))};Ea.displayName="NodeRenderer";var Ca=t.memo(Ea);const _a=(t,n,o)=>o===e.Position.Left?t-n:o===e.Position.Right?t+n:t,Na=(t,n,o)=>o===e.Position.Top?t-n:o===e.Position.Bottom?t+n:t,Ma="react-flow__edgeupdater",ka=({position:e,centerX:n,centerY:r,radius:i=10,onMouseDown:a,onMouseEnter:s,onMouseOut:l,type:c})=>t.createElement("circle",{onMouseDown:a,onMouseEnter:s,onMouseOut:l,className:o([Ma,`${Ma}-${c}`]),cx:_a(n,i,e),cy:Na(r,i,e),r:i,stroke:"transparent",fill:"transparent"}),Pa=()=>!0;var Aa=e=>{const n=({id:n,className:r,type:i,data:a,onClick:s,onEdgeDoubleClick:l,selected:c,animated:u,label:d,labelStyle:h,labelShowBg:f,labelBgStyle:g,labelBgPadding:p,labelBgBorderRadius:m,style:y,source:v,target:b,sourceX:w,sourceY:S,targetX:x,targetY:E,sourcePosition:C,targetPosition:_,elementsSelectable:N,hidden:M,sourceHandleId:k,targetHandleId:P,onContextMenu:A,onMouseEnter:O,onMouseMove:R,onMouseLeave:I,reconnectRadius:z,onReconnect:D,onReconnectStart:B,onReconnectEnd:$,markerEnd:T,markerStart:V,rfId:H,ariaLabel:L,isFocusable:X,isReconnectable:Y,pathOptions:F,interactionWidth:W,disableKeyboardA11y:Z})=>{const K=t.useRef(null),[j,q]=t.useState(!1),[U,G]=t.useState(!1),Q=Po(),J=t.useMemo((()=>`url('#${Ar(V,H)}')`),[V,H]),ee=t.useMemo((()=>`url('#${Ar(T,H)}')`),[T,H]);if(M)return null;const te=er(n,Q.getState,l),ne=er(n,Q.getState,A),oe=er(n,Q.getState,O),re=er(n,Q.getState,R),ie=er(n,Q.getState,I),ae=(e,t)=>{if(0!==e.button)return;const{edges:o,isValidConnection:r}=Q.getState(),i=t?b:v,a=(t?P:k)||null,s=t?"target":"source",l=r||Pa,c=t,u=o.find((e=>e.id===n));G(!0),B?.(e,u,s);jr({event:e,handleId:a,nodeId:i,onConnect:e=>D?.(u,e),isTarget:c,getState:Q.getState,setState:Q.setState,isValidConnection:l,edgeUpdaterType:s,onReconnectEnd:e=>{G(!1),$?.(e,u,s)}})},se=()=>q(!0),le=()=>q(!1),ce=!N&&!s;return t.createElement("g",{className:o(["react-flow__edge",`react-flow__edge-${i}`,r,{selected:c,animated:u,inactive:ce,updating:j}]),onClick:e=>{const{edges:t,addSelectedEdges:o,unselectNodesAndEdges:r,multiSelectionActive:i}=Q.getState(),a=t.find((e=>e.id===n));a&&(N&&(Q.setState({nodesSelectionActive:!1}),a.selected&&i?(r({nodes:[],edges:[a]}),K.current?.blur()):o([n])),s&&s(e,a))},onDoubleClick:te,onContextMenu:ne,onMouseEnter:oe,onMouseMove:re,onMouseLeave:ie,onKeyDown:X?e=>{if(!Z&&jo.includes(e.key)&&N){const{unselectNodesAndEdges:t,addSelectedEdges:o,edges:r}=Q.getState();"Escape"===e.key?(K.current?.blur(),t({edges:[r.find((e=>e.id===n))]})):o([n])}}:void 0,tabIndex:X?0:void 0,role:X?"button":"img","data-testid":`rf__edge-${n}`,"aria-label":null===L?void 0:L||`Edge from ${v} to ${b}`,"aria-describedby":X?`${bi}-${H}`:void 0,ref:K},!U&&t.createElement(e,{id:n,source:v,target:b,selected:c,animated:u,label:d,labelStyle:h,labelShowBg:f,labelBgStyle:g,labelBgPadding:p,labelBgBorderRadius:m,data:a,style:y,sourceX:w,sourceY:S,targetX:x,targetY:E,sourcePosition:C,targetPosition:_,sourceHandleId:k,targetHandleId:P,markerStart:J,markerEnd:ee,pathOptions:F,interactionWidth:W}),Y&&t.createElement(t.Fragment,null,("source"===Y||!0===Y)&&t.createElement(ka,{position:C,centerX:w,centerY:S,radius:z,onMouseDown:e=>ae(e,!0),onMouseEnter:se,onMouseOut:le,type:"source"}),("target"===Y||!0===Y)&&t.createElement(ka,{position:_,centerX:x,centerY:E,radius:z,onMouseDown:e=>ae(e,!1),onMouseEnter:se,onMouseOut:le,type:"target"})))};return n.displayName="EdgeWrapper",t.memo(n)};function Oa(e){return{...{default:Aa(e.default||Er),straight:Aa(e.bezier||br),step:Aa(e.step||yr),smoothstep:Aa(e.step||mr),simplebezier:Aa(e.simplebezier||dr)},...Object.keys(e).filter((e=>!["default","bezier"].includes(e))).reduce(((t,n)=>(t[n]=Aa(e[n]||Er),t)),{})}}function Ra(t,n,o=null){const r=(o?.x||0)+n.x,i=(o?.y||0)+n.y,a=o?.width||n.width,s=o?.height||n.height;switch(t){case e.Position.Top:return{x:r+a/2,y:i};case e.Position.Right:return{x:r+a,y:i+s/2};case e.Position.Bottom:return{x:r+a/2,y:i+s};case e.Position.Left:return{x:r,y:i+s/2}}}function Ia(e,t){return e?1!==e.length&&t?t&&e.find((e=>e.id===t))||null:e[0]:null}function za(e){const t=e?.[Ko]?.handleBounds||null,n=t&&e?.width&&e?.height&&void 0!==e?.positionAbsolute?.x&&void 0!==e?.positionAbsolute?.y;return[{x:e?.positionAbsolute?.x||0,y:e?.positionAbsolute?.y||0,width:e?.width||0,height:e?.height||0},t,!!n]}const Da=[{level:0,isMaxLevel:!0,edges:[]}];function Ba(e,n,o){return function(e,t,n=!1){let o=-1;const r=e.reduce(((e,r)=>{const i=Zo(r.zIndex);let a=i?r.zIndex:0;if(n){const e=t.get(r.target),n=t.get(r.source),o=r.selected||e?.selected||n?.selected,s=Math.max(n?.[Ko]?.z||0,e?.[Ko]?.z||0,1e3);a=(i?r.zIndex:0)+(o?s:0)}return e[a]?e[a].push(r):e[a]=[r],o=a>o?a:o,e}),{}),i=Object.entries(r).map((([e,t])=>{const n=+e;return{edges:t,level:n,isMaxLevel:n===o}}));return 0===i.length?Da:i}(ko(t.useCallback((t=>e?t.edges.filter((e=>{const o=n.get(e.source),r=n.get(e.target);return o?.width&&o?.height&&r?.width&&r?.height&&function({sourcePos:e,targetPos:t,sourceWidth:n,sourceHeight:o,targetWidth:r,targetHeight:i,width:a,height:s,transform:l}){const c={x:Math.min(e.x,t.x),y:Math.min(e.y,t.y),x2:Math.max(e.x+n,t.x+r),y2:Math.max(e.y+o,t.y+i)};c.x===c.x2&&(c.x2+=1),c.y===c.y2&&(c.y2+=1);const u=Lo({x:(0-l[0])/l[2],y:(0-l[1])/l[2],width:a/l[2],height:s/l[2]}),d=Math.max(0,Math.min(u.x2,c.x2)-Math.max(u.x,c.x)),h=Math.max(0,Math.min(u.y2,c.y2)-Math.max(u.y,c.y));return Math.ceil(d*h)>0}({sourcePos:o.positionAbsolute||{x:0,y:0},targetPos:r.positionAbsolute||{x:0,y:0},sourceWidth:o.width,sourceHeight:o.height,targetWidth:r.width,targetHeight:r.height,width:t.width,height:t.height,transform:t.transform})})):t.edges),[e,n])),n,o)}const $a={[e.MarkerType.Arrow]:({color:e="none",strokeWidth:n=1})=>t.createElement("polyline",{style:{stroke:e,strokeWidth:n},strokeLinecap:"round",strokeLinejoin:"round",fill:"none",points:"-5,-4 0,0 -5,4"}),[e.MarkerType.ArrowClosed]:({color:e="none",strokeWidth:n=1})=>t.createElement("polyline",{style:{stroke:e,fill:e,strokeWidth:n},strokeLinecap:"round",strokeLinejoin:"round",points:"-5,-4 0,0 -5,4 -5,-4"})};const Ta=({id:e,type:n,color:o,width:r=12.5,height:i=12.5,markerUnits:a="strokeWidth",strokeWidth:s,orient:l="auto-start-reverse"})=>{const c=function(e){const n=Po();return t.useMemo((()=>Object.prototype.hasOwnProperty.call($a,e)?$a[e]:(n.getState().onError?.("009",xo(e)),null)),[e])}(n);return c?t.createElement("marker",{className:"react-flow__arrowhead",id:e,markerWidth:`${r}`,markerHeight:`${i}`,viewBox:"-10 -10 20 20",markerUnits:a,orient:l,refX:"0",refY:"0"},t.createElement(c,{color:o,strokeWidth:s})):null},Va=({defaultColor:e,rfId:n})=>{const o=ko(t.useCallback((({defaultColor:e,rfId:t})=>n=>{const o=[];return n.edges.reduce(((n,r)=>([r.markerStart,r.markerEnd].forEach((r=>{if(r&&"object"==typeof r){const i=Ar(r,t);o.includes(i)||(n.push({id:i,color:r.color||e,...r}),o.push(i))}})),n)),[]).sort(((e,t)=>e.id.localeCompare(t.id)))})({defaultColor:e,rfId:n}),[e,n]),((e,t)=>!(e.length!==t.length||e.some(((e,n)=>e.id!==t[n].id)))));return t.createElement("defs",null,o.map((e=>t.createElement(Ta,{id:e.id,key:e.id,type:e.type,color:e.color,width:e.width,height:e.height,markerUnits:e.markerUnits,strokeWidth:e.strokeWidth,orient:e.orient}))))};Va.displayName="MarkerDefinitions";var Ha=t.memo(Va);const La=e=>({nodesConnectable:e.nodesConnectable,edgesFocusable:e.edgesFocusable,edgesUpdatable:e.edgesUpdatable,elementsSelectable:e.elementsSelectable,width:e.width,height:e.height,connectionMode:e.connectionMode,nodeInternals:e.nodeInternals,onError:e.onError}),Xa=({defaultMarkerColor:n,onlyRenderVisibleElements:r,elevateEdgesOnSelect:i,rfId:a,edgeTypes:s,noPanClassName:l,onEdgeContextMenu:c,onEdgeMouseEnter:u,onEdgeMouseMove:d,onEdgeMouseLeave:h,onEdgeClick:f,onEdgeDoubleClick:g,onReconnect:p,onReconnectStart:m,onReconnectEnd:y,reconnectRadius:v,children:w,disableKeyboardA11y:S})=>{const{edgesFocusable:x,edgesUpdatable:E,elementsSelectable:C,width:_,height:N,connectionMode:M,nodeInternals:k,onError:P}=ko(La,b),A=Ba(r,k,i);return _?t.createElement(t.Fragment,null,A.map((({level:r,edges:i,isMaxLevel:b})=>t.createElement("svg",{key:r,style:{zIndex:r},width:_,height:N,className:"react-flow__edges react-flow__container"},b&&t.createElement(Ha,{defaultColor:n,rfId:a}),t.createElement("g",null,i.map((n=>{const[r,i,b]=za(k.get(n.source)),[w,_,N]=za(k.get(n.target));if(!b||!N)return null;let A=n.type||"default";s[A]||(P?.("011",_o(A)),A="default");const O=s[A]||s.default,R=M===e.ConnectionMode.Strict?_.target:(_.target??[]).concat(_.source??[]),I=Ia(i.source,n.sourceHandle),z=Ia(R,n.targetHandle),D=I?.position||e.Position.Bottom,B=z?.position||e.Position.Top,$=!!(n.focusable||x&&void 0===n.focusable),T=n.reconnectable||n.updatable,V=void 0!==p&&(T||E&&void 0===T);if(!I||!z)return P?.("008",Eo(I,n)),null;const{sourceX:H,sourceY:L,targetX:X,targetY:Y}=((e,t,n,o,r,i)=>{const a=Ra(n,e,t),s=Ra(i,o,r);return{sourceX:a.x,sourceY:a.y,targetX:s.x,targetY:s.y}})(r,I,D,w,z,B);return t.createElement(O,{key:n.id,id:n.id,className:o([n.className,l]),type:A,data:n.data,selected:!!n.selected,animated:!!n.animated,hidden:!!n.hidden,label:n.label,labelStyle:n.labelStyle,labelShowBg:n.labelShowBg,labelBgStyle:n.labelBgStyle,labelBgPadding:n.labelBgPadding,labelBgBorderRadius:n.labelBgBorderRadius,style:n.style,source:n.source,target:n.target,sourceHandleId:n.sourceHandle,targetHandleId:n.targetHandle,markerEnd:n.markerEnd,markerStart:n.markerStart,sourceX:H,sourceY:L,targetX:X,targetY:Y,sourcePosition:D,targetPosition:B,elementsSelectable:C,onContextMenu:c,onMouseEnter:u,onMouseMove:d,onMouseLeave:h,onClick:f,onEdgeDoubleClick:g,onReconnect:p,onReconnectStart:m,onReconnectEnd:y,reconnectRadius:v,rfId:a,ariaLabel:n.ariaLabel,isFocusable:$,isReconnectable:V,pathOptions:"pathOptions"in n?n.pathOptions:void 0,interactionWidth:n.interactionWidth,disableKeyboardA11y:S})})))))),w):null};Xa.displayName="EdgeRenderer";var Ya=t.memo(Xa);const Fa=e=>`translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;function Wa({children:e}){const n=ko(Fa);return t.createElement("div",{className:"react-flow__viewport react-flow__container",style:{transform:n}},e)}const Za={[e.Position.Left]:e.Position.Right,[e.Position.Right]:e.Position.Left,[e.Position.Top]:e.Position.Bottom,[e.Position.Bottom]:e.Position.Top},Ka=({nodeId:n,handleType:o,style:r,type:i=e.ConnectionLineType.Bezier,CustomComponent:a,connectionStatus:s})=>{const{fromNode:l,handleId:c,toX:u,toY:d,connectionMode:h}=ko(t.useCallback((e=>({fromNode:e.nodeInternals.get(n),handleId:e.connectionHandleId,toX:(e.connectionPosition.x-e.transform[0])/e.transform[2],toY:(e.connectionPosition.y-e.transform[1])/e.transform[2],connectionMode:e.connectionMode})),[n]),b),f=l?.[Ko]?.handleBounds;let g=f?.[o];if(h===e.ConnectionMode.Loose&&(g=g||f?.["source"===o?"target":"source"]),!l||!g)return null;const p=c?g.find((e=>e.id===c)):g[0],m=p?p.x+p.width/2:(l.width??0)/2,y=p?p.y+p.height/2:l.height??0,v=(l.positionAbsolute?.x??0)+m,w=(l.positionAbsolute?.y??0)+y,S=p?.position,x=S?Za[S]:null;if(!S||!x)return null;if(a)return t.createElement(a,{connectionLineType:i,connectionLineStyle:r,fromNode:l,fromHandle:p,fromX:v,fromY:w,toX:u,toY:d,fromPosition:S,toPosition:x,connectionStatus:s});let E="";const C={sourceX:v,sourceY:w,sourcePosition:S,targetX:u,targetY:d,targetPosition:x};return i===e.ConnectionLineType.Bezier?[E]=xr(C):i===e.ConnectionLineType.Step?[E]=pr({...C,borderRadius:0}):i===e.ConnectionLineType.SmoothStep?[E]=pr(C):i===e.ConnectionLineType.SimpleBezier?[E]=ur(C):E=`M${v},${w} ${u},${d}`,t.createElement("path",{d:E,fill:"none",className:"react-flow__connection-path",style:r})};Ka.displayName="ConnectionLine";const ja=e=>({nodeId:e.connectionNodeId,handleType:e.connectionHandleType,nodesConnectable:e.nodesConnectable,connectionStatus:e.connectionStatus,width:e.width,height:e.height});function qa({containerStyle:e,style:n,type:r,component:i}){const{nodeId:a,handleType:s,nodesConnectable:l,width:c,height:u,connectionStatus:d}=ko(ja,b);return!!(a&&s&&c&&l)?t.createElement("svg",{style:e,width:c,height:u,className:"react-flow__edges react-flow__connectionline react-flow__container"},t.createElement("g",{className:o(["react-flow__connection",d])},t.createElement(Ka,{nodeId:a,handleType:s,style:n,type:r,CustomComponent:i,connectionStatus:d}))):null}function Ua(e,n){t.useRef(null),Po();return t.useMemo((()=>n(e)),[e])}const Ga=({nodeTypes:e,edgeTypes:n,onMove:o,onMoveStart:r,onMoveEnd:i,onInit:a,onNodeClick:s,onEdgeClick:l,onNodeDoubleClick:c,onEdgeDoubleClick:u,onNodeMouseEnter:d,onNodeMouseMove:h,onNodeMouseLeave:f,onNodeContextMenu:g,onSelectionContextMenu:p,onSelectionStart:m,onSelectionEnd:y,connectionLineType:v,connectionLineStyle:b,connectionLineComponent:w,connectionLineContainerStyle:S,selectionKeyCode:x,selectionOnDrag:E,selectionMode:C,multiSelectionKeyCode:_,panActivationKeyCode:N,zoomActivationKeyCode:M,deleteKeyCode:k,onlyRenderVisibleElements:P,elementsSelectable:A,selectNodesOnDrag:O,defaultViewport:R,translateExtent:I,minZoom:z,maxZoom:D,preventScrolling:B,defaultMarkerColor:$,zoomOnScroll:T,zoomOnPinch:V,panOnScroll:H,panOnScrollSpeed:L,panOnScrollMode:X,zoomOnDoubleClick:Y,panOnDrag:F,onPaneClick:W,onPaneMouseEnter:Z,onPaneMouseMove:K,onPaneMouseLeave:j,onPaneScroll:q,onPaneContextMenu:U,onEdgeContextMenu:G,onEdgeMouseEnter:Q,onEdgeMouseMove:J,onEdgeMouseLeave:ee,onReconnect:te,onReconnectStart:ne,onReconnectEnd:oe,reconnectRadius:re,noDragClassName:ie,noWheelClassName:ae,noPanClassName:se,elevateEdgesOnSelect:le,disableKeyboardA11y:ce,nodeOrigin:ue,nodeExtent:de,rfId:he})=>{const fe=Ua(e,Sa),ge=Ua(n,Oa);return function(e){const n=Bi(),o=t.useRef(!1);t.useEffect((()=>{!o.current&&n.viewportInitialized&&e&&(setTimeout((()=>e(n)),1),o.current=!0)}),[e,n.viewportInitialized])}(a),t.createElement(wa,{onPaneClick:W,onPaneMouseEnter:Z,onPaneMouseMove:K,onPaneMouseLeave:j,onPaneContextMenu:U,onPaneScroll:q,deleteKeyCode:k,selectionKeyCode:x,selectionOnDrag:E,selectionMode:C,onSelectionStart:m,onSelectionEnd:y,multiSelectionKeyCode:_,panActivationKeyCode:N,zoomActivationKeyCode:M,elementsSelectable:A,onMove:o,onMoveStart:r,onMoveEnd:i,zoomOnScroll:T,zoomOnPinch:V,zoomOnDoubleClick:Y,panOnScroll:H,panOnScrollSpeed:L,panOnScrollMode:X,panOnDrag:F,defaultViewport:R,translateExtent:I,minZoom:z,maxZoom:D,onSelectionContextMenu:p,preventScrolling:B,noDragClassName:ie,noWheelClassName:ae,noPanClassName:se,disableKeyboardA11y:ce},t.createElement(Wa,null,t.createElement(Ya,{edgeTypes:ge,onEdgeClick:l,onEdgeDoubleClick:u,onlyRenderVisibleElements:P,onEdgeContextMenu:G,onEdgeMouseEnter:Q,onEdgeMouseMove:J,onEdgeMouseLeave:ee,onReconnect:te,onReconnectStart:ne,onReconnectEnd:oe,reconnectRadius:re,defaultMarkerColor:$,noPanClassName:se,elevateEdgesOnSelect:!!le,disableKeyboardA11y:ce,rfId:he},t.createElement(qa,{style:b,type:v,component:w,containerStyle:S})),t.createElement("div",{className:"react-flow__edgelabel-renderer"}),t.createElement(Ca,{nodeTypes:fe,onNodeClick:s,onNodeDoubleClick:c,onNodeMouseEnter:d,onNodeMouseMove:h,onNodeMouseLeave:f,onNodeContextMenu:g,selectNodesOnDrag:O,onlyRenderVisibleElements:P,noPanClassName:se,noDragClassName:ie,disableKeyboardA11y:ce,nodeOrigin:ue,nodeExtent:de,rfId:he})))};Ga.displayName="GraphView";var Qa=t.memo(Ga);const Ja=[[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY]],es={rfId:"1",width:0,height:0,transform:[0,0,1],nodeInternals:new Map,edges:[],onNodesChange:null,onEdgesChange:null,hasDefaultNodes:!1,hasDefaultEdges:!1,d3Zoom:null,d3Selection:null,d3ZoomHandler:void 0,minZoom:.5,maxZoom:2,translateExtent:Ja,nodeExtent:Ja,nodesSelectionActive:!1,userSelectionActive:!1,userSelectionRect:null,connectionNodeId:null,connectionHandleId:null,connectionHandleType:"source",connectionPosition:{x:0,y:0},connectionStatus:null,connectionMode:e.ConnectionMode.Strict,domNode:null,paneDragging:!1,noPanClassName:"nopan",nodeOrigin:[0,0],nodeDragThreshold:0,snapGrid:[15,15],snapToGrid:!1,nodesDraggable:!0,nodesConnectable:!0,nodesFocusable:!0,edgesFocusable:!0,edgesUpdatable:!0,elementsSelectable:!0,elevateNodesOnSelect:!0,fitViewOnInit:!1,fitViewOnInitDone:!1,fitViewOnInitOptions:void 0,onSelectionChange:[],multiSelectionActive:!1,connectionStartHandle:null,connectionEndHandle:null,connectionClickStartHandle:null,connectOnClick:!0,ariaLiveMessage:"",autoPanOnConnect:!0,autoPanOnNodeDrag:!0,connectionRadius:20,onError:(e,t)=>{},isValidConnection:void 0},ts=()=>{return e=(e,t)=>({...es,setNodes:n=>{const{nodeInternals:o,nodeOrigin:r,elevateNodesOnSelect:i}=t();e({nodeInternals:ki(n,o,r,i)})},getNodes:()=>Array.from(t().nodeInternals.values()),setEdges:n=>{const{defaultEdgeOptions:o={}}=t();e({edges:n.map((e=>({...o,...e})))})},setDefaultNodesAndEdges:(n,o)=>{const r=void 0!==n,i=void 0!==o,a=r?ki(n,new Map,t().nodeOrigin,t().elevateNodesOnSelect):new Map;e({nodeInternals:a,edges:i?o:[],hasDefaultNodes:r,hasDefaultEdges:i})},updateNodeDimensions:n=>{const{onNodesChange:o,nodeInternals:r,fitViewOnInit:i,fitViewOnInitDone:a,fitViewOnInitOptions:s,domNode:l,nodeOrigin:c}=t(),u=l?.querySelector(".react-flow__viewport");if(!u)return;const d=window.getComputedStyle(u),{m22:h}=new window.DOMMatrixReadOnly(d.transform),f=n.reduce(((e,t)=>{const n=r.get(t.id);if(n?.hidden)r.set(n.id,{...n,[Ko]:{...n[Ko],handleBounds:void 0}});else if(n){const o=zo(t.nodeElement);o.width&&o.height&&(n.width!==o.width||n.height!==o.height||t.forceUpdate)&&(r.set(n.id,{...n,[Ko]:{...n[Ko],handleBounds:{source:sa(".source",t.nodeElement,h,c),target:sa(".target",t.nodeElement,h,c)}},...o}),e.push({id:n.id,type:"dimensions",dimensions:o}))}return e}),[]);Mi(r,c);const g=a||i&&!a&&Pi(t,{initial:!0,...s});e({nodeInternals:new Map(r),fitViewOnInitDone:g}),f?.length>0&&o?.(f)},updateNodePositions:(e,n=!0,o=!1)=>{const{triggerNodeChanges:r}=t();r(e.map((e=>{const t={id:e.id,type:"position",dragging:o};return n&&(t.positionAbsolute=e.positionAbsolute,t.position=e.position),t})))},triggerNodeChanges:n=>{const{onNodesChange:o,nodeInternals:r,hasDefaultNodes:i,nodeOrigin:a,getNodes:s,elevateNodesOnSelect:l}=t();if(n?.length){if(i){const t=ki(qi(n,s()),r,a,l);e({nodeInternals:t})}o?.(n)}},addSelectedNodes:n=>{const{multiSelectionActive:o,edges:r,getNodes:i}=t();let a,s=null;o?a=n.map((e=>Gi(e,!0))):(a=Qi(i(),n),s=Qi(r,[])),Ri({changedNodes:a,changedEdges:s,get:t,set:e})},addSelectedEdges:n=>{const{multiSelectionActive:o,edges:r,getNodes:i}=t();let a,s=null;o?a=n.map((e=>Gi(e,!0))):(a=Qi(r,n),s=Qi(i(),[])),Ri({changedNodes:s,changedEdges:a,get:t,set:e})},unselectNodesAndEdges:({nodes:n,edges:o}={})=>{const{edges:r,getNodes:i}=t(),a=o||r;Ri({changedNodes:(n||i()).map((e=>(e.selected=!1,Gi(e.id,!1)))),changedEdges:a.map((e=>Gi(e.id,!1))),get:t,set:e})},setMinZoom:n=>{const{d3Zoom:o,maxZoom:r}=t();o?.scaleExtent([n,r]),e({minZoom:n})},setMaxZoom:n=>{const{d3Zoom:o,minZoom:r}=t();o?.scaleExtent([r,n]),e({maxZoom:n})},setTranslateExtent:n=>{t().d3Zoom?.translateExtent(n),e({translateExtent:n})},resetSelectedElements:()=>{const{edges:n,getNodes:o}=t();Ri({changedNodes:o().filter((e=>e.selected)).map((e=>Gi(e.id,!1))),changedEdges:n.filter((e=>e.selected)).map((e=>Gi(e.id,!1))),get:t,set:e})},setNodeExtent:n=>{const{nodeInternals:o}=t();o.forEach((e=>{e.positionAbsolute=Bo(e.position,n)})),e({nodeExtent:n,nodeInternals:new Map(o)})},panBy:e=>{const{transform:n,width:o,height:r,d3Zoom:i,d3Selection:a,translateExtent:s}=t();if(!i||!a||!e.x&&!e.y)return!1;const l=ao.translate(n[0]+e.x,n[1]+e.y).scale(n[2]),c=[[0,0],[o,r]],u=i?.constrain()(l,c,s);return i.transform(a,u),n[0]!==u.x||n[1]!==u.y||n[2]!==u.k},cancelConnection:()=>e({connectionNodeId:es.connectionNodeId,connectionHandleId:es.connectionHandleId,connectionHandleType:es.connectionHandleType,connectionStatus:es.connectionStatus,connectionStartHandle:es.connectionStartHandle,connectionEndHandle:es.connectionEndHandle}),reset:()=>e({...es})}),t=Object.is,e?v(e,t):v;var e,t},ns=({children:e})=>{const n=t.useRef(null);return n.current||(n.current=ts()),t.createElement(vo,{value:n.current},e)};ns.displayName="ReactFlowProvider";const os=({children:e})=>t.useContext(yo)?t.createElement(t.Fragment,null,e):t.createElement(ns,null,e);os.displayName="ReactFlowWrapper";const rs={input:ni,default:ei,output:ri,group:ii},is={default:Er,straight:br,step:yr,smoothstep:mr,simplebezier:dr},as=[0,0],ss=[15,15],ls={x:0,y:0,zoom:1},cs={width:"100%",height:"100%",overflow:"hidden",position:"relative",zIndex:0},us=t.forwardRef((({nodes:n,edges:r,defaultNodes:i,defaultEdges:a,className:s,nodeTypes:l=rs,edgeTypes:c=is,onNodeClick:u,onEdgeClick:d,onInit:h,onMove:f,onMoveStart:g,onMoveEnd:p,onConnect:m,onConnectStart:y,onConnectEnd:v,onClickConnectStart:b,onClickConnectEnd:w,onNodeMouseEnter:S,onNodeMouseMove:x,onNodeMouseLeave:E,onNodeContextMenu:C,onNodeDoubleClick:_,onNodeDragStart:N,onNodeDrag:M,onNodeDragStop:k,onNodesDelete:P,onEdgesDelete:A,onSelectionChange:O,onSelectionDragStart:R,onSelectionDrag:I,onSelectionDragStop:z,onSelectionContextMenu:D,onSelectionStart:B,onSelectionEnd:$,connectionMode:T=e.ConnectionMode.Strict,connectionLineType:V=e.ConnectionLineType.Bezier,connectionLineStyle:H,connectionLineComponent:L,connectionLineContainerStyle:X,deleteKeyCode:Y="Backspace",selectionKeyCode:F="Shift",selectionOnDrag:W=!1,selectionMode:Z=e.SelectionMode.Full,panActivationKeyCode:K="Space",multiSelectionKeyCode:j=(Qo()?"Meta":"Control"),zoomActivationKeyCode:q=(Qo()?"Meta":"Control"),snapToGrid:U=!1,snapGrid:G=ss,onlyRenderVisibleElements:Q=!1,selectNodesOnDrag:J=!0,nodesDraggable:ee,nodesConnectable:te,nodesFocusable:ne,nodeOrigin:oe=as,edgesFocusable:re,edgesUpdatable:ie,elementsSelectable:ae,defaultViewport:se=ls,minZoom:le=.5,maxZoom:ce=2,translateExtent:ue=Ja,preventScrolling:de=!0,nodeExtent:he,defaultMarkerColor:fe="#b1b1b7",zoomOnScroll:ge=!0,zoomOnPinch:pe=!0,panOnScroll:me=!1,panOnScrollSpeed:ye=.5,panOnScrollMode:ve=e.PanOnScrollMode.Free,zoomOnDoubleClick:be=!0,panOnDrag:we=!0,onPaneClick:Se,onPaneMouseEnter:xe,onPaneMouseMove:Ee,onPaneMouseLeave:Ce,onPaneScroll:_e,onPaneContextMenu:Ne,children:Me,onEdgeContextMenu:ke,onEdgeDoubleClick:Pe,onEdgeMouseEnter:Ae,onEdgeMouseMove:Oe,onEdgeMouseLeave:Re,onEdgeUpdate:Ie,onEdgeUpdateStart:ze,onEdgeUpdateEnd:De,onReconnect:Be,onReconnectStart:$e,onReconnectEnd:Te,reconnectRadius:Ve=10,edgeUpdaterRadius:He=10,onNodesChange:Le,onEdgesChange:Xe,noDragClassName:Ye="nodrag",noWheelClassName:Fe="nowheel",noPanClassName:We="nopan",fitView:Ze=!1,fitViewOptions:Ke,connectOnClick:je=!0,attributionPosition:qe,proOptions:Ue,defaultEdgeOptions:Ge,elevateNodesOnSelect:Qe=!0,elevateEdgesOnSelect:Je=!1,disableKeyboardA11y:et=!1,autoPanOnConnect:tt=!0,autoPanOnNodeDrag:nt=!0,connectionRadius:ot=20,isValidConnection:rt,onError:it,style:at,id:st,nodeDragThreshold:lt,...ct},ut)=>{const dt=st||"1";return t.createElement("div",{...ct,style:{...at,...cs},ref:ut,className:o(["react-flow",s]),"data-testid":"rf__wrapper",id:st},t.createElement(os,null,t.createElement(Qa,{onInit:h,onMove:f,onMoveStart:g,onMoveEnd:p,onNodeClick:u,onEdgeClick:d,onNodeMouseEnter:S,onNodeMouseMove:x,onNodeMouseLeave:E,onNodeContextMenu:C,onNodeDoubleClick:_,nodeTypes:l,edgeTypes:c,connectionLineType:V,connectionLineStyle:H,connectionLineComponent:L,connectionLineContainerStyle:X,selectionKeyCode:F,selectionOnDrag:W,selectionMode:Z,deleteKeyCode:Y,multiSelectionKeyCode:j,panActivationKeyCode:K,zoomActivationKeyCode:q,onlyRenderVisibleElements:Q,selectNodesOnDrag:J,defaultViewport:se,translateExtent:ue,minZoom:le,maxZoom:ce,preventScrolling:de,zoomOnScroll:ge,zoomOnPinch:pe,zoomOnDoubleClick:be,panOnScroll:me,panOnScrollSpeed:ye,panOnScrollMode:ve,panOnDrag:we,onPaneClick:Se,onPaneMouseEnter:xe,onPaneMouseMove:Ee,onPaneMouseLeave:Ce,onPaneScroll:_e,onPaneContextMenu:Ne,onSelectionContextMenu:D,onSelectionStart:B,onSelectionEnd:$,onEdgeContextMenu:ke,onEdgeDoubleClick:Pe,onEdgeMouseEnter:Ae,onEdgeMouseMove:Oe,onEdgeMouseLeave:Re,onReconnect:Be??Ie,onReconnectStart:$e??ze,onReconnectEnd:Te??De,reconnectRadius:Ve??He,defaultMarkerColor:fe,noDragClassName:Ye,noWheelClassName:Fe,noPanClassName:We,elevateEdgesOnSelect:Je,rfId:dt,disableKeyboardA11y:et,nodeOrigin:oe,nodeExtent:he}),t.createElement(pi,{nodes:n,edges:r,defaultNodes:i,defaultEdges:a,onConnect:m,onConnectStart:y,onConnectEnd:v,onClickConnectStart:b,onClickConnectEnd:w,nodesDraggable:ee,nodesConnectable:te,nodesFocusable:ne,edgesFocusable:re,edgesUpdatable:ie,elementsSelectable:ae,elevateNodesOnSelect:Qe,minZoom:le,maxZoom:ce,nodeExtent:he,onNodesChange:Le,onEdgesChange:Xe,snapToGrid:U,snapGrid:G,connectionMode:T,translateExtent:ue,connectOnClick:je,defaultEdgeOptions:Ge,fitView:Ze,fitViewOptions:Ke,onNodesDelete:P,onEdgesDelete:A,onNodeDragStart:N,onNodeDrag:M,onNodeDragStop:k,onSelectionDrag:I,onSelectionDragStart:R,onSelectionDragStop:z,noPanClassName:We,nodeOrigin:oe,rfId:dt,autoPanOnConnect:tt,autoPanOnNodeDrag:nt,onError:it,connectionRadius:ot,isValidConnection:rt,nodeDragThreshold:lt}),t.createElement(di,{onSelectionChange:O}),Me,t.createElement(Ro,{proOptions:Ue,position:qe}),t.createElement(xi,{rfId:dt,disableKeyboardA11y:et})))}));us.displayName="ReactFlow";const ds=e=>e.domNode?.querySelector(".react-flow__edgelabel-renderer");const hs=e=>e.getNodes();const fs=e=>e.edges;const gs=e=>({x:e.transform[0],y:e.transform[1],zoom:e.transform[2]});function ps(e){return n=>{const[o,r]=t.useState(n),i=t.useCallback((t=>r((n=>e(t,n)))),[]);return[o,r,i]}}const ms=ps(qi),ys=ps(Ui);const vs={includeHiddenNodes:!1};const bs=({id:e,x:n,y:r,width:i,height:a,style:s,color:l,strokeColor:c,strokeWidth:u,className:d,borderRadius:h,shapeRendering:f,onClick:g,selected:p})=>{const{background:m,backgroundColor:y}=s||{},v=l||m||y;return t.createElement("rect",{className:o(["react-flow__minimap-node",{selected:p},d]),x:n,y:r,rx:h,ry:h,width:i,height:a,fill:v,stroke:c,strokeWidth:u,shapeRendering:f,onClick:g?t=>g(t,e):void 0})};bs.displayName="MiniMapNode";var ws=t.memo(bs);const Ss=e=>e.nodeOrigin,xs=e=>e.getNodes().filter((e=>!e.hidden&&e.width&&e.height)),Es=e=>e instanceof Function?e:()=>e;var Cs=t.memo((function({nodeStrokeColor:e="transparent",nodeColor:n="#e2e2e2",nodeClassName:o="",nodeBorderRadius:r=5,nodeStrokeWidth:i=2,nodeComponent:a=ws,onClick:s}){const l=ko(xs,b),c=ko(Ss),u=Es(n),d=Es(e),h=Es(o),f="undefined"==typeof window||window.chrome?"crispEdges":"geometricPrecision";return t.createElement(t.Fragment,null,l.map((e=>{const{x:n,y:o}=Dr(e,c).positionAbsolute;return t.createElement(a,{key:e.id,x:n,y:o,width:e.width,height:e.height,style:e.style,selected:e.selected,className:h(e),color:u(e),borderRadius:r,strokeColor:d(e),strokeWidth:i,shapeRendering:f,onClick:s,id:e.id})})))}));const _s=e=>{const t=e.getNodes(),n={x:-e.transform[0]/e.transform[2],y:-e.transform[1]/e.transform[2],width:e.width/e.transform[2],height:e.height/e.transform[2]};return{viewBB:n,boundingRect:t.length>0?Fo(Br(t,e.nodeOrigin),n):n,rfId:e.rfId}};function Ns({style:e,className:n,nodeStrokeColor:r="transparent",nodeColor:i="#e2e2e2",nodeClassName:a="",nodeBorderRadius:s=5,nodeStrokeWidth:l=2,nodeComponent:c,maskColor:u="rgb(240, 240, 240, 0.6)",maskStrokeColor:d="none",maskStrokeWidth:h=1,position:f="bottom-right",onClick:g,onNodeClick:p,pannable:m=!1,zoomable:y=!1,ariaLabel:v="React Flow mini map",inversePan:w=!1,zoomStep:S=10,offsetScale:x=5}){const E=Po(),C=t.useRef(null),{boundingRect:_,viewBB:N,rfId:M}=ko(_s,b),k=e?.width??200,P=e?.height??150,A=_.width/k,O=_.height/P,R=Math.max(A,O),I=R*k,z=R*P,D=x*R,B=_.x-(I-_.width)/2-D,$=_.y-(z-_.height)/2-D,T=I+2*D,V=z+2*D,H=`react-flow__minimap-desc-${M}`,L=t.useRef(0);L.current=R,t.useEffect((()=>{if(C.current){const e=He(C.current),t=e=>{const{transform:t,d3Selection:n,d3Zoom:o}=E.getState();if("wheel"!==e.sourceEvent.type||!n||!o)return;const r=-e.sourceEvent.deltaY*(1===e.sourceEvent.deltaMode?.05:e.sourceEvent.deltaMode?1:.002)*S,i=t[2]*Math.pow(2,r);o.scaleTo(n,i)},n=e=>{const{transform:t,d3Selection:n,d3Zoom:o,translateExtent:r,width:i,height:a}=E.getState();if("mousemove"!==e.sourceEvent.type||!n||!o)return;const s=L.current*Math.max(1,t[2])*(w?-1:1),l={x:t[0]-e.sourceEvent.movementX*s,y:t[1]-e.sourceEvent.movementY*s},c=[[0,0],[i,a]],u=ao.translate(l.x,l.y).scale(t[2]),d=o.constrain()(u,c,r);o.transform(n,d)},o=mo().on("zoom",m?n:null).on("zoom.wheel",y?t:null);return e.call(o),()=>{e.on("zoom",null)}}}),[m,y,w,S]);const X=g?e=>{const t=Le(e);g(e,{x:t[0],y:t[1]})}:void 0,Y=p?(e,t)=>{const n=E.getState().nodeInternals.get(t);p(e,n)}:void 0;return t.createElement(Oo,{position:f,style:e,className:o(["react-flow__minimap",n]),"data-testid":"rf__minimap"},t.createElement("svg",{width:k,height:P,viewBox:`${B} ${$} ${T} ${V}`,role:"img","aria-labelledby":H,ref:C,onClick:X},v&&t.createElement("title",{id:H},v),t.createElement(Cs,{onClick:Y,nodeColor:i,nodeStrokeColor:r,nodeBorderRadius:s,nodeClassName:a,nodeStrokeWidth:l,nodeComponent:c}),t.createElement("path",{className:"react-flow__minimap-mask",d:`M${B-D},${$-D}h${T+2*D}v${V+2*D}h${-T-2*D}z\n        M${N.x},${N.y}h${N.width}v${N.height}h${-N.width}z`,fill:u,fillRule:"evenodd",stroke:d,strokeWidth:h,pointerEvents:"none"})))}Ns.displayName="MiniMap";var Ms=t.memo(Ns);function ks(e,t){if(Object.is(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(const[n,o]of e)if(!Object.is(o,t.get(n)))return!1;return!0}if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0}const n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(let o=0;o<n.length;o++)if(!Object.prototype.hasOwnProperty.call(t,n[o])||!Object.is(e[n[o]],t[n[o]]))return!1;return!0}function Ps(){return t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32"},t.createElement("path",{d:"M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"}))}function As(){return t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 5"},t.createElement("path",{d:"M0 0h32v4.2H0z"}))}function Os(){return t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 30"},t.createElement("path",{d:"M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"}))}function Rs(){return t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 25 32"},t.createElement("path",{d:"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"}))}function Is(){return t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 25 32"},t.createElement("path",{d:"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"}))}const zs=({children:e,className:n,...r})=>t.createElement("button",{type:"button",className:o(["react-flow__controls-button",n]),...r},e);zs.displayName="ControlButton";const Ds=e=>({isInteractive:e.nodesDraggable||e.nodesConnectable||e.elementsSelectable,minZoomReached:e.transform[2]<=e.minZoom,maxZoomReached:e.transform[2]>=e.maxZoom}),Bs=({style:e,showZoom:n=!0,showFitView:r=!0,showInteractive:i=!0,fitViewOptions:a,onZoomIn:s,onZoomOut:l,onFitView:c,onInteractiveChange:u,className:d,children:h,position:f="bottom-left"})=>{const g=Po(),[p,m]=t.useState(!1),{isInteractive:y,minZoomReached:v,maxZoomReached:b}=ko(Ds,ks),{zoomIn:w,zoomOut:S,fitView:x}=Bi();if(t.useEffect((()=>{m(!0)}),[]),!p)return null;return t.createElement(Oo,{className:o(["react-flow__controls",d]),position:f,style:e,"data-testid":"rf__controls"},n&&t.createElement(t.Fragment,null,t.createElement(zs,{onClick:()=>{w(),s?.()},className:"react-flow__controls-zoomin",title:"zoom in","aria-label":"zoom in",disabled:b},t.createElement(Ps,null)),t.createElement(zs,{onClick:()=>{S(),l?.()},className:"react-flow__controls-zoomout",title:"zoom out","aria-label":"zoom out",disabled:v},t.createElement(As,null))),r&&t.createElement(zs,{className:"react-flow__controls-fitview",onClick:()=>{x(a),c?.()},title:"fit view","aria-label":"fit view"},t.createElement(Os,null)),i&&t.createElement(zs,{className:"react-flow__controls-interactive",onClick:()=>{g.setState({nodesDraggable:!y,nodesConnectable:!y,elementsSelectable:!y}),u?.(!y)},title:"toggle interactivity","aria-label":"toggle interactivity"},y?t.createElement(Is,null):t.createElement(Rs,null)),h)};Bs.displayName="Controls";var $s,Ts=t.memo(Bs);function Vs({color:e,dimensions:n,lineWidth:o}){return t.createElement("path",{stroke:e,strokeWidth:o,d:`M${n[0]/2} 0 V${n[1]} M0 ${n[1]/2} H${n[0]}`})}function Hs({color:e,radius:n}){return t.createElement("circle",{cx:n,cy:n,r:n,fill:e})}e.BackgroundVariant=void 0,($s=e.BackgroundVariant||(e.BackgroundVariant={})).Lines="lines",$s.Dots="dots",$s.Cross="cross";const Ls={[e.BackgroundVariant.Dots]:"#91919a",[e.BackgroundVariant.Lines]:"#eee",[e.BackgroundVariant.Cross]:"#e2e2e2"},Xs={[e.BackgroundVariant.Dots]:1,[e.BackgroundVariant.Lines]:1,[e.BackgroundVariant.Cross]:6},Ys=e=>({transform:e.transform,patternId:`pattern-${e.rfId}`});function Fs({id:n,variant:r=e.BackgroundVariant.Dots,gap:i=20,size:a,lineWidth:s=1,offset:l=2,color:c,style:u,className:d}){const h=t.useRef(null),{transform:f,patternId:g}=ko(Ys,b),p=c||Ls[r],m=a||Xs[r],y=r===e.BackgroundVariant.Dots,v=r===e.BackgroundVariant.Cross,w=Array.isArray(i)?i:[i,i],S=[w[0]*f[2]||1,w[1]*f[2]||1],x=m*f[2],E=v?[x,x]:S,C=y?[x/l,x/l]:[E[0]/l,E[1]/l];return t.createElement("svg",{className:o(["react-flow__background",d]),style:{...u,position:"absolute",width:"100%",height:"100%",top:0,left:0},ref:h,"data-testid":"rf__background"},t.createElement("pattern",{id:g+n,x:f[0]%S[0],y:f[1]%S[1],width:S[0],height:S[1],patternUnits:"userSpaceOnUse",patternTransform:`translate(-${C[0]},-${C[1]})`},y?t.createElement(Hs,{color:p,radius:x/l}):t.createElement(Vs,{dimensions:E,color:p,lineWidth:s})),t.createElement("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:`url(#${g+n})`}))}Fs.displayName="Background";var Ws=t.memo(Fs);const Zs=e=>e.domNode?.querySelector(".react-flow__renderer");function Ks({children:e}){const t=ko(Zs);return t?n.createPortal(e,t):null}const js=(e,t)=>e.length===t.length&&e.every(((e,n)=>((e,t)=>e?.positionAbsolute?.x===t?.positionAbsolute?.x&&e?.positionAbsolute?.y===t?.positionAbsolute?.y&&e?.width===t?.width&&e?.height===t?.height&&e?.selected===t?.selected&&e?.[Ko]?.z===t?.[Ko]?.z)(e,t[n]))),qs=e=>({transform:e.transform,nodeOrigin:e.nodeOrigin,selectedNodesCount:e.getNodes().filter((e=>e.selected)).length});function Us(t,n,o,r,i){let a=.5;"start"===i?a=0:"end"===i&&(a=1);let s=[(t.x+t.width*a)*n[2]+n[0],t.y*n[2]+n[1]-r],l=[-100*a,-100];switch(o){case e.Position.Right:s=[(t.x+t.width)*n[2]+n[0]+r,(t.y+t.height*a)*n[2]+n[1]],l=[0,-100*a];break;case e.Position.Bottom:s[1]=(t.y+t.height)*n[2]+n[1]+r,l[1]=0;break;case e.Position.Left:s=[t.x*n[2]+n[0]-r,(t.y+t.height*a)*n[2]+n[1]],l=[-100,-100*a]}return`translate(${s[0]}px, ${s[1]}px) translate(${l[0]}%, ${l[1]}%)`}var Gs;e.ResizeControlVariant=void 0,(Gs=e.ResizeControlVariant||(e.ResizeControlVariant={})).Line="line",Gs.Handle="handle";const Qs={width:0,height:0,x:0,y:0},Js={...Qs,pointerX:0,pointerY:0,aspectRatio:1};var el=t.memo((function({nodeId:n,position:r,variant:i=e.ResizeControlVariant.Handle,className:a,style:s={},children:l,color:c,minWidth:u=10,minHeight:d=10,maxWidth:h=Number.MAX_VALUE,maxHeight:f=Number.MAX_VALUE,keepAspectRatio:g=!1,shouldResize:p,onResizeStart:m,onResize:y,onResizeEnd:v}){const b=Nr(),w="string"==typeof n?n:b,S=Po(),x=t.useRef(null),E=t.useRef(Js),C=t.useRef(Qs),_=ua(),N=i===e.ResizeControlVariant.Line?"right":"bottom-right",M=r??N;t.useEffect((()=>{if(!x.current||!w)return;const e=He(x.current),t=M.includes("right")||M.includes("left"),n=M.includes("bottom")||M.includes("top"),o=M.includes("left"),r=M.includes("top"),i=et().on("start",(e=>{const t=S.getState().nodeInternals.get(w),{xSnapped:n,ySnapped:o}=_(e);C.current={width:t?.width??0,height:t?.height??0,x:t?.position.x??0,y:t?.position.y??0},E.current={...C.current,pointerX:n,pointerY:o,aspectRatio:C.current.width/C.current.height},m?.(e,{...C.current})})).on("drag",(e=>{const{nodeInternals:i,triggerNodeChanges:a}=S.getState(),{xSnapped:s,ySnapped:l}=_(e),c=i.get(w);if(c){const i=[],{pointerX:m,pointerY:v,width:b,height:S,x:x,y:_,aspectRatio:N}=E.current,{x:M,y:k,width:P,height:A}=C.current,O=Math.floor(t?s-m:0),R=Math.floor(n?l-v:0);let I=Do(b+(o?-O:O),u,h),z=Do(S+(r?-R:R),d,f);if(g){const e=I/z,o=t&&n;I=e<=N&&o||n&&!t?z*N:I,z=e>N&&o||t&&!n?I/N:z,I>=h?(I=h,z=h/N):I<=u&&(I=u,z=u/N),z>=f?(z=f,I=f*N):z<=d&&(z=d,I=d*N)}const D=I!==P,B=z!==A;if(o||r){const e=o?x-(I-b):x,t=r?_-(z-S):_,n=e!==M&&D,a=t!==k&&B;if(n||a){const o={id:c.id,type:"position",position:{x:n?e:M,y:a?t:k}};i.push(o),C.current.x=o.position.x,C.current.y=o.position.y}}if(D||B){const e={id:w,type:"dimensions",updateStyle:!0,resizing:!0,dimensions:{width:I,height:z}};i.push(e),C.current.width=I,C.current.height=z}if(0===i.length)return;const $=function({width:e,prevWidth:t,height:n,prevHeight:o,invertX:r,invertY:i}){const a=e-t,s=n-o,l=[a>0?1:a<0?-1:0,s>0?1:s<0?-1:0];return a&&r&&(l[0]=-1*l[0]),s&&i&&(l[1]=-1*l[1]),l}({width:C.current.width,prevWidth:P,height:C.current.height,prevHeight:A,invertX:o,invertY:r}),T={...C.current,direction:$},V=p?.(e,T);if(!1===V)return;y?.(e,T),a(i)}})).on("end",(e=>{const t={id:w,type:"dimensions",resizing:!1};v?.(e,{...C.current}),S.getState().triggerNodeChanges([t])}));return e.call(i),()=>{e.on(".drag",null)}}),[w,M,u,d,h,f,g,_,m,y,v]);const k=M.split("-"),P=i===e.ResizeControlVariant.Line?"borderColor":"backgroundColor",A=c?{...s,[P]:c}:s;return t.createElement("div",{className:o(["react-flow__resize-control","nodrag",...k,i,a]),ref:x,style:A},l)}));const tl=["top-left","top-right","bottom-left","bottom-right"],nl=["top","right","bottom","left"];e.Background=Ws,e.BaseEdge=Jo,e.BezierEdge=Er,e.ControlButton=zs,e.Controls=Ts,e.EdgeLabelRenderer=function({children:e}){const t=ko(ds);return t?n.createPortal(e,t):null},e.EdgeText=Io,e.Handle=Qr,e.MiniMap=Ms,e.NodeResizeControl=el,e.NodeResizer=function({nodeId:n,isVisible:o=!0,handleClassName:r,handleStyle:i,lineClassName:a,lineStyle:s,color:l,minWidth:c=10,minHeight:u=10,maxWidth:d=Number.MAX_VALUE,maxHeight:h=Number.MAX_VALUE,keepAspectRatio:f=!1,shouldResize:g,onResizeStart:p,onResize:m,onResizeEnd:y}){return o?t.createElement(t.Fragment,null,nl.map((o=>t.createElement(el,{key:o,className:a,style:s,nodeId:n,position:o,variant:e.ResizeControlVariant.Line,color:l,minWidth:c,minHeight:u,maxWidth:d,maxHeight:h,onResizeStart:p,keepAspectRatio:f,shouldResize:g,onResize:m,onResizeEnd:y}))),tl.map((e=>t.createElement(el,{key:e,className:r,style:i,nodeId:n,position:e,color:l,minWidth:c,minHeight:u,maxWidth:d,maxHeight:h,onResizeStart:p,keepAspectRatio:f,shouldResize:g,onResize:m,onResizeEnd:y})))):null},e.NodeToolbar=function({nodeId:n,children:r,className:i,style:a,isVisible:s,position:l=e.Position.Top,offset:c=10,align:u="center",...d}){const h=Nr(),f=t.useCallback((e=>(Array.isArray(n)?n:[n||h||""]).reduce(((t,n)=>{const o=e.nodeInternals.get(n);return o&&t.push(o),t}),[])),[n,h]),g=ko(f,js),{transform:p,nodeOrigin:m,selectedNodesCount:y}=ko(qs,b);if(!("boolean"==typeof s?s:1===g.length&&g[0].selected&&1===y)||!g.length)return null;const v=Br(g,m),w=Math.max(...g.map((e=>(e[Ko]?.z||1)+1))),S={position:"absolute",transform:Us(v,p,l,c,u),zIndex:w,...a};return t.createElement(Ks,null,t.createElement("div",{style:S,className:o(["react-flow__node-toolbar",i]),...d},r))},e.Panel=Oo,e.ReactFlow=us,e.ReactFlowProvider=ns,e.SimpleBezierEdge=dr,e.SmoothStepEdge=mr,e.StepEdge=yr,e.StraightEdge=br,e.addEdge=Or,e.applyEdgeChanges=Ui,e.applyNodeChanges=qi,e.boxToRect=Xo,e.clamp=Do,e.default=us,e.getBezierPath=xr,e.getBoundsOfRects=Fo,e.getConnectedEdges=Tr,e.getIncomers=(e,t,n)=>{if(!kr(e))return[];const o=n.filter((t=>t.target===e.id)).map((e=>e.source));return t.filter((e=>o.includes(e.id)))},e.getMarkerEnd=(e,t)=>void 0!==t&&t?`url(#${t})`:void 0!==e?`url(#react-flow__${e})`:"none",e.getNodePositionWithOrigin=Dr,e.getNodesBounds=Br,e.getOutgoers=(e,t,n)=>{if(!kr(e))return[];const o=n.filter((t=>t.source===e.id)).map((e=>e.target));return t.filter((e=>o.includes(e.id)))},e.getRectOfNodes=(e,t=[0,0])=>(console.warn("[DEPRECATED] `getRectOfNodes` is deprecated. Instead use `getNodesBounds` https://reactflow.dev/api-reference/utils/get-nodes-bounds."),Br(e,t)),e.getSimpleBezierPath=ur,e.getSmoothStepPath=pr,e.getStraightPath=vr,e.getTransformForBounds=(e,t,n,o,r,i=.1)=>{const{x:a,y:s,zoom:l}=Vr(e,t,n,o,r,i);return console.warn("[DEPRECATED] `getTransformForBounds` is deprecated. Instead use `getViewportForBounds`. Beware that the return value is type Viewport (`{ x: number, y: number, zoom: number }`) instead of Transform (`[number, number, number]`). https://reactflow.dev/api-reference/utils/get-viewport-for-bounds"),[a,s,l]},e.getViewportForBounds=Vr,e.handleParentExpand=Ki,e.internalsSymbol=Ko,e.isEdge=Mr,e.isNode=kr,e.reconnectEdge=Rr,e.rectToBox=Lo,e.updateEdge=(e,t,n,o={shouldReplaceId:!0})=>(console.warn("[DEPRECATED] `updateEdge` is deprecated. Instead use `reconnectEdge` https://reactflow.dev/api-reference/utils/reconnect-edge"),Rr(e,t,n,o)),e.useEdges=function(){return ko(fs,b)},e.useEdgesState=ys,e.useGetPointerPosition=ua,e.useKeyPress=Ei,e.useNodeId=Nr,e.useNodes=function(){return ko(hs,b)},e.useNodesInitialized=function(e=vs){return ko((e=>t=>0!==t.nodeInternals.size&&t.getNodes().filter((t=>!!e.includeHiddenNodes||!t.hidden)).every((e=>void 0!==e[Ko]?.handleBounds)))(e))},e.useNodesState=ms,e.useOnSelectionChange=function({onChange:e}){const n=Po();t.useEffect((()=>{const t=[...n.getState().onSelectionChange,e];return n.setState({onSelectionChange:t}),()=>{const t=n.getState().onSelectionChange.filter((t=>t!==e));n.setState({onSelectionChange:t})}}),[e])},e.useOnViewportChange=function({onStart:e,onChange:n,onEnd:o}){const r=Po();t.useEffect((()=>{r.setState({onViewportChangeStart:e})}),[e]),t.useEffect((()=>{r.setState({onViewportChange:n})}),[n]),t.useEffect((()=>{r.setState({onViewportChangeEnd:o})}),[o])},e.useReactFlow=Bi,e.useStore=ko,e.useStoreApi=Po,e.useUpdateNodeInternals=function(){const e=Po();return t.useCallback((t=>{const{domNode:n,updateNodeDimensions:o}=e.getState(),r=(Array.isArray(t)?t:[t]).reduce(((e,t)=>{const o=n?.querySelector(`.react-flow__node[data-id="${t}"]`);return o&&e.push({id:t,nodeElement:o,forceUpdate:!0}),e}),[]);requestAnimationFrame((()=>o(r)))}),[])},e.useViewport=function(){return ko(gs,b)},Object.defineProperty(e,"__esModule",{value:!0})}));


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/ArchitectureBuilder.tsx":
/*!***************************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/ArchitectureBuilder.tsx ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArchitectureBuilder = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const mobx_react_1 = __webpack_require__(/*! mobx-react */ "mobx-react");
// @ts-ignore
const reactflow_1 = __importStar(__webpack_require__(/*! reactflow */ "./node_modules/reactflow/dist/umd/index.js"));
__webpack_require__(/*! reactflow/dist/style.css */ "./node_modules/reactflow/dist/style.css");
const html_to_image_1 = __webpack_require__(/*! html-to-image */ "../../node_modules/html-to-image/es/index.js");
const Sidebar_1 = __webpack_require__(/*! ./Sidebar */ "./typescript/components/ArchitectureBuilder/Sidebar.tsx");
const ArchitectureNode_1 = __webpack_require__(/*! ./ArchitectureNode */ "./typescript/components/ArchitectureBuilder/ArchitectureNode.tsx");
const ContainerNode_1 = __webpack_require__(/*! ./ContainerNode */ "./typescript/components/ArchitectureBuilder/ContainerNode.tsx");
const NoteLabelNode_1 = __webpack_require__(/*! ./NoteLabelNode */ "./typescript/components/ArchitectureBuilder/NoteLabelNode.tsx");
const CustomEdge_1 = __webpack_require__(/*! ./CustomEdge */ "./typescript/components/ArchitectureBuilder/CustomEdge.tsx");
const EdgeUtils_1 = __webpack_require__(/*! ./EdgeUtils */ "./typescript/components/ArchitectureBuilder/EdgeUtils.ts");
const useArchitectureFlowHandlers_1 = __webpack_require__(/*! ./useArchitectureFlowHandlers */ "./typescript/components/ArchitectureBuilder/useArchitectureFlowHandlers.ts");
const ComponentErrorBoundary_1 = __webpack_require__(/*! ../common/ComponentErrorBoundary */ "./typescript/components/common/ComponentErrorBoundary.tsx");
const constants_1 = __webpack_require__(/*! ./constants */ "./typescript/components/ArchitectureBuilder/constants.ts");
const StyleEditorModal_1 = __webpack_require__(/*! ./StyleEditorModal */ "./typescript/components/ArchitectureBuilder/StyleEditorModal.tsx");
const ContextMenu_1 = __webpack_require__(/*! ./ContextMenu */ "./typescript/components/ArchitectureBuilder/ContextMenu.tsx");
const useLongPress_1 = __webpack_require__(/*! ./useLongPress */ "./typescript/components/ArchitectureBuilder/useLongPress.ts");
const CanvasSearch_1 = __webpack_require__(/*! ./CanvasSearch */ "./typescript/components/ArchitectureBuilder/CanvasSearch.tsx");
// ─── Node types registration ──────────────────────────────────────────────────
const nodeTypes = { architecture: ArchitectureNode_1.ArchitectureNode, container: ContainerNode_1.ContainerNode, Note: NoteLabelNode_1.NoteLabelNode, Label: NoteLabelNode_1.NoteLabelNode };
const ArchitectureFlowInner = ({ selectedId }) => {
    const { setNodes } = reactflow_1.useReactFlow();
    const prevSelectedIdRef = React.useRef(null);
    React.useEffect(() => {
        const prev = prevSelectedIdRef.current;
        prevSelectedIdRef.current = selectedId;
        if (prev === selectedId)
            return;
        setNodes(nds => nds.map(n => {
            const shouldBeSelected = n.id === selectedId;
            const wasSelected = n.id === prev;
            if (!shouldBeSelected && !wasSelected)
                return n;
            return Object.assign(Object.assign({}, n), { selected: shouldBeSelected });
        }));
    }, [selectedId, setNodes]);
    return null;
};
const EMPTY_HANDLE_SET = new Set();
// ─── Utility functions (used only by ArchitectureBuilder) ─────────────────────
const extractDeep = (obj) => {
    if (obj === null || obj === undefined)
        return undefined;
    if (typeof obj !== 'object')
        return obj;
    if (Array.isArray(obj) || typeof obj.map === 'function')
        return obj.map((item) => extractDeep(item));
    const plain = {};
    for (const key in obj)
        plain[key] = extractDeep(obj[key]);
    return plain;
};
const mapIgnitionToReactFlowNodes = (ignitionNodes, paletteMap, handleGearClick, handleResizeEnd, handleTextChange, globalHideHandles, globalHandleCount, highlightedHandlesMap, isEditable, handleActionIconClick) => {
    if (!ignitionNodes)
        return [];
    return Object.entries(ignitionNodes)
        .filter(([id, nodeData]) => nodeData !== null && nodeData !== undefined)
        .map(([id, nodeData]) => {
        var _a, _b, _c;
        const palette = paletteMap.get(nodeData.paletteId);
        const isContainer = nodeData.paletteId === 'container';
        const isTextNode = constants_1.TEXT_NODE_PALETTE_IDS.has(nodeData.paletteId);
        const paletteImage = (nodeData.useOverrideImage && (palette === null || palette === void 0 ? void 0 : palette.overrideImage)) ? palette.overrideImage : (palette === null || palette === void 0 ? void 0 : palette.image) || '';
        let type = 'architecture';
        if (isContainer)
            type = 'container';
        else if (isTextNode)
            type = nodeData.paletteId;
        const isUnlocked = ((_a = nodeData.configs) === null || _a === void 0 ? void 0 : _a.unlocked) === true;
        return {
            id, type, selected: false,
            position: { x: nodeData.x || 0, y: nodeData.y || 0 },
            zIndex: isContainer ? ((_b = nodeData.zIndex) !== null && _b !== void 0 ? _b : -100) : 1000,
            style: {
                width: nodeData.width || (isContainer ? 300 : (isTextNode ? 150 : 150)),
                height: nodeData.height || (isContainer ? 300 : (isTextNode ? 80 : 150)),
                pointerEvents: (isContainer && !isUnlocked) ? 'none' : 'auto'
            },
            dragHandle: (isContainer && !isUnlocked) ? '.custom-drag-handle' : undefined,
            data: {
                label: nodeData.label || 'Unknown', image: paletteImage || nodeData.image || '', text: nodeData.text || '', tooltip: nodeData.tooltip || '', configs: nodeData.configs || {},
                style: nodeData.style || {}, labelStyle: nodeData.labelStyle || {}, textStyle: nodeData.textStyle || {},
                paletteId: nodeData.paletteId || 'unknown', inactive: nodeData.inactive || false,
                hideHandles: nodeData.hideHandles, globalHideHandles, handleCount: globalHandleCount,
                highlightedHandles: (_c = highlightedHandlesMap[id]) !== null && _c !== void 0 ? _c : EMPTY_HANDLE_SET,
                actionIcons: nodeData.actionIcons,
                isEditable,
                unlockMovement: isUnlocked,
                enableResize: isContainer || isTextNode,
                onGearClick: handleGearClick, onTextChange: handleTextChange,
                onResizeEnd: (isContainer || isTextNode) ? handleResizeEnd : undefined,
                onActionIconClick: handleActionIconClick,
            },
        };
    });
};
const isInsideContainer = (item, container) => {
    const iw = item.paletteId === 'container' ? (item.width || 300) : 150;
    const ih = item.paletteId === 'container' ? (item.height || 300) : 150;
    const cw = container.width || 300, ch = container.height || 300;
    if (iw >= cw || ih >= ch)
        return false;
    return item.x >= container.x && item.y >= container.y && item.x + iw <= container.x + cw && item.y + ih <= container.y + ch;
};
const computeHierarchyData = (nodesDict, edgesDict) => {
    const allEntries = Object.entries(nodesDict).filter(([, n]) => n);
    const containerEntries = allEntries.filter(([, n]) => n.paletteId === 'container');
    const containers = containerEntries.map(([id, n]) => (Object.assign({ id }, n)));
    const connectionsByNode = {};
    Object.entries(edgesDict).forEach(([edgeId, edge]) => {
        if (!edge)
            return;
        [edge.source, edge.target].forEach((nodeId) => {
            if (!nodeId)
                return;
            if (!connectionsByNode[nodeId])
                connectionsByNode[nodeId] = [];
            if (!connectionsByNode[nodeId].includes(edgeId))
                connectionsByNode[nodeId].push(edgeId);
        });
    });
    Object.values(connectionsByNode).forEach(arr => arr.sort());
    const cachedChains = new Map();
    const getChain = (item) => {
        if (cachedChains.has(item.id))
            return cachedChains.get(item.id);
        const chain = containers
            .filter(c => c.id !== item.id && isInsideContainer(item, c))
            .sort((a, b) => ((b.width || 300) * (b.height || 300)) - ((a.width || 300) * (a.height || 300)));
        cachedChains.set(item.id, chain);
        return chain;
    };
    const getDirectParent = (item) => {
        const chain = getChain(item);
        return chain.length > 0 ? chain[chain.length - 1].id : null;
    };
    const nodeEnrichments = {};
    allEntries.forEach(([id, n]) => {
        nodeEnrichments[id] = { hierarchy: getChain(Object.assign({ id }, n)).map(c => c.id), connections: connectionsByNode[id] || [] };
    });
    const treeMap = {};
    containers.forEach(c => { treeMap[c.id] = { id: c.id, typeId: c.typeId || 'container', label: c.label || '', areas: [], nodes: [] }; });
    containers.forEach(c => { const parent = getDirectParent(c); if (parent && treeMap[parent])
        treeMap[parent].areas.push(treeMap[c.id]); });
    allEntries.filter(([, n]) => n.paletteId !== 'container').forEach(([id, n]) => {
        const entry = { id, typeId: n.typeId || n.paletteId || '', label: n.label || '' };
        const parent = getDirectParent(Object.assign({ id }, n));
        if (parent && treeMap[parent])
            treeMap[parent].nodes.push(entry);
    });
    const rootHierarchy = {
        areas: containers.filter(c => getDirectParent(c) === null).map(c => treeMap[c.id]),
        nodes: allEntries.filter(([id, n]) => n.paletteId !== 'container' && getDirectParent(Object.assign({ id }, n)) === null).map(([id, n]) => ({ id, typeId: n.typeId || n.paletteId || '', label: n.label || '' })),
    };
    return { nodeEnrichments, rootHierarchy };
};
exports.ArchitectureBuilder = mobx_react_1.observer((props) => {
    var _a, _b, _c;
    const reactFlowWrapper = React.useRef(null);
    const wrapperBoundsRef = React.useRef({ top: 0, left: 0 });
    const clipboardRef = React.useRef(null);
    const draggedItemRef = React.useRef(null);
    const hierarchyWriteRef = React.useRef('');
    const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [styleEditorNodeId, setStyleEditorNodeId] = React.useState(null);
    const [contextMenu, setContextMenu] = React.useState(null);
    const [activeSubMenu, setActiveSubMenu] = React.useState(null);
    const [selectedId, setSelectedId] = React.useState(null);
    const [canvasSearchOpen, setCanvasSearchOpen] = React.useState(false);
    const [localNodes, setLocalNodes] = React.useState([]);
    const [localEdges, setLocalEdges] = React.useState([]);
    const [hoveredEdgeId, setHoveredEdgeId] = React.useState(null);
    // Suppress ResizeObserver loop limit exceeded error which can cause white-screen in Ignition Designer
    React.useEffect(() => {
        const suppressResizeObserverError = (e) => {
            if (e.message && (e.message.includes('ResizeObserver loop') || e.message.includes('ResizeObserver loop limit exceeded'))) {
                e.stopImmediatePropagation();
                e.preventDefault();
            }
        };
        const handleOnError = (msg) => {
            if (typeof msg === 'string' && (msg.includes('ResizeObserver loop') || msg.includes('ResizeObserver loop limit exceeded'))) {
                return true;
            }
            return false;
        };
        window.addEventListener('error', suppressResizeObserverError, true);
        const oldOnError = window.onerror;
        window.onerror = handleOnError;
        return () => {
            window.removeEventListener('error', suppressResizeObserverError, true);
            window.onerror = oldOnError;
        };
    }, []);
    // Cache wrapper bounds so context-menu event handlers don't need to call getBoundingClientRect()
    // on every right-click, avoiding forced reflows during React commit phases at high node counts.
    React.useEffect(() => {
        const el = reactFlowWrapper.current;
        if (!el)
            return;
        const update = () => {
            const r = el.getBoundingClientRect();
            wrapperBoundsRef.current = { top: r.top, left: r.left };
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);
    // Set document title and html[lang] for accessibility (WCAG 2.4.2, 3.1.1).
    // Both are restored on unmount so other Ignition views are not affected.
    React.useEffect(() => {
        const prevTitle = document.title;
        document.title = 'Architecture Builder';
        return () => { document.title = prevTitle; };
    }, []);
    React.useEffect(() => {
        const prevLang = document.documentElement.getAttribute('lang');
        document.documentElement.setAttribute('lang', 'en');
        return () => {
            if (prevLang === null)
                document.documentElement.removeAttribute('lang');
            else
                document.documentElement.setAttribute('lang', prevLang);
        };
    }, []);
    // ─── Prop extraction ───────────────────────────────────────────────────
    // Wrapped in useMemo so extractDeep (deep MobX clone) and JSON.stringify
    // only run when the relevant prop reference actually changes, not on every render.
    const rawNodesJson = React.useMemo(() => JSON.stringify(extractDeep(props.props.nodes) || {}), [props.props.nodes]);
    const rawEdgesJson = React.useMemo(() => JSON.stringify(extractDeep(props.props.edges) || {}), [props.props.edges]);
    const connectionTypesJson = React.useMemo(() => JSON.stringify(extractDeep(props.props.connectionTypes) || {}), [props.props.connectionTypes]);
    // No useMemo here — Perspective mutates this observable in place on write, so the
    // reference never changes. Computing without memo lets MobX track deep changes.
    const nodeTypeConnectionDefaultsJson = JSON.stringify(extractDeep(props.props.nodeTypeConnectionDefaults) || {});
    const paletteItemsJson = React.useMemo(() => JSON.stringify(extractDeep(props.props.paletteItems) || []), [props.props.paletteItems]);
    // Scalar display props use the same extractDeep + JSON pipeline as complex props.
    // Direct property access on Perspective's observable store can miss scalar updates;
    // running them through extractDeep forces a MobX subscription that reliably
    // triggers re-renders when any of these values change in the Designer or Session.
    const rawConfigJson = React.useMemo(() => JSON.stringify({
        edgeWidth: extractDeep(props.props.edgeWidth),
        snapEnabled: extractDeep(props.props.snapEnabled),
        snapPixels: extractDeep(props.props.snapPixels),
        hideHandles: extractDeep(props.props.hideHandles),
        handleCount: extractDeep(props.props.handleCount),
        enabled: extractDeep(props.props.enabled),
        enableOnClickEvents: extractDeep(props.props.enableOnClickEvents),
    }), [
        props.props.edgeWidth, props.props.snapEnabled, props.props.snapPixels,
        props.props.hideHandles, props.props.handleCount, props.props.enabled,
        props.props.enableOnClickEvents,
    ]);
    const rawNodesDict = React.useMemo(() => JSON.parse(rawNodesJson), [rawNodesJson]);
    const rawEdgesDict = React.useMemo(() => JSON.parse(rawEdgesJson), [rawEdgesJson]);
    const connectionTypes = React.useMemo(() => JSON.parse(connectionTypesJson), [connectionTypesJson]);
    const nodeTypeConnectionDefaults = React.useMemo(() => JSON.parse(nodeTypeConnectionDefaultsJson), [nodeTypeConnectionDefaultsJson]);
    const paletteItems = React.useMemo(() => JSON.parse(paletteItemsJson), [paletteItemsJson]);
    const rawConfig = React.useMemo(() => JSON.parse(rawConfigJson), [rawConfigJson]);
    const globalHideHandles = rawConfig.hideHandles === true || String((_a = rawConfig.hideHandles) !== null && _a !== void 0 ? _a : '').toLowerCase() === 'true';
    const globalHandleCount = Math.max(1, Math.min(5, Number(rawConfig.handleCount) || 3));
    const isEnabled = rawConfig.enabled !== false && String((_b = rawConfig.enabled) !== null && _b !== void 0 ? _b : 'true').toLowerCase() !== 'false';
    const snapEnabled = rawConfig.snapEnabled !== false && String((_c = rawConfig.snapEnabled) !== null && _c !== void 0 ? _c : 'true').toLowerCase() !== 'false';
    const snapPixels = Number(rawConfig.snapPixels) || 15;
    const snapGrid = React.useMemo(() => [snapPixels, snapPixels], [snapPixels]);
    const globalEdgeWidth = Math.max(1, Number(rawConfig.edgeWidth) || 6);
    // ─── Hierarchy sync ────────────────────────────────────────────────────
    React.useEffect(() => {
        var _a;
        if (!((_a = props.store) === null || _a === void 0 ? void 0 : _a.props) || !rawNodesDict || !rawEdgesDict)
            return;
        const { nodeEnrichments, rootHierarchy } = computeHierarchyData(rawNodesDict, rawEdgesDict);
        props.store.props.write('hierarchy', rootHierarchy);
        const enrichedNodes = {};
        Object.keys(rawNodesDict).forEach(id => {
            if (!rawNodesDict[id])
                return;
            const _a = rawNodesDict[id], { image: _image } = _a, nodeWithoutImage = __rest(_a, ["image"]);
            enrichedNodes[id] = Object.assign(Object.assign({}, nodeWithoutImage), nodeEnrichments[id]);
        });
        const serialized = JSON.stringify(enrichedNodes);
        if (serialized !== hierarchyWriteRef.current) {
            hierarchyWriteRef.current = serialized;
            props.store.props.write('nodes', enrichedNodes);
        }
        props.store.props.write('refreshHierarchy', false);
    }, [props.props.refreshHierarchy, props.store]);
    // ─── Handlers hook ─────────────────────────────────────────────────────
    const { isUpdatingEdge, isDraggingNode, updatingEdgeRef, rawNodesDictRef, rawEdgesDictRef, closeContextMenu, getValidIntersection, isValidConnection, handleWaypointsChange, handleLabelChange, onConnect, onEdgeUpdate, onEdgeUpdateStart, onEdgeUpdateEnd, onConnectStart, onConnectEnd, onEdgesDelete, deleteEdgeWithEvent, onEdgeContextMenu, onEdgeClick, handleLineTypeChange, handleConnectionTypeChange, handleAnimationChange, handleSetConnectionDefault, handleSetDefaultForType, handleClearConnectionDefault, handleGearClick, handlePaletteItemClick, handleResizeEnd, handleTextChange, handleActionIconClick, onNodesChange, onNodeDragStart, onNodeDrag, onNodeDragStop, onNodesDelete, onNodeContextMenu, onNodeClick, executeCopy, executePaste, onDragOver, onDrop, onMoveStart, onPaneClick, onPaneContextMenu, handleNodeSwap, handleContextMenuAction, } = useArchitectureFlowHandlers_1.useArchitectureFlowHandlers({
        store: props.store,
        componentEvents: props.componentEvents,
        rawNodesDict,
        rawEdgesDict,
        connectionTypes,
        nodeTypeConnectionDefaults,
        globalHandleCount,
        paletteItems,
        snapEnabled,
        snapPixels,
        reactFlowInstance,
        reactFlowWrapper,
        wrapperBoundsRef,
        isEnabled,
        enableOnClickEvents: rawConfig.enableOnClickEvents !== false,
        selectedId,
        setSelectedId,
        setLocalNodes,
        setLocalEdges,
        contextMenu,
        setContextMenu,
        setActiveSubMenu,
        setStyleEditorNodeId,
        clipboardRef,
        draggedItemRef,
    });
    // ─── Derived flow data ─────────────────────────────────────────────────
    // Stable fingerprint of connection topology only — excludes waypoints, animation, labels.
    // Recomputes only when a connection endpoint changes, not on every waypoint drag.
    const edgeTopologyJson = React.useMemo(() => JSON.stringify(Object.entries(rawEdgesDict)
        .filter(([, e]) => e)
        .map(([id, e]) => ({
        id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle,
        targetHandle: e.targetHandle
    }))
        .sort((a, b) => a.id.localeCompare(b.id))), [rawEdgesDict]);
    const highlightedHandlesMap = React.useMemo(() => {
        const parsed = JSON.parse(edgeTopologyJson);
        const map = {};
        parsed.forEach(e => {
            if (e.source && e.sourceHandle) {
                if (!map[e.source])
                    map[e.source] = new Set();
                map[e.source].add(e.sourceHandle);
            }
            if (e.target && e.targetHandle) {
                if (!map[e.target])
                    map[e.target] = new Set();
                map[e.target].add(e.targetHandle);
            }
        });
        return map;
    }, [edgeTopologyJson]);
    const paletteMap = React.useMemo(() => new Map(paletteItems.map((p) => [p.id, p])), [paletteItems]);
    const flowNodes = React.useMemo(() => mapIgnitionToReactFlowNodes(rawNodesDict, paletteMap, handleGearClick, handleResizeEnd, handleTextChange, globalHideHandles, globalHandleCount, highlightedHandlesMap, isEnabled, handleActionIconClick), [rawNodesDict, paletteMap, handleGearClick, handleResizeEnd, handleTextChange, globalHideHandles, globalHandleCount, highlightedHandlesMap, isEnabled, handleActionIconClick]);
    const flowEdges = React.useMemo(() => EdgeUtils_1.mapIgnitionToReactFlowEdges(rawEdgesDict, rawNodesDict, connectionTypes, selectedId, handleWaypointsChange, handleLabelChange, snapEnabled, snapPixels, globalEdgeWidth), [rawEdgesDict, rawNodesDict, connectionTypes, selectedId, handleWaypointsChange, handleLabelChange, snapEnabled, snapPixels, globalEdgeWidth]);
    React.useEffect(() => {
        if (!isDraggingNode) {
            setLocalNodes(flowNodes.map((n) => (Object.assign(Object.assign({}, n), { selected: n.id === selectedId }))));
        }
    }, [flowNodes, isDraggingNode, selectedId]);
    React.useEffect(() => {
        if (!isUpdatingEdge && !isDraggingNode) {
            setLocalEdges(flowEdges);
        }
    }, [flowEdges, isUpdatingEdge, isDraggingNode]);
    React.useEffect(() => {
        var _a, _b;
        let hasChanges = false;
        const corrected = {};
        for (const [edgeId, edge] of Object.entries(rawEdgesDict)) {
            const updated = Object.assign({}, edge);
            const srcParts = (_a = edge.sourceHandle) === null || _a === void 0 ? void 0 : _a.split('-');
            if (srcParts && parseInt(srcParts[1], 10) >= globalHandleCount) {
                updated.sourceHandle = `${srcParts[0]}-${globalHandleCount - 1}`;
                updated.waypoints = [];
                hasChanges = true;
            }
            const tgtParts = (_b = edge.targetHandle) === null || _b === void 0 ? void 0 : _b.split('-');
            if (tgtParts && parseInt(tgtParts[1], 10) >= globalHandleCount) {
                updated.targetHandle = `${tgtParts[0]}-${globalHandleCount - 1}`;
                updated.waypoints = [];
                hasChanges = true;
            }
            corrected[edgeId] = updated;
        }
        if (hasChanges) {
            props.store.props.write('edges', corrected);
        }
    }, [globalHandleCount]);
    const localEdgeMap = React.useMemo(() => new Map(localEdges.map((e) => [e.id, e])), [localEdges]);
    const displayEdges = React.useMemo(() => {
        return flowEdges.filter(e => !isUpdatingEdge || e.id !== updatingEdgeRef.current).map((fresh) => {
            var _a, _b, _c, _d, _e;
            const local = localEdgeMap.get(fresh.id);
            const isHovered = fresh.id === hoveredEdgeId;
            const isSelected = ((_a = fresh.data) === null || _a === void 0 ? void 0 : _a.isSelected) === true;
            const isAnimated = ((_b = fresh.data) === null || _b === void 0 ? void 0 : _b.animation) !== 'none';
            let zIndex = fresh.zIndex || 2000;
            if (isHovered)
                zIndex = Math.max(zIndex, 4000);
            if (isAnimated)
                zIndex = 5000;
            const strokeWidth = (isHovered || isSelected) ? globalEdgeWidth + 2 : globalEdgeWidth;
            const waypoints = (_d = (_c = local === null || local === void 0 ? void 0 : local.data) === null || _c === void 0 ? void 0 : _c.waypoints) !== null && _d !== void 0 ? _d : (_e = fresh.data) === null || _e === void 0 ? void 0 : _e.waypoints;
            return Object.assign(Object.assign({}, fresh), { updatable: isEnabled, zIndex, style: Object.assign(Object.assign({}, fresh.style), { strokeWidth }), data: Object.assign(Object.assign({}, fresh.data), { waypoints, isEditable: isEnabled }) });
        });
    }, [localEdgeMap, flowEdges, hoveredEdgeId, globalEdgeWidth, isEnabled, isUpdatingEdge]);
    // ─── Keyboard shortcuts ────────────────────────────────────────────────
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            var _a;
            if (e.key === 'Escape') {
                closeContextMenu();
                setStyleEditorNodeId(null);
                setCanvasSearchOpen(false);
                return;
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                setCanvasSearchOpen(open => !open);
                return;
            }
            if (!isEnabled)
                return;
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')
                return;
            if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                if (selectedId && rawNodesDictRef.current[selectedId])
                    executeCopy(selectedId);
            }
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId && rawEdgesDictRef.current[selectedId]) {
                e.preventDefault();
                deleteEdgeWithEvent(selectedId);
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
                const clipboard = clipboardRef.current;
                if (clipboard && ((_a = props.store) === null || _a === void 0 ? void 0 : _a.props)) {
                    const targetNode = clipboard.type === 'single' ? clipboard.node : Object.values(clipboard.nodes)[0];
                    const dropX = targetNode.x + (snapEnabled ? snapPixels * 2 : 30);
                    const dropY = targetNode.y + (snapEnabled ? snapPixels * 2 : 30);
                    executePaste(dropX, dropY);
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isEnabled, selectedId, snapEnabled, snapPixels, props.store, executeCopy, executePaste, closeContextMenu, deleteEdgeWithEvent, rawEdgesDictRef]);
    const flyToNode = React.useCallback((nodeId, x, y, w, h) => {
        if (reactFlowInstance) {
            reactFlowInstance.fitBounds({ x, y, width: w, height: h }, { padding: 0.5, duration: 600 });
        }
        setSelectedId(nodeId);
        setCanvasSearchOpen(false);
    }, [reactFlowInstance]);
    // ─── Long-press context menu (mobile/touch support) ─────────────────────
    const handleLongPress = React.useCallback((clientX, clientY, target) => {
        var _a;
        if (!isEnabled)
            return;
        const bounds = wrapperBoundsRef.current;
        const top = clientY - bounds.top;
        const left = clientX - bounds.left;
        // Try to detect node
        const nodeEl = target.closest('.react-flow__node');
        if (nodeEl) {
            const id = nodeEl.getAttribute('data-id');
            if (id && rawNodesDictRef.current[id]) {
                setSelectedId(id);
                const isContainer = rawNodesDictRef.current[id].paletteId === 'container';
                setContextMenu({ id, top, left, type: 'node', isContainer, clientX, clientY });
                setActiveSubMenu(null);
                return;
            }
        }
        // Try to detect edge
        const edgeEl = target.closest('.react-flow__edge');
        if (edgeEl) {
            const id = (_a = edgeEl.getAttribute('data-testid')) === null || _a === void 0 ? void 0 : _a.replace('rf__edge-', '');
            if (id && rawEdgesDictRef.current[id]) {
                setContextMenu({ id, top, left, type: 'edge', clientX, clientY });
                setActiveSubMenu(null);
                return;
            }
        }
        // Fallback: pane
        if (reactFlowInstance) {
            setContextMenu({ id: 'pane', top, left, type: 'pane', clientX, clientY });
            setActiveSubMenu(null);
        }
    }, [isEnabled, reactFlowInstance, setContextMenu, setActiveSubMenu, setSelectedId]);
    const handleScreenshot = React.useCallback(() => {
        const element = document.querySelector('.react-flow__viewport');
        if (!element || !reactFlowInstance)
            return;
        const nodes = reactFlowInstance.getNodes();
        if (nodes.length === 0)
            return;
        const nodesBounds = reactflow_1.getRectOfNodes(nodes);
        const padding = 50;
        const width = nodesBounds.width + padding * 2;
        const height = nodesBounds.height + padding * 2;
        const [x, y, zoom] = reactflow_1.getTransformForBounds(nodesBounds, width, height, 0.1, 2.0);
        html_to_image_1.toPng(element, {
            backgroundColor: 'transparent',
            width: width,
            height: height,
            style: {
                width: `${width}px`,
                height: `${height}px`,
                transform: `translate(${x}px, ${y}px) scale(${zoom})`,
            },
            filter: (node) => {
                var _a, _b;
                if (((_a = node === null || node === void 0 ? void 0 : node.classList) === null || _a === void 0 ? void 0 : _a.contains('react-flow__controls')) ||
                    ((_b = node === null || node === void 0 ? void 0 : node.classList) === null || _b === void 0 ? void 0 : _b.contains('react-flow__minimap'))) {
                    return false;
                }
                return true;
            }
        }).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = `architecture-full-canvas-${new Date().toISOString().split('T')[0]}.png`;
            link.href = dataUrl;
            link.click();
        }).catch((err) => {
            console.error('Failed to generate screenshot:', err);
        });
    }, [reactFlowInstance]);
    const longPressHandlers = useLongPress_1.useLongPress(handleLongPress);
    const { classes } = props.props.style || {};
    const emitProps = props.emit({ classes });
    // ─── Render ────────────────────────────────────────────────────────────
    return (React.createElement(ComponentErrorBoundary_1.ComponentErrorBoundary, null,
        React.createElement("div", Object.assign({}, emitProps, { style: Object.assign(Object.assign({}, emitProps.style), { display: 'flex', backgroundColor: 'var(--neutral-00)' }), tabIndex: 0 }),
            React.createElement("style", null, `
                .arch-theme-wrapper {
                    display: flex; flex-direction: row; flex: 1; width: 100%; height: 100%;
                    --edge: #78D175; --panel: #78D175; --cloud: #25A4E9; --standard: #FF8C00;
                    --cirrusLink: #156D97; --sepasoft: #2DA449; --ia-darkgray: #39464B;
                    --ia-green: #8DC63E; --ia-gray: #445C6D; --ignition-orange: #F7901E;
                    --ignition-blue: #003E69; --ignition-darkblue: #002143;
                    --edge-green: #78D175; --edge-gray: #283439; --edge-dark-gray: #1E2528; --edge-light-gray: #4E5558;
                }
                .arch-node-gear { transform-origin: 50% 50%; transition: transform 0.75s ease-in-out; }
                .arch-node-gear:hover { transform: rotate(360deg); }
                .arch-node-gear:active { transform: translateX(-100%) rotate(-360deg); }
                .arch-node-svg-wrapper svg { width: 100%; height: 100%; max-width: 100%; max-height: 100%; object-fit: contain; }
                /* Animation keyframes: distance must match (dash + gap) for seamless loops */
                @keyframes arch-flow-forward { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
                @keyframes arch-flow-reverse { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 100; } }

                /* Base handle is a transparent anchor — React Flow's translate(-50%,-50%) is forced via !important */
                .arch-node-handle {
                    background: transparent !important;
                    border-color: transparent !important;
                    transform: translate(-50%, -50%) !important;
                }

                /* ::before provides the large, zoom-aware hit area (interaction zone).
                   It uses the --hit-size variable passed from React state. */
                .arch-node-handle::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: var(--hit-size, 24px);
                    height: var(--hit-size, 24px);
                    background: transparent;
                }

                /* ::after renders the visible dot and owns all visual transitions.
                   By default, it is invisible (opacity: 0) to maintain a zero-footprint aesthetic when idle. */
                .arch-node-handle::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--neutral-90);
                    border: 1px solid var(--neutral-90);
                    pointer-events: none;
                    opacity: 0;
                    transition: transform 0.15s ease-in-out, background 0.15s ease-in-out, border-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
                }

                /* Show handles when:
                   1. The specific handle is hovered.
                   2. The parent node is hovered or selected.
                   3. The user is actively creating or moving an edge on the canvas.
                */
                .arch-node-handle:hover::after,
                .react-flow__node:hover .arch-node-handle::after,
                .react-flow__node.selected .arch-node-handle::after,
                .arch-creating-edge .arch-node-handle::after,
                .arch-moving-edge .arch-node-handle::after {
                    opacity: 1;
                }

                /* Handle Hover State: Provide clear feedback and scale the dot. */
                .arch-node-handle:hover::after {
                    background: var(--callToAction) !important;
                    border-color: var(--callToAction) !important;
                    transform: translate(-50%, -50%) scale(2.0);
                    opacity: 1 !important;
                }

                /* Suppressed: handle is in DOM for edge routing but completely invisible/non-interactive. */
                .arch-node-handle--suppressed::after { opacity: 0 !important; pointer-events: none !important; }
                .arch-node-handle--suppressed::before { pointer-events: none !important; }

                /* Connected handle: Always visible and emphasized when the edge/node is selected. */
                .arch-node-handle--connected::after {
                    opacity: 1 !important;
                    background: var(--callToAction) !important;
                    border-color: var(--callToAction) !important;
                    width: 10px !important;
                    height: 10px !important;
                    box-shadow: 0 0 8px var(--callToAction);
                }
                /* React Flow connection states: base stays transparent, ::after carries the color */
                .react-flow__handle.connecting { background: transparent !important; border-color: transparent !important; }
                .react-flow__handle.connecting::after { background: #3b82f6 !important; border-color: #2563eb !important; width: 14px !important; height: 14px !important; }
                .react-flow__handle.valid { background: transparent !important; border-color: transparent !important; cursor: crosshair !important; }
                .react-flow__handle.valid::after { background: #22c55e !important; border-color: #16a34a !important; width: 14px !important; height: 14px !important; }
                /* Cursors live on the base handle (the pointer-events target) */
                .arch-creating-edge .arch-node-handle { cursor: crosshair !important; }
                .arch-moving-edge .arch-node-handle { cursor: grab !important; }
                .arch-creating-edge .arch-node-handle.connecting:not(.valid):hover,
                .arch-moving-edge   .arch-node-handle.connecting:not(.valid):hover { cursor: not-allowed !important; }
                .arch-creating-edge .arch-node-handle.connecting:not(.valid):hover::after,
                .arch-moving-edge   .arch-node-handle.connecting:not(.valid):hover::after { background: #ef4444 !important; border-color: #dc2626 !important; }
                .react-flow__attribution a { min-height: 24px; min-width: 24px; display: inline-flex; align-items: center; padding: 0 6px; }
                `),
            React.createElement("div", { className: "arch-theme-wrapper" },
                isEnabled && React.createElement(Sidebar_1.Sidebar, { paletteItems: paletteItems, isOpen: isSidebarOpen, toggleSidebar: () => setIsSidebarOpen(!isSidebarOpen), onDragStartItem: (item) => { draggedItemRef.current = item; }, onItemClick: handlePaletteItemClick }),
                React.createElement("div", Object.assign({ role: "main", "aria-label": "Architecture Builder Canvas", style: { flexGrow: 1, height: '100%', position: 'relative', overflow: 'hidden' }, ref: reactFlowWrapper, className: isUpdatingEdge ? 'arch-moving-edge' : '' }, longPressHandlers),
                    React.createElement(reactflow_1.ReactFlowProvider, null,
                        React.createElement(ArchitectureFlowInner, { selectedId: selectedId }),
                        React.createElement(reactflow_1.default, { nodes: localNodes, edges: displayEdges, nodeTypes: nodeTypes, edgeTypes: CustomEdge_1.edgeTypes, isValidConnection: isValidConnection, onInit: setReactFlowInstance, onDrop: isEnabled ? onDrop : undefined, onDragOver: isEnabled ? onDragOver : undefined, onConnect: isEnabled ? onConnect : undefined, onEdgeUpdate: isEnabled ? onEdgeUpdate : undefined, onEdgeUpdateStart: isEnabled ? onEdgeUpdateStart : undefined, onEdgeUpdateEnd: isEnabled ? onEdgeUpdateEnd : undefined, onConnectStart: isEnabled ? onConnectStart : undefined, onConnectEnd: isEnabled ? onConnectEnd : undefined, onNodeDragStart: isEnabled ? onNodeDragStart : undefined, onNodeDrag: isEnabled ? onNodeDrag : undefined, onNodeDragStop: isEnabled ? onNodeDragStop : undefined, onNodesChange: onNodesChange, onNodeClick: onNodeClick, onEdgeClick: onEdgeClick, onNodesDelete: isEnabled ? onNodesDelete : undefined, onEdgesDelete: isEnabled ? onEdgesDelete : undefined, onNodeContextMenu: isEnabled ? onNodeContextMenu : undefined, onEdgeContextMenu: isEnabled ? onEdgeContextMenu : undefined, onEdgeMouseEnter: (_evt, edge) => setHoveredEdgeId(edge.id), onEdgeMouseLeave: () => setHoveredEdgeId(null), onPaneClick: onPaneClick, onPaneContextMenu: isEnabled ? onPaneContextMenu : undefined, onMoveStart: onMoveStart, nodesDraggable: isEnabled, nodesConnectable: isEnabled, elementsSelectable: isEnabled, connectionMode: reactflow_1.ConnectionMode.Loose, snapToGrid: snapEnabled, snapGrid: snapGrid, connectionLineStyle: { stroke: '#cccccc', strokeWidth: 6, fill: 'none' }, elevateNodesOnSelect: false, minZoom: 0.05, panOnScroll: false, zoomOnScroll: true, panOnDrag: true, selectionOnDrag: false, deleteKeyCode: ['Delete', 'Backspace'], proOptions: { hideAttribution: true } },
                            React.createElement(reactflow_1.Background, { gap: snapPixels }),
                            React.createElement(reactflow_1.Controls, { showInteractive: false },
                                React.createElement(reactflow_1.ControlButton, { onClick: handleScreenshot, title: "Download Full Screenshot", "aria-label": "Download Full Screenshot" },
                                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { display: 'block', color: '#555555' } },
                                        React.createElement("path", { d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" }),
                                        React.createElement("circle", { cx: "12", cy: "13", r: "4" })))))),
                    canvasSearchOpen && (React.createElement(CanvasSearch_1.CanvasSearch, { nodes: rawNodesDict, paletteItems: paletteItems, onFlyTo: flyToNode, onClose: () => setCanvasSearchOpen(false) })),
                    styleEditorNodeId && rawNodesDict[styleEditorNodeId] && (React.createElement(StyleEditorModal_1.StyleEditorModal, { node: rawNodesDict[styleEditorNodeId], onSave: (newStyle, newLabelStyle, newTextStyle) => {
                            var _a;
                            if ((_a = props.store) === null || _a === void 0 ? void 0 : _a.props) {
                                const nextNodes = Object.assign({}, rawNodesDict);
                                nextNodes[styleEditorNodeId].style = newStyle;
                                nextNodes[styleEditorNodeId].labelStyle = newLabelStyle;
                                nextNodes[styleEditorNodeId].textStyle = newTextStyle;
                                props.store.props.write('nodes', nextNodes);
                            }
                            setStyleEditorNodeId(null);
                        }, onCancel: () => setStyleEditorNodeId(null) })),
                    contextMenu && (React.createElement(ContextMenu_1.ContextMenu, { contextMenu: contextMenu, activeSubMenu: activeSubMenu, setActiveSubMenu: setActiveSubMenu, rawNodesDict: rawNodesDict, rawEdgesDict: rawEdgesDict, paletteItems: paletteItems, connectionTypes: connectionTypes, clipboardRef: clipboardRef, wrapperRef: reactFlowWrapper, getValidIntersection: getValidIntersection, handleContextMenuAction: handleContextMenuAction, handleNodeSwap: handleNodeSwap, handleLineTypeChange: handleLineTypeChange, handleConnectionTypeChange: handleConnectionTypeChange, handleAnimationChange: handleAnimationChange, handleSetConnectionDefault: handleSetConnectionDefault, handleSetDefaultForType: handleSetDefaultForType, handleClearConnectionDefault: handleClearConnectionDefault, nodeTypeConnectionDefaults: nodeTypeConnectionDefaults })))))));
});


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/ArchitectureNode.tsx":
/*!************************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/ArchitectureNode.tsx ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArchitectureNode = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
// @ts-ignore
const reactflow_1 = __webpack_require__(/*! reactflow */ "./node_modules/reactflow/dist/umd/index.js");
const perspective_client_1 = __webpack_require__(/*! @inductiveautomation/perspective-client */ "@inductiveautomation/perspective-client");
const svgSanitize_1 = __webpack_require__(/*! ./svgSanitize */ "./typescript/components/ArchitectureBuilder/svgSanitize.ts");
const TEXT_PALETTE_IDS = new Set(['Note', 'Label']);
// ─── Memoization helpers ──────────────────────────────────────────────────────
const shallowEqualObjects = (a, b) => {
    if (a === b)
        return true;
    if (!a || !b)
        return a === b;
    const aKeys = Object.keys(a);
    if (aKeys.length !== Object.keys(b).length)
        return false;
    for (const k of aKeys) {
        if (a[k] !== b[k])
            return false;
    }
    return true;
};
const areSetsEqual = (a, b) => {
    if (a === b)
        return true;
    if (!a || !b || a.size !== b.size)
        return false;
    for (const item of a) {
        if (!b.has(item))
            return false;
    }
    return true;
};
const areActionIconsEqual = (a, b) => {
    if (a === b)
        return true;
    if (!a || !b || a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (!shallowEqualObjects(a[i], b[i]))
            return false;
    }
    return true;
};
const areArchitectureNodePropsEqual = (prev, next) => {
    if (prev.id !== next.id || prev.selected !== next.selected)
        return false;
    const pd = prev.data, nd = next.data;
    if (pd.label !== nd.label)
        return false;
    if (pd.image !== nd.image)
        return false;
    if (pd.text !== nd.text)
        return false;
    if (pd.tooltip !== nd.tooltip)
        return false;
    if (pd.paletteId !== nd.paletteId)
        return false;
    if (pd.inactive !== nd.inactive)
        return false;
    if (pd.hideHandles !== nd.hideHandles)
        return false;
    if (pd.globalHideHandles !== nd.globalHideHandles)
        return false;
    if (pd.isEditable !== nd.isEditable)
        return false;
    if (pd.handleCount !== nd.handleCount)
        return false;
    if (!shallowEqualObjects(pd.style, nd.style))
        return false;
    if (!shallowEqualObjects(pd.labelStyle, nd.labelStyle))
        return false;
    if (!shallowEqualObjects(pd.textStyle, nd.textStyle))
        return false;
    if (!shallowEqualObjects(pd.configs, nd.configs))
        return false;
    if (!areSetsEqual(pd.highlightedHandles, nd.highlightedHandles))
        return false;
    if (!areActionIconsEqual(pd.actionIcons, nd.actionIcons))
        return false;
    if (pd.onGearClick !== nd.onGearClick)
        return false;
    if (pd.onTextChange !== nd.onTextChange)
        return false;
    if (pd.onResizeEnd !== nd.onResizeEnd)
        return false;
    if (pd.onActionIconClick !== nd.onActionIconClick)
        return false;
    return true;
};
const NodeImage = react_1.default.memo(({ src, label }) => {
    const scopeId = react_1.default.useMemo(() => svgSanitize_1.nextSvgScopeId(), []);
    const svgHtml = react_1.default.useMemo(() => svgSanitize_1.extractSvgMarkup(src, scopeId), [src, scopeId]);
    if (svgHtml) {
        return (react_1.default.createElement("div", { id: scopeId, style: { padding: '4px', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, dangerouslySetInnerHTML: { __html: svgHtml }, title: label }));
    }
    const dataUri = svgSanitize_1.toSafeDataUri(src);
    return dataUri ? react_1.default.createElement("img", { src: dataUri, alt: "", style: { padding: '4px', width: '100%', height: '100%', objectFit: 'contain' } }) : null;
});
exports.ArchitectureNode = react_1.default.memo(({ id, data, selected }) => {
    var _a, _b, _c, _d;
    const { zoom } = reactflow_1.useViewport();
    const [hovered, setHovered] = react_1.default.useState(false);
    const showHandles = !data.globalHideHandles && !data.hideHandles && data.isEditable !== false;
    const hasHighlightedHandles = !!(data.highlightedHandles && data.highlightedHandles.size > 0);
    const isConnectionInProgress = reactflow_1.useStore((s) => s.connectionNodeId != null);
    const isTextNode = TEXT_PALETTE_IDS.has(data.paletteId);
    const [localText, setLocalText] = react_1.default.useState(data.text || '');
    react_1.default.useEffect(() => { setLocalText(data.text || ''); }, [data.text]);
    const finalLabelBg = ((_a = data.labelStyle) === null || _a === void 0 ? void 0 : _a.backgroundColor) || 'var(--neutral-30)';
    const finalLabelColor = ((_b = data.labelStyle) === null || _b === void 0 ? void 0 : _b.color) || 'var(--neutral-90)';
    const finalGearColor = ((_c = data.labelStyle) === null || _c === void 0 ? void 0 : _c.fill) || finalLabelColor;
    const _e = data.style || {}, { backgroundColor: imageBg } = _e, restStyle = __rest(_e, ["backgroundColor"]);
    const combinedStyle = Object.assign(Object.assign({ padding: '0px', borderRadius: '8px', backgroundColor: 'var(--neutral-10)', border: '1px solid var(--neutral-50)', color: 'var(--neutral-90)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', boxSizing: 'border-box', position: 'relative' }, restStyle), { boxShadow: selected ? '0 0 0 2px rgba(0, 123, 255, 0.25)' : (restStyle.boxShadow || '0 2px 4px rgba(0,0,0,0.1)') });
    // Enhanced hit area: generous size that remains consistent in screen pixels for usability.
    // Targeting ~24px at 1.0 zoom, scaling up to ~22px as we zoom out.
    const hitSize = Math.min(22, Math.max(16, Math.round(24 / zoom)));
    // Handles are always mounted so React Flow's store always has registered positions.
    // This prevents the intermittent missing connection line (handle mounts just as a
    // drag starts, before its useEffect registration fires) and keeps edges anchored
    // when hideHandles is true.
    // Interactivity and visual appearance are controlled via pointerEvents + CSS (::after).
    const isHandleInteractive = showHandles && (hovered || selected || hasHighlightedHandles || isConnectionInProgress);
    const handleStyle = {
        background: 'transparent',
        width: '4px',
        height: '4px',
        opacity: 1,
        pointerEvents: isHandleInteractive ? 'auto' : 'none',
        zIndex: 20,
        '--hit-size': `${hitSize}px`
    };
    const handleCount = Math.max(1, Math.min(5, (_d = data.handleCount) !== null && _d !== void 0 ? _d : 3));
    const positions = react_1.default.useMemo(() => Array.from({ length: handleCount }, (_, i) => `${((i + 0.5) / handleCount) * 100}%`), [handleCount]);
    const handleClass = (id) => {
        var _a;
        if (!showHandles)
            return 'arch-node-handle arch-node-handle--suppressed';
        return ((_a = data.highlightedHandles) === null || _a === void 0 ? void 0 : _a.has(id)) ? 'arch-node-handle arch-node-handle--connected' : 'arch-node-handle';
    };
    // Calculate dynamic resizer handle size based on zoom
    const resizerSize = Math.max(10, Math.round(16 / zoom));
    return (react_1.default.createElement("div", { style: combinedStyle, title: data.tooltip, onMouseEnter: () => setHovered(true), onMouseLeave: (e) => { if (e.buttons === 0)
            setHovered(false); } },
        positions.map((pos, i) => (react_1.default.createElement(reactflow_1.Handle, { key: `top-${i}`, className: handleClass(`top-${i}`), type: "source", position: reactflow_1.Position.Top, id: `top-${i}`, style: Object.assign(Object.assign({}, handleStyle), { left: pos, top: '0px', transform: 'translate(-50%, -50%)' }) }))),
        positions.map((pos, i) => (react_1.default.createElement(reactflow_1.Handle, { key: `right-${i}`, className: handleClass(`right-${i}`), type: "source", position: reactflow_1.Position.Right, id: `right-${i}`, style: Object.assign(Object.assign({}, handleStyle), { top: pos, left: '100%', transform: 'translate(-50%, -50%)' }) }))),
        positions.map((pos, i) => (react_1.default.createElement(reactflow_1.Handle, { key: `bottom-${i}`, className: handleClass(`bottom-${i}`), type: "source", position: reactflow_1.Position.Bottom, id: `bottom-${i}`, style: Object.assign(Object.assign({}, handleStyle), { left: pos, top: '100%', transform: 'translate(-50%, -50%)' }) }))),
        positions.map((pos, i) => (react_1.default.createElement(reactflow_1.Handle, { key: `left-${i}`, className: handleClass(`left-${i}`), type: "source", position: reactflow_1.Position.Left, id: `left-${i}`, style: Object.assign(Object.assign({}, handleStyle), { top: pos, left: '0px', transform: 'translate(-50%, -50%)' }) }))),
        react_1.default.createElement("div", { style: Object.assign({ position: 'absolute', top: 0, left: 0, maxWidth: '100%', boxSizing: 'border-box', backgroundColor: finalLabelBg, padding: '4px 8px', borderTopLeftRadius: '7px', borderTopRightRadius: '7px', borderBottomRightRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: finalLabelColor, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', zIndex: 10 }, (data.labelStyle || {})), onClick: (e) => {
                e.stopPropagation();
                if (data.onGearClick)
                    data.onGearClick(id, e);
            }, title: data.label },
            react_1.default.createElement("div", { className: "arch-node-gear", style: { display: 'flex', alignItems: 'center', flexShrink: 0 } },
                react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "16px", viewBox: "0 -960 960 960", width: "16px", fill: finalGearColor, "aria-label": "Settings" },
                    react_1.default.createElement("path", { d: "m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" }))),
            react_1.default.createElement("span", { style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 } }, data.label)),
        data.image && (react_1.default.createElement("div", { className: "arch-node-svg-wrapper", style: {
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', minHeight: 0, zIndex: 1, backgroundColor: imageBg || undefined,
                filter: data.inactive ? 'grayscale(100%) blur(2px)' : undefined
            } },
            react_1.default.createElement(NodeImage, { src: data.image, label: data.label }))),
        data.actionIcons && data.actionIcons.length > 0 && (react_1.default.createElement("div", { style: { position: 'absolute', right: 4, bottom: 4, display: 'flex', flexDirection: 'row', gap: 4, zIndex: 10 } }, data.actionIcons.map((ai) => {
            const enabled = ai.enabled !== false;
            return (react_1.default.createElement("div", { key: ai.name, style: {
                    width: 30, height: 30,
                    opacity: enabled ? 1 : 0.4,
                    pointerEvents: enabled ? 'auto' : 'none',
                    cursor: enabled ? 'pointer' : 'default'
                }, onClick: (e) => {
                    e.stopPropagation();
                    if (enabled && data.onActionIconClick)
                        data.onActionIconClick(id, ai.name, e);
                }, title: ai.name },
                react_1.default.createElement(perspective_client_1.IconRenderer, { path: ai.icon, color: ai.color, size: 30 })));
        })))));
}, areArchitectureNodePropsEqual);


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/CanvasSearch.tsx":
/*!********************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/CanvasSearch.tsx ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CanvasSearch = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "react"));
const constants_1 = __webpack_require__(/*! ./constants */ "./typescript/components/ArchitectureBuilder/constants.ts");
const CanvasSearch = ({ nodes, paletteItems, onFlyTo, onClose }) => {
    const [query, setQuery] = react_1.useState('');
    const [highlightedIndex, setHighlightedIndex] = react_1.useState(0);
    const inputRef = react_1.useRef(null);
    const listRef = react_1.useRef(null);
    react_1.useEffect(() => { var _a; (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, []);
    const paletteMap = react_1.useMemo(() => {
        const map = {};
        paletteItems.forEach(p => { map[p.id] = p.label; });
        return map;
    }, [paletteItems]);
    const results = react_1.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return [];
        return Object.entries(nodes)
            .filter(([, node]) => {
            const label = (node.label || '').toLowerCase();
            const paletteId = (node.paletteId || '').toLowerCase();
            const typeId = (node.typeId || '').toLowerCase();
            return label.includes(q) || paletteId.includes(q) || typeId.includes(q);
        })
            .map(([id, node]) => ({
            id,
            label: node.label || id,
            typeName: paletteMap[node.paletteId] || node.paletteId || '',
            x: node.x || 0,
            y: node.y || 0,
            w: node.width || 150,
            h: node.height || 150,
        }));
    }, [nodes, paletteMap, query]);
    react_1.useEffect(() => { setHighlightedIndex(0); }, [results.length]);
    // Scroll highlighted item into view
    react_1.useEffect(() => {
        const list = listRef.current;
        if (!list || results.length === 0)
            return;
        const item = list.children[highlightedIndex];
        if (item)
            item.scrollIntoView({ block: 'nearest' });
    }, [highlightedIndex, results.length]);
    const selectResult = (result) => {
        onFlyTo(result.id, result.x, result.y, result.w, result.h);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(i => Math.min(i + 1, results.length - 1));
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(i => Math.max(i - 1, 0));
        }
        else if (e.key === 'Enter' && results[highlightedIndex]) {
            selectResult(results[highlightedIndex]);
        }
    };
    return (react_1.default.createElement("div", { style: { position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: '320px' } },
        react_1.default.createElement("div", { style: { backgroundColor: 'var(--neutral-10)', border: '1px solid var(--neutral-40)', borderRadius: '6px', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', overflow: 'hidden' } },
            react_1.default.createElement("div", { style: { position: 'relative', padding: '8px' } },
                react_1.default.createElement("input", { ref: inputRef, type: "text", placeholder: "Search canvas... (Esc to close)", value: query, onChange: e => setQuery(e.target.value), onKeyDown: handleKeyDown, style: Object.assign(Object.assign({}, constants_1.sharedInputStyle), { paddingRight: query ? '24px' : '8px' }) }),
                query && (react_1.default.createElement("span", { onClick: () => { var _a; setQuery(''); (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, style: { position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--neutral-60)', fontSize: '14px' } }, "\u00D7"))),
            results.length > 0 && (react_1.default.createElement("div", { ref: listRef, style: { maxHeight: '300px', overflowY: 'auto', borderTop: '1px solid var(--neutral-40)' } }, results.map((result, i) => (react_1.default.createElement("div", { key: result.id, onClick: () => selectResult(result), onMouseEnter: () => setHighlightedIndex(i), style: {
                    padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: i === highlightedIndex ? 'var(--neutral-30)' : 'transparent',
                    borderBottom: i < results.length - 1 ? '1px solid var(--neutral-40)' : 'none',
                } },
                react_1.default.createElement("span", { style: { color: 'var(--neutral-90)', fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 } }, result.label),
                result.typeName && (react_1.default.createElement("span", { style: { fontSize: '11px', color: 'var(--neutral-60)', backgroundColor: 'var(--neutral-30)', borderRadius: '3px', padding: '2px 6px', marginLeft: '8px', whiteSpace: 'nowrap', flexShrink: 0 } }, result.typeName))))))),
            query.trim() && results.length === 0 && (react_1.default.createElement("div", { style: { padding: '12px', color: 'var(--neutral-60)', fontSize: '13px', textAlign: 'center', borderTop: '1px solid var(--neutral-40)' } },
                "No nodes match \"",
                query,
                "\"")))));
};
exports.CanvasSearch = CanvasSearch;


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/ColorPicker.tsx":
/*!*******************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/ColorPicker.tsx ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorInput = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const constants_1 = __webpack_require__(/*! ./constants */ "./typescript/components/ArchitectureBuilder/constants.ts");
const ColorInput = ({ value, onChange, placeholder }) => {
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('palette');
    let currentHex = '#000000';
    let currentAlpha = 1;
    if (value.startsWith('#')) {
        if (value.length === 7)
            currentHex = value;
        else if (value.length === 9) {
            currentHex = value.substring(0, 7);
            currentAlpha = Math.round((parseInt(value.substring(7, 9), 16) / 255) * 100) / 100;
        }
        else if (value.length === 4) {
            currentHex = '#' + value[1] + value[1] + value[2] + value[2] + value[3] + value[3];
        }
    }
    else if (value.startsWith('rgba')) {
        const parts = value.match(/[\d.]+/g);
        if (parts && parts.length >= 4) {
            const r = parseInt(parts[0], 10), g = parseInt(parts[1], 10), b = parseInt(parts[2], 10);
            currentAlpha = parseFloat(parts[3]);
            currentHex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
    }
    else if (value.startsWith('rgb')) {
        const parts = value.match(/[\d.]+/g);
        if (parts && parts.length >= 3) {
            const r = parseInt(parts[0], 10), g = parseInt(parts[1], 10), b = parseInt(parts[2], 10);
            currentHex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
    }
    const handleColorChange = (newHex) => {
        const r = parseInt(newHex.slice(1, 3), 16), g = parseInt(newHex.slice(3, 5), 16), b = parseInt(newHex.slice(5, 7), 16);
        onChange(currentAlpha < 1 ? `rgba(${r}, ${g}, ${b}, ${currentAlpha})` : newHex);
    };
    const handleAlphaChange = (newAlpha) => {
        const r = parseInt(currentHex.slice(1, 3), 16), g = parseInt(currentHex.slice(3, 5), 16), b = parseInt(currentHex.slice(5, 7), 16);
        onChange(newAlpha === 1 ? currentHex : `rgba(${r}, ${g}, ${b}, ${newAlpha})`);
    };
    return (React.createElement("div", { style: { position: 'relative', display: 'flex', gap: '6px', marginTop: '4px' } },
        React.createElement("input", { type: "text", value: value, onChange: e => onChange(e.target.value), placeholder: placeholder, style: Object.assign(Object.assign({}, constants_1.sharedInputStyle), { marginTop: 0, flex: 1 }) }),
        React.createElement("div", { onClick: () => setPickerOpen(!pickerOpen), style: { width: '28px', height: '28px', borderRadius: '4px', border: '1px solid var(--neutral-40)', backgroundColor: value || '#000000', cursor: 'pointer', flexShrink: 0 }, title: "Open color picker" }),
        pickerOpen && (React.createElement(React.Fragment, null,
            React.createElement("div", { onClick: () => setPickerOpen(false), style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1001 } }),
            React.createElement("div", { style: { position: 'absolute', top: '100%', right: 0, marginTop: '8px', zIndex: 1002, backgroundColor: 'var(--neutral-10)', border: '1px solid var(--neutral-50)', borderRadius: '6px', padding: '12px', width: '220px', boxShadow: '0 8px 16px rgba(0,0,0,0.5)' } },
                React.createElement("div", { style: { display: 'flex', borderBottom: '1px solid var(--neutral-40)', marginBottom: '10px' } },
                    React.createElement("div", { onClick: () => setActiveTab('palette'), style: { padding: '4px 10px', fontSize: '11px', cursor: 'pointer', borderBottom: activeTab === 'palette' ? '2px solid var(--callToAction)' : '2px solid transparent', color: activeTab === 'palette' ? 'var(--neutral-90)' : 'var(--neutral-60)', fontWeight: activeTab === 'palette' ? 'bold' : 'normal' } }, "Palette"),
                    React.createElement("div", { onClick: () => setActiveTab('custom'), style: { padding: '4px 10px', fontSize: '11px', cursor: 'pointer', borderBottom: activeTab === 'custom' ? '2px solid var(--callToAction)' : '2px solid transparent', color: activeTab === 'custom' ? 'var(--neutral-90)' : 'var(--neutral-60)', fontWeight: activeTab === 'custom' ? 'bold' : 'normal' } }, "Custom")),
                activeTab === 'palette' && (React.createElement("div", { style: { display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' } }, constants_1.STANDARD_PALETTE.map(swatch => (React.createElement("div", { key: `popover-palette-${swatch}`, onClick: () => { onChange(swatch); setPickerOpen(false); }, style: { width: '18px', height: '18px', backgroundColor: swatch, border: '1px solid rgba(0,0,0,0.2)', borderRadius: '2px', cursor: 'pointer' }, title: swatch }))))),
                activeTab === 'custom' && (React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '15px', padding: '5px 0' } },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                        React.createElement("span", { style: { fontSize: '11px', color: 'var(--neutral-80)' } }, "Base Color:"),
                        React.createElement("div", { style: { width: '100%', maxWidth: '100px', height: '24px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--neutral-40)', position: 'relative' } },
                            React.createElement("input", { type: "color", value: currentHex, onChange: e => handleColorChange(e.target.value), style: { position: 'absolute', top: '-10px', left: '-10px', width: '150px', height: '50px', padding: 0, border: 'none', cursor: 'pointer' } }))),
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                        React.createElement("span", { style: { fontSize: '11px', color: 'var(--neutral-80)', width: '40px' } }, "Alpha:"),
                        React.createElement("input", { type: "range", min: "0", max: "1", step: "0.01", value: currentAlpha, onChange: e => handleAlphaChange(parseFloat(e.target.value)), style: { flex: 1, cursor: 'pointer', height: '4px' } }),
                        React.createElement("span", { style: { fontSize: '11px', color: 'var(--neutral-80)', width: '30px', textAlign: 'right' } },
                            Math.round(currentAlpha * 100),
                            "%")))))))));
};
exports.ColorInput = ColorInput;


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/ContainerNode.tsx":
/*!*********************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/ContainerNode.tsx ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContainerNode = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
// @ts-ignore
const reactflow_1 = __webpack_require__(/*! reactflow */ "./node_modules/reactflow/dist/umd/index.js");
const shallowEqualObjects = (a, b) => {
    if (a === b)
        return true;
    if (!a || !b)
        return a === b;
    const aKeys = Object.keys(a);
    if (aKeys.length !== Object.keys(b).length)
        return false;
    for (const k of aKeys) {
        if (a[k] !== b[k])
            return false;
    }
    return true;
};
const areContainerNodePropsEqual = (prev, next) => {
    if (prev.id !== next.id || prev.selected !== next.selected)
        return false;
    const pd = prev.data, nd = next.data;
    if (pd.label !== nd.label)
        return false;
    if (pd.isEditable !== nd.isEditable)
        return false;
    if (pd.unlockMovement !== nd.unlockMovement)
        return false;
    if (pd.enableResize !== nd.enableResize)
        return false;
    if (!shallowEqualObjects(pd.style, nd.style))
        return false;
    if (!shallowEqualObjects(pd.labelStyle, nd.labelStyle))
        return false;
    if (pd.onGearClick !== nd.onGearClick)
        return false;
    if (pd.onResizeEnd !== nd.onResizeEnd)
        return false;
    return true;
};
exports.ContainerNode = react_1.default.memo(({ id, data, selected }) => {
    var _a, _b, _c, _d, _e;
    const { zoom } = reactflow_1.useViewport();
    const finalLabelBg = ((_a = data.labelStyle) === null || _a === void 0 ? void 0 : _a.backgroundColor) || 'var(--neutral-30)';
    const finalLabelColor = ((_b = data.labelStyle) === null || _b === void 0 ? void 0 : _b.color) || 'var(--neutral-90)';
    const finalGearColor = ((_c = data.labelStyle) === null || _c === void 0 ? void 0 : _c.fill) || finalLabelColor;
    // Use the unified flag passed from mapIgnitionToReactFlowNodes
    const isUnlocked = data.unlockMovement;
    const combinedStyle = Object.assign(Object.assign({ width: '100%', height: '100%', backgroundColor: ((_d = data.style) === null || _d === void 0 ? void 0 : _d.backgroundColor) || ((_e = data.style) === null || _e === void 0 ? void 0 : _e.fill) || 'rgba(128, 128, 128, 0.2)', border: selected ? '2px solid var(--callToAction)' : '2px dashed var(--neutral-50)', borderRadius: '8px', position: 'relative', boxSizing: 'border-box' }, (data.style || {})), { outline: (selected && !data.enableResize) ? '2px solid var(--callToAction)' : 'none', outlineOffset: '2px' });
    // Calculate dynamic resizer handle size based on zoom.
    const resizerSize = Math.max(10, Math.round(16 / zoom));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(reactflow_1.NodeResizer, { color: "var(--callToAction)", isVisible: selected && data.enableResize === true, minWidth: 150, minHeight: 150, 
            // Resize handles MUST remain interactive even if the shell is 'none'
            handleStyle: { width: `${resizerSize}px`, height: `${resizerSize}px`, borderRadius: '4px', pointerEvents: 'auto' }, onResizeEnd: (e, params) => {
                if (data.onResizeEnd)
                    data.onResizeEnd(id, params.x, params.y, params.width, params.height);
            } }),
        react_1.default.createElement("div", { style: combinedStyle },
            react_1.default.createElement("div", { style: {
                    position: 'absolute', top: '8px', right: '8px',
                    zIndex: 20, color: 'var(--neutral-60)',
                    display: 'flex', alignItems: 'center', pointerEvents: 'none',
                    opacity: 0.9,
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))'
                } }, isUnlocked ? (
            /* Unlocked Icon (Lock Open) */
            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "18px", viewBox: "0 -960 960 960", width: "18px", fill: "currentColor" },
                react_1.default.createElement("path", { d: "M240-640v-80q0-100 70-170t170-70q100 0 170 70t70 170h-80q0-66-47-113t-113-47q-66 0-113 47t-47 113v80H240Zm560 560H160V-560h640v480ZM240-160h480v-320H240v320Zm240-160q33 0 56.5-23.5T560-400q0-33-23.5-56.5T480-480q-33 0-56.5 23.5T400-400q0 33 23.5 56.5T480-320ZM240-160v-320 320Z" }))) : (
            /* Locked Icon */
            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "18px", viewBox: "0 -960 960 960", width: "18px", fill: "currentColor" },
                react_1.default.createElement("path", { d: "M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" })))),
            react_1.default.createElement("div", { className: "custom-drag-handle", onPointerDown: (e) => { e.stopPropagation(); }, style: Object.assign({ position: 'absolute', top: 0, left: 0, maxWidth: '100%', boxSizing: 'border-box', backgroundColor: finalLabelBg, padding: '4px 8px', borderTopLeftRadius: '7px', borderTopRightRadius: '7px', borderBottomRightRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: finalLabelColor, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', transition: 'background-color 0.2s ease', zIndex: 10, pointerEvents: 'auto' }, (data.labelStyle || {})), onMouseEnter: (e) => {
                    if (!data.unlockMovement) {
                        e.currentTarget.style.backgroundColor = 'var(--neutral-40)';
                    }
                }, onMouseLeave: (e) => {
                    if (!data.unlockMovement) {
                        e.currentTarget.style.backgroundColor = finalLabelBg;
                    }
                }, onClick: (e) => {
                    e.stopPropagation();
                    if (data.onGearClick)
                        data.onGearClick(id, e);
                }, title: data.label },
                react_1.default.createElement("div", { className: "arch-node-gear", style: { display: 'flex', alignItems: 'center', flexShrink: 0 } },
                    react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "16px", viewBox: "0 -960 960 960", width: "16px", fill: finalGearColor, "aria-label": "Settings" },
                        react_1.default.createElement("path", { d: "m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" }))),
                react_1.default.createElement("span", { style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 } }, data.label)))));
}, areContainerNodePropsEqual);


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/ContextMenu.tsx":
/*!*******************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/ContextMenu.tsx ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContextMenu = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const svgSanitize_1 = __webpack_require__(/*! ./svgSanitize */ "./typescript/components/ArchitectureBuilder/svgSanitize.ts");
const constants_1 = __webpack_require__(/*! ./constants */ "./typescript/components/ArchitectureBuilder/constants.ts");
// ─── Style constants (menu-local) ─────────────────────────────────────────────
const MENU_ITEM_STYLE = { padding: '5px 8px', cursor: 'pointer', color: 'var(--neutral-90)' };
const MENU_ITEM_FLEX_STYLE = { padding: '5px 8px', cursor: 'pointer', color: 'var(--neutral-90)', display: 'flex', justifyContent: 'space-between', gap: '12px' };
const MENU_DIVIDER_STYLE = { borderTop: '1px solid var(--neutral-40)', margin: '4px 0' };
const FLYOUT_PANEL_STYLE = { backgroundColor: 'var(--neutral-20)', border: '1px solid var(--neutral-50)', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', padding: '4px' };
const CONTAINER_STYLE = { position: 'absolute', zIndex: 10, backgroundColor: 'var(--neutral-20)', border: '1px solid var(--neutral-50)', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', padding: '4px', minWidth: '140px', fontSize: '12px' };
// ─── SwapIcon ─────────────────────────────────────────────────────────────────
const SwapIcon = ({ image, label }) => {
    const scopeId = React.useMemo(() => svgSanitize_1.nextSvgScopeId(), []);
    const svgHtml = React.useMemo(() => svgSanitize_1.extractSvgMarkup(image, scopeId), [image, scopeId]);
    if (svgHtml)
        return React.createElement("div", { id: scopeId, style: { width: '100%', height: '100%', overflow: 'hidden' }, dangerouslySetInnerHTML: { __html: svgHtml }, title: label });
    const dataUri = svgSanitize_1.toSafeDataUri(image);
    return dataUri ? React.createElement("img", { src: dataUri, alt: label, style: { width: '100%', height: '100%', objectFit: 'contain' } }) : null;
};
exports.ContextMenu = React.memo(({ contextMenu, activeSubMenu, setActiveSubMenu, rawNodesDict, rawEdgesDict, paletteItems, connectionTypes, clipboardRef, wrapperRef, getValidIntersection, handleContextMenuAction, handleNodeSwap, handleLineTypeChange, handleConnectionTypeChange, handleAnimationChange, handleSetConnectionDefault, handleSetDefaultForType, handleClearConnectionDefault, nodeTypeConnectionDefaults, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const containerRef = React.useRef(null);
    const flyoutRefs = React.useRef({});
    const [adjustment, setAdjustment] = React.useState({ dx: 0, dy: 0 });
    const [flyoutOffsets, setFlyoutOffsets] = React.useState({});
    const [flipState, setFlipState] = React.useState({ left: false, up: false });
    const isTouchDevice = React.useRef(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
    // Measure menu dimensions and clamp to viewport bounds (wrapper-local coordinates)
    React.useLayoutEffect(() => {
        if (!containerRef.current || !wrapperRef.current)
            return;
        // offsetWidth/offsetHeight = natural element size (not clipped by overflow: hidden on parent)
        const menuW = containerRef.current.offsetWidth;
        const menuH = containerRef.current.offsetHeight;
        const wrapW = wrapperRef.current.clientWidth;
        const wrapH = wrapperRef.current.clientHeight;
        // All arithmetic is in wrapper-local space (same coordinate system as contextMenu.top/left)
        let dx = 0, dy = 0;
        if (contextMenu.left + menuW > wrapW - 8)
            dx = wrapW - 8 - (contextMenu.left + menuW);
        if (contextMenu.top + menuH > wrapH - 8)
            dy = wrapH - 8 - (contextMenu.top + menuH);
        if (contextMenu.left + dx < 8)
            dx = 8 - contextMenu.left;
        if (contextMenu.top + dy < 8)
            dy = 8 - contextMenu.top;
        setAdjustment({ dx, dy });
        // Compute flyout flip flags here so they don't force a reflow during render
        const flipsLeft = contextMenu.left + dx + 310 > wrapW;
        const flipsUp = contextMenu.top + dy + menuH > wrapH - 8;
        setFlipState({ left: flipsLeft, up: flipsUp });
    }, [contextMenu.top, contextMenu.left]);
    // Measure flyouts and position them to fit within bounds (shift upward if needed)
    React.useLayoutEffect(() => {
        if (!wrapperRef.current || !containerRef.current)
            return;
        const newOffsets = {};
        const wrapH = wrapperRef.current.clientHeight;
        const menuTop = contextMenu.top + adjustment.dy;
        const menuH = containerRef.current.offsetHeight;
        const menuBottom = menuTop + menuH;
        // Measure each flyout and calculate its top offset
        Object.entries(flyoutRefs.current).forEach(([key, flyout]) => {
            if (!flyout)
                return;
            const flyoutH = flyout.offsetHeight;
            // Space below the menu
            const spaceBelow = wrapH - menuBottom - 8;
            // If flyout doesn't fit below, position it above
            if (flyoutH > spaceBelow) {
                // Get submenu item height for upward positioning
                const parent = flyout.parentElement;
                const itemH = (parent === null || parent === void 0 ? void 0 : parent.firstElementChild) ? parent.firstElementChild.offsetHeight : 24;
                // Above: shift up by flyout height, but keep it adjacent to item
                newOffsets[key] = itemH - flyoutH;
            }
            else {
                // Below: original position that worked
                newOffsets[key] = 0;
            }
        });
        setFlyoutOffsets(newOffsets);
    }, [activeSubMenu, adjustment, contextMenu.top]);
    // Memoize derived edge state — avoids recomputing getValidIntersection on every render
    const availableConnections = React.useMemo(() => {
        if (contextMenu.type !== 'edge')
            return [];
        const edge = rawEdgesDict[contextMenu.id];
        if (!edge)
            return [];
        const intersection = getValidIntersection(edge.source, edge.target, contextMenu.id);
        const result = [...intersection];
        if (edge.connectionType && !result.includes(edge.connectionType))
            result.push(edge.connectionType);
        return result;
    }, [contextMenu, rawEdgesDict, getValidIntersection]);
    const currentLineType = contextMenu.type === 'edge' ? (((_a = rawEdgesDict[contextMenu.id]) === null || _a === void 0 ? void 0 : _a.lineType) || 'smoothstep') : 'smoothstep';
    const currentConnectionType = contextMenu.type === 'edge' ? (((_b = rawEdgesDict[contextMenu.id]) === null || _b === void 0 ? void 0 : _b.connectionType) || '') : '';
    const edgeDefaultInfo = React.useMemo(() => {
        var _a, _b;
        if (contextMenu.type !== 'edge')
            return null;
        const edge = rawEdgesDict[contextMenu.id];
        if (!edge)
            return null;
        const srcType = (_a = rawNodesDict[edge.source]) === null || _a === void 0 ? void 0 : _a.typeId;
        const tgtType = (_b = rawNodesDict[edge.target]) === null || _b === void 0 ? void 0 : _b.typeId;
        if (!srcType || !tgtType)
            return null;
        const pairKey = [srcType, tgtType].sort().join('__');
        const currentDefault = nodeTypeConnectionDefaults === null || nodeTypeConnectionDefaults === void 0 ? void 0 : nodeTypeConnectionDefaults[pairKey];
        return { srcType, tgtType, pairKey, isAlreadyDefault: currentDefault === edge.connectionType };
    }, [contextMenu, rawEdgesDict, rawNodesDict, nodeTypeConnectionDefaults]);
    const validSwapItems = React.useMemo(() => {
        if (contextMenu.type !== 'node')
            return [];
        const node = rawNodesDict[contextMenu.id];
        if (!node)
            return [];
        const currentPaletteItem = paletteItems.find((p) => p.id === node.paletteId);
        if (!(currentPaletteItem === null || currentPaletteItem === void 0 ? void 0 : currentPaletteItem.swappableWith))
            return [];
        return paletteItems.filter((p) => currentPaletteItem.swappableWith.includes(p.id));
    }, [contextMenu, rawNodesDict, paletteItems]);
    const flyoutFlipsLeft = flipState.left;
    const flyoutFlipsUp = flipState.up;
    // Build flyout style with dynamic positioning
    const getFlyoutStyle = (submenuKey) => {
        var _a;
        const topOffset = (_a = flyoutOffsets[submenuKey]) !== null && _a !== void 0 ? _a : 0;
        return Object.assign({ position: 'absolute', top: topOffset === 0 ? '-0px' : topOffset + 'px' }, (flyoutFlipsLeft ? { right: '100%' } : { left: '100%' }));
    };
    return (React.createElement("div", { ref: containerRef, style: Object.assign(Object.assign({}, CONTAINER_STYLE), { top: contextMenu.top, left: contextMenu.left, transform: `translate(${adjustment.dx}px, ${adjustment.dy}px)` }) },
        contextMenu.type === 'pane' && (React.createElement("div", { style: { padding: '5px 8px', cursor: clipboardRef.current ? 'pointer' : 'not-allowed', color: clipboardRef.current ? 'var(--neutral-90)' : 'var(--neutral-50)' }, onClick: () => { if (clipboardRef.current)
                handleContextMenuAction('paste'); } }, "\uD83D\uDCCB Paste")),
        contextMenu.type !== 'pane' && (React.createElement(React.Fragment, null,
            React.createElement("div", { style: MENU_ITEM_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('config') }, "\u2699\uFE0F Config"),
            contextMenu.type === 'node' && (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { padding: '5px 8px', cursor: 'pointer', color: 'var(--callToAction)' }, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('editStyle') }, "\uD83C\uDFA8 Edit Style"),
                constants_1.TEXT_NODE_PALETTE_IDS.has((_c = rawNodesDict[contextMenu.id]) === null || _c === void 0 ? void 0 : _c.paletteId) && (React.createElement("div", { style: MENU_ITEM_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('editContent') }, "\uD83D\uDCDD Edit Content")),
                contextMenu.isContainer && (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: MENU_DIVIDER_STYLE }),
                    React.createElement("div", { style: MENU_ITEM_FLEX_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('toggleUnlocked') }, ((_e = (_d = rawNodesDict[contextMenu.id]) === null || _d === void 0 ? void 0 : _d.configs) === null || _e === void 0 ? void 0 : _e.unlocked) ? (React.createElement(React.Fragment, null,
                        React.createElement("span", null, "\uD83D\uDD13 Interaction Unlocked"),
                        React.createElement("span", null))) : (React.createElement(React.Fragment, null,
                        React.createElement("span", null, "\uD83D\uDD12 Interaction Locked"),
                        React.createElement("span", null)))),
                    React.createElement("div", { style: MENU_ITEM_FLEX_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('toggleLink') }, !((_g = (_f = rawNodesDict[contextMenu.id]) === null || _f === void 0 ? void 0 : _f.configs) === null || _g === void 0 ? void 0 : _g.unlinked) ? (React.createElement(React.Fragment, null,
                        React.createElement("span", null, "\uD83D\uDD17 Content Linked"),
                        React.createElement("span", null))) : (React.createElement(React.Fragment, null,
                        React.createElement("span", null, "\u26D3\uFE0F\u200D\uD83D\uDCA5 Content Not Linked"),
                        React.createElement("span", null)))))),
                !contextMenu.isContainer && !constants_1.TEXT_NODE_PALETTE_IDS.has((_h = rawNodesDict[contextMenu.id]) === null || _h === void 0 ? void 0 : _h.paletteId) && (React.createElement("div", { style: MENU_ITEM_FLEX_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('toggleGrayscale') }, ((_j = rawNodesDict[contextMenu.id]) === null || _j === void 0 ? void 0 : _j.inactive) ? (React.createElement(React.Fragment, null,
                    React.createElement("span", null, "\uD83D\uDD34 Node Inactive"),
                    React.createElement("span", null, "\u2713"))) : (React.createElement(React.Fragment, null,
                    React.createElement("span", null, "\uD83D\uDFE2 Node Active"),
                    React.createElement("span", null))))),
                React.createElement("div", { style: MENU_DIVIDER_STYLE }),
                React.createElement("div", { style: MENU_ITEM_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('copy') }, "\uD83D\uDCCB Copy"),
                contextMenu.isContainer && (React.createElement("div", { style: { padding: '5px 8px', cursor: clipboardRef.current ? 'pointer' : 'not-allowed', color: clipboardRef.current ? 'var(--neutral-90)' : 'var(--neutral-50)' }, onClick: () => { if (clipboardRef.current)
                        handleContextMenuAction('paste'); } }, "\uD83D\uDCCB Paste")),
                React.createElement("div", { style: { position: 'relative' }, onMouseEnter: () => !isTouchDevice.current && setActiveSubMenu('order'), onClick: () => isTouchDevice.current && setActiveSubMenu(activeSubMenu === 'order' ? null : 'order') },
                    React.createElement("div", { style: { padding: '5px 8px', cursor: 'pointer', color: 'var(--neutral-90)', display: 'flex', justifyContent: 'space-between', backgroundColor: activeSubMenu === 'order' ? 'var(--neutral-30)' : 'transparent' } },
                        React.createElement("span", null, "\uD83D\uDCD1 Order"),
                        React.createElement("span", null, "\u25B6")),
                    activeSubMenu === 'order' && (React.createElement("div", { ref: (el) => { if (el)
                            flyoutRefs.current['order'] = el; }, style: Object.assign(Object.assign(Object.assign({}, getFlyoutStyle('order')), FLYOUT_PANEL_STYLE), { minWidth: '150px' }) },
                        React.createElement("div", { style: MENU_ITEM_STYLE, onClick: () => handleContextMenuAction('bringToFront') }, "\u23EB Bring to Front"),
                        React.createElement("div", { style: MENU_ITEM_STYLE, onClick: () => handleContextMenuAction('bringForward') }, "\uD83D\uDD3C Bring Forward"),
                        React.createElement("div", { style: MENU_ITEM_STYLE, onClick: () => handleContextMenuAction('sendBackward') }, "\uD83D\uDD3D Send Backward"),
                        React.createElement("div", { style: MENU_ITEM_STYLE, onClick: () => handleContextMenuAction('sendToBack') }, "\u23EC Send to Back")))),
                validSwapItems.length > 0 && (React.createElement("div", { style: { position: 'relative' }, onMouseEnter: () => !isTouchDevice.current && setActiveSubMenu('swapNode'), onClick: () => isTouchDevice.current && setActiveSubMenu(activeSubMenu === 'swapNode' ? null : 'swapNode') },
                    React.createElement("div", { style: { padding: '5px 8px', cursor: 'pointer', color: 'var(--neutral-90)', display: 'flex', justifyContent: 'space-between', backgroundColor: activeSubMenu === 'swapNode' ? 'var(--neutral-30)' : 'transparent' } },
                        React.createElement("span", null, "\uD83D\uDD04 Swap Node"),
                        React.createElement("span", null, "\u25B6")),
                    activeSubMenu === 'swapNode' && (React.createElement("div", { ref: (el) => { if (el)
                            flyoutRefs.current['swapNode'] = el; }, style: Object.assign(Object.assign(Object.assign({}, getFlyoutStyle('swapNode')), FLYOUT_PANEL_STYLE), { minWidth: '150px' }) }, validSwapItems.map((targetItem) => (React.createElement("div", { key: targetItem.id, style: { padding: '5px 8px', cursor: 'pointer', color: 'var(--neutral-90)', display: 'flex', alignItems: 'center' }, onClick: () => handleNodeSwap(targetItem.id) },
                        React.createElement("div", { style: { width: '16px', height: '16px', marginRight: '6px', display: 'flex', alignItems: 'center' } }, targetItem.image && React.createElement(SwapIcon, { image: targetItem.image, label: targetItem.label })),
                        React.createElement("span", null, targetItem.label)))))))))),
            contextMenu.type === 'edge' && (React.createElement(React.Fragment, null,
                React.createElement("div", { style: MENU_ITEM_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('reverseEdge') }, "\uD83D\uDD04 Reverse Direction"),
                React.createElement("div", { style: MENU_ITEM_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('toggleArrow') }, ((_k = rawEdgesDict[contextMenu.id]) === null || _k === void 0 ? void 0 : _k.arrow) !== false ? '❌ Remove Arrow' : '➡️ Add Arrow'),
                React.createElement("div", { style: MENU_ITEM_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('toggleLabel') }, ((_l = rawEdgesDict[contextMenu.id]) === null || _l === void 0 ? void 0 : _l.showLabel) === true ? '👁️ Hide Label' : '👁️ Show Label'),
                React.createElement("div", { style: MENU_ITEM_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('toggleDashed') }, ((_m = rawEdgesDict[contextMenu.id]) === null || _m === void 0 ? void 0 : _m.dashed) ? '─── Solid Line' : '- - - Dashed Line'),
                (() => {
                    var _a;
                    const e = rawEdgesDict[contextMenu.id];
                    const lt = e === null || e === void 0 ? void 0 : e.lineType;
                    const canClear = (!lt || lt === 'smoothstep' || lt === 'step') && ((_a = e === null || e === void 0 ? void 0 : e.waypoints) === null || _a === void 0 ? void 0 : _a.length) > 0;
                    return canClear ? (React.createElement("div", { style: MENU_ITEM_STYLE, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('clearWaypoints') },
                        "\u2299 Clear Path (",
                        e.waypoints.length,
                        " pt",
                        e.waypoints.length !== 1 ? 's' : '',
                        ")")) : null;
                })(),
                React.createElement("div", { style: MENU_DIVIDER_STYLE }),
                React.createElement("div", { style: { position: 'relative' }, onMouseEnter: () => !isTouchDevice.current && setActiveSubMenu('lineType'), onClick: () => isTouchDevice.current && setActiveSubMenu(activeSubMenu === 'lineType' ? null : 'lineType') },
                    React.createElement("div", { style: { padding: '5px 8px', cursor: 'pointer', color: 'var(--neutral-90)', display: 'flex', justifyContent: 'space-between', backgroundColor: activeSubMenu === 'lineType' ? 'var(--neutral-30)' : 'transparent' } },
                        React.createElement("span", null, "\u3030\uFE0F Line Type"),
                        React.createElement("span", null, "\u25B6")),
                    activeSubMenu === 'lineType' && (React.createElement("div", { ref: (el) => { if (el)
                            flyoutRefs.current['lineType'] = el; }, style: Object.assign(Object.assign(Object.assign({}, getFlyoutStyle('lineType')), FLYOUT_PANEL_STYLE), { minWidth: '120px' }) },
                        React.createElement("div", { style: Object.assign(Object.assign({}, MENU_ITEM_FLEX_STYLE), { whiteSpace: 'nowrap' }), onClick: () => handleLineTypeChange('smoothstep') },
                            React.createElement("span", null, "\u3030\uFE0F Smooth"),
                            React.createElement("span", null, currentLineType === 'smoothstep' ? '✓' : '')),
                        React.createElement("div", { style: Object.assign(Object.assign({}, MENU_ITEM_FLEX_STYLE), { whiteSpace: 'nowrap' }), onClick: () => handleLineTypeChange('step') },
                            React.createElement("span", null, "\uD83D\uDD32 Stepped"),
                            React.createElement("span", null, currentLineType === 'step' ? '✓' : '')),
                        React.createElement("div", { style: Object.assign(Object.assign({}, MENU_ITEM_FLEX_STYLE), { whiteSpace: 'nowrap' }), onClick: () => handleLineTypeChange('straight') },
                            React.createElement("span", null, "\uD83D\uDCCF Straight"),
                            React.createElement("span", null, currentLineType === 'straight' ? '✓' : '')),
                        React.createElement("div", { style: Object.assign(Object.assign({}, MENU_ITEM_FLEX_STYLE), { whiteSpace: 'nowrap' }), onClick: () => handleLineTypeChange('default') },
                            React.createElement("span", null, "\u27B0 Bezier"),
                            React.createElement("span", null, currentLineType === 'default' ? '✓' : ''))))),
                React.createElement("div", { style: { position: 'relative' }, onMouseEnter: () => !isTouchDevice.current && setActiveSubMenu('animation'), onClick: () => isTouchDevice.current && setActiveSubMenu(activeSubMenu === 'animation' ? null : 'animation') },
                    React.createElement("div", { style: { padding: '5px 8px', cursor: 'pointer', color: 'var(--neutral-90)', display: 'flex', justifyContent: 'space-between', backgroundColor: activeSubMenu === 'animation' ? 'var(--neutral-30)' : 'transparent' } },
                        React.createElement("span", null, "\u2728 Animation"),
                        React.createElement("span", null, "\u25B6")),
                    activeSubMenu === 'animation' && (React.createElement("div", { ref: (el) => { if (el)
                            flyoutRefs.current['animation'] = el; }, style: Object.assign(Object.assign(Object.assign({}, getFlyoutStyle('animation')), FLYOUT_PANEL_STYLE), { minWidth: '140px' }) },
                        React.createElement("div", { style: Object.assign(Object.assign({}, MENU_ITEM_FLEX_STYLE), { whiteSpace: 'nowrap' }), onClick: () => handleAnimationChange('none') },
                            React.createElement("span", null, "\uD83D\uDEAB None"),
                            React.createElement("span", null, (((_o = rawEdgesDict[contextMenu.id]) === null || _o === void 0 ? void 0 : _o.animation) || 'none') === 'none' ? '✓' : '')),
                        React.createElement("div", { style: Object.assign(Object.assign({}, MENU_ITEM_FLEX_STYLE), { whiteSpace: 'nowrap' }), onClick: () => handleAnimationChange('forward') },
                            React.createElement("span", null, "\u27A1\uFE0F Forward"),
                            React.createElement("span", null, ((_p = rawEdgesDict[contextMenu.id]) === null || _p === void 0 ? void 0 : _p.animation) === 'forward' ? '✓' : '')),
                        React.createElement("div", { style: Object.assign(Object.assign({}, MENU_ITEM_FLEX_STYLE), { whiteSpace: 'nowrap' }), onClick: () => handleAnimationChange('bidirectional') },
                            React.createElement("span", null, "\u2194\uFE0F Bidirectional"),
                            React.createElement("span", null, ((_q = rawEdgesDict[contextMenu.id]) === null || _q === void 0 ? void 0 : _q.animation) === 'bidirectional' ? '✓' : ''))))),
                React.createElement("div", { style: { position: 'relative' }, onMouseEnter: () => !isTouchDevice.current && setActiveSubMenu('connectionType'), onClick: () => isTouchDevice.current && setActiveSubMenu(activeSubMenu === 'connectionType' ? null : 'connectionType') },
                    React.createElement("div", { style: { padding: '5px 8px', cursor: 'pointer', color: 'var(--neutral-90)', display: 'flex', justifyContent: 'space-between', backgroundColor: activeSubMenu === 'connectionType' ? 'var(--neutral-30)' : 'transparent' } },
                        React.createElement("span", null, "\uD83D\uDD17 Connection"),
                        React.createElement("span", null, "\u25B6")),
                    activeSubMenu === 'connectionType' && (React.createElement("div", { ref: (el) => { if (el)
                            flyoutRefs.current['connectionType'] = el; }, style: Object.assign(Object.assign(Object.assign({}, getFlyoutStyle('connectionType')), FLYOUT_PANEL_STYLE), { minWidth: '140px' }) }, availableConnections.length === 0
                        ? React.createElement("div", { style: { padding: '5px 8px', color: 'var(--neutral-60)' } }, "No valid connections")
                        : availableConnections.map(c => {
                            var _a, _b;
                            const isCurrentDefault = edgeDefaultInfo && (nodeTypeConnectionDefaults === null || nodeTypeConnectionDefaults === void 0 ? void 0 : nodeTypeConnectionDefaults[edgeDefaultInfo.pairKey]) === c;
                            return (React.createElement("div", { key: c, style: { padding: '5px 8px', cursor: 'pointer', color: 'var(--neutral-90)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', whiteSpace: 'nowrap', gap: '8px' }, onClick: () => handleConnectionTypeChange(c) },
                                React.createElement("span", null,
                                    React.createElement("span", { style: { color: ((_a = connectionTypes[c]) === null || _a === void 0 ? void 0 : _a.color) || 'var(--neutral-90)', marginRight: '4px' } }, "\u25CF"),
                                    ((_b = connectionTypes[c]) === null || _b === void 0 ? void 0 : _b.label) || c),
                                React.createElement("span", { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                                    React.createElement("span", null, currentConnectionType === c ? '✓' : ''),
                                    edgeDefaultInfo && (React.createElement("span", { title: isCurrentDefault ? 'Clear default for this node pair' : 'Set as default for this node pair', style: { opacity: isCurrentDefault ? 1 : 0.35, fontSize: '11px', cursor: 'pointer' }, onClick: (e) => { e.stopPropagation(); if (isCurrentDefault)
                                            handleClearConnectionDefault();
                                        else
                                            handleSetDefaultForType(c); } }, "\u2B50")))));
                        })))),
                edgeDefaultInfo && (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: MENU_DIVIDER_STYLE }),
                    edgeDefaultInfo.isAlreadyDefault ? (React.createElement("div", { style: Object.assign(Object.assign({}, MENU_ITEM_FLEX_STYLE), { whiteSpace: 'nowrap', color: 'var(--neutral-60)' }), onMouseEnter: () => setActiveSubMenu(null), onClick: handleClearConnectionDefault },
                        React.createElement("span", null, "\u2715 Clear Default"),
                        React.createElement("span", { style: { color: 'var(--neutral-50)', fontSize: '11px' } },
                            edgeDefaultInfo.srcType,
                            " \u2194 ",
                            edgeDefaultInfo.tgtType))) : (React.createElement("div", { style: Object.assign(Object.assign({}, MENU_ITEM_FLEX_STYLE), { whiteSpace: 'nowrap' }), onMouseEnter: () => setActiveSubMenu(null), onClick: handleSetConnectionDefault },
                        React.createElement("span", null, "\u2B50 Set as Default"),
                        React.createElement("span", { style: { color: 'var(--neutral-60)', fontSize: '11px' } },
                            edgeDefaultInfo.srcType,
                            " \u2194 ",
                            edgeDefaultInfo.tgtType))))))),
            contextMenu.isContainer && (React.createElement("div", { style: { padding: '5px 8px', cursor: 'pointer', color: 'var(--error)', borderTop: '1px solid var(--neutral-40)' }, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('deleteWithContents') }, "\uD83D\uDDD1\uFE0F Delete Area & Contents")),
            React.createElement("div", { style: { padding: '5px 8px', cursor: 'pointer', color: 'var(--error)', borderTop: contextMenu.isContainer ? 'none' : '1px solid var(--neutral-40)' }, onMouseEnter: () => setActiveSubMenu(null), onClick: () => handleContextMenuAction('delete') }, contextMenu.isContainer ? '🗑️ Delete Area Only' : '🗑️ Delete')))));
});


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/CustomEdge.tsx":
/*!******************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/CustomEdge.tsx ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.edgeTypes = exports.CustomEdge = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ReactDOM = __importStar(__webpack_require__(/*! react-dom */ "react-dom"));
// @ts-ignore
const reactflow_1 = __webpack_require__(/*! reactflow */ "./node_modules/reactflow/dist/umd/index.js");
const EdgeUtils_1 = __webpack_require__(/*! ./EdgeUtils */ "./typescript/components/ArchitectureBuilder/EdgeUtils.ts");
exports.CustomEdge = React.memo(({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEnd, style, label, interactionWidth, zIndex, }) => {
    var _a, _b;
    const storedWaypoints = (_a = data === null || data === void 0 ? void 0 : data.waypoints) !== null && _a !== void 0 ? _a : [];
    const showLabel = (data === null || data === void 0 ? void 0 : data.showLabel) === true;
    const { getZoom } = reactflow_1.useReactFlow();
    const zoom = getZoom();
    // Calculate dynamic interaction width (selection/drag zone)
    const dynamicInteractionWidth = Math.max(20, Math.round(24 / zoom));
    // Calculate dynamic segment handle dimensions (colored pills)
    const hWidth = Math.max(24, Math.round(36 / zoom));
    const hHeight = Math.max(10, Math.round(14 / zoom));
    // terminal points (native reactflow coordinates)
    const sx = sourceX;
    const sy = sourceY;
    const tx = targetX;
    const ty = targetY;
    // null = at rest (derive from props); non-null = user is actively dragging.
    const [liveWaypoints, setLiveWaypoints] = React.useState(null);
    const dragState = React.useRef(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editingText, setEditingText] = React.useState(label);
    const isStepType = (data === null || data === void 0 ? void 0 : data.lineType) === 'step' || (data === null || data === void 0 ? void 0 : data.lineType) === 'smoothstep' || !(data === null || data === void 0 ? void 0 : data.lineType);
    const isHorizSrc = sourcePosition === 'right' || sourcePosition === 'left';
    const isHorizTgt = targetPosition === 'right' || targetPosition === 'left';
    // Priority: active drag > stored custom waypoints > auto-routed (only if NO waypoints exist).
    const baseWaypoints = React.useMemo(() => liveWaypoints !== null && liveWaypoints !== void 0 ? liveWaypoints : (storedWaypoints.length > 0
        ? storedWaypoints
        : EdgeUtils_1.computeAutoWaypoints(sx, sy, sourcePosition, tx, ty, targetPosition)), [liveWaypoints, storedWaypoints, sx, sy, sourcePosition, tx, ty, targetPosition]);
    // Pin logic uses shifted terminal coordinates to enforce orthogonality on manual paths.
    const pinnedWaypoints = React.useMemo(() => isStepType && baseWaypoints.length > 0
        ? baseWaypoints.map((wp, i) => {
            const result = Object.assign({}, wp); // Shallow copy to avoid mutation
            // Pin FIRST waypoint to the handle's exit axis.
            // If it's a side handle (horiz), force WP0.y to handle's Y.
            // If it's a top/bottom handle (vert), force WP0.x to handle's X.
            if (i === 0) {
                if (isHorizSrc)
                    result.y = sy;
                else
                    result.x = sx;
            }
            // Pin LAST waypoint to the handle's entry axis.
            if (i === baseWaypoints.length - 1) {
                if (isHorizTgt)
                    result.y = ty;
                else
                    result.x = tx;
            }
            return result;
        })
        : baseWaypoints, [isStepType, baseWaypoints, isHorizSrc, isHorizTgt, sx, sy, tx, ty]);
    // Filter out redundant waypoints (points that coincide with handles) to prevent
    // zero-length segments that cause rendering artifacts or 'weird' line jumps.
    const filteredWaypoints = React.useMemo(() => pinnedWaypoints.filter((wp, i) => {
        if (i === 0)
            return Math.hypot(wp.x - sx, wp.y - sy) > 1;
        if (i === pinnedWaypoints.length - 1)
            return Math.hypot(wp.x - tx, wp.y - ty) > 1;
        return true;
    }), [pinnedWaypoints, sx, sy, tx, ty]);
    const allPts = React.useMemo(() => [{ x: sx, y: sy }, ...filteredWaypoints, { x: tx, y: ty }], [filteredWaypoints, sx, sy, tx, ty]);
    // ─── Path computation ────────────────────────────────────────────────
    const { edgePath, labelX, labelY } = React.useMemo(() => {
        let path = '', lx = (sx + tx) / 2, ly = (sy + ty) / 2;
        if (isStepType) {
            path = EdgeUtils_1.buildPolylinePath(allPts, (data === null || data === void 0 ? void 0 : data.lineType) === 'step' ? 0 : 12);
            if (allPts.length >= 2) {
                const mid = Math.floor(allPts.length / 2);
                lx = (allPts[mid - 1].x + allPts[mid].x) / 2;
                ly = (allPts[mid - 1].y + allPts[mid].y) / 2;
            }
        }
        else if ((data === null || data === void 0 ? void 0 : data.lineType) === 'straight') {
            [path, lx, ly] = reactflow_1.getStraightPath({ sourceX: sx, sourceY: sy, targetX: tx, targetY: ty });
        }
        else {
            [path, lx, ly] = reactflow_1.getBezierPath({ sourceX: sx, sourceY: sy, targetX: tx, targetY: ty, sourcePosition, targetPosition });
        }
        return { edgePath: path, labelX: lx, labelY: ly };
    }, [isStepType, allPts, sx, sy, tx, ty, sourcePosition, targetPosition, data === null || data === void 0 ? void 0 : data.lineType]);
    // ─── Pointer-capture drag engine ──────────────────────────────────────
    const canEdit = (data === null || data === void 0 ? void 0 : data.isSelected) && isStepType && (data === null || data === void 0 ? void 0 : data.isEditable) !== false;
    const applyDelta = (ref, clientX, clientY) => {
        const zoom = getZoom();
        const rawDelta = ref.isH
            ? (clientY - ref.startClientY) / zoom
            : (clientX - ref.startClientX) / zoom;
        let newCoord = ref.startCoord + rawDelta;
        if (ref.snapEnabled && ref.snapPixels)
            newCoord = Math.round(newCoord / ref.snapPixels) * ref.snapPixels;
        return ref.baseWaypoints.map((wp, i) => i === ref.wp0Idx || i === ref.wp1Idx
            ? ref.isH ? Object.assign(Object.assign({}, wp), { y: newCoord }) : Object.assign(Object.assign({}, wp), { x: newCoord })
            : wp);
    };
    const handlePointerDown = (e, segIdx, isH) => {
        var _a, _b;
        e.stopPropagation();
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        const startWps = pinnedWaypoints;
        dragState.current = {
            startClientX: e.clientX,
            startClientY: e.clientY,
            startCoord: isH ? startWps[segIdx - 1].y : startWps[segIdx - 1].x,
            wp0Idx: segIdx - 1,
            wp1Idx: segIdx,
            isH,
            baseWaypoints: startWps,
            snapEnabled: (_a = data === null || data === void 0 ? void 0 : data.snapEnabled) !== null && _a !== void 0 ? _a : true,
            snapPixels: (_b = data === null || data === void 0 ? void 0 : data.snapPixels) !== null && _b !== void 0 ? _b : 15,
            onWaypointsChange: data === null || data === void 0 ? void 0 : data.onWaypointsChange,
        };
        setLiveWaypoints(startWps);
    };
    const handlePointerMove = (e) => {
        if (!dragState.current)
            return;
        setLiveWaypoints(applyDelta(dragState.current, e.clientX, e.clientY));
    };
    const handlePointerUp = (e) => {
        var _a;
        const ref = dragState.current;
        if (!ref)
            return;
        e.currentTarget.releasePointerCapture(e.pointerId);
        (_a = ref.onWaypointsChange) === null || _a === void 0 ? void 0 : _a.call(ref, applyDelta(ref, e.clientX, e.clientY));
        dragState.current = null;
        setLiveWaypoints(null);
    };
    const handlePointerCancel = (e) => {
        if (!dragState.current)
            return;
        e.currentTarget.releasePointerCapture(e.pointerId);
        dragState.current = null;
        setLiveWaypoints(null);
    };
    // ─── Label editing ───────────────────────────────────────────────────
    const handleLabelDoubleClick = () => {
        setIsEditing(true);
        setEditingText(label);
    };
    const handleSave = () => {
        if (editingText !== label && (data === null || data === void 0 ? void 0 : data.onLabelChange)) {
            data.onLabelChange(editingText);
        }
        setIsEditing(false);
    };
    const handleLabelInputKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            handleSave();
        }
        else if (e.key === 'Escape') {
            e.preventDefault();
            setIsEditing(false);
        }
    };
    const handleTextareaChange = (e) => {
        setEditingText(e.target.value);
    };
    // ─── Render ───────────────────────────────────────────────────────────
    const segHandlePts = React.useMemo(() => [{ x: sx, y: sy }, ...pinnedWaypoints, { x: tx, y: ty }], [pinnedWaypoints, sx, sy, tx, ty]);
    const isDashed = (data === null || data === void 0 ? void 0 : data.dashed) === true;
    const animation = isDashed ? 'none' : ((_b = data === null || data === void 0 ? void 0 : data.animation) !== null && _b !== void 0 ? _b : 'none');
    const overlayBaseStyle = React.useMemo(() => (Object.assign(Object.assign({}, style), { fill: 'none', stroke: 'rgba(255, 255, 255, 0.95)', strokeWidth: Math.max(3, ((style === null || style === void 0 ? void 0 : style.strokeWidth) || 6) * 0.5), pointerEvents: 'none', strokeLinecap: 'round' })), [style]);
    return (React.createElement(React.Fragment, null,
        React.createElement(reactflow_1.BaseEdge, { path: edgePath, markerEnd: markerEnd, style: Object.assign(Object.assign({}, style), { fill: 'none', strokeLinecap: 'round', filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.3))' }), interactionWidth: dynamicInteractionWidth }),
        animation === 'forward' && (React.createElement(reactflow_1.BaseEdge, { path: edgePath, style: Object.assign(Object.assign({}, overlayBaseStyle), { strokeDasharray: '10 90', animation: 'arch-flow-forward 0.75s linear infinite', filter: `
                            drop-shadow(1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(-1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px 1px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px -1px 0px rgba(0, 0, 0, 1))
                            ` }) })),
        animation === 'bidirectional' && (React.createElement(React.Fragment, null,
            React.createElement(reactflow_1.BaseEdge, { path: edgePath, style: Object.assign(Object.assign({}, overlayBaseStyle), { strokeDasharray: '10 90', animation: 'arch-flow-forward 0.75s linear infinite', filter: `
                            drop-shadow(1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(-1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px 1px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px -1px 0px rgba(0, 0, 0, 1))
                            ` }) }),
            React.createElement(reactflow_1.BaseEdge, { path: edgePath, style: Object.assign(Object.assign({}, overlayBaseStyle), { strokeDasharray: '10 90', strokeDashoffset: 50, animation: 'arch-flow-reverse 0.75s linear infinite', filter: `
                            drop-shadow(1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(-1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px 1px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px -1px 0px rgba(0, 0, 0, 1))
                            ` }) }))),
        label && showLabel && (React.createElement(reactflow_1.EdgeLabelRenderer, null,
            React.createElement("div", { onDoubleClick: handleLabelDoubleClick, style: {
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    backgroundColor: 'var(--neutral-10)', padding: '2px 8px', borderRadius: '4px',
                    border: `1px solid var(--neutral-40)`, fontSize: '12px', fontWeight: 'bold',
                    color: (style === null || style === void 0 ? void 0 : style.stroke) || 'var(--neutral-90)',
                    pointerEvents: 'auto',
                    zIndex: (zIndex !== null && zIndex !== void 0 ? zIndex : 5000) + 50,
                    cursor: 'pointer', whiteSpace: 'pre-wrap', textAlign: 'center',
                }, className: "nodrag nopan" }, label))),
        isEditing && ReactDOM.createPortal((React.createElement("div", { className: "nodrag nopan", onClick: (e) => e.stopPropagation(), style: {
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'auto',
            } },
            React.createElement("div", { style: {
                    backgroundColor: 'var(--neutral-10)',
                    borderRadius: '8px',
                    padding: '16px',
                    border: '1px solid var(--neutral-40)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    minWidth: '220px',
                } },
                React.createElement("div", { style: { fontSize: '12px', fontWeight: 'bold', color: 'var(--neutral-70)' } }, "Edit Label"),
                React.createElement("textarea", { value: editingText, onChange: handleTextareaChange, onKeyDown: handleLabelInputKeyDown, autoFocus: true, rows: 3, style: {
                        backgroundColor: 'var(--neutral-20)',
                        padding: '6px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--neutral-40)',
                        fontSize: '12px',
                        color: 'var(--neutral-90)',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        pointerEvents: 'auto',
                    } }),
                React.createElement("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' } },
                    React.createElement("button", { onClick: () => setIsEditing(false), style: {
                            padding: '4px 14px', borderRadius: '4px',
                            border: '1px solid var(--neutral-40)',
                            backgroundColor: 'var(--neutral-20)',
                            color: 'var(--neutral-90)',
                            fontSize: '12px', cursor: 'pointer',
                        } }, "Cancel"),
                    React.createElement("button", { onClick: handleSave, style: {
                            padding: '4px 14px', borderRadius: '4px',
                            border: 'none',
                            backgroundColor: 'var(--callToAction)',
                            color: 'white',
                            fontSize: '12px', fontWeight: 'bold', cursor: 'pointer',
                        } }, "Confirm"))))), document.body),
        canEdit && segHandlePts.length >= 4 && (React.createElement(reactflow_1.EdgeLabelRenderer, null, segHandlePts.slice(0, -1).map((pt, i) => {
            const next = segHandlePts[i + 1];
            if (i === 0 || i === segHandlePts.length - 2)
                return null;
            const dx = Math.abs(next.x - pt.x);
            const dy = Math.abs(next.y - pt.y);
            if (dx + dy < 10)
                return null;
            const isH = dx > dy;
            const mx = (pt.x + next.x) / 2;
            const my = (pt.y + next.y) / 2;
            return (React.createElement("div", { key: `seg-${i}`, className: "nodrag nopan", onPointerDown: (e) => handlePointerDown(e, i, isH), onPointerMove: handlePointerMove, onPointerUp: handlePointerUp, onPointerCancel: handlePointerCancel, title: isH ? 'Drag up/down' : 'Drag left/right', style: {
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${mx}px, ${my}px)`,
                    width: isH ? `${hWidth}px` : `${hHeight}px`,
                    height: isH ? `${hHeight}px` : `${hWidth}px`,
                    borderRadius: `${hHeight / 2}px`,
                    backgroundColor: 'var(--callToAction)',
                    opacity: 0.85,
                    cursor: isH ? 'ns-resize' : 'ew-resize',
                    zIndex: (zIndex !== null && zIndex !== void 0 ? zIndex : 5000) + 100,
                    pointerEvents: 'all',
                    touchAction: 'none',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                } }));
        })))));
});
exports.edgeTypes = { custom: exports.CustomEdge };


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/EdgeUtils.ts":
/*!****************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/EdgeUtils.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapIgnitionToReactFlowEdges = exports.computeAutoWaypoints = exports.buildPolylinePath = exports.getHandlePixelPos = void 0;
// @ts-ignore
const reactflow_1 = __webpack_require__(/*! reactflow */ "./node_modules/reactflow/dist/umd/index.js");
const getHandlePixelPos = (nodeId, handleId, nodes, handleCount) => {
    const node = nodes[nodeId];
    if (!node || !handleId)
        return null;
    const parts = handleId.split('-');
    if (parts.length < 2)
        return null;
    const side = parts[0];
    const idx = parseInt(parts[1]);
    if (isNaN(idx))
        return null;
    const pos = (idx + 0.5) / handleCount;
    const isContainer = node.paletteId === 'container';
    const nw = isContainer ? (node.width || 300) : 150;
    const nh = isContainer ? (node.height || 300) : 150;
    switch (side) {
        case 'top': return { x: node.x + pos * nw, y: node.y, position: 'top' };
        case 'bottom': return { x: node.x + pos * nw, y: node.y + nh, position: 'bottom' };
        case 'left': return { x: node.x, y: node.y + pos * nh, position: 'left' };
        case 'right': return { x: node.x + nw, y: node.y + pos * nh, position: 'right' };
        default: return null;
    }
};
exports.getHandlePixelPos = getHandlePixelPos;
const buildPolylinePath = (pts, borderRadius) => {
    if (pts.length < 2)
        return '';
    if (borderRadius === 0 || pts.length === 2)
        return `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length - 1; i++) {
        const prev = pts[i - 1], curr = pts[i], next = pts[i + 1];
        const d1 = Math.hypot(curr.x - prev.x, curr.y - prev.y);
        const d2 = Math.hypot(next.x - curr.x, next.y - curr.y);
        if (d1 === 0 || d2 === 0) {
            d += ` L ${curr.x} ${curr.y}`;
            continue;
        }
        const r = Math.min(borderRadius, d1 / 2, d2 / 2);
        const bx = curr.x + (prev.x - curr.x) * r / d1, by = curr.y + (prev.y - curr.y) * r / d1;
        const ax = curr.x + (next.x - curr.x) * r / d2, ay = curr.y + (next.y - curr.y) * r / d2;
        d += ` L ${bx} ${by} Q ${curr.x} ${curr.y} ${ax} ${ay}`;
    }
    return d + ` L ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
};
exports.buildPolylinePath = buildPolylinePath;
const CLEARANCE = 25;
const computeAutoWaypoints = (sx, sy, sp, tx, ty, tp) => {
    const isHorizSrc = sp === 'right' || sp === 'left';
    const isHorizTgt = tp === 'right' || tp === 'left';
    if (isHorizSrc && !isHorizTgt) {
        // Horizontal source → vertical target: L-shape when clear, 3-waypoint U when not.
        const srcOK = sp === 'right' ? tx >= sx + CLEARANCE : tx <= sx - CLEARANCE;
        const tgtOK = tp === 'top' ? sy <= ty - CLEARANCE : sy >= ty + CLEARANCE;
        if (srcOK && tgtOK)
            return [{ x: tx, y: sy }];
        const ex = sp === 'right' ? sx + CLEARANCE : sx - CLEARANCE;
        const ey = tp === 'top' ? ty - CLEARANCE : ty + CLEARANCE;
        return [{ x: ex, y: sy }, { x: ex, y: ey }, { x: tx, y: ey }];
    }
    if (!isHorizSrc && isHorizTgt) {
        // Vertical source → horizontal target: L-shape when clear, 3-waypoint U when not.
        const srcOK = sp === 'top' ? ty <= sy - CLEARANCE : ty >= sy + CLEARANCE;
        const tgtOK = tp === 'right' ? sx >= tx + CLEARANCE : sx <= tx - CLEARANCE;
        if (srcOK && tgtOK)
            return [{ x: sx, y: ty }];
        const ey = sp === 'top' ? sy - CLEARANCE : sy + CLEARANCE;
        const ex = tp === 'right' ? tx + CLEARANCE : tx - CLEARANCE;
        return [{ x: sx, y: ey }, { x: ex, y: ey }, { x: ex, y: ty }];
    }
    if (isHorizSrc) {
        // Same horizontal axis: Z-shape when midX clears both handles, 4-waypoint U when not.
        const midX = (sx + tx) / 2;
        const srcOK = sp === 'right' ? midX >= sx + CLEARANCE : midX <= sx - CLEARANCE;
        const tgtOK = tp === 'left' ? midX <= tx - CLEARANCE : midX >= tx + CLEARANCE;
        if (srcOK && tgtOK)
            return [{ x: midX, y: sy }, { x: midX, y: ty }];
        const ex = sp === 'right' ? sx + CLEARANCE : sx - CLEARANCE;
        const fx = tp === 'right' ? tx + CLEARANCE : tx - CLEARANCE;
        const midY = (sy + ty) / 2;
        return [{ x: ex, y: sy }, { x: ex, y: midY }, { x: fx, y: midY }, { x: fx, y: ty }];
    }
    // Same vertical axis: Z-shape when midY clears both handles, 4-waypoint U when not.
    const midY = (sy + ty) / 2;
    const srcOK = sp === 'top' ? midY <= sy - CLEARANCE : midY >= sy + CLEARANCE;
    const tgtOK = tp === 'bottom' ? midY >= ty + CLEARANCE : midY <= ty - CLEARANCE;
    if (srcOK && tgtOK)
        return [{ x: sx, y: midY }, { x: tx, y: midY }];
    const ey = sp === 'top' ? sy - CLEARANCE : sy + CLEARANCE;
    const fy = tp === 'top' ? ty - CLEARANCE : ty + CLEARANCE;
    const midX = (sx + tx) / 2;
    return [{ x: sx, y: ey }, { x: midX, y: ey }, { x: midX, y: fy }, { x: tx, y: fy }];
};
exports.computeAutoWaypoints = computeAutoWaypoints;
const mapIgnitionToReactFlowEdges = (ignitionEdges, ignitionNodes, connectionTypes, selectedId, onWaypointsChange, onLabelChange, snapEnabled, snapPixels, globalEdgeWidth) => {
    const baseWidth = globalEdgeWidth !== null && globalEdgeWidth !== void 0 ? globalEdgeWidth : 6;
    if (!ignitionEdges)
        return [];
    return Object.entries(ignitionEdges)
        .filter(([, edgeData]) => edgeData !== null && edgeData !== undefined)
        .map(([id, edgeData]) => {
        const typeConfig = connectionTypes[edgeData.connectionType] || {};
        const isSelected = id === selectedId;
        // Tie data flow animation to node status.
        // If either the source or target node is marked as inactive, we force animation to 'none'.
        const sourceNode = ignitionNodes === null || ignitionNodes === void 0 ? void 0 : ignitionNodes[edgeData.source];
        const targetNode = ignitionNodes === null || ignitionNodes === void 0 ? void 0 : ignitionNodes[edgeData.target];
        const isSourceInactive = (sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.inactive) === true;
        const isTargetInactive = (targetNode === null || targetNode === void 0 ? void 0 : targetNode.inactive) === true;
        const effectiveAnimation = (isSourceInactive || isTargetInactive)
            ? 'none'
            : (edgeData.animation || 'none');
        const isAnimated = effectiveAnimation !== 'none';
        const zIndex = isAnimated ? 5000 : (isSelected ? 3000 : 2000);
        const strokeStyle = { stroke: typeConfig.color || '#888', strokeWidth: isSelected ? baseWidth + 2 : baseWidth };
        if (edgeData.dashed)
            strokeStyle.strokeDasharray = '10 15';
        const arrowMarker = edgeData.arrow !== false
            ? { type: reactflow_1.MarkerType.ArrowClosed, width: 10, height: 10, color: strokeStyle.stroke }
            : undefined;
        return Object.assign(Object.assign({ id }, edgeData), { type: 'custom', zIndex, data: {
                lineType: edgeData.lineType || 'smoothstep',
                waypoints: edgeData.waypoints || [],
                showLabel: edgeData.showLabel === true,
                isSelected,
                animation: effectiveAnimation,
                snapEnabled: snapEnabled !== null && snapEnabled !== void 0 ? snapEnabled : true,
                snapPixels: snapPixels !== null && snapPixels !== void 0 ? snapPixels : 15,
                dashed: edgeData.dashed === true,
                onWaypointsChange: onWaypointsChange
                    ? (wps) => onWaypointsChange(id, wps)
                    : undefined,
                onLabelChange: onLabelChange
                    ? (labelText) => onLabelChange(id, labelText)
                    : undefined,
            }, label: edgeData.labelText || typeConfig.label || edgeData.connectionType || '', style: strokeStyle, markerEnd: arrowMarker, interactionWidth: 20 });
    });
};
exports.mapIgnitionToReactFlowEdges = mapIgnitionToReactFlowEdges;


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/NoteLabelNode.tsx":
/*!*********************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/NoteLabelNode.tsx ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoteLabelNode = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
// @ts-ignore
const reactflow_1 = __webpack_require__(/*! reactflow */ "./node_modules/reactflow/dist/umd/index.js");
exports.NoteLabelNode = react_1.default.memo(({ id, data, selected }) => {
    var _a, _b, _c, _d, _e;
    const { zoom } = reactflow_1.useViewport();
    const [isEditing, setIsEditing] = react_1.default.useState(false);
    const [text, setText] = react_1.default.useState(data.text || data.label || '');
    const [isOverflowing, setIsOverflowing] = react_1.default.useState(false);
    const textareaRef = react_1.default.useRef(null);
    const contentRef = react_1.default.useRef(null);
    // Sync with incoming data changes
    react_1.default.useEffect(() => {
        setText(data.text || data.label || '');
    }, [data.text, data.label]);
    // Support external edit mode trigger from context menu
    react_1.default.useEffect(() => {
        if (data.isEditing) {
            setIsEditing(true);
        }
    }, [data.isEditing]);
    // Auto-resize textarea to keep it centered vertically
    react_1.default.useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.style.height = '0px'; // Reset to get correct scrollHeight
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + 'px';
        }
    }, [isEditing, text]);
    // Detect overflow
    react_1.default.useEffect(() => {
        if (contentRef.current) {
            const hasOverflow = contentRef.current.scrollHeight > contentRef.current.offsetHeight ||
                contentRef.current.scrollWidth > contentRef.current.offsetWidth;
            setIsOverflowing(hasOverflow);
        }
    }, [text, isEditing]);
    const handleDoubleClick = (e) => {
        if (data.isEditable !== false) {
            e.preventDefault();
            e.stopPropagation();
            // Ensure any existing focus is handled before entering edit mode
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            setIsEditing(true);
        }
    };
    const handleBlur = () => {
        setIsEditing(false);
        if (data.onTextChange && text !== (data.text || data.label)) {
            data.onTextChange(id, text);
        }
    };
    const isNote = data.paletteId === 'Note';
    const nodeStyle = Object.assign({ padding: '10px', border: selected ? '2px solid var(--callToAction)' : (((_a = data.style) === null || _a === void 0 ? void 0 : _a.border) || '1px solid var(--neutral-40)'), borderRadius: ((_b = data.style) === null || _b === void 0 ? void 0 : _b.borderRadius) || '4px', backgroundColor: ((_c = data.style) === null || _c === void 0 ? void 0 : _c.backgroundColor) || 'var(--neutral-00)', minWidth: '60px', minHeight: '30px', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isEditing ? 'text' : 'grab', pointerEvents: 'auto', overflow: 'hidden', boxSizing: 'border-box', position: 'relative' }, data.style);
    const textStyle = Object.assign({ color: ((_d = data.textStyle) === null || _d === void 0 ? void 0 : _d.color) || 'var(--neutral-90)', fontSize: ((_e = data.textStyle) === null || _e === void 0 ? void 0 : _e.fontSize) || '14px', textAlign: 'center', width: '100%', wordBreak: 'break-word', whiteSpace: 'pre-wrap', userSelect: isEditing ? 'text' : 'none' }, data.textStyle);
    // Calculate dynamic resizer handle size based on zoom (matching ContainerNode logic)
    const resizerSize = Math.max(10, Math.round(16 / zoom));
    return (react_1.default.createElement("div", { onDoubleClick: handleDoubleClick, style: nodeStyle, className: isEditing ? 'nodrag' : '' },
        react_1.default.createElement(reactflow_1.Handle, { type: "source", position: reactflow_1.Position.Top, style: { display: 'none', pointerEvents: 'none' } }),
        react_1.default.createElement(reactflow_1.Handle, { type: "target", position: reactflow_1.Position.Top, style: { display: 'none', pointerEvents: 'none' } }),
        react_1.default.createElement(reactflow_1.NodeResizer, { color: "var(--callToAction)", isVisible: selected && data.isEditable !== false, minWidth: 40, minHeight: 20, handleStyle: { width: `${resizerSize}px`, height: `${resizerSize}px`, borderRadius: '4px' }, onResize: (e, params) => {
                if (contentRef.current) {
                    const hasOverflow = contentRef.current.scrollHeight > params.height ||
                        contentRef.current.scrollWidth > params.width;
                    setIsOverflowing(hasOverflow);
                }
            }, onResizeEnd: (e, params) => {
                if (data.onResizeEnd)
                    data.onResizeEnd(id, params.x, params.y, params.width, params.height);
            } }),
        isEditing ? (react_1.default.createElement("div", { style: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            react_1.default.createElement("textarea", { ref: textareaRef, className: "nodrag nopan", value: text, onChange: (e) => setText(e.target.value), onBlur: handleBlur, autoFocus: true, onKeyDown: (e) => {
                    // Ctrl+Enter submits for all.
                    // Enter inserts new line for Notes; submits for Labels.
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        handleBlur();
                    }
                    else if (!isNote && e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleBlur();
                    }
                }, style: Object.assign(Object.assign({}, textStyle), { border: 'none', background: 'transparent', outline: 'none', resize: 'none', width: '100%', height: 'auto', padding: '0', boxSizing: 'border-box', overflow: 'hidden' }) }))) : (react_1.default.createElement("div", { ref: contentRef, style: Object.assign(Object.assign({}, textStyle), { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }) }, text || (isNote ? 'Double-click to add note' : 'Label'))),
        isNote && (react_1.default.createElement("div", { style: {
                position: 'absolute', top: 0, right: 0,
                width: '0px', height: '0px',
                borderTop: '15px solid #ffeb3b',
                borderLeft: '15px solid transparent',
                borderBottomLeftRadius: '2px',
                zIndex: 4
            } })),
        isOverflowing && !isEditing && (react_1.default.createElement("div", { title: "Text is overflowing", style: {
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                color: '#ff9800',
                fontSize: '12px',
                pointerEvents: 'none',
                zIndex: 5
            } }, "\u26A0\uFE0F"))));
});


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/Sidebar.tsx":
/*!***************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/Sidebar.tsx ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sidebar = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "react"));
const svgSanitize_1 = __webpack_require__(/*! ./svgSanitize */ "./typescript/components/ArchitectureBuilder/svgSanitize.ts");
const constants_1 = __webpack_require__(/*! ./constants */ "./typescript/components/ArchitectureBuilder/constants.ts");
const PaletteThumb = react_1.default.memo(({ src, label }) => {
    const scopeId = react_1.default.useMemo(() => svgSanitize_1.nextSvgScopeId(), []);
    const svgHtml = react_1.default.useMemo(() => svgSanitize_1.extractSvgMarkup(src, scopeId), [src, scopeId]);
    if (svgHtml) {
        return (react_1.default.createElement("div", { id: scopeId, style: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, dangerouslySetInnerHTML: { __html: svgHtml }, title: label }));
    }
    const dataUri = svgSanitize_1.toSafeDataUri(src);
    return dataUri ? react_1.default.createElement("img", { src: dataUri, alt: label, style: { width: '100%', height: '100%', objectFit: 'contain' } }) : null;
});
const Sidebar = ({ paletteItems, isOpen, toggleSidebar, onDragStartItem, onItemClick }) => {
    const [collapsedCategories, setCollapsedCategories] = react_1.useState({});
    const [searchQuery, setSearchQuery] = react_1.useState('');
    const { containerItems, groupedItems } = react_1.useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const containers = [];
        const groups = {};
        paletteItems.forEach(item => {
            if (q && !item.label.toLowerCase().includes(q))
                return;
            if (item.id === 'container') {
                containers.push(item);
            }
            else {
                const category = item.category || 'General';
                if (!groups[category])
                    groups[category] = [];
                groups[category].push(item);
            }
        });
        return { containerItems: containers, groupedItems: groups };
    }, [paletteItems, searchQuery]);
    const toggleCategory = (category) => {
        setCollapsedCategories((prev) => (Object.assign(Object.assign({}, prev), { [category]: prev[category] === false })));
    };
    const onDragStart = (event, item) => {
        var _a, _b, _d;
        onDragStartItem(item);
        event.dataTransfer.effectAllowed = 'move';
        const imgSrc = svgSanitize_1.toSafeDataUri(item.image);
        if (imgSrc) {
            const ghost = document.createElement('div');
            // Scale based on canvas zoom (approximated)
            const zoom = parseFloat(((_d = (_b = (_a = document.querySelector('.react-flow__viewport')) === null || _a === void 0 ? void 0 : _a.getAttribute('style')) === null || _b === void 0 ? void 0 : _b.match(/scale\(([^)]+)\)/)) === null || _d === void 0 ? void 0 : _d[1]) || '1');
            const size = Math.round(150 * zoom);
            ghost.style.cssText = `position:fixed;top:-200px;left:-200px;width:${size}px;height:${size}px;pointer-events:none;`;
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.cssText = `width:${size}px;height:${size}px;object-fit:contain;display:block;`;
            ghost.appendChild(img);
            document.body.appendChild(ghost);
            event.dataTransfer.setDragImage(ghost, size / 2, size / 2);
            setTimeout(() => { if (document.body.contains(ghost))
                document.body.removeChild(ghost); }, 0);
        }
    };
    return (react_1.default.createElement("div", { style: { display: 'flex', height: '100%', position: 'relative', zIndex: 5 } },
        react_1.default.createElement("div", { style: { width: isOpen ? '250px' : '0px', backgroundColor: 'var(--neutral-20)', borderRight: isOpen ? '1px solid var(--neutral-40)' : 'none', overflowY: 'auto', overflowX: 'hidden', transition: 'width 0.3s ease', display: 'flex', flexDirection: 'column' } },
            react_1.default.createElement("div", { style: { padding: '15px', whiteSpace: 'nowrap' } },
                react_1.default.createElement("h3", { style: { marginTop: 0, color: 'var(--neutral-90)' } }, "Palette"),
                react_1.default.createElement("div", { style: { marginBottom: '12px', position: 'relative' } },
                    react_1.default.createElement("input", { type: "text", placeholder: "Search palette...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), style: Object.assign(Object.assign({}, constants_1.sharedInputStyle), { paddingRight: searchQuery ? '24px' : '8px' }) }),
                    searchQuery && (react_1.default.createElement("span", { onClick: () => setSearchQuery(''), style: { position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--neutral-60)', fontSize: '14px', lineHeight: 1 } }, "\u00D7"))),
                containerItems.length > 0 && (react_1.default.createElement("div", { style: { marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid var(--neutral-40)' } }, containerItems.map((item) => {
                    const _a = item.style || {}, { classes: _c, backgroundColor: imageBg } = _a, itemStyle = __rest(_a, ["classes", "backgroundColor"]);
                    const _b = item.labelStyle || {}, { classes: _lc } = _b, labelStyle = __rest(_b, ["classes"]);
                    return (react_1.default.createElement("div", { key: item.id, draggable: true, onDragStart: (e) => onDragStart(e, item), onClick: () => onItemClick(item), style: Object.assign({ border: '1px dashed var(--neutral-50)', backgroundColor: 'var(--neutral-30)', padding: '10px', marginBottom: '8px', cursor: 'grab', display: 'flex', alignItems: 'center', borderRadius: '4px', fontWeight: 'bold' }, itemStyle) },
                        react_1.default.createElement("div", { style: { width: '20px', height: '20px', marginRight: '10px', backgroundColor: imageBg || undefined } },
                            react_1.default.createElement(PaletteThumb, { src: item.image, label: item.label })),
                        react_1.default.createElement("span", { style: Object.assign({ color: 'var(--neutral-90)', fontSize: '14px' }, labelStyle) }, item.label)));
                }))),
                Object.entries(groupedItems).map(([category, items]) => {
                    const isCollapsed = searchQuery.trim() ? false : collapsedCategories[category] !== false;
                    return (react_1.default.createElement("div", { key: category, style: { marginBottom: '15px' } },
                        react_1.default.createElement("div", { onClick: () => toggleCategory(category), style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', backgroundColor: 'var(--neutral-30)', padding: '8px 10px', borderRadius: '4px', marginBottom: '8px', fontWeight: 'bold', color: 'var(--neutral-90)', userSelect: 'none' } },
                            react_1.default.createElement("span", null, category),
                            react_1.default.createElement("span", { style: { fontSize: '12px' } }, isCollapsed ? '▶' : '▼')),
                        !isCollapsed && (react_1.default.createElement("div", { style: { paddingLeft: '5px' } }, items.map((item) => {
                            const _a = item.style || {}, { classes: _c, backgroundColor: imageBg } = _a, itemStyle = __rest(_a, ["classes", "backgroundColor"]);
                            const _b = item.labelStyle || {}, { classes: _lc } = _b, labelStyle = __rest(_b, ["classes"]);
                            return (react_1.default.createElement("div", { key: item.id, draggable: true, onDragStart: (e) => onDragStart(e, item), onClick: () => onItemClick(item), style: Object.assign({ border: '1px solid var(--neutral-40)', backgroundColor: 'var(--neutral-10)', padding: '8px', marginBottom: '8px', cursor: 'grab', display: 'flex', alignItems: 'center', borderRadius: '4px' }, itemStyle) },
                                react_1.default.createElement("div", { style: { width: '20px', height: '20px', marginRight: '10px', backgroundColor: imageBg || undefined } },
                                    react_1.default.createElement(PaletteThumb, { src: item.image, label: item.label })),
                                react_1.default.createElement("span", { style: Object.assign({ color: 'var(--neutral-90)', fontSize: '14px' }, labelStyle) }, item.label)));
                        })))));
                }),
                searchQuery.trim() && Object.keys(groupedItems).length === 0 && containerItems.length === 0 && (react_1.default.createElement("div", { style: { color: 'var(--neutral-60)', fontSize: '13px', textAlign: 'center', padding: '20px 0' } },
                    "No components match \"",
                    searchQuery,
                    "\"")))),
        react_1.default.createElement("div", { onClick: toggleSidebar, style: { width: '20px', height: '50px', backgroundColor: 'var(--neutral-40)', border: '1px solid var(--neutral-50)', borderLeft: 'none', borderRadius: '0 4px 4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: '20px', color: 'var(--neutral-90)' } }, isOpen ? '◀' : '▶')));
};
exports.Sidebar = Sidebar;


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/StyleEditorModal.tsx":
/*!************************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/StyleEditorModal.tsx ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StyleEditorModal = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ColorPicker_1 = __webpack_require__(/*! ./ColorPicker */ "./typescript/components/ArchitectureBuilder/ColorPicker.tsx");
const constants_1 = __webpack_require__(/*! ./constants */ "./typescript/components/ArchitectureBuilder/constants.ts");
const StyleEditorModal = ({ node, onSave, onCancel }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const isTextNode = constants_1.TEXT_NODE_PALETTE_IDS.has(node.paletteId);
    const [compBg, setCompBg] = React.useState(((_a = node.style) === null || _a === void 0 ? void 0 : _a.backgroundColor) || ((_b = node.style) === null || _b === void 0 ? void 0 : _b.fill) || '');
    const [borderWidth, setBorderWidth] = React.useState(((_c = node.style) === null || _c === void 0 ? void 0 : _c.borderWidth) || '');
    const [borderStyle, setBorderStyle] = React.useState(((_d = node.style) === null || _d === void 0 ? void 0 : _d.borderStyle) || '');
    const [borderColor, setBorderColor] = React.useState(((_e = node.style) === null || _e === void 0 ? void 0 : _e.borderColor) || '');
    const [borderRadius, setBorderRadius] = React.useState(((_f = node.style) === null || _f === void 0 ? void 0 : _f.borderRadius) || '');
    const [labelBg, setLabelBg] = React.useState(((_g = node.labelStyle) === null || _g === void 0 ? void 0 : _g.backgroundColor) || '');
    const [labelColor, setLabelColor] = React.useState(((_h = node.labelStyle) === null || _h === void 0 ? void 0 : _h.color) || '');
    const [labelFontSize, setLabelFontSize] = React.useState(((_j = node.labelStyle) === null || _j === void 0 ? void 0 : _j.fontSize) || '');
    const [iconColor, setIconColor] = React.useState(((_k = node.labelStyle) === null || _k === void 0 ? void 0 : _k.fill) || '');
    const [textColor, setTextColor] = React.useState(((_l = node.textStyle) === null || _l === void 0 ? void 0 : _l.color) || '');
    const [textFontSize, setTextFontSize] = React.useState(((_m = node.textStyle) === null || _m === void 0 ? void 0 : _m.fontSize) || '');
    const handleSave = () => {
        const newStyle = Object.assign({}, node.style);
        if (compBg)
            newStyle.backgroundColor = compBg;
        else
            delete newStyle.backgroundColor;
        if (borderWidth || borderStyle || borderColor)
            delete newStyle.border;
        if (borderWidth)
            newStyle.borderWidth = borderWidth;
        else
            delete newStyle.borderWidth;
        if (borderStyle)
            newStyle.borderStyle = borderStyle;
        else
            delete newStyle.borderStyle;
        if (borderColor)
            newStyle.borderColor = borderColor;
        else
            delete newStyle.borderColor;
        if (borderRadius)
            newStyle.borderRadius = borderRadius;
        else
            delete newStyle.borderRadius;
        const newLabelStyle = Object.assign({}, node.labelStyle);
        if (labelBg)
            newLabelStyle.backgroundColor = labelBg;
        else
            delete newLabelStyle.backgroundColor;
        if (labelColor)
            newLabelStyle.color = labelColor;
        else
            delete newLabelStyle.color;
        if (labelFontSize)
            newLabelStyle.fontSize = labelFontSize;
        else
            delete newLabelStyle.fontSize;
        if (iconColor)
            newLabelStyle.fill = iconColor;
        else
            delete newLabelStyle.fill;
        const newTextStyle = Object.assign({}, node.textStyle);
        if (textColor)
            newTextStyle.color = textColor;
        else
            delete newTextStyle.color;
        if (textFontSize)
            newTextStyle.fontSize = textFontSize;
        else
            delete newTextStyle.fontSize;
        onSave(newStyle, newLabelStyle, newTextStyle);
    };
    return (React.createElement("div", { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' } },
        React.createElement("div", { style: { backgroundColor: 'var(--neutral-20)', padding: '24px', borderRadius: '8px', width: '650px', border: '1px solid var(--neutral-50)', boxShadow: '0 8px 16px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '20px' }, onClick: (e) => e.stopPropagation() },
            React.createElement("h3", { style: { margin: 0, color: 'var(--neutral-90)' } },
                "Edit Styles: ",
                node.label),
            React.createElement("div", { style: { display: 'flex', gap: '30px' } },
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: constants_1.sectionTitleStyle }, "Component"),
                    React.createElement("div", { style: constants_1.labelRowStyle },
                        React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Background Color"),
                        React.createElement(ColorPicker_1.ColorInput, { value: compBg, onChange: setCompBg, placeholder: "e.g. #333 or rgba()" })),
                    React.createElement("div", { style: constants_1.labelRowStyle },
                        React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Border Color"),
                        React.createElement(ColorPicker_1.ColorInput, { value: borderColor, onChange: setBorderColor, placeholder: "e.g. #ff0000" })),
                    React.createElement("div", { style: { display: 'flex', gap: '10px' } },
                        React.createElement("div", { style: Object.assign(Object.assign({}, constants_1.labelRowStyle), { flex: 1 }) },
                            React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Border Width"),
                            React.createElement("input", { type: "text", value: borderWidth, onChange: e => setBorderWidth(e.target.value), placeholder: "e.g. 2px", style: Object.assign(Object.assign({}, constants_1.sharedInputStyle), { marginTop: '4px' }) })),
                        React.createElement("div", { style: Object.assign(Object.assign({}, constants_1.labelRowStyle), { flex: 1 }) },
                            React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Border Style"),
                            React.createElement("select", { value: borderStyle, onChange: e => setBorderStyle(e.target.value), style: Object.assign(Object.assign({}, constants_1.sharedInputStyle), { marginTop: '4px' }) },
                                React.createElement("option", { value: "", style: { backgroundColor: 'var(--neutral-20)', color: 'var(--neutral-90)' } }, "Default"),
                                React.createElement("option", { value: "solid", style: { backgroundColor: 'var(--neutral-20)', color: 'var(--neutral-90)' } }, "Solid"),
                                React.createElement("option", { value: "dashed", style: { backgroundColor: 'var(--neutral-20)', color: 'var(--neutral-90)' } }, "Dashed"),
                                React.createElement("option", { value: "dotted", style: { backgroundColor: 'var(--neutral-20)', color: 'var(--neutral-90)' } }, "Dotted")))),
                    React.createElement("div", { style: constants_1.labelRowStyle },
                        React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Border Radius"),
                        React.createElement("input", { type: "text", value: borderRadius, onChange: e => setBorderRadius(e.target.value), placeholder: "e.g. 8px", style: Object.assign(Object.assign({}, constants_1.sharedInputStyle), { marginTop: '4px' }) }))),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: constants_1.sectionTitleStyle }, "Label Tab"),
                    React.createElement("div", { style: constants_1.labelRowStyle },
                        React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Background Color"),
                        React.createElement(ColorPicker_1.ColorInput, { value: labelBg, onChange: setLabelBg, placeholder: "e.g. var(--neutral-30)" })),
                    React.createElement("div", { style: constants_1.labelRowStyle },
                        React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Text Color"),
                        React.createElement(ColorPicker_1.ColorInput, { value: labelColor, onChange: setLabelColor, placeholder: "e.g. #ffffff" })),
                    React.createElement("div", { style: constants_1.labelRowStyle },
                        React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Icon / Gear Color"),
                        React.createElement(ColorPicker_1.ColorInput, { value: iconColor, onChange: setIconColor, placeholder: "e.g. var(--callToAction)" })),
                    React.createElement("div", { style: constants_1.labelRowStyle },
                        React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Text Size"),
                        React.createElement("input", { type: "text", value: labelFontSize, onChange: e => setLabelFontSize(e.target.value), placeholder: "e.g. 14px", style: Object.assign(Object.assign({}, constants_1.sharedInputStyle), { marginTop: '4px' }) }))),
                isTextNode && (React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: constants_1.sectionTitleStyle }, "Text Content"),
                    React.createElement("div", { style: constants_1.labelRowStyle },
                        React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Text Color"),
                        React.createElement(ColorPicker_1.ColorInput, { value: textColor, onChange: setTextColor, placeholder: "e.g. #ffffff" })),
                    React.createElement("div", { style: constants_1.labelRowStyle },
                        React.createElement("span", { style: { fontSize: '12px', color: 'var(--neutral-80)' } }, "Text Size"),
                        React.createElement("input", { type: "text", value: textFontSize, onChange: e => setTextFontSize(e.target.value), placeholder: "e.g. 14px", style: Object.assign(Object.assign({}, constants_1.sharedInputStyle), { marginTop: '4px' }) }))))),
            React.createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' } },
                React.createElement("button", { onClick: onCancel, style: { padding: '6px 12px', backgroundColor: 'var(--neutral-40)', border: 'none', borderRadius: '4px', color: 'var(--neutral-90)', cursor: 'pointer' } }, "Cancel"),
                React.createElement("button", { onClick: handleSave, style: { padding: '6px 12px', backgroundColor: 'var(--callToAction)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' } }, "Save Changes")))));
};
exports.StyleEditorModal = StyleEditorModal;


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/constants.ts":
/*!****************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/constants.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STANDARD_PALETTE = exports.sectionTitleStyle = exports.labelRowStyle = exports.sharedInputStyle = exports.TEXT_NODE_PALETTE_IDS = void 0;
exports.TEXT_NODE_PALETTE_IDS = new Set(['Note', 'Label']);
// ─── Shared UI style primitives ───────────────────────────────────────────────
exports.sharedInputStyle = {
    width: '100%', padding: '6px 8px', backgroundColor: 'var(--neutral-00)', border: '1px solid var(--neutral-40)',
    color: 'var(--neutral-90)', borderRadius: '4px', boxSizing: 'border-box', fontSize: '12px'
};
exports.labelRowStyle = { marginBottom: '10px', display: 'flex', flexDirection: 'column' };
exports.sectionTitleStyle = { fontSize: '14px', fontWeight: 'bold', color: 'var(--callToAction)', borderBottom: '1px solid var(--neutral-40)', paddingBottom: '4px', marginBottom: '10px' };
exports.STANDARD_PALETTE = [
    '#ffffff', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080', '#606060', '#404040', '#202020', '#000000',
    '#ffcccc', '#ff9999', '#ff6666', '#ff3333', '#ff0000', '#cc0000', '#990000', '#660000', '#330000',
    '#ffe5cc', '#ffcc99', '#ffb266', '#ff9933', '#ff8000', '#cc6600', '#994c00', '#663300', '#331900',
    '#ffffcc', '#ffff99', '#ffff66', '#ffff33', '#ffff00', '#cccc00', '#999900', '#666600', '#333300',
    '#ccffcc', '#99ff99', '#66ff66', '#33ff33', '#00ff00', '#00cc00', '#009900', '#006600', '#003300',
    '#ccffff', '#99ffff', '#66ffff', '#33ffff', '#00ffff', '#00cccc', '#009999', '#006666', '#003333',
    '#ccccff', '#9999ff', '#6666ff', '#3333ff', '#0000ff', '#0000cc', '#000099', '#000066', '#000033',
    '#ffccff', '#ff99ff', '#ff66ff', '#ff33ff', '#ff00ff', '#cc00cc', '#990099', '#660066', '#330033'
];


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/svgSanitize.ts":
/*!******************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/svgSanitize.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toSafeDataUri = exports.extractSvgMarkup = exports.sanitizeSvg = exports.nextSvgScopeId = void 0;
const dompurify_1 = __importDefault(__webpack_require__(/*! dompurify */ "../../node_modules/dompurify/dist/purify.cjs.js"));
/**
 * Tightly-scoped DOMPurify config for user-supplied SVG icons.
 *
 * USE_PROFILES.svg    — allowlist-only: only known-safe SVG tags/attributes
 *                       are permitted. All on* event handlers, <script>,
 *                       <iframe>, <object>, and <embed> are stripped automatically.
 * FORBID_TAGS         — defense-in-depth block of executable/external-loading
 *                       elements (already not in the SVG allowlist).
 * FORBID_ATTR         — removes href and xlink:href from every element, blocking
 *                       external resource fetches and data exfiltration via
 *                       <image href>, <use xlink:href>, <a href>, etc.
 *
 * NOTE: <style> is intentionally NOT forbidden. SVGs exported from Illustrator,
 * Inkscape, and most design tools use <style> blocks with class-based fills.
 * DOMPurify's SVG profile processes <style> content and removes dangerous CSS
 * constructs. CSS class collisions between multiple inline SVGs are handled
 * separately via scopeSvgStyles().
 */
const SVG_CONFIG = {
    USE_PROFILES: { svg: true, svgFilters: true },
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'link', 'base', 'meta'],
    FORBID_ATTR: ['href', 'xlink:href'],
};
let _scopeCounter = 0;
/** Returns a stable, unique DOM-safe ID for scoping one SVG's styles. */
function nextSvgScopeId() {
    return `svgi${++_scopeCounter}`;
}
exports.nextSvgScopeId = nextSvgScopeId;
const _sanitizeCache = new Map();
const _SANITIZE_CACHE_MAX = 100;
/** Sanitize a raw SVG markup string and return clean SVG markup. Results are cached by input string (LRU, max 100 entries). */
function sanitizeSvg(raw) {
    const cached = _sanitizeCache.get(raw);
    if (cached !== undefined)
        return cached;
    const result = dompurify_1.default.sanitize(raw, SVG_CONFIG);
    if (_sanitizeCache.size >= _SANITIZE_CACHE_MAX) {
        _sanitizeCache.delete(_sanitizeCache.keys().next().value);
    }
    _sanitizeCache.set(raw, result);
    return result;
}
exports.sanitizeSvg = sanitizeSvg;
/**
 * Scope class-selector rules inside <style> blocks to a container ID so that
 * multiple inline SVGs with identical class names (e.g. .cls-1 from Illustrator)
 * do not interfere with each other.
 *
 * Only simple class selectors (`.foo`, `.foo, .bar`) are prefixed; element
 * selectors, pseudo-classes, and @-rules are left untouched.
 */
function scopeSvgStyles(markup, scopeId) {
    return markup.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/gi, (_, open, css, close) => {
        const scoped = css.replace(/(\.[\w-]+(?:\s*,\s*\.[\w-]+)*)\s*\{/g, (_, selectors) => {
            const prefixed = selectors.trim()
                .split(',')
                .map((s) => `#${scopeId} ${s.trim()}`)
                .join(', ');
            return `${prefixed} {`;
        });
        return `${open}${scoped}${close}`;
    });
}
/**
 * Force the root <svg> element to fill its container (width/height → 100%).
 * The viewBox is preserved so aspect ratio is maintained automatically.
 */
function makeSvgResponsive(markup) {
    return markup
        .replace(/(<svg\b[^>]*?)\swidth="[^"]*"/i, '$1')
        .replace(/(<svg\b[^>]*?)\sheight="[^"]*"/i, '$1')
        .replace(/(<svg\b)/i, '$1 width="100%" height="100%"');
}
/**
 * Decode any supported SVG value, sanitize it (with caching), scope its styles,
 * and return clean SVG markup ready for inline rendering via dangerouslySetInnerHTML.
 *
 * Accepted inputs:
 *   - Raw SVG markup:            "<svg ...>...</svg>"  → rendered inline
 *   - Base64 data URI:           "data:image/svg+xml;base64,<b64>"  → cache-warmed, returns null (use <img>)
 *   - URL-encoded data URI:      "data:image/svg+xml,<encoded>"     → cache-warmed, returns null (use <img>)
 *
 * Base64 and URL-encoded inputs are decoded and run through DOMPurify to prime
 * the sanitization cache, but return null so callers fall back to <img> rendering.
 * This avoids inline SVG rendering issues with complex clipPath/filter SVGs while
 * still benefiting from the cache when the same content arrives as raw markup.
 *
 * Always returns null on any error — never throws.
 */
function extractSvgMarkup(value, scopeId) {
    if (!value)
        return null;
    try {
        if (value.startsWith('data:image/svg+xml;base64,')) {
            const b64 = value.slice('data:image/svg+xml;base64,'.length);
            sanitizeSvg(decodeURIComponent(escape(atob(b64))));
            return null;
        }
        if (value.startsWith('data:image/svg+xml,')) {
            sanitizeSvg(decodeURIComponent(value.slice('data:image/svg+xml,'.length)));
            return null;
        }
        if (!/^\s*</.test(value))
            return null;
        let clean = sanitizeSvg(value);
        if (!clean)
            return null;
        clean = makeSvgResponsive(clean);
        if (scopeId)
            clean = scopeSvgStyles(clean, scopeId);
        return clean || null;
    }
    catch (_a) {
        return null;
    }
}
exports.extractSvgMarkup = extractSvgMarkup;
/**
 * Return a safe data URI for use in <img src> or as a drag-ghost source.
 * Raw SVG markup is sanitized before encoding. Non-SVG data URIs pass through.
 * Returns null for unrecognised or empty values.
 *
 * Use this only where a URL is required (drag ghost images).
 * For normal rendering, prefer extractSvgMarkup() + dangerouslySetInnerHTML.
 */
function toSafeDataUri(value) {
    if (!value)
        return null;
    // Non-SVG data URIs (PNG, JPEG, GIF …) carry no executable markup.
    if (value.startsWith('data:'))
        return value;
    // Raw SVG markup
    if (/^\s*</.test(value)) {
        const clean = sanitizeSvg(value);
        return clean ? `data:image/svg+xml,${encodeURIComponent(clean)}` : null;
    }
    return null;
}
exports.toSafeDataUri = toSafeDataUri;


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/useArchitectureFlowHandlers.ts":
/*!**********************************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/useArchitectureFlowHandlers.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useArchitectureFlowHandlers = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
// @ts-ignore
const reactflow_1 = __webpack_require__(/*! reactflow */ "./node_modules/reactflow/dist/umd/index.js");
const useEdgeHandlers_1 = __webpack_require__(/*! ./useEdgeHandlers */ "./typescript/components/ArchitectureBuilder/useEdgeHandlers.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./typescript/components/ArchitectureBuilder/utils.ts");
const getNodesInside = (containerId, allNodes) => {
    const container = allNodes[containerId];
    if (!container)
        return [];
    const cWidth = container.width || 300;
    const cHeight = container.height || 300;
    const cx1 = container.x, cy1 = container.y;
    const cx2 = cx1 + cWidth, cy2 = cy1 + cHeight;
    const inside = [];
    Object.keys(allNodes).forEach(id => {
        if (id === containerId)
            return;
        const node = allNodes[id];
        if (!node)
            return;
        const nw = node.paletteId === 'container' ? (node.width || 300) : 150;
        const nh = node.paletteId === 'container' ? (node.height || 300) : 150;
        if (nw >= cWidth || nh >= cHeight)
            return;
        if (node.x >= cx1 && node.y >= cy1 && node.x + nw <= cx2 && node.y + nh <= cy2)
            inside.push(id);
    });
    return inside;
};
const useArchitectureFlowHandlers = ({ store, componentEvents, rawNodesDict, rawEdgesDict, connectionTypes, nodeTypeConnectionDefaults, globalHandleCount, paletteItems, snapEnabled, snapPixels, reactFlowInstance, reactFlowWrapper, wrapperBoundsRef, isEnabled, enableOnClickEvents, selectedId, setSelectedId, setLocalNodes, setLocalEdges, contextMenu, setContextMenu, setActiveSubMenu, setStyleEditorNodeId, clipboardRef, draggedItemRef, }) => {
    const [isDraggingNode, setIsDraggingNode] = React.useState(false);
    const dragStartPos = React.useRef(null);
    // Stable refs so callbacks that only READ rawNodesDict/rawEdgesDict at call-time
    // don't need them in their dep arrays — prevents cascade rebuilds of flowNodes.
    const rawNodesDictRef = React.useRef(rawNodesDict);
    const rawEdgesDictRef = React.useRef(rawEdgesDict);
    React.useEffect(() => { rawNodesDictRef.current = rawNodesDict; }, [rawNodesDict]);
    React.useEffect(() => { rawEdgesDictRef.current = rawEdgesDict; }, [rawEdgesDict]);
    const closeContextMenu = React.useCallback(() => {
        setContextMenu(null);
        setActiveSubMenu(null);
    }, [setContextMenu, setActiveSubMenu]);
    // ─── Edge handlers (delegated) ────────────────────────────────────────────
    const edgeHandlers = useEdgeHandlers_1.useEdgeHandlers({
        store,
        componentEvents,
        rawNodesDict,
        rawEdgesDict,
        connectionTypes,
        nodeTypeConnectionDefaults,
        selectedId,
        setSelectedId,
        contextMenu,
        setContextMenu,
        setActiveSubMenu,
        setLocalEdges,
        reactFlowWrapper,
        wrapperBoundsRef,
        closeContextMenu,
        enableOnClickEvents,
    });
    // ─── Node handlers ────────────────────────────────────────────────────────
    const handleGearClick = React.useCallback((id) => {
        setSelectedId(id);
        const node = rawNodesDictRef.current[id];
        if (componentEvents && node) {
            componentEvents.fireComponentEvent('onGearClick', { id, paletteId: node.paletteId, typeId: node.typeId, type: 'node', action: 'config' });
        }
    }, [componentEvents, setSelectedId]);
    const handleActionIconClick = React.useCallback((id, iconName) => {
        const node = rawNodesDictRef.current[id];
        if (componentEvents && node) {
            componentEvents.fireComponentEvent('onActionIconClick', { id, paletteId: node.paletteId, typeId: node.typeId, type: 'node', name: iconName });
        }
    }, [componentEvents]);
    const handlePaletteItemClick = React.useCallback((item) => {
        if (componentEvents) {
            componentEvents.fireComponentEvent('onPaletteItemClick', { id: item.id, typeId: item.typeId, label: item.label, category: item.category, tooltip: item.tooltip, image: item.image, supportedConnections: item.supportedConnections, swappableWith: item.swappableWith, defaultConfigs: item.defaultConfigs, hideHandles: item.hideHandles, style: item.style, labelStyle: item.labelStyle });
        }
    }, [componentEvents]);
    const handleResizeEnd = React.useCallback((id, x, y, width, height) => {
        try {
            if (store === null || store === void 0 ? void 0 : store.props) {
                const nextNodes = Object.assign({}, rawNodesDictRef.current);
                if (nextNodes[id]) {
                    nextNodes[id].x = Math.round(x);
                    nextNodes[id].y = Math.round(y);
                    nextNodes[id].width = Math.round(width);
                    nextNodes[id].height = Math.round(height);
                    store.props.write('nodes', nextNodes);
                }
            }
        }
        catch (error) {
            console.error("Error in handleResizeEnd:", error);
        }
    }, [store, componentEvents]);
    const handleTextChange = React.useCallback((id, text) => {
        try {
            if (store === null || store === void 0 ? void 0 : store.props) {
                const nextNodes = Object.assign({}, rawNodesDictRef.current);
                if (nextNodes[id]) {
                    nextNodes[id] = Object.assign(Object.assign({}, nextNodes[id]), { text });
                    store.props.write('nodes', nextNodes);
                }
            }
        }
        catch (error) {
            console.error("Error in handleTextChange:", error);
        }
    }, [store, componentEvents]);
    const onNodesChange = React.useCallback((changes) => {
        setLocalNodes((nds) => reactflow_1.applyNodeChanges(changes, nds));
    }, [setLocalNodes]);
    const onNodeDragStart = React.useCallback((event, node) => {
        var _a;
        closeContextMenu();
        setIsDraggingNode(true);
        const rawNode = rawNodesDict[node.id];
        if ((rawNode === null || rawNode === void 0 ? void 0 : rawNode.paletteId) === 'container' && !((_a = rawNode === null || rawNode === void 0 ? void 0 : rawNode.configs) === null || _a === void 0 ? void 0 : _a.unlinked)) {
            const cWidth = rawNode.width || 300;
            const cHeight = rawNode.height || 300;
            const cx1 = rawNode.x, cy1 = rawNode.y;
            const cx2 = cx1 + cWidth, cy2 = cy1 + cHeight;
            const insideIds = getNodesInside(node.id, rawNodesDict);
            const nodePositions = {};
            insideIds.forEach(id => { nodePositions[id] = { x: rawNodesDict[id].x, y: rawNodesDict[id].y }; });
            const edgeWaypoints = {};
            Object.entries(rawEdgesDict).forEach(([edgeId, edgeVal]) => {
                if (!edgeVal || !Array.isArray(edgeVal.waypoints) || edgeVal.waypoints.length === 0)
                    return;
                const anyInside = edgeVal.waypoints.some((wp) => wp.x >= cx1 && wp.y >= cy1 && wp.x <= cx2 && wp.y <= cy2);
                if (anyInside)
                    edgeWaypoints[edgeId] = edgeVal.waypoints;
            });
            dragStartPos.current = { nodes: nodePositions, edges: edgeWaypoints };
        }
        else {
            dragStartPos.current = null;
        }
    }, [rawNodesDict, rawEdgesDict]);
    const onNodeDrag = React.useCallback((event, node) => {
        var _a;
        const currentDrag = dragStartPos.current;
        if (currentDrag && currentDrag.nodes && ((_a = rawNodesDict[node.id]) === null || _a === void 0 ? void 0 : _a.paletteId) === 'container') {
            const dx = node.position.x - rawNodesDict[node.id].x;
            const dy = node.position.y - rawNodesDict[node.id].y;
            setLocalNodes(nds => nds.map(n => {
                if (currentDrag.nodes[n.id]) {
                    return Object.assign(Object.assign({}, n), { position: { x: currentDrag.nodes[n.id].x + dx, y: currentDrag.nodes[n.id].y + dy } });
                }
                return n;
            }));
            const edgeDragData = currentDrag.edges;
            const movingNodeIds = new Set(Object.keys(currentDrag.nodes));
            setLocalEdges(edges => edges.map((edge) => {
                const originalWps = edgeDragData[edge.id];
                if (originalWps) {
                    return Object.assign(Object.assign({}, edge), { data: Object.assign(Object.assign({}, edge.data), { waypoints: originalWps.map(wp => ({ x: wp.x + dx, y: wp.y + dy })) }) });
                }
                if (movingNodeIds.has(edge.source) || movingNodeIds.has(edge.target))
                    return Object.assign({}, edge);
                return edge;
            }));
        }
    }, [rawNodesDict, setLocalNodes, setLocalEdges]);
    const onNodeDragStop = React.useCallback((event, node) => {
        try {
            if (store === null || store === void 0 ? void 0 : store.props) {
                const nextNodes = Object.assign({}, rawNodesDict);
                if (!nextNodes[node.id])
                    return;
                const isContainer = nextNodes[node.id].paletteId === 'container';
                const dx = Math.round(node.position.x) - nextNodes[node.id].x;
                const dy = Math.round(node.position.y) - nextNodes[node.id].y;
                nextNodes[node.id] = Object.assign(Object.assign({}, nextNodes[node.id]), { x: Math.round(node.position.x), y: Math.round(node.position.y) });
                const nextEdges = Object.assign({}, rawEdgesDict);
                let edgesChanged = false;
                if (isContainer && dragStartPos.current && (dx !== 0 || dy !== 0)) {
                    Object.keys(dragStartPos.current.nodes).forEach(childId => {
                        if (nextNodes[childId]) {
                            nextNodes[childId] = Object.assign(Object.assign({}, nextNodes[childId]), { x: dragStartPos.current.nodes[childId].x + dx, y: dragStartPos.current.nodes[childId].y + dy });
                        }
                    });
                    const edgeDragData = dragStartPos.current.edges;
                    Object.entries(edgeDragData).forEach(([edgeId, originalWps]) => {
                        if (nextEdges[edgeId]) {
                            nextEdges[edgeId] = Object.assign(Object.assign({}, nextEdges[edgeId]), { waypoints: originalWps.map(wp => ({ x: wp.x + dx, y: wp.y + dy })) });
                            edgesChanged = true;
                        }
                    });
                }
                store.props.write('nodes', nextNodes);
                if (edgesChanged)
                    store.props.write('edges', nextEdges);
                setLocalNodes(nds => nds.map(n => {
                    const final = nextNodes[n.id];
                    if (final)
                        return Object.assign(Object.assign({}, n), { position: { x: final.x, y: final.y } });
                    return n;
                }));
                if (edgesChanged) {
                    setLocalEdges(edges => edges.map(e => {
                        const final = nextEdges[e.id];
                        if (final)
                            return Object.assign(Object.assign({}, e), { data: Object.assign(Object.assign({}, e.data), { waypoints: final.waypoints }) });
                        return e;
                    }));
                }
                dragStartPos.current = null;
                setTimeout(() => setIsDraggingNode(false), 250);
            }
        }
        catch (error) {
            setTimeout(() => setIsDraggingNode(false), 250);
            console.error("Error in onNodeDragStop:", error);
        }
    }, [store, rawNodesDict, rawEdgesDict, componentEvents]);
    const onNodesDelete = React.useCallback((deleted) => {
        try {
            if (!(store === null || store === void 0 ? void 0 : store.props))
                return;
            const nextNodes = Object.assign({}, rawNodesDict);
            const nextEdges = Object.assign({}, rawEdgesDict);
            let edgesChanged = false;
            deleted.forEach(n => {
                const connectedNodeUuids = [];
                Object.keys(nextEdges).forEach(edgeId => {
                    const edge = nextEdges[edgeId];
                    if (edge.source === n.id || edge.target === n.id) {
                        connectedNodeUuids.push(edge.source === n.id ? edge.target : edge.source);
                        delete nextEdges[edgeId];
                        edgesChanged = true;
                    }
                });
                delete nextNodes[n.id];
                if (n.id === selectedId)
                    setSelectedId(null);
                if (enableOnClickEvents && (componentEvents === null || componentEvents === void 0 ? void 0 : componentEvents.fireComponentEvent)) {
                    componentEvents.fireComponentEvent('nodeDeleted', { deletedNodeUuid: n.id, connectedNodeUuids });
                }
            });
            store.props.write('nodes', nextNodes);
            if (edgesChanged)
                store.props.write('edges', nextEdges);
        }
        catch (error) {
            console.error("Error in onNodesDelete:", error);
        }
    }, [store, rawNodesDict, rawEdgesDict, selectedId, setSelectedId, componentEvents, enableOnClickEvents]);
    const onNodeContextMenu = React.useCallback((event, node) => {
        var _a;
        event.preventDefault();
        setSelectedId(node.id);
        const bounds = wrapperBoundsRef.current;
        const isContainer = ((_a = rawNodesDict[node.id]) === null || _a === void 0 ? void 0 : _a.paletteId) === 'container';
        setContextMenu({ id: node.id, top: event.clientY - bounds.top, left: event.clientX - bounds.left, type: 'node', isContainer, clientX: event.clientX, clientY: event.clientY });
        setActiveSubMenu(null);
    }, [rawNodesDict, wrapperBoundsRef, setSelectedId, setContextMenu, setActiveSubMenu]);
    const onNodeClick = React.useCallback((event, node) => {
        closeContextMenu();
        setSelectedId(node.id);
        const rawNode = rawNodesDict[node.id];
        if (componentEvents)
            componentEvents.fireComponentEvent('onNodeClick', { id: node.id, paletteId: rawNode === null || rawNode === void 0 ? void 0 : rawNode.paletteId, typeId: rawNode === null || rawNode === void 0 ? void 0 : rawNode.typeId, type: 'node' });
    }, [componentEvents, rawNodesDict, setSelectedId, closeContextMenu]);
    // ─── Clipboard ────────────────────────────────────────────────────────────
    const executeCopy = React.useCallback((id) => {
        var _a;
        const isContainer = ((_a = rawNodesDict[id]) === null || _a === void 0 ? void 0 : _a.paletteId) === 'container';
        if (isContainer) {
            const insideIds = getNodesInside(id, rawNodesDict);
            const copiedNodes = { [id]: rawNodesDict[id] };
            insideIds.forEach(childId => { copiedNodes[childId] = rawNodesDict[childId]; });
            const copiedEdges = {};
            Object.keys(rawEdgesDict).forEach(edgeId => {
                const edge = rawEdgesDict[edgeId];
                if (copiedNodes[edge.source] && copiedNodes[edge.target])
                    copiedEdges[edgeId] = edge;
            });
            clipboardRef.current = { type: 'group', nodes: copiedNodes, edges: copiedEdges };
        }
        else {
            clipboardRef.current = { type: 'single', node: rawNodesDict[id] };
        }
    }, [rawNodesDict, rawEdgesDict, clipboardRef]);
    const executePaste = React.useCallback((dropX, dropY) => {
        try {
            const clipboard = clipboardRef.current;
            if (!clipboard || !(store === null || store === void 0 ? void 0 : store.props))
                return;
            const nextNodes = Object.assign({}, rawNodesDict);
            const nextEdges = Object.assign({}, rawEdgesDict);
            if (clipboard.type === 'single') {
                const newNodeId = utils_1.generateShortId();
                nextNodes[newNodeId] = JSON.parse(JSON.stringify(Object.assign(Object.assign({}, clipboard.node), { x: dropX, y: dropY })));
                setSelectedId(newNodeId);
            }
            else if (clipboard.type === 'group') {
                let minX = Infinity, minY = Infinity;
                Object.values(clipboard.nodes).forEach((n) => { if (n.x < minX)
                    minX = n.x; if (n.y < minY)
                    minY = n.y; });
                const dx = dropX - minX, dy = dropY - minY;
                const idMap = {};
                Object.keys(clipboard.nodes).forEach(oldId => {
                    const newId = utils_1.generateShortId();
                    idMap[oldId] = newId;
                    const oldNode = clipboard.nodes[oldId];
                    nextNodes[newId] = JSON.parse(JSON.stringify(Object.assign(Object.assign({}, oldNode), { x: oldNode.x + dx, y: oldNode.y + dy })));
                });
                Object.keys(clipboard.edges).forEach(oldEdgeId => {
                    const newEdgeId = utils_1.generateShortId();
                    const oldEdge = clipboard.edges[oldEdgeId];
                    nextEdges[newEdgeId] = JSON.parse(JSON.stringify(Object.assign(Object.assign({}, oldEdge), { source: idMap[oldEdge.source], target: idMap[oldEdge.target] })));
                });
            }
            store.props.write('nodes', nextNodes);
            store.props.write('edges', nextEdges);
        }
        catch (error) {
            console.error("Error in executePaste:", error);
        }
    }, [store, rawNodesDict, rawEdgesDict, setSelectedId, clipboardRef, componentEvents]);
    // ─── Pane handlers ────────────────────────────────────────────────────────
    const onDragOver = React.useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    const onDrop = React.useCallback((event) => {
        try {
            event.preventDefault();
            event.stopPropagation();
            const paletteItem = draggedItemRef.current;
            if (!paletteItem || !reactFlowInstance)
                return;
            const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
            const nodeW = paletteItem.id === 'container' ? 300 : 150;
            const nodeH = paletteItem.id === 'container' ? 300 : 150;
            let dropX = Math.round(position.x - nodeW / 2);
            let dropY = Math.round(position.y - nodeH / 2);
            if (snapEnabled) {
                dropX = Math.round(dropX / snapPixels) * snapPixels;
                dropY = Math.round(dropY / snapPixels) * snapPixels;
            }
            const initialConfigs = JSON.parse(JSON.stringify(paletteItem.defaultConfigs || {}));
            const initialStyle = JSON.parse(JSON.stringify(paletteItem.style || { classes: '' }));
            const initialLabelStyle = JSON.parse(JSON.stringify(paletteItem.labelStyle || { classes: '' }));
            if (store === null || store === void 0 ? void 0 : store.props) {
                const newNodeId = utils_1.generateShortId();
                const newNodeData = {
                    paletteId: paletteItem.id,
                    typeId: paletteItem.typeId,
                    label: paletteItem.label,
                    tooltip: paletteItem.tooltip,
                    x: dropX,
                    y: dropY,
                    hideHandles: paletteItem.hideHandles === true,
                    style: initialStyle,
                    labelStyle: initialLabelStyle,
                    configs: initialConfigs,
                    supportedConnections: paletteItem.supportedConnections || [],
                    useOverrideImage: paletteItem.useOverrideImage || false,
                    inactive: paletteItem.inactive || false,
                    actionIcons: JSON.parse(JSON.stringify(paletteItem.actionIcons || [])),
                };
                if (paletteItem.id === 'container') {
                    newNodeData.width = 300;
                    newNodeData.height = 300;
                    newNodeData.zIndex = -500;
                }
                const nextNodes = Object.assign({}, rawNodesDict);
                nextNodes[newNodeId] = newNodeData;
                store.props.write('nodes', nextNodes);
                setSelectedId(newNodeId);
            }
            draggedItemRef.current = null;
        }
        catch (error) {
            console.error("Error in onDrop:", error);
        }
    }, [store, rawNodesDict, snapEnabled, snapPixels, reactFlowInstance, setSelectedId, draggedItemRef, componentEvents]);
    const onMoveStart = React.useCallback(() => {
        closeContextMenu();
    }, [closeContextMenu]);
    const onPaneClick = React.useCallback(() => {
        setSelectedId(null);
        closeContextMenu();
        if (componentEvents) {
            componentEvents.fireComponentEvent('onPaneClick', { type: 'pane' });
        }
    }, [setSelectedId, closeContextMenu, componentEvents]);
    const onPaneContextMenu = React.useCallback((event) => {
        event.preventDefault();
        const bounds = wrapperBoundsRef.current;
        if (reactFlowInstance) {
            const flowPos = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
            const containerEntry = Object.entries(rawNodesDict)
                .filter(([id, n]) => n && n.paletteId === 'container')
                .sort((a, b) => { var _a, _b; return ((_a = b[1].zIndex) !== null && _a !== void 0 ? _a : -1) - ((_b = a[1].zIndex) !== null && _b !== void 0 ? _b : -1); })
                .find(([id, n]) => {
                const w = n.width || 300, h = n.height || 300;
                return flowPos.x >= n.x && flowPos.x <= n.x + w && flowPos.y >= n.y && flowPos.y <= n.y + h;
            });
            if (containerEntry) {
                const [id] = containerEntry;
                setContextMenu({ id, top: event.clientY - bounds.top, left: event.clientX - bounds.left, type: 'node', isContainer: true, clientX: event.clientX, clientY: event.clientY });
            }
            else {
                setContextMenu({ id: 'pane', top: event.clientY - bounds.top, left: event.clientX - bounds.left, type: 'pane', clientX: event.clientX, clientY: event.clientY });
            }
            setActiveSubMenu(null);
        }
    }, [wrapperBoundsRef, reactFlowInstance, rawNodesDict, setContextMenu, setActiveSubMenu]);
    // ─── Context menu actions ──────────────────────────────────────────────────
    const handleNodeSwap = React.useCallback((newId) => {
        var _a;
        try {
            if (!contextMenu || contextMenu.type !== 'node')
                return;
            const newItem = paletteItems.find((p) => p.id === newId);
            if (!newItem)
                return;
            if (componentEvents)
                componentEvents.fireComponentEvent('onContextMenuAction', { id: contextMenu.id, paletteId: (_a = rawNodesDict[contextMenu.id]) === null || _a === void 0 ? void 0 : _a.paletteId, type: contextMenu.type, action: `swapNode:${newId}` });
            if (store === null || store === void 0 ? void 0 : store.props) {
                const nextNodes = Object.assign({}, rawNodesDict);
                const existingNode = nextNodes[contextMenu.id];
                const { image: _img } = existingNode, existingNodeWithoutImage = __rest(existingNode, ["image"]);
                nextNodes[contextMenu.id] = Object.assign(Object.assign({}, existingNodeWithoutImage), { paletteId: newItem.id, typeId: newItem.typeId, label: newItem.label, tooltip: newItem.tooltip, supportedConnections: newItem.supportedConnections || [] });
                const nextEdges = Object.assign({}, rawEdgesDict);
                let edgesChanged = false;
                Object.keys(nextEdges).forEach(edgeId => {
                    const e = nextEdges[edgeId];
                    if (e.source === contextMenu.id || e.target === contextMenu.id) {
                        const otherNodeId = e.source === contextMenu.id ? e.target : e.source;
                        const otherNode = nextNodes[otherNodeId];
                        if (otherNode) {
                            const newSupported = newItem.supportedConnections || [];
                            const otherSupported = otherNode.supportedConnections || [];
                            if (!newSupported.includes(e.connectionType) || !otherSupported.includes(e.connectionType)) {
                                delete nextEdges[edgeId];
                                edgesChanged = true;
                            }
                        }
                    }
                });
                store.props.write('nodes', nextNodes);
                if (edgesChanged)
                    store.props.write('edges', nextEdges);
            }
            closeContextMenu();
        }
        catch (error) {
            console.error("Error in handleNodeSwap:", error);
        }
    }, [contextMenu, paletteItems, componentEvents, rawNodesDict, rawEdgesDict, store, closeContextMenu]);
    const handleContextMenuAction = React.useCallback((action) => {
        var _a, _b, _c, _d;
        try {
            if (!contextMenu)
                return;
            const isNode = contextMenu.type === 'node';
            const isEdge = contextMenu.type === 'edge';
            let currentPaletteId = 'pane';
            if (isNode)
                currentPaletteId = (_a = rawNodesDict[contextMenu.id]) === null || _a === void 0 ? void 0 : _a.paletteId;
            if (isEdge)
                currentPaletteId = (_b = rawEdgesDict[contextMenu.id]) === null || _b === void 0 ? void 0 : _b.connectionType;
            if (componentEvents)
                componentEvents.fireComponentEvent('onContextMenuAction', { id: contextMenu.id, paletteId: currentPaletteId, type: contextMenu.type, action });
            if (action === 'editContent' && isNode) {
                setLocalNodes(prev => prev.map(n => n.id === contextMenu.id ? Object.assign(Object.assign({}, n), { data: Object.assign(Object.assign({}, n.data), { isEditing: true }) }) : n));
                closeContextMenu();
                return;
            }
            if (action === 'toggleUnlocked' && isNode) {
                const nextNodes = Object.assign({}, rawNodesDict);
                const node = nextNodes[contextMenu.id];
                if (node) {
                    const newUnlocked = !node.configs.unlocked;
                    node.configs = Object.assign(Object.assign({}, node.configs), { unlocked: newUnlocked });
                    delete node.configs.unlockMovement;
                    delete node.configs.enableResize;
                    store.props.write('nodes', nextNodes);
                }
                closeContextMenu();
                return;
            }
            if (action === 'selectNode' && isNode) {
                setSelectedId(contextMenu.id);
                closeContextMenu();
                return;
            }
            if (action === 'reverseEdge' && isEdge) {
                if (store === null || store === void 0 ? void 0 : store.props) {
                    const nextEdges = Object.assign({}, rawEdgesDict);
                    const currentEdge = nextEdges[contextMenu.id];
                    if (currentEdge) {
                        const reversedWaypoints = Array.isArray(currentEdge.waypoints) ? [...currentEdge.waypoints].reverse() : [];
                        nextEdges[contextMenu.id] = Object.assign(Object.assign({}, currentEdge), { source: currentEdge.target, target: currentEdge.source, sourceHandle: currentEdge.targetHandle, targetHandle: currentEdge.sourceHandle, waypoints: reversedWaypoints });
                        store.props.write('edges', nextEdges);
                    }
                }
                closeContextMenu();
                return;
            }
            if (action === 'editStyle' && isNode) {
                setStyleEditorNodeId(contextMenu.id);
                closeContextMenu();
                return;
            }
            if (action === 'toggleGrayscale' && isNode) {
                if (store === null || store === void 0 ? void 0 : store.props) {
                    const nextNodes = Object.assign({}, rawNodesDict);
                    const target = nextNodes[contextMenu.id];
                    if (target) {
                        const newInactive = !target.inactive;
                        nextNodes[contextMenu.id] = Object.assign(Object.assign({}, target), { inactive: newInactive });
                        const nextEdges = Object.assign({}, rawEdgesDict);
                        let edgesChanged = false;
                        Object.keys(nextEdges).forEach(edgeId => {
                            var _a;
                            const edge = nextEdges[edgeId];
                            if (edge.source === contextMenu.id || edge.target === contextMenu.id) {
                                if (newInactive) {
                                    nextEdges[edgeId] = Object.assign(Object.assign({}, edge), { dashed: true });
                                }
                                else {
                                    const otherNodeId = edge.source === contextMenu.id ? edge.target : edge.source;
                                    if (!((_a = nextNodes[otherNodeId]) === null || _a === void 0 ? void 0 : _a.inactive))
                                        nextEdges[edgeId] = Object.assign(Object.assign({}, edge), { dashed: false });
                                }
                                edgesChanged = true;
                            }
                        });
                        store.props.write('nodes', nextNodes);
                        if (edgesChanged)
                            store.props.write('edges', nextEdges);
                    }
                }
                closeContextMenu();
                return;
            }
            if (action === 'copy' && isNode) {
                executeCopy(contextMenu.id);
                closeContextMenu();
                return;
            }
            if (action === 'toggleLink' && contextMenu.isContainer) {
                if (store === null || store === void 0 ? void 0 : store.props) {
                    const nextNodes = Object.assign({}, rawNodesDict);
                    const target = nextNodes[contextMenu.id];
                    if (target) {
                        target.configs = Object.assign(Object.assign({}, target.configs), { unlinked: !((_c = target.configs) === null || _c === void 0 ? void 0 : _c.unlinked) });
                        store.props.write('nodes', nextNodes);
                    }
                }
                closeContextMenu();
                return;
            }
            if (action === 'paste' && (contextMenu.type === 'pane' || contextMenu.isContainer)) {
                if (reactFlowInstance && contextMenu.clientX && contextMenu.clientY) {
                    const position = reactFlowInstance.screenToFlowPosition({ x: contextMenu.clientX, y: contextMenu.clientY });
                    let dropX = position.x, dropY = position.y;
                    if (snapEnabled) {
                        dropX = Math.round(dropX / snapPixels) * snapPixels;
                        dropY = Math.round(dropY / snapPixels) * snapPixels;
                    }
                    executePaste(dropX, dropY);
                }
                closeContextMenu();
                return;
            }
            if (action === 'deleteWithContents' && isNode) {
                if (store === null || store === void 0 ? void 0 : store.props) {
                    const nextNodes = Object.assign({}, rawNodesDict);
                    const nextEdges = Object.assign({}, rawEdgesDict);
                    let edgesChanged = false;
                    const idsToDelete = [contextMenu.id, ...getNodesInside(contextMenu.id, rawNodesDict)];
                    idsToDelete.forEach(idToDel => {
                        const connectedNodeUuids = [];
                        Object.keys(nextEdges).forEach(edgeId => {
                            const edge = nextEdges[edgeId];
                            if (edge.source === idToDel || edge.target === idToDel) {
                                connectedNodeUuids.push(edge.source === idToDel ? edge.target : edge.source);
                                delete nextEdges[edgeId];
                                edgesChanged = true;
                            }
                        });
                        delete nextNodes[idToDel];
                        if (selectedId === idToDel)
                            setSelectedId(null);
                        if (enableOnClickEvents && (componentEvents === null || componentEvents === void 0 ? void 0 : componentEvents.fireComponentEvent)) {
                            componentEvents.fireComponentEvent('nodeDeleted', { deletedNodeUuid: idToDel, connectedNodeUuids });
                        }
                    });
                    store.props.write('nodes', nextNodes);
                    if (edgesChanged)
                        store.props.write('edges', nextEdges);
                }
                closeContextMenu();
                return;
            }
            if (action === 'delete') {
                if (contextMenu.type === 'node') {
                    if (store === null || store === void 0 ? void 0 : store.props) {
                        const nextNodes = Object.assign({}, rawNodesDict);
                        const nextEdges = Object.assign({}, rawEdgesDict);
                        let edgesChanged = false;
                        const connectedNodeUuids = [];
                        Object.keys(nextEdges).forEach(edgeId => {
                            const edge = nextEdges[edgeId];
                            if (edge.source === contextMenu.id || edge.target === contextMenu.id) {
                                connectedNodeUuids.push(edge.source === contextMenu.id ? edge.target : edge.source);
                                delete nextEdges[edgeId];
                                edgesChanged = true;
                            }
                        });
                        delete nextNodes[contextMenu.id];
                        store.props.write('nodes', nextNodes);
                        if (edgesChanged)
                            store.props.write('edges', nextEdges);
                        if (selectedId === contextMenu.id)
                            setSelectedId(null);
                        if (enableOnClickEvents && (componentEvents === null || componentEvents === void 0 ? void 0 : componentEvents.fireComponentEvent)) {
                            componentEvents.fireComponentEvent('nodeDeleted', { deletedNodeUuid: contextMenu.id, connectedNodeUuids });
                        }
                    }
                }
                else if (contextMenu.type === 'edge') {
                    if (store === null || store === void 0 ? void 0 : store.props) {
                        const nextEdges = Object.assign({}, rawEdgesDict);
                        const rawEdge = nextEdges[contextMenu.id];
                        delete nextEdges[contextMenu.id];
                        store.props.write('edges', nextEdges);
                        if (selectedId === contextMenu.id)
                            setSelectedId(null);
                        if (enableOnClickEvents && (componentEvents === null || componentEvents === void 0 ? void 0 : componentEvents.fireComponentEvent)) {
                            componentEvents.fireComponentEvent('edgeDeleted', {
                                deletedEdgeUuid: contextMenu.id,
                                source: rawEdge === null || rawEdge === void 0 ? void 0 : rawEdge.source,
                                target: rawEdge === null || rawEdge === void 0 ? void 0 : rawEdge.target,
                            });
                        }
                    }
                }
                closeContextMenu();
                return;
            }
            if (['bringToFront', 'bringForward', 'sendBackward', 'sendToBack'].includes(action) && isNode) {
                if (store === null || store === void 0 ? void 0 : store.props) {
                    const nextNodes = Object.assign({}, rawNodesDict);
                    const currentZ = (_d = nextNodes[contextMenu.id].zIndex) !== null && _d !== void 0 ? _d : -500;
                    if (action === 'bringForward') {
                        nextNodes[contextMenu.id].zIndex = Math.min(currentZ + 1, -100);
                    }
                    else if (action === 'sendBackward') {
                        nextNodes[contextMenu.id].zIndex = Math.max(currentZ - 1, -1000);
                    }
                    else {
                        const containerZIndices = Object.values(nextNodes).filter((n) => n.paletteId === 'container').map((n) => { var _a; return (_a = n.zIndex) !== null && _a !== void 0 ? _a : -500; });
                        if (action === 'bringToFront')
                            nextNodes[contextMenu.id].zIndex = Math.min(Math.max(...containerZIndices, -1000) + 1, -100);
                        else if (action === 'sendToBack')
                            nextNodes[contextMenu.id].zIndex = Math.max(Math.min(...containerZIndices, -100) - 1, -1000);
                    }
                    store.props.write('nodes', nextNodes);
                }
                closeContextMenu();
                return;
            }
            if (action === 'toggleArrow' && isEdge) {
                if (store === null || store === void 0 ? void 0 : store.props) {
                    const nextEdges = Object.assign({}, rawEdgesDict);
                    if (nextEdges[contextMenu.id]) {
                        nextEdges[contextMenu.id].arrow = nextEdges[contextMenu.id].arrow === false ? true : false;
                        store.props.write('edges', nextEdges);
                    }
                }
                closeContextMenu();
                return;
            }
            if (action === 'toggleLabel' && isEdge) {
                if (store === null || store === void 0 ? void 0 : store.props) {
                    const nextEdges = Object.assign({}, rawEdgesDict);
                    if (nextEdges[contextMenu.id]) {
                        nextEdges[contextMenu.id].showLabel = nextEdges[contextMenu.id].showLabel !== true;
                        store.props.write('edges', nextEdges);
                    }
                }
                closeContextMenu();
                return;
            }
            if (action === 'toggleDashed' && isEdge) {
                if (store === null || store === void 0 ? void 0 : store.props) {
                    const nextEdges = Object.assign({}, rawEdgesDict);
                    if (nextEdges[contextMenu.id]) {
                        nextEdges[contextMenu.id].dashed = !nextEdges[contextMenu.id].dashed;
                        store.props.write('edges', nextEdges);
                    }
                }
                closeContextMenu();
                return;
            }
            if (action === 'clearWaypoints' && isEdge) {
                if (store === null || store === void 0 ? void 0 : store.props) {
                    const nextEdges = Object.assign({}, rawEdgesDict);
                    if (nextEdges[contextMenu.id]) {
                        nextEdges[contextMenu.id] = Object.assign(Object.assign({}, nextEdges[contextMenu.id]), { waypoints: [] });
                        store.props.write('edges', nextEdges);
                    }
                }
                closeContextMenu();
                return;
            }
            closeContextMenu();
        }
        catch (error) {
            console.error("Error in handleContextMenuAction:", error);
        }
    }, [contextMenu, rawNodesDict, rawEdgesDict, selectedId, snapEnabled, snapPixels, reactFlowInstance, store, componentEvents, enableOnClickEvents, setStyleEditorNodeId, executeCopy, executePaste, closeContextMenu, setSelectedId]);
    return Object.assign(Object.assign({ 
        // State
        isDraggingNode,
        // Refs
        rawNodesDictRef,
        rawEdgesDictRef,
        // Shared
        closeContextMenu }, edgeHandlers), { 
        // Node handlers
        handleGearClick,
        handleActionIconClick,
        handlePaletteItemClick,
        handleResizeEnd,
        handleTextChange,
        onNodesChange,
        onNodeDragStart,
        onNodeDrag,
        onNodeDragStop,
        onNodesDelete,
        onNodeContextMenu,
        onNodeClick,
        // Clipboard
        executeCopy,
        executePaste,
        // Pane
        onDragOver,
        onDrop,
        onMoveStart,
        onPaneClick,
        onPaneContextMenu,
        // Context menu
        handleNodeSwap,
        handleContextMenuAction });
};
exports.useArchitectureFlowHandlers = useArchitectureFlowHandlers;


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/useEdgeHandlers.ts":
/*!**********************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/useEdgeHandlers.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useEdgeHandlers = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const utils_1 = __webpack_require__(/*! ./utils */ "./typescript/components/ArchitectureBuilder/utils.ts");
const getPairKey = (typeIdA, typeIdB) => [typeIdA, typeIdB].sort().join('__');
const useEdgeHandlers = ({ store, componentEvents, rawNodesDict, rawEdgesDict, connectionTypes, nodeTypeConnectionDefaults, selectedId, setSelectedId, contextMenu, setContextMenu, setActiveSubMenu, setLocalEdges, reactFlowWrapper, wrapperBoundsRef, closeContextMenu, enableOnClickEvents, }) => {
    const [isUpdatingEdge, setIsUpdatingEdge] = React.useState(false);
    const updatingEdgeRef = React.useRef(null);
    // ─── Validation ──────────────────────────────────────────────────────────
    const getValidIntersection = React.useCallback((sourceId, targetId, ignoreEdgeId) => {
        const sourceNode = rawNodesDict[sourceId];
        const targetNode = rawNodesDict[targetId];
        if (!sourceNode || !targetNode || !sourceNode.supportedConnections || !targetNode.supportedConnections)
            return [];
        let intersection = sourceNode.supportedConnections.filter((c) => targetNode.supportedConnections.includes(c));
        intersection = intersection.filter((connType) => {
            const typeDef = connectionTypes[connType];
            const isMultipleFalse = typeDef && (typeDef.multiple === false || String(typeDef.multiple).toLowerCase() === 'false');
            if (isMultipleFalse) {
                const edgeExists = Object.entries(rawEdgesDict).some(([id, e]) => {
                    if (ignoreEdgeId && id === ignoreEdgeId)
                        return false;
                    return (e.source === sourceId && e.target === targetId && e.connectionType === connType) ||
                        (e.source === targetId && e.target === sourceId && e.connectionType === connType);
                });
                return !edgeExists;
            }
            return true;
        });
        return intersection;
    }, [rawNodesDict, rawEdgesDict, connectionTypes]);
    const isValidConnection = React.useCallback((connection) => {
        return getValidIntersection(connection.source, connection.target, updatingEdgeRef.current || undefined).length > 0;
    }, [getValidIntersection]);
    // ─── Edge handlers ───────────────────────────────────────────────────────
    const handleWaypointsChange = React.useCallback((edgeId, waypoints) => {
        try {
            if (!(store === null || store === void 0 ? void 0 : store.props))
                return;
            const nextEdges = Object.assign({}, rawEdgesDict);
            if (nextEdges[edgeId]) {
                nextEdges[edgeId] = Object.assign(Object.assign({}, nextEdges[edgeId]), { waypoints });
                store.props.write('edges', nextEdges);
                setLocalEdges(edges => edges.map(e => e.id === edgeId ? Object.assign(Object.assign({}, e), { data: Object.assign(Object.assign({}, e.data), { waypoints }) }) : e));
            }
        }
        catch (error) {
            console.error("Error in handleWaypointsChange:", error);
        }
    }, [store, rawEdgesDict, componentEvents, setLocalEdges]);
    const onConnect = React.useCallback((connectionParams) => {
        var _a, _b;
        try {
            const validTypes = getValidIntersection(connectionParams.source, connectionParams.target);
            if (validTypes.length === 0)
                return;
            const sourceTypeId = (_a = rawNodesDict[connectionParams.source]) === null || _a === void 0 ? void 0 : _a.typeId;
            const targetTypeId = (_b = rawNodesDict[connectionParams.target]) === null || _b === void 0 ? void 0 : _b.typeId;
            const pairKey = sourceTypeId && targetTypeId ? getPairKey(sourceTypeId, targetTypeId) : null;
            const preferredType = pairKey ? nodeTypeConnectionDefaults === null || nodeTypeConnectionDefaults === void 0 ? void 0 : nodeTypeConnectionDefaults[pairKey] : null;
            const selectedType = (preferredType && validTypes.includes(preferredType)) ? preferredType : validTypes[0];
            const typeDef = connectionTypes[selectedType] || {};
            if (store === null || store === void 0 ? void 0 : store.props) {
                store.props.write('edges', Object.assign(Object.assign({}, rawEdgesDict), { [utils_1.generateShortId()]: Object.assign(Object.assign({}, connectionParams), { lineType: 'smoothstep', dashed: false, arrow: typeDef.arrow !== false, showLabel: false, labelText: '', connectionType: selectedType, waypoints: [] }) }));
            }
        }
        catch (error) {
            console.error("Error in onConnect:", error);
        }
    }, [store, rawEdgesDict, rawNodesDict, getValidIntersection, connectionTypes, nodeTypeConnectionDefaults, componentEvents]);
    const onEdgeUpdate = React.useCallback((oldEdge, newConnection) => {
        var _a, _b, _c, _d;
        try {
            if (!newConnection.source || !newConnection.target)
                return;
            const validTypes = getValidIntersection(newConnection.source, newConnection.target, oldEdge.id);
            if (validTypes.length === 0)
                return;
            if (store === null || store === void 0 ? void 0 : store.props) {
                const nextEdges = Object.assign({}, rawEdgesDict);
                const oldData = nextEdges[oldEdge.id];
                if (!validTypes.includes(oldData.connectionType))
                    return;
                const isHoriz = (side) => side === 'left' || side === 'right';
                const oldSrcSide = (_a = oldEdge.sourceHandle) === null || _a === void 0 ? void 0 : _a.split('-')[0];
                const newSrcSide = (_b = newConnection.sourceHandle) === null || _b === void 0 ? void 0 : _b.split('-')[0];
                const oldTgtSide = (_c = oldEdge.targetHandle) === null || _c === void 0 ? void 0 : _c.split('-')[0];
                const newTgtSide = (_d = newConnection.targetHandle) === null || _d === void 0 ? void 0 : _d.split('-')[0];
                const srcAxisChanged = isHoriz(oldSrcSide) !== isHoriz(newSrcSide);
                const tgtAxisChanged = isHoriz(oldTgtSide) !== isHoriz(newTgtSide);
                const nextWaypoints = (srcAxisChanged || tgtAxisChanged) ? [] : (oldData.waypoints || []);
                nextEdges[oldEdge.id] = Object.assign(Object.assign({}, oldData), { source: newConnection.source, target: newConnection.target, sourceHandle: newConnection.sourceHandle, targetHandle: newConnection.targetHandle, waypoints: nextWaypoints });
                store.props.write('edges', nextEdges);
            }
        }
        catch (error) {
            console.error("Error in onEdgeUpdate:", error);
        }
    }, [store, rawEdgesDict, getValidIntersection, componentEvents]);
    const onEdgeUpdateStart = React.useCallback((event, edge) => {
        updatingEdgeRef.current = (edge === null || edge === void 0 ? void 0 : edge.id) || null;
        setIsUpdatingEdge(true);
    }, []);
    const onEdgeUpdateEnd = React.useCallback(() => {
        updatingEdgeRef.current = null;
        setIsUpdatingEdge(false);
    }, []);
    const onConnectStart = React.useCallback(() => {
        var _a;
        (_a = reactFlowWrapper.current) === null || _a === void 0 ? void 0 : _a.classList.add('arch-creating-edge');
    }, [reactFlowWrapper]);
    const onConnectEnd = React.useCallback(() => {
        var _a;
        (_a = reactFlowWrapper.current) === null || _a === void 0 ? void 0 : _a.classList.remove('arch-creating-edge');
    }, [reactFlowWrapper]);
    // Shared removal logic: deletes the given edges from the store and returns
    // the ones actually removed (with source/target captured before deletion).
    const removeEdgesFromStore = React.useCallback((deleted) => {
        if (!(store === null || store === void 0 ? void 0 : store.props))
            return [];
        const nextEdges = Object.assign({}, rawEdgesDict);
        const removed = [];
        deleted.forEach(e => {
            const rawEdge = rawEdgesDict[e.id];
            if (nextEdges[e.id]) {
                removed.push({ id: e.id, source: rawEdge === null || rawEdge === void 0 ? void 0 : rawEdge.source, target: rawEdge === null || rawEdge === void 0 ? void 0 : rawEdge.target });
                delete nextEdges[e.id];
            }
            if (e.id === selectedId)
                setSelectedId(null);
        });
        store.props.write('edges', nextEdges);
        return removed;
    }, [store, rawEdgesDict, selectedId, setSelectedId]);
    // Wired to <ReactFlow onEdgesDelete>. React Flow invokes this only as a cascade
    // when a connected node is deleted (edges never carry top-level `selected`, so
    // React Flow's own deleteKeyCode handling can never route a directly-selected
    // edge through here). nodeDeleted already reports the affected connections, so
    // this path must NOT also fire edgeDeleted.
    const onEdgesDelete = React.useCallback((deleted) => {
        try {
            removeEdgesFromStore(deleted);
        }
        catch (error) {
            console.error("Error in onEdgesDelete:", error);
        }
    }, [removeEdgesFromStore, componentEvents]);
    // Explicit, user-intentional single-edge deletion (keyboard Delete/Backspace
    // while an edge is selected). Fires edgeDeleted.
    const deleteEdgeWithEvent = React.useCallback((edgeId) => {
        try {
            const removed = removeEdgesFromStore([{ id: edgeId }]);
            if (enableOnClickEvents && (componentEvents === null || componentEvents === void 0 ? void 0 : componentEvents.fireComponentEvent)) {
                removed.forEach(r => {
                    componentEvents.fireComponentEvent('edgeDeleted', {
                        deletedEdgeUuid: r.id,
                        source: r.source,
                        target: r.target,
                    });
                });
            }
        }
        catch (error) {
            console.error("Error in deleteEdgeWithEvent:", error);
        }
    }, [removeEdgesFromStore, componentEvents, enableOnClickEvents]);
    const onEdgeContextMenu = React.useCallback((event, edge) => {
        event.preventDefault();
        setSelectedId(edge.id);
        const bounds = wrapperBoundsRef.current;
        setContextMenu({ id: edge.id, top: event.clientY - bounds.top, left: event.clientX - bounds.left, type: 'edge' });
        setActiveSubMenu(null);
    }, [wrapperBoundsRef, setSelectedId, setContextMenu, setActiveSubMenu]);
    const onEdgeClick = React.useCallback((event, edge) => {
        closeContextMenu();
        setSelectedId(edge.id);
        const rawEdge = rawEdgesDict[edge.id];
        if (componentEvents)
            componentEvents.fireComponentEvent('onEdgeClick', { id: edge.id, paletteId: rawEdge === null || rawEdge === void 0 ? void 0 : rawEdge.connectionType, type: 'edge' });
    }, [componentEvents, rawEdgesDict, setSelectedId, closeContextMenu]);
    const handleLineTypeChange = React.useCallback((newLineType) => {
        var _a;
        try {
            if (!contextMenu || contextMenu.type !== 'edge')
                return;
            if (componentEvents)
                componentEvents.fireComponentEvent('onContextMenuAction', { id: contextMenu.id, paletteId: (_a = rawEdgesDict[contextMenu.id]) === null || _a === void 0 ? void 0 : _a.connectionType, type: contextMenu.type, action: `lineType:${newLineType}` });
            if (store === null || store === void 0 ? void 0 : store.props) {
                const nextEdges = Object.assign({}, rawEdgesDict);
                if (nextEdges[contextMenu.id]) {
                    nextEdges[contextMenu.id].lineType = newLineType;
                    store.props.write('edges', nextEdges);
                }
            }
            closeContextMenu();
        }
        catch (error) {
            console.error("Error in handleLineTypeChange:", error);
        }
    }, [contextMenu, componentEvents, rawEdgesDict, store, closeContextMenu]);
    const handleConnectionTypeChange = React.useCallback((newConnectionType) => {
        var _a;
        try {
            if (!contextMenu || contextMenu.type !== 'edge')
                return;
            if (componentEvents)
                componentEvents.fireComponentEvent('onContextMenuAction', { id: contextMenu.id, paletteId: (_a = rawEdgesDict[contextMenu.id]) === null || _a === void 0 ? void 0 : _a.connectionType, type: contextMenu.type, action: `connectionType:${newConnectionType}` });
            if (store === null || store === void 0 ? void 0 : store.props) {
                const nextEdges = Object.assign({}, rawEdgesDict);
                if (nextEdges[contextMenu.id]) {
                    const typeDef = connectionTypes[newConnectionType] || {};
                    nextEdges[contextMenu.id].connectionType = newConnectionType;
                    nextEdges[contextMenu.id].arrow = typeDef.arrow !== false;
                    store.props.write('edges', nextEdges);
                }
            }
            closeContextMenu();
        }
        catch (error) {
            console.error("Error in handleConnectionTypeChange:", error);
        }
    }, [contextMenu, componentEvents, rawEdgesDict, connectionTypes, store, closeContextMenu]);
    const handleAnimationChange = React.useCallback((newAnimation) => {
        var _a;
        try {
            if (!contextMenu || contextMenu.type !== 'edge')
                return;
            if (componentEvents)
                componentEvents.fireComponentEvent('onContextMenuAction', { id: contextMenu.id, paletteId: (_a = rawEdgesDict[contextMenu.id]) === null || _a === void 0 ? void 0 : _a.connectionType, type: contextMenu.type, action: `animation:${newAnimation}` });
            if (store === null || store === void 0 ? void 0 : store.props) {
                const nextEdges = Object.assign({}, rawEdgesDict);
                if (nextEdges[contextMenu.id]) {
                    nextEdges[contextMenu.id].animation = newAnimation;
                    store.props.write('edges', nextEdges);
                }
            }
            closeContextMenu();
        }
        catch (error) {
            console.error("Error in handleAnimationChange:", error);
        }
    }, [contextMenu, componentEvents, rawEdgesDict, store, closeContextMenu]);
    const handleLabelChange = React.useCallback((edgeId, labelText) => {
        try {
            if (!(store === null || store === void 0 ? void 0 : store.props))
                return;
            const nextEdges = Object.assign({}, rawEdgesDict);
            if (nextEdges[edgeId]) {
                nextEdges[edgeId] = Object.assign(Object.assign({}, nextEdges[edgeId]), { labelText });
                store.props.write('edges', nextEdges);
            }
        }
        catch (error) {
            console.error("Error in handleLabelChange:", error);
        }
    }, [store, rawEdgesDict, componentEvents]);
    const writeDefaultForPair = React.useCallback((connType) => {
        var _a, _b;
        if (!contextMenu || contextMenu.type !== 'edge')
            return;
        const edge = rawEdgesDict[contextMenu.id];
        if (!edge)
            return;
        const sourceTypeId = (_a = rawNodesDict[edge.source]) === null || _a === void 0 ? void 0 : _a.typeId;
        const targetTypeId = (_b = rawNodesDict[edge.target]) === null || _b === void 0 ? void 0 : _b.typeId;
        if (!sourceTypeId || !targetTypeId)
            return;
        const pairKey = getPairKey(sourceTypeId, targetTypeId);
        if (store === null || store === void 0 ? void 0 : store.props) {
            store.props.write('nodeTypeConnectionDefaults', Object.assign(Object.assign({}, nodeTypeConnectionDefaults), { [pairKey]: connType }));
        }
    }, [contextMenu, rawEdgesDict, rawNodesDict, nodeTypeConnectionDefaults, store]);
    const handleSetConnectionDefault = React.useCallback(() => {
        try {
            const edge = rawEdgesDict[contextMenu === null || contextMenu === void 0 ? void 0 : contextMenu.id];
            if (!edge)
                return;
            writeDefaultForPair(edge.connectionType);
            closeContextMenu();
        }
        catch (error) {
            console.error("Error in handleSetConnectionDefault:", error);
        }
    }, [contextMenu, rawEdgesDict, writeDefaultForPair, closeContextMenu, componentEvents]);
    const handleSetDefaultForType = React.useCallback((connType) => {
        try {
            writeDefaultForPair(connType);
            closeContextMenu();
        }
        catch (error) {
            console.error("Error in handleSetDefaultForType:", error);
        }
    }, [writeDefaultForPair, closeContextMenu, componentEvents]);
    const handleClearConnectionDefault = React.useCallback(() => {
        var _a, _b;
        try {
            if (!contextMenu || contextMenu.type !== 'edge')
                return;
            const edge = rawEdgesDict[contextMenu.id];
            if (!edge)
                return;
            const sourceTypeId = (_a = rawNodesDict[edge.source]) === null || _a === void 0 ? void 0 : _a.typeId;
            const targetTypeId = (_b = rawNodesDict[edge.target]) === null || _b === void 0 ? void 0 : _b.typeId;
            if (!sourceTypeId || !targetTypeId)
                return;
            const pairKey = getPairKey(sourceTypeId, targetTypeId);
            if (store === null || store === void 0 ? void 0 : store.props) {
                const next = Object.assign({}, nodeTypeConnectionDefaults);
                delete next[pairKey];
                store.props.write('nodeTypeConnectionDefaults', next);
            }
            closeContextMenu();
        }
        catch (error) {
            console.error("Error in handleClearConnectionDefault:", error);
        }
    }, [contextMenu, rawEdgesDict, rawNodesDict, nodeTypeConnectionDefaults, store, closeContextMenu, componentEvents]);
    return {
        isUpdatingEdge,
        updatingEdgeRef,
        getValidIntersection,
        isValidConnection,
        handleWaypointsChange,
        onConnect,
        onEdgeUpdate,
        onEdgeUpdateStart,
        onEdgeUpdateEnd,
        onConnectStart,
        onConnectEnd,
        onEdgesDelete,
        deleteEdgeWithEvent,
        onEdgeContextMenu,
        onEdgeClick,
        handleLineTypeChange,
        handleConnectionTypeChange,
        handleAnimationChange,
        handleLabelChange,
        handleSetConnectionDefault,
        handleSetDefaultForType,
        handleClearConnectionDefault,
    };
};
exports.useEdgeHandlers = useEdgeHandlers;


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/useLongPress.ts":
/*!*******************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/useLongPress.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useLongPress = void 0;
const react_1 = __webpack_require__(/*! react */ "react");
const LONG_PRESS_MS = 600;
function useLongPress(onLongPress) {
    const timerRef = react_1.useRef(null);
    react_1.useEffect(() => () => { if (timerRef.current)
        clearTimeout(timerRef.current); }, []);
    const onPointerDown = react_1.useCallback((e) => {
        if (e.button !== 0)
            return; // primary button only
        const { clientX, clientY, target } = e;
        timerRef.current = setTimeout(() => {
            onLongPress(clientX, clientY, target);
        }, LONG_PRESS_MS);
    }, [onLongPress]);
    const cancel = react_1.useCallback(() => {
        if (timerRef.current)
            clearTimeout(timerRef.current);
    }, []);
    return {
        onPointerDown,
        onPointerUp: cancel,
        onPointerCancel: cancel,
        onPointerMove: cancel,
    };
}
exports.useLongPress = useLongPress;


/***/ }),

/***/ "./typescript/components/ArchitectureBuilder/utils.ts":
/*!************************************************************!*\
  !*** ./typescript/components/ArchitectureBuilder/utils.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateShortId = void 0;
const generateShortId = () => 'I' + Math.random().toString(16).substring(2, 10);
exports.generateShortId = generateShortId;


/***/ }),

/***/ "./typescript/components/common/ComponentErrorBoundary.tsx":
/*!*****************************************************************!*\
  !*** ./typescript/components/common/ComponentErrorBoundary.tsx ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComponentErrorBoundary = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
class ComponentErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(_) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Component Error Boundary caught an error", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (React.createElement("div", { style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'var(--neutral-10)',
                    color: 'var(--neutral-90)',
                    padding: '20px',
                    textAlign: 'center'
                } },
                React.createElement("h3", null, "Component crashed. Please refresh."),
                React.createElement("button", { onClick: () => this.setState({ hasError: false }), style: {
                        marginTop: '10px',
                        padding: '8px 16px',
                        backgroundColor: 'var(--callToAction)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    } }, "Try Again")));
        }
        return this.props.children;
    }
}
exports.ComponentErrorBoundary = ComponentErrorBoundary;


/***/ }),

/***/ "@inductiveautomation/perspective-client":
/*!************************************!*\
  !*** external "PerspectiveClient" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__inductiveautomation_perspective_client__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;

/***/ }),

/***/ "mobx-react":
/*!****************************!*\
  !*** external "mobxReact" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_mobx_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!******************************************!*\
  !*** ./typescript/perspective-client.ts ***!
  \******************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArchitectureBuilderMeta = exports.ArchitectureBuilder = void 0;
const perspective_client_1 = __webpack_require__(/*! @inductiveautomation/perspective-client */ "@inductiveautomation/perspective-client");
const ArchitectureBuilder_1 = __webpack_require__(/*! ./components/ArchitectureBuilder/ArchitectureBuilder */ "./typescript/components/ArchitectureBuilder/ArchitectureBuilder.tsx");
Object.defineProperty(exports, "ArchitectureBuilder", ({ enumerable: true, get: function () { return ArchitectureBuilder_1.ArchitectureBuilder; } }));
class ArchitectureBuilderMeta {
    getComponentType() {
        return 'com.wargoetz.reactflow.architecturebuilder';
    }
    getViewComponent() {
        return ArchitectureBuilder_1.ArchitectureBuilder;
    }
    getDefaultSize() {
        return { width: 800, height: 600 };
    }
    getPropsReducer(tree) {
        const rawHandleCount = tree.read('handleCount', 3);
        const clampedHandleCount = Math.max(1, Math.min(5, Number(rawHandleCount) || 3));
        return {
            nodes: tree.read('nodes'),
            edges: tree.read('edges'),
            paletteItems: tree.read('paletteItems'),
            connectionTypes: tree.read('connectionTypes'),
            nodeTypeConnectionDefaults: tree.read('nodeTypeConnectionDefaults'),
            enabled: tree.read('enabled', true),
            enableOnClickEvents: tree.read('enableOnClickEvents', true),
            snapEnabled: tree.read('snapEnabled', true),
            snapPixels: tree.read('snapPixels', 15),
            edgeWidth: tree.read('edgeWidth', 6),
            hideHandles: tree.read('hideHandles', false),
            handleCount: clampedHandleCount,
            refreshHierarchy: tree.read('refreshHierarchy', false),
            style: tree.read('style')
        };
    }
}
exports.ArchitectureBuilderMeta = ArchitectureBuilderMeta;
// --- REGISTRATION ---
const registry = perspective_client_1.ComponentRegistry;
if (registry.registerComponent) {
    registry.registerComponent(new ArchitectureBuilderMeta());
}
else {
    registry.register(new ArchitectureBuilderMeta());
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=WARGoetzComponents.js.map