describe('Styleguidist core', () => {
	before(() => cy.visit('/'));

	it('loads the page', () => {
		cy.title().should('include', 'React Styleguidist');
	});

	it('shows multiple components in normal mode', () => {
		cy.get('[id$=container]').should('have.length.above', 1);
	});

	describe('isolated component mode', () => {
		it('shows single component', () => {
			cy.get('a[aria-label="Open isolated"]')
				.first()
				.click();
			cy.get('[id$=container]').should('have.length', 1);
		});

		it('hides the sidebar', () => {
			cy.get('[class^=rsg--sidebar]').should('not.exist');
		});

		it('returns to showing multiple components after exiting', () => {
			cy.get('a[aria-label="Show all components"]')
				.first()
				.click();

			cy.get('[id$=container]').should('have.length.above', 1);
		});

		it('returns to showing the sidebar after exiting', () => {
			cy.get('[class^=rsg--sidebar]').should('exist');
		});
	});
});
