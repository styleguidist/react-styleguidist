import "core-js/modules/es6.object.freeze";

/* eslint-disable import/prefer-default-export */
export var DisplayModes = Object.freeze({
  // Show all sections and components (default)
  all: 'all',
  // Show one section
  section: 'section',
  // Show one component
  component: 'component',
  // Show one example inside component or section
  example: 'example',
  // Show error 404
  notFound: 'notFound'
});
export var ExampleModes = Object.freeze({
  hide: 'hide',
  collapse: 'collapse',
  expand: 'expand'
});
export var UsageModes = Object.freeze({
  hide: 'hide',
  collapse: 'collapse',
  expand: 'expand'
});