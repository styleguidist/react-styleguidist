describe('Styleguidist core', () => {
	beforeEach(() => cy.visit('/'));

	it('loads the page', () => {
		cy.title().should('include', 'React Styleguidist');
	});

	it('shows multiple components in normal mode', () => {
		cy.get('[id$=container]').should('have.length.above', 1);
	});

	it('shows single component in isolated mode', () => {
		cy.get('a[aria-label="Open isolated"]')
			.first()
			.click();
		cy.get('[id$=container]').should('have.length', 1);
	});
});
