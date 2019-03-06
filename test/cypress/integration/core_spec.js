describe('Styleguidist core', () => {
	before(() => cy.visit('/'));

	it('loads the page', () => {
		cy.title().should('include', 'React Styleguidist');
	});

	it('shows multiple components in normal mode', () => {
		cy.get('[id$=container]').should('have.length.above', 1);
	});

	it('toggles isolated component mode correctly', () => {
		cy.get('a[aria-label="Open isolated"]')
			.first()
			.click();
		cy.get('[id$=container]').should('have.length', 1);
		cy.get('[class^=rsg--sidebar]').should('not.exist');

		cy.get('a[aria-label="Show all components"]')
			.first()
			.click();

		cy.get('[id$=container]').should('have.length.above', 1);
		cy.get('[class^=rsg--sidebar]').should('exist');
	});
});
