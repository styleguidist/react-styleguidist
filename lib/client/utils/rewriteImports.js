import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.function.name";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.split";
import "core-js/modules/es.string.trim";
import "core-js/modules/web.dom-collections.for-each";
// Temporary copy to fix
// https://github.com/lukeed/rewrite-imports/issues/10
var UNNAMED = /import\s*['"]([^'"]+)['"];?/gi;
var NAMED = /import\s*(\*\s*as)?\s*(\w*?)\s*,?\s*(?:\{([\s\S]*?)\})?\s*from\s*['"]([^'"]+)['"];?/gi;

function alias(key) {
  key = key.trim();
  var name = key.split(' as ');

  if (name.length > 1) {
    key = name.shift();
  }

  return {
    key: key,
    name: name[0]
  };
}

var num;

function generate(keys, dep, base, fn) {
  var tmp = dep.replace(/\W/g, '_') + '$' + num++; // uniqueness

  var name = alias(tmp).name;
  dep = fn + "('" + dep + "')";
  var obj;
  var out = "const " + name + " = " + dep + ";";

  if (base) {
    out += "\nconst " + base + " = " + tmp + ".default || " + tmp + ";";
  }

  keys.forEach(function (key) {
    obj = alias(key);
    out += "\nconst " + obj.name + " = " + tmp + "." + obj.key + ";";
  });
  return out;
}

export default function (str, fn) {
  if (fn === void 0) {
    fn = 'require';
  }

  num = 0;
  return str.replace(NAMED, function (_, asterisk, base, req, dep) {
    return generate(req ? req.split(',').filter(function (d) {
      return d.trim();
    }) : [], dep, base, fn);
  }).replace(UNNAMED, function (_, dep) {
    return fn + "('" + dep + "');";
  });
}