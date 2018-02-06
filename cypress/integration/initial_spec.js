describe('Initial test suite', () => {
	it('loads the page', () => {
		cy.visit('/');
		cy.title().should('include', 'React Styleguidist');
	});
});
