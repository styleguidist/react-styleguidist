const displayNameHandler = require('react-docgen-displayname-handler').default;
const recast = require('recast');
const doctrine = require("doctrine");

function getClassLeadingComments(path) {
  let leadingComments;
  if (path.value.leadingComments) {
    leadingComments = path.value.leadingComments[0].value;
  } else {
    const root = path.scope.getGlobalScope().node;
    recast.visit(root, {
      visitVariableDeclaration: (path) => {
        if (path.value.leadingComments) {
          leadingComments = path.value.leadingComments[0].value;
        }
        return false;
      }
    });
  }
  return leadingComments;
}

const handlerComponentType = (documentation, path) => {
  if (path.value.type === 'ClassDeclaration') {
    if (path.value.superClass) {
      documentation.set('pure', path.value.superClass.name === 'PureComponent');
    }
  }
  if (path.value.type === 'FunctionDeclaration') {
    documentation.set('stateless', true);
  }
};

const handlerFlowTyped = (documentation, path) => {
  const root = path.scope.getGlobalScope().node;
  recast.visit(root, {
    visitImportDeclaration: (path) => {
      if (path.value.leadingComments) {
        path.value.leadingComments.forEach(({ value }) => {
          if (value.trim() === '@flow') {
            documentation.set('flow', true);
          }
        })
      }
      return false;
    }
  });
};

const versionHandler = (documentation, path) => {
  const leadingComments = getClassLeadingComments(path);
  const { tags } = (doctrine.parse(leadingComments, { unwrap: true }));
  const versionTag = tags.find(item => item.title === 'version');
  const version = versionTag && versionTag.description;
  documentation.set('version', version);
};

const handlerImportString = (documentation, path) => {
  let name;

  if (path.value.id) {
    name = path.value.id.name;
  } else {
    name = documentation.get('displayName');
  }

  const leadingComments = getClassLeadingComments(path);
  const { tags } = (doctrine.parse(leadingComments, { unwrap: true }));
  const nameTag = tags.find(item => item.title === 'name');
  const namespaceTag = tags.find(item => item.title === 'namespace');
  name = nameTag && nameTag.name;
  const namespace = namespaceTag && namespaceTag.name;
  namespace && documentation.set('importString', `import {${name}} from '${namespace}';`);
};

module.exports = [
  handlerFlowTyped,
  handlerImportString,
  handlerComponentType,
  versionHandler,
  displayNameHandler,
]
