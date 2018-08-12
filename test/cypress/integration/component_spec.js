describe('Single component', () => {
	before(() => {
		// Open simple button component in isolation
		cy.visit('/#!/Button/1');
	});

	describe('props and methods section', () => {
		beforeEach(() => {
			cy.get('button')
				.contains('Props & methods')
				.as('propsBtn');

			cy.get('@propsBtn')
				.closest('[class^=rsg--tabs]')
				.as('container');
		});

		it('is present', () => {
			cy.get('@propsBtn').should('exist');
		});

		it('does not show table initially', () => {
			cy.get('@container')
				.find('table')
				.should('not.exist');
		});

		it('shows the table on button click', () => {
			cy.get('@propsBtn').click();
			cy.get('@container')
				.find('table')
				.should('contain', 'Prop name');
		});
	});

	describe('preview section', () => {
		beforeEach(() => {
			cy.get('[class^=rsg--preview]')
				.as('preview')
				.closest('[class^=rsg--root]')
				.as('container')
				.find('button')
				.contains('View Code')
				.as('viewCodeBtn');
		});

		it('renders component preview', () => {
			cy.get('@preview')
				.find('button', { timeout: 10000 })
				.contains('Push Me')
				.should('exist');
		});

		it('has view code button', () => {
			cy.get('@viewCodeBtn').should('exist');
		});

		it('does not show code initially', () => {
			cy.get('@container')
				.find('.CodeMirror')
				.should('not.exist');
		});

		it('shows code on click', () => {
			cy.get('@viewCodeBtn').click();
			cy.get('@container')
				.find('.CodeMirror')
				.should('exist');
		});

		it('changes the render after code change', () => {
			const codeToDelete = '</Button>';
			cy.get('@container')
				.find('.CodeMirror textarea')
				// CodeMirror actually listens to keystrokes on an empty textarea
				// to update the div with the code, so we have to hack our way
				// around it with a bunch of backspacing, since there's no way
				// to place the cursor
				.type(`${'{backspace}'.repeat(codeToDelete.length)} Harder${codeToDelete}`, {
					force: true,
				});

			// Wait for CodeMirror to update
			cy.wait(500);

			cy.get('@preview')
				.find('button')
				.contains('Push Me Harder')
				.should('exist');
		});
	});
});
