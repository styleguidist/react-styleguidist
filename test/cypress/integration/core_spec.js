describe('Styleguidist core', () => {
	beforeEach(() => cy.visit('/'));

	it('loads the page', () => {
		cy.title().should('include', 'React Styleguidist');
	});

	it('shows multiple components in normal mode', () => {
		cy.get('[data-testid$=-container]').should('have.length.above', 1);
	});

	it('toggles isolated component mode correctly', () => {
		cy.get('[data-testid$=-container]').first().as('container');
		// Toggle into isolated mode
		cy.get('[data-testid$=-examples]').find('[data-testid$=-isolate-button]').first().click();

		// Assert there's only one component showing
		cy.get('@container').should('have.length', 1);

		// Assert the sidebar is no longer showing
		cy.get('[data-testid=sidebar]').should('not.exist');

		// Toggle out of isolated mode
		cy.go('back');

		// Assert that more than one component is now showing
		cy.get('[data-testid$=-container]').should('have.length.above', 1);

		// Assert that the sidebar is now showing again
		cy.get('[data-testid=sidebar]').should('exist');
	});
	
	it('scrolls to the component clicked in sidebar', () => {
		//click the first link in the sidebar
		cy.get('[data-testid="rsg-toc-link"]').first().click();
		cy.window().its('scrollY').should('equal', cy.$$('#button').offset().top)
		
	});

	it('typing in the sidebar should filter components in the table of content', ()=> {
		cy.get("[class^=rsg--item]").should("have.length.above", 1);
		cy.get("nav").as('sidebar').within(($sidebar) => {
			cy.get('input').type("Push");
			cy.get("[class^=rsg--item]").should("have.length", 1);
		});
	

	})
});
