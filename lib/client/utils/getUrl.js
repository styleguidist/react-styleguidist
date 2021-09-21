import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.anchor";

/* Returns the HashPath to be included in the isolated page view url */
function getCurrentHashPath(stripFragment, stripTrailingSlash, currentHash) {
  /*This pattern matches urls like http://hostname.com/#button etc.,
  these urls are generated when we click on a component in the side nav-bar.
  This will verify whether the first character after the '#' symbol is an alphanumeric char or "_".
  this pattern used to validate the components names.*/
  var hashUrlPattern = /^#[a-zA-Z0-9_]/; // Ex. matches "#button","#1button","#_button"

  /* This pattern matches "#!/" string pattern in the 'currentHash' const
  this url pattern is used to show isolated page view mode in this project. */

  var isolatedPageViewUrlPattern = /^#!\//; // Ex. matches "#!/button"

  if (hashUrlPattern.test(currentHash)) {
    return '';
  } else {
    return currentHash && !isolatedPageViewUrlPattern.test(currentHash) ? currentHash.replace(stripFragment, '').replace(stripTrailingSlash, '') + '/' : '';
  }
}
/**
 * Gets the URL fragment for an isolated or nochrome link.
 *
 * @param {string} $.currentHash The current hash fragment of the page
 * @param {string} $.encodedName The URL encoded name of the component
 * @return {string}
 */


function buildIsolatedOrNoChromeFragment(_ref) {
  var currentHash = _ref.currentHash,
      encodedName = _ref.encodedName;
  var stripFragment = /^#\/?/;
  var stripTrailingSlash = /\/$/;
  var currentHashPath = getCurrentHashPath(stripFragment, stripTrailingSlash, currentHash);
  return "#!/" + currentHashPath + encodedName;
}

/**
 * Get component / section URL.
 *
 * @param {GetUrlOptions} options
 * @param location Location object (will use current page location by default)
 * @return {string}
 */
export default function getUrl(_temp, _temp2) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      name = _ref2.name,
      slug = _ref2.slug,
      example = _ref2.example,
      anchor = _ref2.anchor,
      isolated = _ref2.isolated,
      nochrome = _ref2.nochrome,
      absolute = _ref2.absolute,
      hashPath = _ref2.hashPath,
      useSlugAsIdParam = _ref2.useSlugAsIdParam,
      takeHash = _ref2.takeHash;

  var _ref3 = _temp2 === void 0 ? window.location : _temp2,
      origin = _ref3.origin,
      pathname = _ref3.pathname,
      _ref3$hash = _ref3.hash,
      hash = _ref3$hash === void 0 ? '' : _ref3$hash;

  var url = pathname;
  var currentHash = hash.indexOf('?') > -1 ? hash.substring(0, hash.indexOf('?')) : hash;

  if (takeHash) {
    url += currentHash;
  }

  if (nochrome) {
    url += '?nochrome';
  }

  var encodedName = encodeURIComponent(name || '');

  if (anchor) {
    url += "#" + slug;
  } else if (isolated || nochrome) {
    url += buildIsolatedOrNoChromeFragment({
      currentHash: currentHash,
      encodedName: encodedName
    });
  }

  if (hashPath) {
    var encodedHashPath = hashPath.map(encodeURIComponent);

    if (!useSlugAsIdParam) {
      encodedHashPath = [].concat(encodedHashPath, [encodedName]);
    }

    url += "#/" + encodedHashPath.join('/');
  }

  if (useSlugAsIdParam) {
    url += "?id=" + slug;
  }

  if (example !== undefined) {
    url += "/" + example;
  }

  if (absolute) {
    return origin + url;
  }

  return url;
}