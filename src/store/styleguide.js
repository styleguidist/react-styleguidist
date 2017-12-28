import { observable, action, useStrict } from 'mobx';

// use strict mode of mobx
// it will prevent of assigning values outside of @actions
useStrict(true);

/**
 * Demo of MobX store
 */
export default new class Demo {

	// make type observable
	// component will be updated when it will change
	@observable type = 'default';

	// this won't trigger component update
	// it will provide value only on component mount
	// and will not be updated ever since
	notObservableType = 'default';

	//
	@action setType(type) {
		this.type = type;
	}

};


// import { observable, action, useStrict } from 'mobx';
//
// useStrict(true);
//
// export default new class Styleguide {
//
// 	@observable type = 'default';
//
// 	constructor() {
// 		this.type = 'default';
// 	}
//
// 	@action setType(type) {
// 		this.type = type;
// 	}
//
// 	@action getType() {
// 		return this.type || 'default';
// 	}
//
// }
