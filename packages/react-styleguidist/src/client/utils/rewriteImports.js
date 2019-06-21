// Temporary copy to fix
// https://github.com/lukeed/rewrite-imports/issues/10

const UNNAMED = /import\s*['"]([^'"]+)['"];?/gi;
const NAMED = /import\s*(\*\s*as)?\s*(\w*?)\s*,?\s*(?:\{([\s\S]*?)\})?\s*from\s*['"]([^'"]+)['"];?/gi;

function alias(key) {
	key = key.trim();
	const name = key.split(' as ');
	if (name.length > 1) {
		key = name.shift();
	}
	return { key, name: name[0] };
}

function generate(keys, dep, base, fn) {
	const tmp =
		dep
			.split('/')
			.pop()
			.replace(/\W/g, '_') +
		'$' +
		num++; // uniqueness
	const name = alias(tmp).name;

	dep = `${fn}('${dep}')`;

	let obj;
	let out = `const ${name} = ${dep};`;

	if (base) {
		out += `\nconst ${base} = ${tmp}.default || ${tmp};`;
	}

	keys.forEach(key => {
		obj = alias(key);
		out += `\nconst ${obj.name} = ${tmp}.${obj.key};`;
	});

	return out;
}

let num;
export default function(str, fn = 'require') {
	num = 0;
	return str
		.replace(NAMED, (_, asterisk, base, req, dep) =>
			generate(req ? req.split(',') : [], dep, base, fn)
		)
		.replace(UNNAMED, (_, dep) => `${fn}('${dep}');`);
}
