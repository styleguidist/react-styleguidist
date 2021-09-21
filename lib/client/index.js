/* eslint-disable import/first */
import './polyfills';
import './styles';
import ReactDOM from 'react-dom';
import renderStyleguide from './utils/renderStyleguide';
import { getParameterByName, hasInHash, getHash } from './utils/handleHash'; // Examples code revision to rerender only code examples (not the whole page) when code changes

var codeRevision = 0; // Scrolls to origin when current window location hash points to an isolated view.

var scrollToOrigin = function scrollToOrigin() {
  var hash = window.location.hash;
  var idHashParam;

  if (hasInHash(hash, '#/') || hasInHash(hash, '#!/')) {
    // Extracts the id param of hash
    idHashParam = getParameterByName(hash, 'id');
  } else {
    idHashParam = getHash(hash, '#');
  }

  if (hash) {
    if (idHashParam) {
      var idElement = document.getElementById(idHashParam);

      if (idElement) {
        idElement.scrollIntoView(true);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }
};

var render = function render() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var styleguide = require('!!../loaders/styleguide-loader!./index.js');

  ReactDOM.render(renderStyleguide(styleguide, codeRevision), document.getElementById(styleguide.config.mountPointId));
};

window.addEventListener('hashchange', render);
window.addEventListener('hashchange', scrollToOrigin);
/* istanbul ignore if */

if (module.hot) {
  module.hot.accept('!!../loaders/styleguide-loader!./index.js', function () {
    codeRevision += 1;
    render();
  });
}

render();