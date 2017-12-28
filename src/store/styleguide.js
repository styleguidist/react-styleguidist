import { observable, action, useStrict } from 'mobx';

useStrict(true);

export default new class Styleguide {

	@observable type;

	@action setType(type) {
		this.type = type;
	}

	@action getType() {
		return this.type;
	}

}
