context('cypress task 3', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should have a profile badge with a size of 80 by 80 pixels', () => {
    cy.get('[data-cy=profile-badge] > img').then($badge => {
      const badgeWidth = $badge[0].naturalWidth;
      const badgeHeight = $badge[0].naturalHeight;

      expect(badgeWidth).to.equal(80);
      expect(badgeHeight).to.equal(80);
    });
  });

  // No idea how to hover over and have it show the menu
  it('should have a menu with 4 elements when hovering over the \'home\' button', () => {
    cy.get('[data-cy=home-btn]').trigger('mouseover');
    cy.get('[data-cy=home-btn-menu]').then($el => {
      // cy.wrap($el).invoke('show').should('be.visible');
      expect($el[0].childElementCount).to.equal(4);
    });
  });

  it('should have a search button that opens a search field when clicked', () => {
    cy.get('.search-btn').click();
    cy.get('.modal-content > form > input').should('be.visible');
  });

  it('should have a carousel card with the correct title after clicking right twice', () => {
    cy.scrollTo(0, 1000);
    cy.get('.resent-post').should('be.visible');
    cy.get('.row > .btn-next').click().then((e) => {
      cy.wait(1000).then(() => {
        e.click();
        cy.get("#main-wrapper > main > section.resent-post .slick-active [data-cy=card-content]").then($title => {
          expect($title[0]).to.have.text('Healthy eating is the key to staying healthy');
        });
      });
    });
  });

  it('should have a recent posts carousel that loops around', async () => {
    cy.scrollTo(0, 1000);
    const visiblePosts = "#main-wrapper > main > section.resent-post .slick-active [data-cy=card-content]";

    // Is there a better way to do this? 
    cy.get(visiblePosts).then(posts1 => {
      cy.get('.row > .btn-next').then($button => {
        $button.click();
        cy.wait(1000).then(() => {
          $button.click();
          cy.wait(1000).then(() => {
            $button.click();
            cy.wait(1000).then(() => {
              $button.click();
              cy.get(visiblePosts).then(posts2 => {
                console.log(posts1, posts2);
                expect(posts2[0]).to.equal(posts1[0]);
              })
            });
          });
        });
      });
    });
  });
});