import jss from './setupjss';
var styles = {
  // Global styles
  body: {
    isolate: false,
    margin: 0,
    padding: 0,
    minWidth: 0,
    maxWidth: '100%',
    border: 0
  }
}; // Attach styles to body

var body = jss.createStyleSheet(styles).attach().classes.body;
document.body.classList.add(body);