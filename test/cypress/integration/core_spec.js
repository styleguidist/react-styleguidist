describe('Styleguidist core', () => {
	before(() => cy.visit('/'));

	it('loads the page', () => {
		cy.title().should('include', 'React Styleguidist');
	});

	it('shows multiple components in normal mode', () => {
		cy.get('[data-testid$=-container]').should('have.length.above', 1);
	});

	it('toggles isolated component mode correctly', () => {
		cy.get('[data-testid=sidebar]').as('sidebar');

		// Toggle into isolated mode
		cy.get('[data-testid$="-isolate-button"]').first().click();

		// Assert there's only one component showing
		cy.get('[data-testid$=-container]').should('have.length', 1);

		// Assert the sidebar is no longer showing
		cy.get('@sidebar').should('not.exist');

		// Toogle out of isolated mode
		cy.get('[data-testid$="-isolate-button"]').first().click();

		// Assert that more than one component is now showing
		cy.get('[data-testid$=-container]').should('have.length.above', 1);

		// Asser that the sidebar is now showing again
		cy.get('@sidebar').should('exist');
	});
});
