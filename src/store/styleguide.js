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
	@observable type;

	@action setType(type) {
		this.type = type;
	}

	@action setDefault(type) {
		if (!this.type) {
			this.type = type;
		}
	}

};
