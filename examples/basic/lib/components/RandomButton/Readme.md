You can `require` external files in your examples:

	const names = require('dog-names').all;
	<RandomButton variants={names}/>

Or you can `import` external files into your examples:

	import {female} from "dog-names";
	<RandomButton variants={female}/>
