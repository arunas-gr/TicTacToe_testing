/// <reference types="cypress" />

describe('Tic Tac Toe', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  });

  // ką testuojam:
  // ar atsidaro langas
  // ar galima padėti X
  // ar galima padėti O
  // ar veikia Reset
  // Laimėjimo sąlygos testas
  // Judėjimo eiliškumo testas
  // Lygiųjų testas
  //

  it('should board be empty X is the first player', () => {
    cy.get('[data-testid="status"]').should('contain', 'Next player: X');
    cy.get('.square').should('have.length', 9);
    cy.get('.square').each($square => {
      cy.wrap($square).should('be.empty');
    });
  });

  it('should move alternately', () => {
    cy.get('[data-testid="square-0"]').click();
    cy.get(('[data-testid="square-0"]')).should('contain', 'X');
    cy.get('[data-testid="status"]').should('contain', 'Next player: O');

    cy.get('[data-testid="square-1"]').click();
    cy.get(('[data-testid="square-1"]')).should('contain', 'O');
    cy.get('[data-testid="status"]').should('contain', 'Next player: X');

    cy.get('[data-testid="square-2"]').click();
    cy.get(('[data-testid="square-2"]')).should('contain', 'X');
    cy.get('[data-testid="status"]').should('contain', 'Next player: O');
  })

  it('should not allow to play on the same square', () => {
    cy.get('[data-testid="square-0"]').click();
    cy.get('[data-testid="status"]').should('contain', 'Next player: O');

    cy.get('[data-testid="square-0"]').click();
    cy.get('[data-testid="status"]').should('contain', 'Next player: O');
  });

  it('should reset game', () => {
    cy.get('[data-testid="square-0"]').click(); // x
    cy.get('[data-testid="square-4"]').click(); // 0
    cy.get('[data-testid="square-1"]').click(); // x
    cy.get('[data-testid="square-5"]').click(); // 0
    cy.get('[data-testid="square-6"]').click(); // x
    cy.get('[data-testid="square-7"]').click(); // 0
    cy.get('[data-testid="square-2"]').click(); // x
    

// sukuriama laim4jimo sąlyga ir tada resetinama

    cy.get('[data-testid="reset-button"]').click();
    cy.get('[data-testid="status"]').should('contain', 'Next player: X');
    cy.get('.square').each($square => {
      cy.wrap($square).should('be.empty');
    });
  });

  it('should allow to win the game', () => {
    cy.get('[data-testid="square-0"]').click();
    cy.get('[data-testid="square-4"]').click();
    cy.get('[data-testid="square-1"]').click();
    cy.get('[data-testid="square-5"]').click();
    cy.get('[data-testid="square-2"]').click();
    cy.get('[data-testid="status"]').should('contain', 'Winner: X');
  });

  it('should declare winner', () => {
    cy.get('[data-testid="square-0"]').click(); //X
    cy.get('[data-testid="square-1"]').click();
    cy.get('[data-testid="square-3"]').click(); //X
    cy.get('[data-testid="square-4"]').click();
    cy.get('[data-testid="square-6"]').click(); //X
 
    cy.get('[data-testid="status"]').should('contain', 'Winner: X');
   
  });
})