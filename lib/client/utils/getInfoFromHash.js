import "core-js/modules/es.array.filter";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.match";
import { hasInHash, getHashAsArray } from './handleHash';

function hasDigitsOnly(item) {
  return item.match(/^\d+$/) !== null;
}
/**
 * Returns an object containing component/section name and, optionally, an example index
 * from hash part or page URL:
 * #!/Button → { targetName: 'Button' }
 * #!/Button/1 → { targetName: 'Button', targetIndex: 1 }
 *
 * @param {string} hash
 * @returns {object}
 */


export default function getInfoFromHash(hash) {
  var shouldIsolate = hasInHash(hash, '#!/');

  if (shouldIsolate || hasInHash(hash, '#/')) {
    var hashArray = getHashAsArray(hash, shouldIsolate ? '#!/' : '#/');
    var targetHash = hashArray[hashArray.length - 1];
    return {
      isolate: shouldIsolate,
      hashArray: hashArray.filter(function (item) {
        return !hasDigitsOnly(item);
      }),
      targetName: hashArray[0],
      targetIndex: hasDigitsOnly(targetHash) ? parseInt(targetHash, 10) : undefined
    };
  }

  return {};
}