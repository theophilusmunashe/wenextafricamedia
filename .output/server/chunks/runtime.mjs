import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'path';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}
function isSamePath(p1, p2) {
  return decode(withoutTrailingSlash(p1)) === decode(withoutTrailingSlash(p2));
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(name, value);
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  const response = await _getFetch(opts.fetch)(target, {
    headers: opts.headers,
    ignoreResponseError: true,
    // make $ofetch.raw transparent
    ...opts.fetchOptions
  });
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. **/
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. **/
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const { pathname } = parseURL(info.url || "/");
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      await sendError(event, error, !!app.options.debug);
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {
    "buildId": "1b61788e-c638-4d85-bfca-731765fde3c2"
  }
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"C:\\Users\\amici\\Documents\\wenextmedia\\.data\\kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/contact.php": {
    "type": "application/x-httpd-php",
    "etag": "\"605-AK6AmdkCEZvMQrEcrfOg3vSuUZs\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 1541,
    "path": "../public/contact.php"
  },
  "/des.jpg": {
    "type": "image/jpeg",
    "etag": "\"3e5ed-hQHyAo04s+b7tEcQbub2BNnh9No\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 255469,
    "path": "../public/des.jpg"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"57e-bu40qt3RpftcCln0FyH+VSnfnRQ\"",
    "mtime": "2024-07-13T16:59:32.000Z",
    "size": 1406,
    "path": "../public/favicon.ico"
  },
  "/_nuxt/1mSlNodF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1baf-SXxNn/t6nPy8JN3mSs1dgX4UReU\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 7087,
    "path": "../public/_nuxt/1mSlNodF.js"
  },
  "/_nuxt/1ZSfl3T9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b80-anjTRN/ieb9qMMUsq/ioDhzq80c\"",
    "mtime": "2024-08-04T07:34:38.698Z",
    "size": 2944,
    "path": "../public/_nuxt/1ZSfl3T9.js"
  },
  "/_nuxt/3tJ0MvUv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"76c-/RUK1WdHRqMDMUFZJj4ziCl/tYM\"",
    "mtime": "2024-08-04T07:34:38.677Z",
    "size": 1900,
    "path": "../public/_nuxt/3tJ0MvUv.js"
  },
  "/_nuxt/8zUmHKob.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af-Sn1QX0+JduYp+gMCrOctMm7aDuk\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 175,
    "path": "../public/_nuxt/8zUmHKob.js"
  },
  "/_nuxt/a7mQOiYu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7e8-JyYASCnboFQ23SdwYzJg1rTx39M\"",
    "mtime": "2024-08-04T07:34:38.698Z",
    "size": 2024,
    "path": "../public/_nuxt/a7mQOiYu.js"
  },
  "/_nuxt/B-jhBiqc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6b-XLwOVYKE5q0HVUqqoPy/d9zfOyM\"",
    "mtime": "2024-08-04T07:34:38.709Z",
    "size": 107,
    "path": "../public/_nuxt/B-jhBiqc.js"
  },
  "/_nuxt/B3QapC4s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c3b-zw5JFJCKLQUUN3VYxvQ/lJZMI+8\"",
    "mtime": "2024-08-04T07:34:38.677Z",
    "size": 3131,
    "path": "../public/_nuxt/B3QapC4s.js"
  },
  "/_nuxt/B3ZcjEEO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c3e-Mgwt7OZP2zvr54gM/7JTvOg+kzs\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 3134,
    "path": "../public/_nuxt/B3ZcjEEO.js"
  },
  "/_nuxt/BgbzfaxJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"890-psKCg8Lhw+T/MUaP+SNroGEV3TI\"",
    "mtime": "2024-08-04T07:34:38.698Z",
    "size": 2192,
    "path": "../public/_nuxt/BgbzfaxJ.js"
  },
  "/_nuxt/BiDM4Q5m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"807-AePhrQklB90I80/5sTDoeK+rL8E\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 2055,
    "path": "../public/_nuxt/BiDM4Q5m.js"
  },
  "/_nuxt/BLn1RTf-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13c6-TW8Jp5f+N1gxsyyT65UBOVMaRVk\"",
    "mtime": "2024-08-04T07:34:38.714Z",
    "size": 5062,
    "path": "../public/_nuxt/BLn1RTf-.js"
  },
  "/_nuxt/BoGqGSHY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a5-2ko44vEGzW4xuKmKLukR0S+FJcA\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 677,
    "path": "../public/_nuxt/BoGqGSHY.js"
  },
  "/_nuxt/BPBbT1mi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14cf-JAg/zGiILDsHmwRu4UBS3sFAQbQ\"",
    "mtime": "2024-08-04T07:34:38.688Z",
    "size": 5327,
    "path": "../public/_nuxt/BPBbT1mi.js"
  },
  "/_nuxt/BRBeb6Dm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d54-Mn7bFYtp4wJlrDBZodqf2T56LPc\"",
    "mtime": "2024-08-04T07:34:38.714Z",
    "size": 7508,
    "path": "../public/_nuxt/BRBeb6Dm.js"
  },
  "/_nuxt/Brp3eCWG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1843-ca/msqWTylLYk8EUb/EWYZgbDLE\"",
    "mtime": "2024-08-04T07:34:38.718Z",
    "size": 6211,
    "path": "../public/_nuxt/Brp3eCWG.js"
  },
  "/_nuxt/C7qRud2I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26ba5-4wpARVG1/gkwmoVPWVthxrHNW4s\"",
    "mtime": "2024-08-04T07:34:38.718Z",
    "size": 158629,
    "path": "../public/_nuxt/C7qRud2I.js"
  },
  "/_nuxt/C9Q91bjB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4026-eMaNqmhQPzY/3FdHpyHg9opjZfE\"",
    "mtime": "2024-08-04T07:34:38.718Z",
    "size": 16422,
    "path": "../public/_nuxt/C9Q91bjB.js"
  },
  "/_nuxt/Ca2QkPGZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14251-kzZ733Sd/BMj9Kuy3i4vjqceZBs\"",
    "mtime": "2024-08-04T07:34:38.718Z",
    "size": 82513,
    "path": "../public/_nuxt/Ca2QkPGZ.js"
  },
  "/_nuxt/C2bSku4A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"91c-A5HDsv2hXNrst2IfTa5jQey3F0c\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 2332,
    "path": "../public/_nuxt/Cbf3TdT0.js"
  },
  "/_nuxt/CdkqiKKC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"45ef-lM0Jb8/kk06vm/CEPyxBF9FgVVg\"",
    "mtime": "2024-08-04T07:34:38.718Z",
    "size": 17903,
    "path": "../public/_nuxt/CdkqiKKC.js"
  },
  "/_nuxt/CmhnaSJU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"167c-nA9W/U3oT/0vBd4XLKdoLCuToc4\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 5756,
    "path": "../public/_nuxt/CmhnaSJU.js"
  },
  "/_nuxt/CoFp7HSG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d2-e/kWWWa0pDgED+A2sVEGQGwWwrY\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 210,
    "path": "../public/_nuxt/CoFp7HSG.js"
  },
  "/_nuxt/CqYjNu7B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a9f-r2QHIbhz4fNqOJFkTbP7StK1XaU\"",
    "mtime": "2024-08-04T07:34:38.669Z",
    "size": 2719,
    "path": "../public/_nuxt/CqYjNu7B.js"
  },
  "/_nuxt/CSXp0jNL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23e9-JXIniJx2lfSBG79EdTg/4GT83yQ\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 9193,
    "path": "../public/_nuxt/CSXp0jNL.js"
  },
  "/_nuxt/CTnAW944.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ad3-ln6m++EBMVuzPAHQSuBT74PIkNM\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 2771,
    "path": "../public/_nuxt/CTnAW944.js"
  },
  "/_nuxt/CwHUGe-w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f15-5WE4RQiIA/kVxZZy85UaCviPu2Y\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 3861,
    "path": "../public/_nuxt/CwHUGe-w.js"
  },
  "/_nuxt/CYFQPK38.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ee9-GEF8bAoDBUZxwr2iruEOFkLEmFw\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 3817,
    "path": "../public/_nuxt/CYFQPK38.js"
  },
  "/_nuxt/CyzFT-bC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1178-4rN7i0wqvBvSciInFzgOlndeZoY\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 4472,
    "path": "../public/_nuxt/CyzFT-bC.js"
  },
  "/_nuxt/C_Za6c8D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"258-VjNT00Wjwv/e+7iWNdhOVa8yC0Y\"",
    "mtime": "2024-08-04T07:34:38.714Z",
    "size": 600,
    "path": "../public/_nuxt/C_Za6c8D.js"
  },
  "/_nuxt/D10d51pg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bbf-9YbFmRsRTEzQCiZIS1LrgdJBsMI\"",
    "mtime": "2024-08-04T07:34:38.698Z",
    "size": 3007,
    "path": "../public/_nuxt/D10d51pg.js"
  },
  "/_nuxt/D5OAnqA3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8cd-vBjxuBop/gkN9FiTsw2vmNLdnfg\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 2253,
    "path": "../public/_nuxt/D5OAnqA3.js"
  },
  "/_nuxt/Da96mFO8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1177-fdKsrqYTg3AZIXIRpPJe3+elvfA\"",
    "mtime": "2024-08-04T07:34:38.698Z",
    "size": 4471,
    "path": "../public/_nuxt/Da96mFO8.js"
  },
  "/_nuxt/DKGOXl4U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"836-zIpWw25Er9nkUrqqpe5McH0HL5M\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 2102,
    "path": "../public/_nuxt/DKGOXl4U.js"
  },
  "/_nuxt/Dl9eGdbw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"514-ApnF9Lo0GIUQTuaqeHujlGgoi30\"",
    "mtime": "2024-08-04T07:34:38.685Z",
    "size": 1300,
    "path": "../public/_nuxt/Dl9eGdbw.js"
  },
  "/_nuxt/DPjlHDuJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e4f-ZVNAQR9sJHsqst8Zzs4UAs2A278\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 3663,
    "path": "../public/_nuxt/DPjlHDuJ.js"
  },
  "/_nuxt/DsgFxIWZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fe-w70kmhmAJNjOXEptXxakDmX0dpk\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 254,
    "path": "../public/_nuxt/DsgFxIWZ.js"
  },
  "/_nuxt/Dv6VTypu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e42-uEjWSQ2H6aFYx9xhYuWYwHGEv2M\"",
    "mtime": "2024-08-04T07:34:38.718Z",
    "size": 15938,
    "path": "../public/_nuxt/Dv6VTypu.js"
  },
  "/_nuxt/DVv6RHMD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ace-fR/Dx2ne7su872cCNAbSbSsZUHs\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 2766,
    "path": "../public/_nuxt/DVv6RHMD.js"
  },
  "/_nuxt/DWFnR3dp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4d2-KNdPfElpmUGg+jitbojhkCi7xhk\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 1234,
    "path": "../public/_nuxt/DWFnR3dp.js"
  },
  "/_nuxt/DxM3FTTP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2085-cZPdlV+YnKwTjopFMGb5n5GgWlI\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 8325,
    "path": "../public/_nuxt/DxM3FTTP.js"
  },
  "/_nuxt/ELS0-k9m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d42-hQOCKaSIglI2YPaLgaA2a4Qy+H8\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 7490,
    "path": "../public/_nuxt/ELS0-k9m.js"
  },
  "/_nuxt/error-404.JekaaCis.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-+wA7grMyiBYWUxUrDrQgnZGsVuQ\"",
    "mtime": "2024-08-04T07:34:38.668Z",
    "size": 3556,
    "path": "../public/_nuxt/error-404.JekaaCis.css"
  },
  "/_nuxt/error-500.CNP9nqm1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-Juu+xpvMf6y/oBf0WsXvPEH0ie4\"",
    "mtime": "2024-08-04T07:34:38.677Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.CNP9nqm1.css"
  },
  "/_nuxt/KOAMxP0x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10dd-HXSl3K95gk77Ns7S7uDpjGpZU24\"",
    "mtime": "2024-08-04T07:34:38.698Z",
    "size": 4317,
    "path": "../public/_nuxt/KOAMxP0x.js"
  },
  "/_nuxt/kwSjPa5J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"813-UHauXJPqt0D2qBO//OW4WafXhYc\"",
    "mtime": "2024-08-04T07:34:38.678Z",
    "size": 2067,
    "path": "../public/_nuxt/kwSjPa5J.js"
  },
  "/_nuxt/ky55GMQ5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"182-jkNHdC+Lq1vCekxXnqHkvSUCGVw\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 386,
    "path": "../public/_nuxt/ky55GMQ5.js"
  },
  "/_nuxt/lURycfaI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1df-KUI1IfrY31IlErrIbHt1pqRTBfw\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 479,
    "path": "../public/_nuxt/lURycfaI.js"
  },
  "/_nuxt/M2JoWSnB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b-6O9Bv9LDg5C4H19ZGfQ+kXIiMfc\"",
    "mtime": "2024-08-04T07:34:38.677Z",
    "size": 91,
    "path": "../public/_nuxt/M2JoWSnB.js"
  },
  "/_nuxt/yQSje7mG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"164-j7u8fu2UQKELYaL3DPWue6fzNs4\"",
    "mtime": "2024-08-04T07:34:38.657Z",
    "size": 356,
    "path": "../public/_nuxt/yQSje7mG.js"
  },
  "/_nuxt/zbD-T4Hq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cce-eE4p8dqYQ0vlpO4GnKYUxUlwWAA\"",
    "mtime": "2024-08-04T07:34:38.701Z",
    "size": 3278,
    "path": "../public/_nuxt/zbD-T4Hq.js"
  },
  "/assets/js/TweenMax.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c4c9-aGKZeOrxYX1XkCSTP4ZKtU7lJ3Q\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 115913,
    "path": "../public/assets/js/TweenMax.min.js"
  },
  "/assets/js/wow.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24d9-TMQEPAlbVduqCjrFxSH9gdI3LeE\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 9433,
    "path": "../public/assets/js/wow.min.js"
  },
  "/assets/imgs/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"24bf36-QLlhT+lJ7/NWYl/vL/im7NGyP8w\"",
    "mtime": "2024-05-31T17:24:28.000Z",
    "size": 2408246,
    "path": "../public/assets/imgs/6.jpg"
  },
  "/assets/imgs/b1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eed2f-+2POtZz4AIwV+Og0nkof1C/3m/s\"",
    "mtime": "2024-05-31T17:29:30.000Z",
    "size": 2026799,
    "path": "../public/assets/imgs/b1.jpg"
  },
  "/assets/imgs/b2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e0b59-nhPsBLtJ4BHZQmHg8f3Xbc8p5GU\"",
    "mtime": "2024-05-31T17:29:28.000Z",
    "size": 1968985,
    "path": "../public/assets/imgs/b2.jpg"
  },
  "/assets/imgs/b3.jpg": {
    "type": "image/jpeg",
    "etag": "\"22660a-szJHNyYDrgWKGsKijuMcKYQFZWE\"",
    "mtime": "2024-05-31T17:29:32.000Z",
    "size": 2254346,
    "path": "../public/assets/imgs/b3.jpg"
  },
  "/assets/imgs/c1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eba78-q5IGCUjk92IEvuJxzsYdsHnaNrE\"",
    "mtime": "2024-05-31T17:24:24.000Z",
    "size": 2013816,
    "path": "../public/assets/imgs/c1.jpg"
  },
  "/assets/imgs/c2.jpg": {
    "type": "image/jpeg",
    "etag": "\"24bf36-QLlhT+lJ7/NWYl/vL/im7NGyP8w\"",
    "mtime": "2024-05-31T17:24:28.000Z",
    "size": 2408246,
    "path": "../public/assets/imgs/c2.jpg"
  },
  "/assets/imgs/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"13e-iXDEO5dKBbgIChVUFTuoi4a90u0\"",
    "mtime": "2024-07-26T05:50:40.687Z",
    "size": 318,
    "path": "../public/assets/imgs/favicon.ico"
  },
  "/assets/imgs/logo-dark.png": {
    "type": "image/png",
    "etag": "\"fcd-EdaQgBvOc5Xjph5bj6NVwoFmIXY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 4045,
    "path": "../public/assets/imgs/logo-dark.png"
  },
  "/assets/css/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"207e1-WhXGhDmtHM6Ut6ZrAG9uqWwKNQk\"",
    "mtime": "2024-07-13T10:24:28.000Z",
    "size": 133089,
    "path": "../public/assets/css/style.css"
  },
  "/assets/fonts/fa-brands-400.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"20c96-0f/WNAzb9yiQzLZ/MgFer8XfUac\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 134294,
    "path": "../public/assets/fonts/fa-brands-400.eot"
  },
  "/assets/fonts/fa-brands-400.ttf": {
    "type": "font/ttf",
    "etag": "\"20b64-irkHCD/sqqKp7JOyf4hK10VzcFw\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 133988,
    "path": "../public/assets/fonts/fa-brands-400.ttf"
  },
  "/assets/fonts/fa-brands-400.woff": {
    "type": "font/woff",
    "etag": "\"15f84-Hh8Cv6ieF5/i3RODJzuIEqqHNBg\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 89988,
    "path": "../public/assets/fonts/fa-brands-400.woff"
  },
  "/assets/fonts/fa-brands-400.woff2": {
    "type": "font/woff2",
    "etag": "\"12bc0-BhPH67pV7kfvMCwPd2YyRpL4mac\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 76736,
    "path": "../public/assets/fonts/fa-brands-400.woff2"
  },
  "/assets/fonts/fa-regular-400.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"84f2-Zw+wHkkwrkb+jW0rderSiPVOjmE\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 34034,
    "path": "../public/assets/fonts/fa-regular-400.eot"
  },
  "/assets/fonts/fa-regular-400.ttf": {
    "type": "font/ttf",
    "etag": "\"83c8-w0rNaBjfbba+QaLjMYhnZdYB8us\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 33736,
    "path": "../public/assets/fonts/fa-regular-400.ttf"
  },
  "/assets/fonts/fa-regular-400.woff": {
    "type": "font/woff",
    "etag": "\"3f94-OtT05LH7Pt7j1Lol5s3+0vC4ilQ\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 16276,
    "path": "../public/assets/fonts/fa-regular-400.woff"
  },
  "/assets/fonts/fa-regular-400.woff2": {
    "type": "font/woff2",
    "etag": "\"33a8-E1F1Ka/6OeJYXFkayubcM2tqqRc\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 13224,
    "path": "../public/assets/fonts/fa-regular-400.woff2"
  },
  "/assets/fonts/fa-solid-900.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"31916-6oRcWb7kpcbbd0uNgGD1ZBt4muk\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 203030,
    "path": "../public/assets/fonts/fa-solid-900.eot"
  },
  "/assets/fonts/fa-solid-900.ttf": {
    "type": "font/ttf",
    "etag": "\"317f8-64kU9rF5e0XuCIPmCJ2SaV2flEE\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 202744,
    "path": "../public/assets/fonts/fa-solid-900.ttf"
  },
  "/assets/fonts/fa-solid-900.woff": {
    "type": "font/woff",
    "etag": "\"18d10-oirNdpfzbn1MwxqFPHDndurFS7E\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 101648,
    "path": "../public/assets/fonts/fa-solid-900.woff"
  },
  "/assets/fonts/fa-solid-900.woff2": {
    "type": "font/woff2",
    "etag": "\"131bc-DMssgUp+TKEsR3iCFjOAnLA2Hqo\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 78268,
    "path": "../public/assets/fonts/fa-solid-900.woff2"
  },
  "/assets/fonts/fontawesome-webfont.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"2876e-2YDCzoc9xDr0YNTVctRBMESZ9AA\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 165742,
    "path": "../public/assets/fonts/fontawesome-webfont.eot"
  },
  "/assets/fonts/fontawesome-webfont.ttf": {
    "type": "font/ttf",
    "etag": "\"286ac-E7HqtlqYPHpzvHmXxHnWaUP3xss\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 165548,
    "path": "../public/assets/fonts/fontawesome-webfont.ttf"
  },
  "/assets/fonts/fontawesome-webfont.woff": {
    "type": "font/woff",
    "etag": "\"17ee8-KLeCJAs+dtuCThLAJ1SpcxoWdSc\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 98024,
    "path": "../public/assets/fonts/fontawesome-webfont.woff"
  },
  "/assets/fonts/fontawesome-webfont.woff2": {
    "type": "font/woff2",
    "etag": "\"12d68-1vSMun0Hb7by/Wupk6dbncHsvww\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 77160,
    "path": "../public/assets/fonts/fontawesome-webfont.woff2"
  },
  "/assets/fonts/FontAwesome.otf": {
    "type": "font/otf",
    "etag": "\"20e98-BIcHvFKsS2VjqqODv+hmCg3ckIw\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 134808,
    "path": "../public/assets/fonts/FontAwesome.otf"
  },
  "/assets/fonts/ionicons.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1d794-YVMuieIS+N0WujHz6881wKczQDU\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 120724,
    "path": "../public/assets/fonts/ionicons.eot"
  },
  "/assets/fonts/ionicons.ttf": {
    "type": "font/ttf",
    "etag": "\"2e05c-GwoN4ISQWUaiAwDKjDVIZd7EZ2Q\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 188508,
    "path": "../public/assets/fonts/ionicons.ttf"
  },
  "/assets/fonts/ionicons.woff": {
    "type": "font/woff",
    "etag": "\"10940-5GgZ6GOkZ1HWIsEZDE6Kg+vCBhI\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 67904,
    "path": "../public/assets/fonts/ionicons.woff"
  },
  "/assets/fonts/Pe-icon-7-stroke.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"e538-bAn5sBovip1nIpKy1B2U5jnq8T0\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 58680,
    "path": "../public/assets/fonts/Pe-icon-7-stroke.eot"
  },
  "/assets/fonts/Pe-icon-7-stroke.ttf": {
    "type": "font/ttf",
    "etag": "\"e470-6NIauRh38AQvvutyvq9xymWVueg\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 58480,
    "path": "../public/assets/fonts/Pe-icon-7-stroke.ttf"
  },
  "/assets/fonts/Pe-icon-7-stroke.woff": {
    "type": "font/woff",
    "etag": "\"e4bc-flRLsRt2VZmNtvMkxhL3/78Ktm4\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 58556,
    "path": "../public/assets/fonts/Pe-icon-7-stroke.woff"
  },
  "/assets/imgs/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"24bf36-QLlhT+lJ7/NWYl/vL/im7NGyP8w\"",
    "mtime": "2024-05-31T17:24:28.000Z",
    "size": 2408246,
    "path": "../public/assets/imgs/6.jpg"
  },
  "/assets/imgs/b1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eed2f-+2POtZz4AIwV+Og0nkof1C/3m/s\"",
    "mtime": "2024-05-31T17:29:30.000Z",
    "size": 2026799,
    "path": "../public/assets/imgs/b1.jpg"
  },
  "/assets/imgs/b2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e0b59-nhPsBLtJ4BHZQmHg8f3Xbc8p5GU\"",
    "mtime": "2024-05-31T17:29:28.000Z",
    "size": 1968985,
    "path": "../public/assets/imgs/b2.jpg"
  },
  "/assets/imgs/b3.jpg": {
    "type": "image/jpeg",
    "etag": "\"22660a-szJHNyYDrgWKGsKijuMcKYQFZWE\"",
    "mtime": "2024-05-31T17:29:32.000Z",
    "size": 2254346,
    "path": "../public/assets/imgs/b3.jpg"
  },
  "/assets/imgs/c1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eba78-q5IGCUjk92IEvuJxzsYdsHnaNrE\"",
    "mtime": "2024-05-31T17:24:24.000Z",
    "size": 2013816,
    "path": "../public/assets/imgs/c1.jpg"
  },
  "/assets/imgs/c2.jpg": {
    "type": "image/jpeg",
    "etag": "\"24bf36-QLlhT+lJ7/NWYl/vL/im7NGyP8w\"",
    "mtime": "2024-05-31T17:24:28.000Z",
    "size": 2408246,
    "path": "../public/assets/imgs/c2.jpg"
  },
  "/assets/imgs/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"57e-bu40qt3RpftcCln0FyH+VSnfnRQ\"",
    "mtime": "2024-07-13T16:59:32.000Z",
    "size": 1406,
    "path": "../public/assets/imgs/favicon.ico"
  },
  "/assets/imgs/logo-dark.png": {
    "type": "image/png",
    "etag": "\"fcd-EdaQgBvOc5Xjph5bj6NVwoFmIXY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 4045,
    "path": "../public/assets/imgs/logo-dark.png"
  },
  "/assets/imgs/logo-light.png": {
    "type": "image/png",
    "etag": "\"73df-42dhDy0SEkWIq5osgXfebCIApbc\"",
    "mtime": "2024-05-24T22:05:00.000Z",
    "size": 29663,
    "path": "../public/assets/imgs/logo-light.png"
  },
  "/assets/imgs/noise.png": {
    "type": "image/png",
    "etag": "\"17971-wH61vgfLMMKLxhmRrJROi3gQYyg\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 96625,
    "path": "../public/assets/imgs/noise.png"
  },
  "/assets/js/bootstrap.bundle.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13137-vNOSotlQUYEeolAIyoXKpLsMT+g\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 78135,
    "path": "../public/assets/js/bootstrap.bundle.min.js"
  },
  "/assets/js/charming.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20f-LpiyDGw563uPwm86pDNBDWAZb/8\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 527,
    "path": "../public/assets/js/charming.min.js"
  },
  "/assets/js/countdown.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"863-0RVVvwOnswGLeDtyDqCkh9mMpy0\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 2147,
    "path": "../public/assets/js/countdown.js"
  },
  "/assets/js/demo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a8c6-2RQ5iWzUMWEYCCaaftIHpmHZ4ss\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 108742,
    "path": "../public/assets/js/demo.js"
  },
  "/assets/js/gsap.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"116d8-nXR3+f0D8boWxkVMLap7uIAWA0I\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 71384,
    "path": "../public/assets/js/gsap.min.js"
  },
  "/assets/js/hscroll.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"259-VG6e+FKbrcZSciAfdv4pFx+prso\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 601,
    "path": "../public/assets/js/hscroll.js"
  },
  "/assets/js/imagesloaded.pkgd.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1547-bgFCCIki8JtmbXJdg/UyWPYKzOE\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 5447,
    "path": "../public/assets/js/imagesloaded.pkgd.min.js"
  },
  "/assets/js/isotope.pkgd.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8a80-FMf1nnPSqZqmiMJEOpqbJKy/9Dw\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 35456,
    "path": "../public/assets/js/isotope.pkgd.min.js"
  },
  "/assets/js/map.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f16-IQeKxBR27To+sQYDVUXeZL0xz8E\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 3862,
    "path": "../public/assets/js/map.js"
  },
  "/assets/js/parallax.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2486-j84+ubRMUHHtxGcdkhMpcrcFv+o\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 9350,
    "path": "../public/assets/js/parallax.min.js"
  },
  "/assets/js/plugins.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f37-FUE3/qFk/Wgy21uNy8iNo9wJPKY\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 16183,
    "path": "../public/assets/js/plugins.js"
  },
  "/assets/js/scripts.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7b-49u5gOHWyfDnqoaiMwC+ChwEOYU\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 123,
    "path": "../public/assets/js/scripts.js"
  },
  "/assets/js/ScrollSmoother.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f9c-eFL7pS4SZ21OtkNgMsF+MwLumrM\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 12188,
    "path": "../public/assets/js/ScrollSmoother.min.js"
  },
  "/assets/js/ScrollTrigger.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a169-AuMgdWb0+tY65QmLLJQZJ+wPbX0\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 41321,
    "path": "../public/assets/js/ScrollTrigger.min.js"
  },
  "/assets/js/smoother-script.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f5-z7i4oeqKRx3TFUWnLYonzk1Iby8\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 245,
    "path": "../public/assets/js/smoother-script.js"
  },
  "/assets/js/TweenMax.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c4c9-aGKZeOrxYX1XkCSTP4ZKtU7lJ3Q\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 115913,
    "path": "../public/assets/js/TweenMax.min.js"
  },
  "/assets/js/wow.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24d9-TMQEPAlbVduqCjrFxSH9gdI3LeE\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 9433,
    "path": "../public/assets/js/wow.min.js"
  },
  "/assets/scss/style.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"655-owYqnNGTuqUJUUuwpr2X7EkLtg4\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 1621,
    "path": "../public/assets/scss/style.scss"
  },
  "/assets/vid/vid-startup.mp4": {
    "type": "video/mp4",
    "etag": "\"1172c50-TNhfcAVlsSCL11NQtkY7TYLDH4U\"",
    "mtime": "2024-08-04T07:11:38.373Z",
    "size": 18295888,
    "path": "../public/assets/vid/vid-startup.mp4"
  },
  "/landing-preview/css/preview-style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1cf1-rqhh2zxNSte9sBTny7NcBJQ6seE\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 7409,
    "path": "../public/landing-preview/css/preview-style.css"
    "size": 7409,
    "path": "../public/landing-preview/css/preview-style.css"
  },
  "/landing-preview/img/bg.png": {
    "type": "image/png",
    "etag": "\"211ee5-0sszQR8NmFUeR4EiwKJVr0NDM+c\"",
  "/landing-preview/img/bg.png": {
    "type": "image/png",
    "etag": "\"211ee5-0sszQR8NmFUeR4EiwKJVr0NDM+c\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 2170597,
    "path": "../public/landing-preview/img/bg.png"
    "size": 2170597,
    "path": "../public/landing-preview/img/bg.png"
  },
  "/landing-preview/img/star.svg": {
    "type": "image/svg+xml",
    "etag": "\"24e-LL5SLblgGRgqEs5xhswWYV1KBSc\"",
  "/landing-preview/img/star.svg": {
    "type": "image/svg+xml",
    "etag": "\"24e-LL5SLblgGRgqEs5xhswWYV1KBSc\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 590,
    "path": "../public/landing-preview/img/star.svg"
    "size": 590,
    "path": "../public/landing-preview/img/star.svg"
  },
  "/landing-preview/js/demo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"488-x1aWMngG6D62QGfisIGd6OFr84A\"",
  "/landing-preview/js/demo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"488-x1aWMngG6D62QGfisIGd6OFr84A\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 1160,
    "path": "../public/landing-preview/js/demo.js"
    "size": 1160,
    "path": "../public/landing-preview/js/demo.js"
  },
  "/landing-preview/js/parallax.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2486-j84+ubRMUHHtxGcdkhMpcrcFv+o\"",
  "/landing-preview/js/parallax.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2486-j84+ubRMUHHtxGcdkhMpcrcFv+o\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 9350,
    "path": "../public/landing-preview/js/parallax.min.js"
    "size": 9350,
    "path": "../public/landing-preview/js/parallax.min.js"
  },
  "/landing-preview/scss/preview-style.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"14f5-DEvhpXy2rQmEozHLQTcfgcT8dug\"",
  "/landing-preview/scss/preview-style.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"14f5-DEvhpXy2rQmEozHLQTcfgcT8dug\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 5365,
    "path": "../public/landing-preview/scss/preview-style.scss"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-tyuUd9a3sUhghXVr/A33MRk50Us\"",
    "mtime": "2024-08-04T07:34:46.550Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/assets/css/plugins/animate.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4242-Hm0B96sph8sp+OEfL7rjHy5K2Mg\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 16962,
    "path": "../public/assets/css/plugins/animate.min.css"
  },
  "/assets/css/plugins/animsition.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6b5c-up9cMS6StzeFN5L0Y+jyulNVGYM\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 27484,
    "path": "../public/assets/css/plugins/animsition.min.css"
  },
  "/assets/css/plugins/bootstrap.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"27bd2-3dyXWyoggVItkIvVtwwl4Q+Heh0\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 162770,
    "path": "../public/assets/css/plugins/bootstrap.min.css"
  },
  "/assets/css/plugins/flaticon.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5f8-xNnzacuLi7sUX41+zSVsMyq9VR0\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 1528,
    "path": "../public/assets/css/plugins/flaticon.css"
  },
  "/assets/css/plugins/fontawesome-all.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e7ae-hZOVyxc4Ub1sFKrs24XS1Gy87Lk\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 59310,
    "path": "../public/assets/css/plugins/fontawesome-all.min.css"
  },
  "/assets/css/plugins/ionicons.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c86e-w6F91Xd6+fxgajjH41LYQqX4qGs\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 51310,
    "path": "../public/assets/css/plugins/ionicons.min.css"
  },
  "/assets/css/plugins/justifiedGallery.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b7e-H2yzLinC9cyvQmyglKyuNpUBrDE\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2942,
    "path": "../public/assets/css/plugins/justifiedGallery.min.css"
  },
  "/assets/css/plugins/magnific-popup.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c86-dKQTctgzGVt33Z4Wf4LKOVzEcC0\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 7302,
    "path": "../public/assets/css/plugins/magnific-popup.css"
  },
  "/assets/css/plugins/pe-icon-7-stroke.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2895-iY0GgUhQm7uMvONSMor9aVkHD3Q\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 10389,
    "path": "../public/assets/css/plugins/pe-icon-7-stroke.css"
  },
  "/assets/css/plugins/slick-theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b3e-1LISeFpU609H1nFA9rnCAOiOxfk\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2878,
    "path": "../public/assets/css/plugins/slick-theme.css"
  },
  "/assets/css/plugins/slick.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"767-ZObF/5nxTGV1LgMiI0Fg+Og/xsI\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 1895,
    "path": "../public/assets/css/plugins/slick.css"
  },
  "/assets/css/plugins/swiper.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"356e-XA17g5scW6uVedYW7kI3cSJq43M\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 13678,
    "path": "../public/assets/css/plugins/swiper.min.css"
  },
  "/assets/css/plugins/YouTubePopUp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c66-s0kjbNRPb62IfQL3QYPbDb78zbM\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 3174,
    "path": "../public/assets/css/plugins/YouTubePopUp.css"
  },
  "/assets/css/layout/_awards.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3cc-mxXgnVQJ4u3dEVHVstDOnBCpvfQ\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 972,
    "path": "../public/assets/css/layout/_awards.css"
  },
  "/assets/css/layout/_brand.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b97-qtaFw6J+/c7mJO/JUm9YyYY7tsQ\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2967,
    "path": "../public/assets/css/layout/_brand.css"
  },
  "/assets/css/layout/_footer.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c6-cULNPFYyo62ddNWJq95nkbtetmY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 966,
    "path": "../public/assets/css/layout/_footer.css"
  },
  "/assets/css/layout/_header.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8a4-18MoeaqHW8WSDGoObH1xcqhYbGs\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2212,
    "path": "../public/assets/css/layout/_header.css"
  },
  "/assets/css/layout/_price.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b2-EF7wnu7O81VPAplmY09qUxFYYrM\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 178,
    "path": "../public/assets/css/layout/_price.css"
  },
  "/assets/css/layout/_slider.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"51-+6ewflQivvlOpCjbo7dkyXypAFY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 81,
    "path": "../public/assets/css/layout/_slider.css"
  },
  "/assets/css/layout/_video.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"219-CyrX6elSQtRom6CYoeZhCAUq8SE\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 537,
    "path": "../public/assets/css/layout/_video.css"
  },
  "/assets/css/components/_cursor.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"174b-1RQGpa6btJGK/fO9iLTpZDdlFyo\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 5963,
    "path": "../public/assets/css/components/_cursor.css"
  },
  "/assets/css/components/_helper.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f4a-jNDNb6soGKhdfsWyE9lwSVuJ2zU\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 20298,
    "path": "../public/assets/css/components/_helper.css"
  },
  "/assets/css/components/_overlay.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"86d-LyOkIH8AKm43UFNBwKvDMaJyUWU\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2157,
    "path": "../public/assets/css/components/_overlay.css"
  },
  "/assets/css/utility/_variables.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"53-Oi+mr+U7pLYYSTOyW5RloUprT8c\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 83,
    "path": "../public/assets/css/utility/_variables.css"
  },
  "/assets/imgs/brands/01.png": {
    "type": "image/png",
    "etag": "\"8ff-FQmbqwTR9BpzifmeDt6uZRCR4Ew\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 2303,
    "path": "../public/assets/imgs/brands/01.png"
  },
  "/assets/imgs/brands/02.png": {
    "type": "image/png",
    "etag": "\"483-SsOg2ugPPX7nu1O0sce61LWN8CA\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 1155,
    "path": "../public/assets/imgs/brands/02.png"
  },
  "/assets/imgs/brands/03.png": {
    "type": "image/png",
    "etag": "\"417-rQDvRHawYEdWs1nGt1K4owj3WYk\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 1047,
    "path": "../public/assets/imgs/brands/03.png"
  },
  "/assets/imgs/brands/04.png": {
    "type": "image/png",
    "etag": "\"cbf-9wrKA2Uc4+Mk7l/vVlLV3YB3e2Q\"",
    "mtime": "2024-07-01T06:41:54.000Z",
    "size": 3263,
    "path": "../public/assets/imgs/brands/04.png"
  },
  "/assets/imgs/brands/05.png": {
    "type": "image/png",
    "etag": "\"6e0-NPS6GUrVb0tOXsCcUs3NfK2rGXo\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 1760,
    "path": "../public/assets/imgs/brands/05.png"
  },
  "/assets/imgs/brands/06.png": {
    "type": "image/png",
    "etag": "\"5b2-nJEm8I+XnboH6Jg/c7teMxpnp9w\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 1458,
    "path": "../public/assets/imgs/brands/06.png"
  },
  "/assets/imgs/brands/07.png": {
    "type": "image/png",
    "etag": "\"148b-rZqJYOgoZViEbt3GqgOuDoyjaBM\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 5259,
    "path": "../public/assets/imgs/brands/07.png"
  },
  "/assets/imgs/brands/08.png": {
    "type": "image/png",
    "etag": "\"1446-qvT0PfptA4j4d7ZrNhfRlP0R9bc\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 5190,
    "path": "../public/assets/imgs/brands/08.png"
  },
  "/assets/imgs/serv-icons/0.png": {
    "type": "image/png",
    "etag": "\"4992-rjG7zC7HYcO32SHilCobi1UCiPc\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 18834,
    "path": "../public/assets/imgs/serv-icons/0.png"
  },
  "/assets/imgs/serv-icons/01-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"718-OvDlr31sCLGPDROk7tOUGKu5PT8\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 1816,
    "path": "../public/assets/imgs/serv-icons/01-dark.svg"
  },
  "/assets/imgs/serv-icons/02-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"509-zv4j32NoOIn8FKjayfZkmo/eUkY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 1289,
    "path": "../public/assets/imgs/serv-icons/02-dark.svg"
  },
  "/assets/imgs/serv-icons/03-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a08-BpCXdgo6wX61vBp/DRfk87nfxzE\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2568,
    "path": "../public/assets/imgs/serv-icons/03-dark.svg"
  },
  "/assets/imgs/serv-icons/04-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"4af-s50pL/+gnFJaGqIcjv1i0u2C82A\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 1199,
    "path": "../public/assets/imgs/serv-icons/04-dark.svg"
  },
  "/assets/imgs/serv-icons/05-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a5f-nRBJ+zYCL+T76vCfVew7mP7rDxw\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2655,
    "path": "../public/assets/imgs/serv-icons/05-dark.svg"
  },
  "/assets/imgs/serv-icons/1.png": {
    "type": "image/png",
    "etag": "\"527d-hM0YDIG4q9Is+9j/J/uMetti4Lw\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21117,
    "path": "../public/assets/imgs/serv-icons/1.png"
  },
  "/assets/imgs/serv-icons/2.png": {
    "type": "image/png",
    "etag": "\"4085-f7p5Mp3Zexl48+CBLyR86W9DhUg\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 16517,
    "path": "../public/assets/imgs/serv-icons/2.png"
  },
  "/assets/imgs/svg-assets/arrow-right-top.svg": {
    "type": "image/svg+xml",
    "etag": "\"10f-oNY5V80gUP89ZLlbwyQfbPQhUVo\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 271,
    "path": "../public/assets/imgs/svg-assets/arrow-right-top.svg"
  },
  "/assets/imgs/svg-assets/arrow-top-right.svg": {
    "type": "image/svg+xml",
    "etag": "\"319-ht1xSLjA+rAX8Tfj1D7lqQVo7UE\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 793,
    "path": "../public/assets/imgs/svg-assets/arrow-top-right.svg"
  },
  "/assets/imgs/svg-assets/circle-star.svg": {
    "type": "image/svg+xml",
    "etag": "\"991-n4ITN738mTl1qrgStTk+lC2NCzk\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2449,
    "path": "../public/assets/imgs/svg-assets/circle-star.svg"
  },
  "/assets/imgs/svg-assets/claw.svg": {
    "type": "image/svg+xml",
    "etag": "\"7f6-O84zZ4hPRvNmA+EHkvv12JZIFuA\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2038,
    "path": "../public/assets/imgs/svg-assets/claw.svg"
  },
  "/assets/imgs/svg-assets/hi.png": {
    "type": "image/png",
    "etag": "\"5160-uWpFQIo+LyTgy0fEJIns2v4K5+0\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 20832,
    "path": "../public/assets/imgs/svg-assets/hi.png"
  },
  "/assets/imgs/svg-assets/quote.png": {
    "type": "image/png",
    "etag": "\"12e4-he8tLzEo2Bojz75lszsBsz4Wcxo\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 4836,
    "path": "../public/assets/imgs/svg-assets/quote.png"
  },
  "/assets/imgs/team/t1.jpg": {
    "type": "image/jpeg",
    "etag": "\"d586-47fPSCZMnBgj5j+NP994PN/J7tY\"",
    "mtime": "2024-07-26T05:50:40.687Z",
    "size": 54662,
    "path": "../public/assets/imgs/team/t1.jpg"
  },
  "/assets/imgs/team/t2.jpg": {
    "type": "image/jpeg",
    "etag": "\"ec1c-2xuhlVo9BexPGZAzMownmWYRpxQ\"",
    "mtime": "2024-07-26T05:50:40.687Z",
    "size": 60444,
    "path": "../public/assets/imgs/team/t2.jpg"
  },
  "/assets/imgs/team/t3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e3a5-ADXPXmuz9WwhoM+M3GrrpCs4yA4\"",
    "mtime": "2024-07-01T10:13:26.000Z",
    "size": 123813,
    "path": "../public/assets/imgs/team/t3.jpg"
  },
  "/assets/imgs/team/t4.jpg": {
    "type": "image/jpeg",
    "etag": "\"10816-/sMEDQ69rwQ+yGsnRw47OLcy8hg\"",
    "mtime": "2024-07-01T12:05:40.000Z",
    "size": 67606,
    "path": "../public/assets/imgs/team/t4.jpg"
  },
  "/assets/fonts/mona-sans/Mona-Sans-Black.woff": {
    "type": "font/woff",
    "etag": "\"4c18-SoqgKVe5YlCm1FZsAjbaCINvlcw\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 19480,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-Black.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-BlackItalic.woff": {
    "type": "font/woff",
    "etag": "\"5190-95g4Xpo6kTat4DGomMnp9cCisKs\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 20880,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-BlackItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-BlackNarrow.woff": {
    "type": "font/woff",
    "etag": "\"4f88-1UFZCiMbtIHU90fCaJxW9eErqYY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 20360,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-BlackNarrow.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-BlackNarrowItalic.woff": {
    "type": "font/woff",
    "etag": "\"5ad0-Rh0h1TsOKTvEs2tBeM1KkHVfgxU\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 23248,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-BlackNarrowItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-BlackWide.woff": {
    "type": "font/woff",
    "etag": "\"510c-Nkp5SH+w5ZatpYcmbrWHSMH4gE8\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 20748,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-BlackWide.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-BlackWideItalic.woff": {
    "type": "font/woff",
    "etag": "\"566c-8UYli170i5c3i9wARBXHyIKWZcI\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 22124,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-BlackWideItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-Bold.woff": {
    "type": "font/woff",
    "etag": "\"4dd8-xW50qzwziIPgy0f1veBtIp1Olbc\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 19928,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-Bold.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-BoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"543c-fLNsqFdUIALj/4r4wisTXfo4zQU\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21564,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-BoldItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-BoldNarrow.woff": {
    "type": "font/woff",
    "etag": "\"524c-YInNykzsiU/IQ2D6rUC05hHD06M\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21068,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-BoldNarrow.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-BoldNarrowItalic.woff": {
    "type": "font/woff",
    "etag": "\"5db8-Tp0MSYur0Jk2x6tXl1jNjRT9xWs\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 23992,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-BoldNarrowItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-BoldWide.woff": {
    "type": "font/woff",
    "etag": "\"55fc-+G+55wh4HZ1/yTTvgv5D7OlLgQ8\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 22012,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-BoldWide.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-BoldWideItalic.woff": {
    "type": "font/woff",
    "etag": "\"5bd0-cMaZaxkqWkHfFB+RETYI99awAzA\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 23504,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-BoldWideItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-ExtraBold.woff": {
    "type": "font/woff",
    "etag": "\"4dfc-o0CIhMnksyEnZYr2fazBGNJRwcA\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 19964,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-ExtraBold.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-ExtraBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"53bc-SQo0oVWxGgz9qqaRWoiymbFYwRo\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21436,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-ExtraBoldItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-ExtraBoldNarrow.woff": {
    "type": "font/woff",
    "etag": "\"5234-c3gS5JH7cSxhektCVD50fUY3rSk\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21044,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-ExtraBoldNarrow.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-ExtraBoldNarrowItalic.woff": {
    "type": "font/woff",
    "etag": "\"5d94-tS2FHqfWEX31yeNm4O/uLWozQlQ\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 23956,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-ExtraBoldNarrowItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-ExtraBoldWide.woff": {
    "type": "font/woff",
    "etag": "\"55cc-cM/NByXJbTln7rqA9piojOeLH2Q\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21964,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-ExtraBoldWide.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-ExtraBoldWideItalic.woff": {
    "type": "font/woff",
    "etag": "\"5b64-kHFJDK/2poUB/M25wxHjx2Rj6jE\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 23396,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-ExtraBoldWideItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-Light.woff": {
    "type": "font/woff",
    "etag": "\"4e18-GS0FBRhIwD7bH5rD/chreZYp7O0\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 19992,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-Light.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-LightItalic.woff": {
    "type": "font/woff",
    "etag": "\"53bc-xGCtXejjozyGU/fFL5dLtyCQ2m8\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21436,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-LightItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-LightNarrow.woff": {
    "type": "font/woff",
    "etag": "\"51d4-H+itnenaZTpBsasjBwqbZHExSBM\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 20948,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-LightNarrow.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-LightNarrowItalic.woff": {
    "type": "font/woff",
    "etag": "\"5e3c-qHJmW9IF1QMJelpo+BWtH2ArvgA\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 24124,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-LightNarrowItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-LightWide.woff": {
    "type": "font/woff",
    "etag": "\"55c4-OMe308l3j+dRCoGk5scjnqZAjbA\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21956,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-LightWide.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-LightWideItalic.woff": {
    "type": "font/woff",
    "etag": "\"5b98-Bve1jTCh5/0MV/QeKwAIO+vzmp4\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 23448,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-LightWideItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-Medium.woff": {
    "type": "font/woff",
    "etag": "\"4de4-Jtn+NTCxmHOXeKKPGcbOB4FyUiM\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 19940,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-Medium.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-MediumItalic.woff": {
    "type": "font/woff",
    "etag": "\"5404-DKWXWeKfSyu+RtCcCA85R1E56Z4\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21508,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-MediumItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-MediumNarrow.woff": {
    "type": "font/woff",
    "etag": "\"5298-nnIMoIkX8XCF3INWic46Tgdn4k0\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21144,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-MediumNarrow.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-MediumNarrowItalic.woff": {
    "type": "font/woff",
    "etag": "\"5dd0-x31GfbSP6fZz/aOdgTOdgauEgww\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 24016,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-MediumNarrowItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-MediumWide.woff": {
    "type": "font/woff",
    "etag": "\"55fc-DpEUvdXxXFEwccyZXGYIddo7cSE\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 22012,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-MediumWide.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-MediumWideItalic.woff": {
    "type": "font/woff",
    "etag": "\"5bcc-tpM4Avuz1nve1j3I1Aa/D6XGHAo\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 23500,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-MediumWideItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-Regular.woff": {
    "type": "font/woff",
    "etag": "\"4e28-/Sw5gFvbcikw5rV9OGnx+Ny44Ms\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 20008,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-Regular.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-RegularItalic.woff": {
    "type": "font/woff",
    "etag": "\"5428-lNtB9G+cSHAx0+eMnd/Oh+hI7ws\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21544,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-RegularItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-RegularNarrow.woff": {
    "type": "font/woff",
    "etag": "\"5258-h8Onc4biKMLa7J/cOAIIumx+lis\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21080,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-RegularNarrow.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-RegularNarrowItalic.woff": {
    "type": "font/woff",
    "etag": "\"5e30-7Ce5+Vagl0cH02mES9OzAXzB7yM\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 24112,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-RegularNarrowItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-RegularWide.woff": {
    "type": "font/woff",
    "etag": "\"562c-Y17AGzTee4rdRhVVSl95lel+DE8\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 22060,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-RegularWide.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-RegularWideItalic.woff": {
    "type": "font/woff",
    "etag": "\"5c00-mlyznB/96MbqrVz8gK8Asx/YduU\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 23552,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-RegularWideItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"4e18-xDXihxguCSHZZsQpeeXWt5gxJdY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 19992,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-SemiBold.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-SemiBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"53e8-sMD/A9mnhMeo9x52jTMaWskP8YU\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21480,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-SemiBoldItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-SemiBoldNarrow.woff": {
    "type": "font/woff",
    "etag": "\"5270-02vhqTXkOA4VYJ1+2xvl/qPCrLg\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21104,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-SemiBoldNarrow.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-SemiBoldNarrowItalic.woff": {
    "type": "font/woff",
    "etag": "\"5e38-jQ102zmFqplc2PoW3hjRGJl+poo\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 24120,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-SemiBoldNarrowItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-SemiBoldWide.woff": {
    "type": "font/woff",
    "etag": "\"5624-7mllkEuIWTt3RiY9qG5GR+fMmRg\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 22052,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-SemiBoldWide.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-SemiBoldWideItalic.woff": {
    "type": "font/woff",
    "etag": "\"5bb0-mGgUu+KgXQoic914dDhd6xlU8Ko\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 23472,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-SemiBoldWideItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-UltraLight.woff": {
    "type": "font/woff",
    "etag": "\"4c30-/G9WG1hKXXU5/FTd/lcNrRClI4U\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 19504,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-UltraLight.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-UltraLightItalic.woff": {
    "type": "font/woff",
    "etag": "\"5220-qv4hJv8wN39sdIXSh5CTMhgOg7Q\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21024,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-UltraLightItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-UltraLightNarrow.woff": {
    "type": "font/woff",
    "etag": "\"4da0-O2QaqVd5ktHzyK6m00Cwfn6lqQQ\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 19872,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-UltraLightNarrow.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-UltraLightNarrowItalic.woff": {
    "type": "font/woff",
    "etag": "\"574c-cKm1P5ktKbwdYuC4d1MAw2+TDa0\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 22348,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-UltraLightNarrowItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-UltraLightWide.woff": {
    "type": "font/woff",
    "etag": "\"5408-BwEhOFHdAFFJVGmtUtRAGvezQsY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21512,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-UltraLightWide.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans-UltraLightWideItalic.woff": {
    "type": "font/woff",
    "etag": "\"5938-CH7TOK4EfzT/0EHC72krHVMLabQ\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 22840,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans-UltraLightWideItalic.woff"
  },
  "/assets/fonts/mona-sans/Mona-Sans.woff": {
    "type": "font/woff",
    "etag": "\"26890-4zBwuwBIfC9n+4Vbxgk7gqYoIzk\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 157840,
    "path": "../public/assets/fonts/mona-sans/Mona-Sans.woff"
  },
  "/assets/fonts/mona-sans/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b9e-4NywY8Jte1xQWbSCqyk/vfss2PY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 11166,
    "path": "../public/assets/fonts/mona-sans/style.css"
  },
  "/assets/imgs/brands/01.png": {
    "type": "image/png",
    "etag": "\"8ff-FQmbqwTR9BpzifmeDt6uZRCR4Ew\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 2303,
    "path": "../public/assets/imgs/brands/01.png"
  },
  "/assets/imgs/brands/02.png": {
    "type": "image/png",
    "etag": "\"483-SsOg2ugPPX7nu1O0sce61LWN8CA\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 1155,
    "path": "../public/assets/imgs/brands/02.png"
  },
  "/assets/imgs/brands/03.png": {
    "type": "image/png",
    "etag": "\"417-rQDvRHawYEdWs1nGt1K4owj3WYk\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 1047,
    "path": "../public/assets/imgs/brands/03.png"
  },
  "/assets/imgs/brands/04.png": {
    "type": "image/png",
    "etag": "\"cbf-9wrKA2Uc4+Mk7l/vVlLV3YB3e2Q\"",
    "mtime": "2024-07-01T06:41:54.000Z",
    "size": 3263,
    "path": "../public/assets/imgs/brands/04.png"
  },
  "/assets/imgs/brands/05.png": {
    "type": "image/png",
    "etag": "\"6e0-NPS6GUrVb0tOXsCcUs3NfK2rGXo\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 1760,
    "path": "../public/assets/imgs/brands/05.png"
  },
  "/assets/imgs/brands/06.png": {
    "type": "image/png",
    "etag": "\"5b2-nJEm8I+XnboH6Jg/c7teMxpnp9w\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 1458,
    "path": "../public/assets/imgs/brands/06.png"
  },
  "/assets/imgs/brands/07.png": {
    "type": "image/png",
    "etag": "\"148b-rZqJYOgoZViEbt3GqgOuDoyjaBM\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 5259,
    "path": "../public/assets/imgs/brands/07.png"
  },
  "/assets/imgs/brands/08.png": {
    "type": "image/png",
    "etag": "\"1446-qvT0PfptA4j4d7ZrNhfRlP0R9bc\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 5190,
    "path": "../public/assets/imgs/brands/08.png"
  },
  "/assets/imgs/brands/09.png": {
    "type": "image/png",
    "etag": "\"4e5-NlxJcI9+T7y8aUkNfGDIEEXHoD0\"",
    "mtime": "2024-07-01T06:41:56.000Z",
    "size": 1253,
    "path": "../public/assets/imgs/brands/09.png"
  },
  "/assets/imgs/brands/10.png": {
    "type": "image/png",
    "etag": "\"aae-uhY3VlTeogj0nJlxYfYE2VDBMgM\"",
    "mtime": "2024-07-01T06:41:54.000Z",
    "size": 2734,
    "path": "../public/assets/imgs/brands/10.png"
  },
  "/assets/imgs/brands/11.png": {
    "type": "image/png",
    "etag": "\"422-m8mQaQVtOga0TLMNItI5kDogJEg\"",
    "mtime": "2024-07-01T06:41:54.000Z",
    "size": 1058,
    "path": "../public/assets/imgs/brands/11.png"
  },
  "/assets/imgs/brands/12.png": {
    "type": "image/png",
    "etag": "\"c79-/aW/rtgBAJGq/1uLMUd2+hSYV9w\"",
    "mtime": "2024-07-01T06:41:54.000Z",
    "size": 3193,
    "path": "../public/assets/imgs/brands/12.png"
  },
  "/assets/imgs/brands/13.png": {
    "type": "image/png",
    "etag": "\"800-qMOT0q7HhM1t2ggIemcPITROhZo\"",
    "mtime": "2024-07-01T06:41:54.000Z",
    "size": 2048,
    "path": "../public/assets/imgs/brands/13.png"
  },
  "/assets/imgs/blog/author1.jpg": {
    "type": "image/jpeg",
    "etag": "\"ee5e-+ioEY8lkr7MyseGX9ldCOUi0eCg\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 61022,
    "path": "../public/assets/imgs/blog/author1.jpg"
  },
  "/assets/imgs/blog/b1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1da9a-uQ26d+jZ8Xas+PLWZ4lsNwt67g0\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 121498,
    "path": "../public/assets/imgs/blog/b1.jpg"
  },
  "/assets/imgs/blog/b2.jpg": {
    "type": "image/jpeg",
    "etag": "\"b985-vGDaBE71ngwNLuSVlr64YpdJMZU\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 47493,
    "path": "../public/assets/imgs/blog/b2.jpg"
  },
  "/assets/imgs/blog/b3.jpg": {
    "type": "image/jpeg",
    "etag": "\"3392c-PieNzkN631TB4qlujLzz21AqXhI\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 211244,
    "path": "../public/assets/imgs/blog/b3.jpg"
  },
  "/assets/imgs/blog/b4.jpg": {
    "type": "image/jpeg",
    "etag": "\"2f7e9-tIwnpX3M6H3/lTPqKDcXUKD+u88\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 194537,
    "path": "../public/assets/imgs/blog/b4.jpg"
  },
  "/assets/imgs/blog/b5.jpg": {
    "type": "image/jpeg",
    "etag": "\"382c1-V31/47OLtfFMlFi9TiFo4xpLnsY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 230081,
    "path": "../public/assets/imgs/blog/b5.jpg"
  },
  "/assets/imgs/blog/b6.jpg": {
    "type": "image/jpeg",
    "etag": "\"d3e87-blQI4ZGe/u29LaVmNs/piFNxDUw\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 867975,
    "path": "../public/assets/imgs/blog/b6.jpg"
  },
  "/assets/imgs/blog/b7.jpg": {
    "type": "image/jpeg",
    "etag": "\"5acdc-jgrasKJZxWzQoMrz97O8lPbMIBQ\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 371932,
    "path": "../public/assets/imgs/blog/b7.jpg"
  },
  "/assets/imgs/blog/f1.jpg": {
    "type": "image/jpeg",
    "etag": "\"44440-gWV8Yc9G54NZM0GjHZV32xuJShQ\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 279616,
    "path": "../public/assets/imgs/blog/f1.jpg"
  },
  "/assets/imgs/serv-icons/0.png": {
    "type": "image/png",
    "etag": "\"4992-rjG7zC7HYcO32SHilCobi1UCiPc\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 18834,
    "path": "../public/assets/imgs/serv-icons/0.png"
  },
  "/assets/imgs/serv-icons/01-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"718-OvDlr31sCLGPDROk7tOUGKu5PT8\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 1816,
    "path": "../public/assets/imgs/serv-icons/01-dark.svg"
  },
  "/assets/imgs/serv-icons/02-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"509-zv4j32NoOIn8FKjayfZkmo/eUkY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 1289,
    "path": "../public/assets/imgs/serv-icons/02-dark.svg"
  },
  "/assets/imgs/serv-icons/03-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a08-BpCXdgo6wX61vBp/DRfk87nfxzE\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2568,
    "path": "../public/assets/imgs/serv-icons/03-dark.svg"
  },
  "/assets/imgs/serv-icons/04-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"4af-s50pL/+gnFJaGqIcjv1i0u2C82A\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 1199,
    "path": "../public/assets/imgs/serv-icons/04-dark.svg"
  },
  "/assets/imgs/serv-icons/05-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a5f-nRBJ+zYCL+T76vCfVew7mP7rDxw\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2655,
    "path": "../public/assets/imgs/serv-icons/05-dark.svg"
  },
  "/assets/imgs/serv-icons/1.png": {
    "type": "image/png",
    "etag": "\"527d-hM0YDIG4q9Is+9j/J/uMetti4Lw\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 21117,
    "path": "../public/assets/imgs/serv-icons/1.png"
  },
  "/assets/imgs/serv-icons/2.png": {
    "type": "image/png",
    "etag": "\"4085-f7p5Mp3Zexl48+CBLyR86W9DhUg\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 16517,
    "path": "../public/assets/imgs/serv-icons/2.png"
  },
  "/assets/imgs/svg-assets/arrow-right-top.svg": {
    "type": "image/svg+xml",
    "etag": "\"10f-oNY5V80gUP89ZLlbwyQfbPQhUVo\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 271,
    "path": "../public/assets/imgs/svg-assets/arrow-right-top.svg"
  },
  "/assets/imgs/svg-assets/arrow-top-right.svg": {
    "type": "image/svg+xml",
    "etag": "\"319-ht1xSLjA+rAX8Tfj1D7lqQVo7UE\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 793,
    "path": "../public/assets/imgs/svg-assets/arrow-top-right.svg"
  },
  "/assets/imgs/svg-assets/circle-star.svg": {
    "type": "image/svg+xml",
    "etag": "\"991-n4ITN738mTl1qrgStTk+lC2NCzk\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2449,
    "path": "../public/assets/imgs/svg-assets/circle-star.svg"
  },
  "/assets/imgs/svg-assets/claw.svg": {
    "type": "image/svg+xml",
    "etag": "\"7f6-O84zZ4hPRvNmA+EHkvv12JZIFuA\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 2038,
    "path": "../public/assets/imgs/svg-assets/claw.svg"
  },
  "/assets/imgs/svg-assets/hi.png": {
    "type": "image/png",
    "etag": "\"5160-uWpFQIo+LyTgy0fEJIns2v4K5+0\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 20832,
    "path": "../public/assets/imgs/svg-assets/hi.png"
  },
  "/assets/imgs/svg-assets/quote.png": {
    "type": "image/png",
    "etag": "\"12e4-he8tLzEo2Bojz75lszsBsz4Wcxo\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 4836,
    "path": "../public/assets/imgs/svg-assets/quote.png"
  },
  "/assets/imgs/team/t1.jpg": {
    "type": "image/jpeg",
    "etag": "\"13171-d/mOoSTUBMKbxFIUt8ylvEmgdz4\"",
    "mtime": "2024-07-13T17:02:46.000Z",
    "size": 78193,
    "path": "../public/assets/imgs/team/t1.jpg"
  },
  "/assets/imgs/team/t2.jpeg": {
    "type": "image/jpeg",
    "etag": "\"deb9-ifcE1nH+txOlR0YkLnBJ2lCp3Go\"",
    "mtime": "2024-08-04T07:14:34.813Z",
    "size": 57017,
    "path": "../public/assets/imgs/team/t2.jpeg"
  },
  "/assets/imgs/team/t3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e3a5-ADXPXmuz9WwhoM+M3GrrpCs4yA4\"",
    "mtime": "2024-07-01T10:13:26.000Z",
    "size": 123813,
    "path": "../public/assets/imgs/team/t3.jpg"
  },
  "/assets/imgs/team/t4.jpg": {
    "type": "image/jpeg",
    "etag": "\"10816-/sMEDQ69rwQ+yGsnRw47OLcy8hg\"",
    "mtime": "2024-07-01T12:05:40.000Z",
    "size": 67606,
    "path": "../public/assets/imgs/team/t4.jpg"
  },
  "/assets/imgs/team/t5.jpg": {
    "type": "image/jpeg",
    "etag": "\"d586-47fPSCZMnBgj5j+NP994PN/J7tY\"",
    "mtime": "2024-07-01T10:13:28.000Z",
    "size": 54662,
    "path": "../public/assets/imgs/team/t5.jpg"
  },
  "/assets/scss/components/_buttons.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"f4a-ZR8UhJxS9z2u5XRdcmnX0x+6yAU\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 3914,
    "path": "../public/assets/scss/components/_buttons.scss"
  },
  "/assets/scss/components/_cursor.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"cbe-fkMQsonMLPneTG/wH/wO/E5LL3g\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 3262,
    "path": "../public/assets/scss/components/_cursor.scss"
  },
  "/assets/scss/components/_extra.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"1adb-DXs22x7OhFb6aDZIwC4qX5jTwDg\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 6875,
    "path": "../public/assets/scss/components/_extra.scss"
  },
  "/assets/scss/components/_helper.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"4eed-2JRm0JtUIOzloENv2oFLsN6frlo\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 20205,
    "path": "../public/assets/scss/components/_helper.scss"
  },
  "/assets/scss/components/_menu.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"2a87-AkMLxJm6AutRfoOpjuJQfYStPiU\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 10887,
    "path": "../public/assets/scss/components/_menu.scss"
  },
  "/assets/scss/components/_modal.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 0,
    "path": "../public/assets/scss/components/_modal.scss"
  },
  "/assets/scss/components/_overlay.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"866-lpx4ovXTKLkv78yyRMxrUXegOLY\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 2150,
    "path": "../public/assets/scss/components/_overlay.scss"
  },
  "/assets/scss/components/_preloader.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"522-9sV7GWUjthxR4waTcijOCMOytfU\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 1314,
    "path": "../public/assets/scss/components/_preloader.scss"
  },
  "/assets/scss/components/_title.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"570-2r0cE4xiP6Bs7IJyAk542ntkRdI\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 1392,
    "path": "../public/assets/scss/components/_title.scss"
  },
  "/assets/scss/components/_typography.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"165d-CrB0k7AD+vffr+I53hgTRZL4Q7o\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 5725,
    "path": "../public/assets/scss/components/_typography.scss"
  },
  "/assets/scss/layout/_about.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"56d-gE8BKMd5CJTbHnAecZKNQJcnKIE\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 1389,
    "path": "../public/assets/scss/layout/_about.scss"
  },
  "/assets/scss/layout/_awards.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"492-C/0UpwMn+93okq2g9FysSIhfzZA\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 1170,
    "path": "../public/assets/scss/layout/_awards.scss"
  },
  "/assets/scss/layout/_blog.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"1c36-3en0n1idgYqOZJnfCuzVLEf9s/8\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 7222,
    "path": "../public/assets/scss/layout/_blog.scss"
  },
  "/assets/scss/layout/_brand.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"53a-86aPfJNqds8gLL2IiAMFy6mwNNg\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 1338,
    "path": "../public/assets/scss/layout/_brand.scss"
  },
  "/assets/scss/layout/_career.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 0,
    "path": "../public/assets/scss/layout/_career.scss"
  },
  "/assets/scss/layout/_clients.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 0,
    "path": "../public/assets/scss/layout/_clients.scss"
  },
  "/assets/scss/layout/_contact.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"719-ucKMVe/Qgvy6JGwXmpgSdpFXgto\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 1817,
    "path": "../public/assets/scss/layout/_contact.scss"
  },
  "/assets/scss/layout/_counter.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"a7-NuXM1qQZwM0F2bv8CILZ8uewMxo\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 167,
    "path": "../public/assets/scss/layout/_counter.scss"
  },
  "/assets/scss/layout/_features.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"a17-5gRUrhZQMPjXJLv0rmQjpwCkyWQ\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 2583,
    "path": "../public/assets/scss/layout/_features.scss"
  },
  "/assets/scss/layout/_footer.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"2ea-NfLetZPxCncAamaYJdBXPNsP+o8\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 746,
    "path": "../public/assets/scss/layout/_footer.scss"
  },
  "/assets/scss/layout/_header.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"f98-FiK776MMJqY/Zv9THmkvRqQvInE\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 3992,
    "path": "../public/assets/scss/layout/_header.scss"
  },
  "/assets/scss/layout/_hero.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"287-/0FLgOmekHLy6FaCYhqhf1Jd93s\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 647,
    "path": "../public/assets/scss/layout/_hero.scss"
  },
  "/assets/scss/layout/_interactive.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"1e40-XTFLyIhz5lX1yuKUfjAaywwnbXI\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 7744,
    "path": "../public/assets/scss/layout/_interactive.scss"
  },
  "/assets/scss/layout/_portfolio.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"14da-VgO6U5/GtOTKpt8c8l6RE8jp+n0\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 5338,
    "path": "../public/assets/scss/layout/_portfolio.scss"
  },
  "/assets/scss/layout/_price.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"3d5-m44URTGDW3/NweUSsWMTCpHG/UY\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 981,
    "path": "../public/assets/scss/layout/_price.scss"
  },
  "/assets/scss/layout/_process.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"53-yEzVD5q0JDNO3L/a+o0+TW6LKWU\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 83,
    "path": "../public/assets/scss/layout/_process.scss"
  },
  "/assets/scss/layout/_services.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"74a-TKWthfvWLDIyraIso8e4n7qQhNs\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 1866,
    "path": "../public/assets/scss/layout/_services.scss"
  },
  "/assets/scss/layout/_slider.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"25a1-JSHh7mcswksBwirWAqhdVsXJw1Y\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 9633,
    "path": "../public/assets/scss/layout/_slider.scss"
  },
  "/assets/scss/layout/_team.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"309-7/2aVJESl1Z7B6J5GAcCRqyIB8o\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 777,
    "path": "../public/assets/scss/layout/_team.scss"
  },
  "/assets/scss/layout/_testimonials.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"535-DyyyCjW9SVHkFceS07ioc/pR8ok\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 1333,
    "path": "../public/assets/scss/layout/_testimonials.scss"
  },
  "/assets/scss/layout/_video.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"1c8-9GJWWndTvYjGFQ6HQ7GGclE515g\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 456,
    "path": "../public/assets/scss/layout/_video.scss"
  },
  "/assets/scss/utility/_animation.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 0,
    "path": "../public/assets/scss/utility/_animation.scss"
  },
  "/assets/scss/utility/_mixin.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 0,
    "path": "../public/assets/scss/utility/_mixin.scss"
  },
  "/assets/scss/utility/_responsive.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"46c9-8uClvnRTU7jFfYp/sunZUYE8vz0\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 18121,
    "path": "../public/assets/scss/utility/_responsive.scss"
  },
  "/assets/scss/utility/_theme-dark.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 0,
    "path": "../public/assets/scss/utility/_theme-dark.scss"
  },
  "/assets/scss/utility/_variables.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"149-r48Sy1/rWSOtKC8qcG53Nwe3Fns\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 329,
    "path": "../public/assets/scss/utility/_variables.scss"
  },
  "/landing-preview/img/demos/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"b3cc-+wyFurka0XVOpRPebiD5lUW4YaM\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 46028,
    "path": "../public/landing-preview/img/demos/1.jpg"
  },
  "/landing-preview/img/demos/10.jpg": {
    "type": "image/jpeg",
    "etag": "\"cf54-T5Tmn3e6ssLaIQX+sK2KCzYjYfM\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 53076,
    "path": "../public/landing-preview/img/demos/10.jpg"
  },
  "/landing-preview/img/demos/11.jpg": {
    "type": "image/jpeg",
    "etag": "\"5769-ixsRfysiE9xfL6lxqXoelAkDCkc\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 22377,
    "path": "../public/landing-preview/img/demos/11.jpg"
  },
  "/landing-preview/img/demos/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"c3cc-RmAw+BugRY5L5s6lBCbcE/OFn28\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 50124,
    "path": "../public/landing-preview/img/demos/12.jpg"
  },
  "/landing-preview/img/demos/13.jpg": {
    "type": "image/jpeg",
    "etag": "\"8ee0-JjjQgysysUIfzO7rxZdpSaTIddA\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 36576,
    "path": "../public/landing-preview/img/demos/13.jpg"
  },
  "/landing-preview/img/demos/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"120f4-30HrMVcOQaChspDeBt88GUWy+/0\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 73972,
    "path": "../public/landing-preview/img/demos/2.jpg"
  },
  "/landing-preview/img/demos/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"c8fe-sRn/puiKaOBM/XXuQtqMSlawodQ\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 51454,
    "path": "../public/landing-preview/img/demos/3.jpg"
  },
  "/landing-preview/img/demos/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"e772-g3qsGy/8VPsfVSJ1c2r/cuJDhpk\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 59250,
    "path": "../public/landing-preview/img/demos/4.jpg"
  },
  "/landing-preview/img/demos/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"18416-0IcQxjR3oxQnwgTY1KWDRvmIe0A\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 99350,
    "path": "../public/landing-preview/img/demos/5.jpg"
  },
  "/landing-preview/img/demos/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"10d5c-Q+yzweGkHGvaoFg9NtjoD/D3OFs\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 68956,
    "path": "../public/landing-preview/img/demos/6.jpg"
  },
  "/landing-preview/img/demos/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1132c-O33d1uSdbt3RT+rP/LlQspYrUmA\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 70444,
    "path": "../public/landing-preview/img/demos/7.jpg"
  },
  "/landing-preview/img/demos/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"166df-6mHRmdOuG5WEVTqE5WJbpVF/dos\"",
    "mtime": "2024-01-26T11:19:58.000Z",
    "size": 91871,
    "path": "../public/landing-preview/img/demos/8.jpg"
  },
  "/landing-preview/img/demos/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"7646-YEoCuKZA3ujMYbpgcqgG41tMQN4\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 30278,
    "path": "../public/landing-preview/img/demos/9.jpg"
  },
  "/landing-preview/img/demos/h1.jpg": {
    "type": "image/jpeg",
    "etag": "\"13d1c-/3rHMN7jj9832Sys8kyVrU0/Dg0\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 81180,
    "path": "../public/landing-preview/img/demos/h1.jpg"
  },
  "/landing-preview/img/demos/h2.jpg": {
    "type": "image/jpeg",
    "etag": "\"eac1-LeC9OWfHh8+kvoja1k2koSWipio\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 60097,
    "path": "../public/landing-preview/img/demos/h2.jpg"
  },
  "/landing-preview/img/demos/h3.jpg": {
    "type": "image/jpeg",
    "etag": "\"ad54-racGGgiluFCDy+CGR/cx97Zpk8M\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 44372,
    "path": "../public/landing-preview/img/demos/h3.jpg"
  },
  "/landing-preview/img/header/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"17f294-s3ayPKArRVDphtO31hH3npSsYcY\"",
    "mtime": "2024-05-31T17:22:50.000Z",
    "size": 1569428,
    "path": "../public/landing-preview/img/header/1.jpg"
  },
  "/landing-preview/img/header/10.jpg": {
    "type": "image/jpeg",
    "etag": "\"7c5a1f-4yCY2ScL7KpqdJrUqfn5910BzSM\"",
    "mtime": "2024-05-31T17:30:24.000Z",
    "size": 8149535,
    "path": "../public/landing-preview/img/header/10.jpg"
  },
  "/landing-preview/img/header/11.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eed2f-+2POtZz4AIwV+Og0nkof1C/3m/s\"",
    "mtime": "2024-05-31T17:29:30.000Z",
    "size": 2026799,
    "path": "../public/landing-preview/img/header/11.jpg"
  },
  "/landing-preview/img/header/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"22660a-szJHNyYDrgWKGsKijuMcKYQFZWE\"",
    "mtime": "2024-05-31T17:29:32.000Z",
    "size": 2254346,
    "path": "../public/landing-preview/img/header/12.jpg"
  },
  "/landing-preview/img/header/13.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e0b59-nhPsBLtJ4BHZQmHg8f3Xbc8p5GU\"",
    "mtime": "2024-05-31T17:29:28.000Z",
    "size": 1968985,
    "path": "../public/landing-preview/img/header/13.jpg"
  },
  "/landing-preview/img/header/14.jpg": {
    "type": "image/jpeg",
    "etag": "\"5295-+r9Q3Kg4GjVzJT2KvwVD+dIvoNw\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 21141,
    "path": "../public/landing-preview/img/header/14.jpg"
  },
  "/landing-preview/img/header/15.jpg": {
    "type": "image/jpeg",
    "etag": "\"c465-/SRRhel6o9nutvZkIYgv6kbFgcY\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 50277,
    "path": "../public/landing-preview/img/header/15.jpg"
  },
  "/landing-preview/img/header/16.jpg": {
    "type": "image/jpeg",
    "etag": "\"10550-n1xvcm/2fMQjAJQx2W1zakDIlbk\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 66896,
    "path": "../public/landing-preview/img/header/16.jpg"
  },
  "/landing-preview/img/header/17.jpg": {
    "type": "image/jpeg",
    "etag": "\"533a-S2ZJGZvSLO5nSYSNiTbwzbmS4wE\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 21306,
    "path": "../public/landing-preview/img/header/17.jpg"
  },
  "/landing-preview/img/header/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"24f65e-lBzSqVJlVvrNM6oi5+iEekhCCfw\"",
    "mtime": "2024-05-31T17:23:18.000Z",
    "size": 2422366,
    "path": "../public/landing-preview/img/header/2.jpg"
  },
  "/landing-preview/img/header/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"20fe3d-Wk07N26mL/h3zp7x6xqxrKAx8uM\"",
    "mtime": "2024-05-31T17:23:18.000Z",
    "size": 2162237,
    "path": "../public/landing-preview/img/header/3.jpg"
  },
  "/landing-preview/img/header/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"16a48f-u4fO8Yje9N61ch/a3DXjZY/nIG8\"",
    "mtime": "2024-05-31T17:23:46.000Z",
    "size": 1483919,
    "path": "../public/landing-preview/img/header/4.jpg"
  },
  "/landing-preview/img/header/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"22aa8f-tW9nufHsS61ZAgQpjQK8R/kiwZA\"",
    "mtime": "2024-05-31T17:24:26.000Z",
    "size": 2271887,
    "path": "../public/landing-preview/img/header/5.jpg"
  },
  "/landing-preview/img/header/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"24bf36-QLlhT+lJ7/NWYl/vL/im7NGyP8w\"",
    "mtime": "2024-05-31T17:24:28.000Z",
    "size": 2408246,
    "path": "../public/landing-preview/img/header/6.jpg"
  },
  "/landing-preview/img/header/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eba78-q5IGCUjk92IEvuJxzsYdsHnaNrE\"",
    "mtime": "2024-05-31T17:24:24.000Z",
    "size": 2013816,
    "path": "../public/landing-preview/img/header/7.jpg"
  },
  "/landing-preview/img/header/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"247538-CCVADpcJqAwxY0lGFwN8eUU4Jbg\"",
    "mtime": "2024-05-31T17:24:30.000Z",
    "size": 2389304,
    "path": "../public/landing-preview/img/header/8.jpg"
  },
  "/landing-preview/img/header/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"83f20-Usu0+UXzwlb/UE3swwcDVEHQFpw\"",
    "mtime": "2024-05-31T17:24:02.000Z",
    "size": 540448,
    "path": "../public/landing-preview/img/header/9.jpg"
  },
  "/landing-preview/img/header/overlay.webp": {
    "type": "image/webp",
    "etag": "\"3a50-jjRkfvEKV+/nr3DIUC870zwe8NA\"",
    "mtime": "2024-01-26T11:20:00.000Z",
    "size": 14928,
    "path": "../public/landing-preview/img/header/overlay.webp"
  },
  "/_nuxt/builds/meta/1b61788e-c638-4d85-bfca-731765fde3c2.json": {
    "type": "application/json",
    "etag": "\"8b-4qEStWEpYqKbDt1kDsAQkzqBmVU\"",
    "mtime": "2024-08-04T07:34:46.550Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/1b61788e-c638-4d85-bfca-731765fde3c2.json"
  },
  "/assets/imgs/works/full/10.jpg": {
    "type": "image/jpeg",
    "etag": "\"2ea8d-WzXHYx03q4oVmeXxtnggaJ6GMmY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 191117,
    "path": "../public/assets/imgs/works/full/10.jpg"
  },
  "/assets/imgs/works/full/11.jpg": {
    "type": "image/jpeg",
    "etag": "\"22660a-szJHNyYDrgWKGsKijuMcKYQFZWE\"",
    "mtime": "2024-05-31T17:29:32.000Z",
    "mtime": "2024-05-31T17:29:32.000Z",
    "size": 2254346,
    "path": "../public/assets/imgs/works/full/11.jpg"
  },
  "/assets/imgs/works/full/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"3224c-o/les8sN+BsPQ4BFxWXdndzcYis\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 205388,
    "path": "../public/assets/imgs/works/full/12.jpg"
  },
  "/assets/imgs/works/full/13.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cce5-O5B9LZKVLlL+uSmIFL0kUDqpv/o\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 117989,
    "path": "../public/assets/imgs/works/full/13.jpg"
  },
  "/assets/imgs/works/full/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"24f65e-lBzSqVJlVvrNM6oi5+iEekhCCfw\"",
    "mtime": "2024-05-31T17:23:18.000Z",
    "mtime": "2024-05-31T17:23:18.000Z",
    "size": 2422366,
    "path": "../public/assets/imgs/works/full/2.jpg"
  },
  "/assets/imgs/works/full/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"83f20-Usu0+UXzwlb/UE3swwcDVEHQFpw\"",
    "mtime": "2024-05-31T17:24:02.000Z",
    "mtime": "2024-05-31T17:24:02.000Z",
    "size": 540448,
    "path": "../public/assets/imgs/works/full/3.jpg"
  },
  "/assets/imgs/works/full/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e0b59-nhPsBLtJ4BHZQmHg8f3Xbc8p5GU\"",
    "mtime": "2024-05-31T17:29:28.000Z",
    "mtime": "2024-05-31T17:29:28.000Z",
    "size": 1968985,
    "path": "../public/assets/imgs/works/full/4.jpg"
  },
  "/assets/imgs/works/full/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"22aa8f-tW9nufHsS61ZAgQpjQK8R/kiwZA\"",
    "mtime": "2024-05-31T17:24:26.000Z",
    "mtime": "2024-05-31T17:24:26.000Z",
    "size": 2271887,
    "path": "../public/assets/imgs/works/full/5.jpg"
  },
  "/assets/imgs/works/full/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eed2f-+2POtZz4AIwV+Og0nkof1C/3m/s\"",
    "mtime": "2024-05-31T17:29:30.000Z",
    "mtime": "2024-05-31T17:29:30.000Z",
    "size": 2026799,
    "path": "../public/assets/imgs/works/full/6.jpg"
  },
  "/assets/imgs/works/full/7.jpeg": {
    "type": "image/jpeg",
    "etag": "\"16ada-LmfBlyPLNbJ7HRVF3sGHu3QENJg\"",
    "mtime": "2024-08-04T07:02:30.612Z",
    "size": 92890,
    "path": "../public/assets/imgs/works/full/7.jpeg"
  },
  "/assets/imgs/works/full/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"247538-CCVADpcJqAwxY0lGFwN8eUU4Jbg\"",
    "mtime": "2024-05-31T17:24:30.000Z",
    "mtime": "2024-05-31T17:24:30.000Z",
    "size": 2389304,
    "path": "../public/assets/imgs/works/full/8.jpg"
  },
  "/assets/imgs/works/full/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"244f4-0Gwf1jma1ez7UszuIDZL/KXjYqk\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 148724,
    "path": "../public/assets/imgs/works/full/9.jpg"
  },
  "/assets/imgs/works/full/vid.mp4": {
    "type": "video/mp4",
    "etag": "\"43c7130-MIVebWPAcgYxWU9kirEleZd/RAI\"",
    "mtime": "2024-06-19T18:17:08.000Z",
    "mtime": "2024-06-19T18:17:08.000Z",
    "size": 71070000,
    "path": "../public/assets/imgs/works/full/vid.mp4"
  },
  "/assets/imgs/works/full/vid.png": {
    "type": "image/png",
    "etag": "\"92ee0-FEKIcd3hvxDq+Dpfk9dFBPayE64\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 601824,
    "path": "../public/assets/imgs/works/full/vid.png"
  },
  "/assets/imgs/works/projects/1/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"22660a-szJHNyYDrgWKGsKijuMcKYQFZWE\"",
    "mtime": "2024-05-31T17:29:32.000Z",
    "mtime": "2024-05-31T17:29:32.000Z",
    "size": 2254346,
    "path": "../public/assets/imgs/works/projects/1/1.jpg"
  },
  "/assets/imgs/works/projects/1/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"24f65e-lBzSqVJlVvrNM6oi5+iEekhCCfw\"",
    "mtime": "2024-05-31T17:23:18.000Z",
    "mtime": "2024-05-31T17:23:18.000Z",
    "size": 2422366,
    "path": "../public/assets/imgs/works/projects/1/2.jpg"
  },
  "/assets/imgs/works/projects/1/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"83f20-Usu0+UXzwlb/UE3swwcDVEHQFpw\"",
    "mtime": "2024-05-31T17:24:02.000Z",
    "mtime": "2024-05-31T17:24:02.000Z",
    "size": 540448,
    "path": "../public/assets/imgs/works/projects/1/3.jpg"
  },
  "/assets/imgs/works/projects/1/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e0b59-nhPsBLtJ4BHZQmHg8f3Xbc8p5GU\"",
    "mtime": "2024-05-31T17:29:28.000Z",
    "mtime": "2024-05-31T17:29:28.000Z",
    "size": 1968985,
    "path": "../public/assets/imgs/works/projects/1/4.jpg"
  },
  "/assets/imgs/works/projects/1/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"22aa8f-tW9nufHsS61ZAgQpjQK8R/kiwZA\"",
    "mtime": "2024-05-31T17:24:26.000Z",
    "mtime": "2024-05-31T17:24:26.000Z",
    "size": 2271887,
    "path": "../public/assets/imgs/works/projects/1/5.jpg"
  },
  "/assets/imgs/works/projects/0/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eed2f-+2POtZz4AIwV+Og0nkof1C/3m/s\"",
    "mtime": "2024-05-31T17:29:30.000Z",
    "size": 2026799,
    "path": "../public/assets/imgs/works/projects/0/6.jpg"
  },
  "/assets/imgs/works/projects/0/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"7c5a1f-4yCY2ScL7KpqdJrUqfn5910BzSM\"",
    "mtime": "2024-05-31T17:30:24.000Z",
    "size": 8149535,
    "path": "../public/assets/imgs/works/projects/0/7.jpg"
  },
  "/assets/imgs/works/projects/0/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"247538-CCVADpcJqAwxY0lGFwN8eUU4Jbg\"",
    "mtime": "2024-05-31T17:24:30.000Z",
    "size": 2389304,
    "path": "../public/assets/imgs/works/projects/0/8.jpg"
  },
  "/assets/imgs/works/projects/2/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"22660a-szJHNyYDrgWKGsKijuMcKYQFZWE\"",
    "mtime": "2024-05-31T17:29:32.000Z",
    "mtime": "2024-05-31T17:29:32.000Z",
    "size": 2254346,
    "path": "../public/assets/imgs/works/projects/2/1.jpg"
  },
  "/assets/imgs/works/projects/2/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"24f65e-lBzSqVJlVvrNM6oi5+iEekhCCfw\"",
    "mtime": "2024-05-31T17:23:18.000Z",
    "mtime": "2024-05-31T17:23:18.000Z",
    "size": 2422366,
    "path": "../public/assets/imgs/works/projects/2/2.jpg"
  },
  "/assets/imgs/works/projects/2/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"83f20-Usu0+UXzwlb/UE3swwcDVEHQFpw\"",
    "mtime": "2024-05-31T17:24:02.000Z",
    "mtime": "2024-05-31T17:24:02.000Z",
    "size": 540448,
    "path": "../public/assets/imgs/works/projects/2/3.jpg"
  },
  "/assets/imgs/works/projects/2/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e0b59-nhPsBLtJ4BHZQmHg8f3Xbc8p5GU\"",
    "mtime": "2024-05-31T17:29:28.000Z",
    "mtime": "2024-05-31T17:29:28.000Z",
    "size": 1968985,
    "path": "../public/assets/imgs/works/projects/2/4.jpg"
  },
  "/assets/imgs/works/projects/2/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"22aa8f-tW9nufHsS61ZAgQpjQK8R/kiwZA\"",
    "mtime": "2024-05-31T17:24:26.000Z",
    "mtime": "2024-05-31T17:24:26.000Z",
    "size": 2271887,
    "path": "../public/assets/imgs/works/projects/2/5.jpg"
  },
  "/assets/imgs/works/projects/2/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eed2f-+2POtZz4AIwV+Og0nkof1C/3m/s\"",
    "mtime": "2024-05-31T17:29:30.000Z",
    "mtime": "2024-05-31T17:29:30.000Z",
    "size": 2026799,
    "path": "../public/assets/imgs/works/projects/2/6.jpg"
  },
  "/assets/imgs/works/projects/2/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"7c5a1f-4yCY2ScL7KpqdJrUqfn5910BzSM\"",
    "mtime": "2024-05-31T17:30:24.000Z",
    "mtime": "2024-05-31T17:30:24.000Z",
    "size": 8149535,
    "path": "../public/assets/imgs/works/projects/2/7.jpg"
  },
  "/assets/imgs/works/projects/2/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"247538-CCVADpcJqAwxY0lGFwN8eUU4Jbg\"",
    "mtime": "2024-05-31T17:24:30.000Z",
    "mtime": "2024-05-31T17:24:30.000Z",
    "size": 2389304,
    "path": "../public/assets/imgs/works/projects/2/8.jpg"
  },
  "/assets/imgs/works/projects/0/0.jpg": {
    "type": "image/jpeg",
    "etag": "\"14929-5BSGtX/SnHMveCZJjV+pvmIzyyY\"",
    "mtime": "2024-01-26T11:19:56.000Z",
    "size": 84265,
    "path": "../public/assets/imgs/works/projects/0/0.jpg"
  },
  "/assets/imgs/works/projects/0/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"22660a-szJHNyYDrgWKGsKijuMcKYQFZWE\"",
    "mtime": "2024-05-31T17:29:32.000Z",
    "mtime": "2024-05-31T17:29:32.000Z",
    "size": 2254346,
    "path": "../public/assets/imgs/works/projects/0/1.jpg"
  },
  "/assets/imgs/works/projects/0/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"24f65e-lBzSqVJlVvrNM6oi5+iEekhCCfw\"",
    "mtime": "2024-05-31T17:23:18.000Z",
    "mtime": "2024-05-31T17:23:18.000Z",
    "size": 2422366,
    "path": "../public/assets/imgs/works/projects/0/2.jpg"
  },
  "/assets/imgs/works/projects/0/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"83f20-Usu0+UXzwlb/UE3swwcDVEHQFpw\"",
    "mtime": "2024-05-31T17:24:02.000Z",
    "mtime": "2024-05-31T17:24:02.000Z",
    "size": 540448,
    "path": "../public/assets/imgs/works/projects/0/3.jpg"
  },
  "/assets/imgs/works/projects/0/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e0b59-nhPsBLtJ4BHZQmHg8f3Xbc8p5GU\"",
    "mtime": "2024-05-31T17:29:28.000Z",
    "mtime": "2024-05-31T17:29:28.000Z",
    "size": 1968985,
    "path": "../public/assets/imgs/works/projects/0/4.jpg"
  },
  "/assets/imgs/works/projects/0/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"22aa8f-tW9nufHsS61ZAgQpjQK8R/kiwZA\"",
    "mtime": "2024-05-31T17:24:26.000Z",
    "mtime": "2024-05-31T17:24:26.000Z",
    "size": 2271887,
    "path": "../public/assets/imgs/works/projects/0/5.jpg"
  },
  "/assets/imgs/works/projects/0/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eed2f-+2POtZz4AIwV+Og0nkof1C/3m/s\"",
    "mtime": "2024-05-31T17:29:30.000Z",
    "mtime": "2024-05-31T17:29:30.000Z",
    "size": 2026799,
    "path": "../public/assets/imgs/works/projects/0/6.jpg"
  },
  "/assets/imgs/works/projects/0/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"7c5a1f-4yCY2ScL7KpqdJrUqfn5910BzSM\"",
    "mtime": "2024-05-31T17:30:24.000Z",
    "mtime": "2024-05-31T17:30:24.000Z",
    "size": 8149535,
    "path": "../public/assets/imgs/works/projects/3/7.jpg"
  },
  "/assets/imgs/works/projects/1/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"22660a-szJHNyYDrgWKGsKijuMcKYQFZWE\"",
    "mtime": "2024-05-31T17:29:32.000Z",
    "size": 2254346,
    "path": "../public/assets/imgs/works/projects/1/1.jpg"
  },
  "/assets/imgs/works/projects/1/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"24f65e-lBzSqVJlVvrNM6oi5+iEekhCCfw\"",
    "mtime": "2024-05-31T17:23:18.000Z",
    "size": 2422366,
    "path": "../public/assets/imgs/works/projects/1/2.jpg"
  },
  "/assets/imgs/works/projects/1/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"83f20-Usu0+UXzwlb/UE3swwcDVEHQFpw\"",
    "mtime": "2024-05-31T17:24:02.000Z",
    "size": 540448,
    "path": "../public/assets/imgs/works/projects/1/3.jpg"
  },
  "/assets/imgs/works/projects/1/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e0b59-nhPsBLtJ4BHZQmHg8f3Xbc8p5GU\"",
    "mtime": "2024-05-31T17:29:28.000Z",
    "size": 1968985,
    "path": "../public/assets/imgs/works/projects/1/4.jpg"
  },
  "/assets/imgs/works/projects/1/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"22aa8f-tW9nufHsS61ZAgQpjQK8R/kiwZA\"",
    "mtime": "2024-05-31T17:24:26.000Z",
    "size": 2271887,
    "path": "../public/assets/imgs/works/projects/1/5.jpg"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta":{"maxAge":31536000},"/_nuxt/builds":{"maxAge":1},"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_7vnHQV = () => import('./routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_7vnHQV, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_7vnHQV, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch as $, withoutTrailingSlash as A, nodeServer as B, send as a, setResponseStatus as b, setResponseHeaders as c, useRuntimeConfig as d, eventHandler as e, getQuery as f, getResponseStatus as g, createError$1 as h, getRouteRules as i, joinRelativeURL as j, getResponseStatusText as k, hasProtocol as l, isScriptProtocol as m, joinURL as n, defu as o, parseURL as p, sanitizeStatusCode as q, createHooks as r, setResponseHeader as s, isSamePath as t, useNitroApp as u, toRouteMatcher as v, withQuery as w, createRouter$1 as x, parseQuery as y, withTrailingSlash as z };
//# sourceMappingURL=runtime.mjs.map
