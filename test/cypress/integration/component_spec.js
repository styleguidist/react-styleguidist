describe('Single component', () => {
	before(() => {
		// Open simple button component in isolation
		cy.visit('/#!/Button');
	});

	describe('props and methods section', () => {
		beforeEach(() => {
			cy.get('button').contains('Props & methods').as('propsBtn');

			cy.get('@propsBtn').closest('[class^=rsg--tabs]').as('container');
		});

		it('is present', () => {
			cy.get('@propsBtn').should('exist');
		});

		it('does not show table initially', () => {
			cy.get('@container').find('table').should('not.exist');
		});

		it('shows the table on button click', () => {
			cy.get('@propsBtn').click();
			cy.get('@container').find('table').should('contain', 'Prop name');
		});
	});

	describe('preview section', () => {
		beforeEach(() => {
			cy.get('[data-testid*="-example-"]')
				.as('container')
				.find('[class^=rsg--preview]')
				.as('preview');

			cy.get('@container').find('button').contains('View Code').as('viewCodeBtn');
		});

		it('renders component preview', () => {
			cy.get('@preview').find('button', { timeout: 10000 }).contains('Push Me').should('exist');
		});

		it('has view code button', () => {
			cy.get('@viewCodeBtn').should('exist');
		});

		it('does not show code initially', () => {
			cy.get('@container').find('textarea').should('not.exist');
		});

		it('shows code on click', () => {
			cy.get('@viewCodeBtn').click();
			cy.get('@container').find('textarea').should('exist');
		});

		it('changes the render after code change', () => {
			const codeToSkip = '</Button>';
			cy.get('@container')
				.find('textarea')
				.type(`${'{leftarrow}'.repeat(codeToSkip.length)} Harder`);

			cy.get('@preview').find('button').contains('Push Me Harder').should('exist');
		});

		it('toggles isolated example mode correctly', () => {
			cy.get('[data-testid$="-examples"]').as('componentExamples');

			// Toggle into isolated example mode
			cy.get('@componentExamples').find('[data-testid$="-isolate-button"]').first().click();

			// Assert that there is only one example showing
			cy.get('@componentExamples').find('[data-testid*="-example-"]').should('have.length', 1);

			// Toggle out of isolated example mode
			cy.get('[data-testid$="-isolate-button"]').click();

			// Assert the other examples are showing again
			cy.get('@componentExamples')
				.find('[data-testid*="-example-"]')
				.should('have.length.above', 1);

			// Check that we've returned to isolated component mode instead of normal mode
			// TODO: this is currently bugged (returns to normal mode rather than isolated component mode)
			//cy.get('[id$=container]').should('have.length', 1);
		});
	});
});
