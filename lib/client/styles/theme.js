export var spaceFactor = 8;
export var space = [spaceFactor / 2, // 4
spaceFactor, // 8
spaceFactor * 2, // 16
spaceFactor * 3, // 24
spaceFactor * 4, // 32
spaceFactor * 5, // 40
spaceFactor * 6 // 48
];
export var color = {
  base: '#333',
  light: '#767676',
  lightest: '#ccc',
  link: '#1673b1',
  linkHover: '#e90',
  focus: 'rgba(22, 115, 177, 0.25)',
  border: '#e8e8e8',
  name: '#690',
  type: '#905',
  error: '#c00',
  baseBackground: '#fff',
  codeBackground: '#f5f5f5',
  sidebarBackground: '#f5f5f5',
  ribbonBackground: '#e90',
  ribbonText: '#fff',
  // Based on default Prism theme
  codeBase: '#333',
  codeComment: '#6d6d6d',
  codePunctuation: '#999',
  codeProperty: '#905',
  codeDeleted: '#905',
  codeString: '#690',
  codeInserted: '#690',
  codeOperator: '#9a6e3a',
  codeKeyword: '#1673b1',
  codeFunction: '#DD4A68',
  codeVariable: '#e90'
};
export var fontFamily = {
  base: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Roboto"', '"Oxygen"', '"Ubuntu"', '"Cantarell"', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', 'sans-serif'],
  monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace']
};
export var fontSize = {
  base: 15,
  text: 16,
  small: 13,
  h1: 48,
  h2: 36,
  h3: 24,
  h4: 18,
  h5: 16,
  h6: 16
};
export var mq = {
  small: '@media (max-width: 600px)'
};
export var borderRadius = 3;
export var maxWidth = 1000;
export var sidebarWidth = 200;
export var buttonTextTransform = 'uppercase';