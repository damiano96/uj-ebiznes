describe('www.morele.net tests',
    {
        viewportHeight: 1080,
        viewportWidth: 1920,
    }, () => {

      const website = 'https://www.morele.net';

      it('test1: zaladowanie strony', () => {
        cy.visit(`${website}`);
        cy.get('.main-content').should('be.visible');
      });

      it('test2: kontener polecane powinien byc widoczny', () => {
        cy.visit(`${website}`);
        cy.get('.slider-box-recommended').should('be.visible');
      });

      it('test3: ilosc elementow w kontenerze polecane', () => {
        cy.visit(`${website}`);
        const boxRecommended = cy.get('.slider-box-recommended');
        boxRecommended.find('a.product-slide').should('have.length', 15);
      })

      it('test4: kontener okazja dnia powinien byc widoczny', () => {
        cy.visit(`${website}`);
        cy.get('.home-sections-promotion').should('be.visible');
      })

      it('test5: koszyk powinien byc pusty', () => {
        cy.visit(`${website}`);
        cy.contains('.small-basket-price', '0,00 zł');
      })

      it('test6: powinna byc wyswietlona odpowiednia liczba kategorii', () => {
        cy.visit(`${website}`);
        const categories = cy.get('.cn-shop ul.cn-current-departments');
        categories.find('li.cn-departments-menu-item').should('have.length', 16);
      })

      it('test7 powinien wyswietlic liste produktow po wpisaniu w wyszukiwarke', () => {
        const searchTerm = 'dell';

        cy.visit(`${website}`);
        cy.get('input.quick-search-autocomplete').eq(0).type(searchTerm);
        cy.get('button.h-quick-search-submit').eq(0).click();
        cy.wait(2000);
        cy.url().should('include', '/wyszukiwarka');
        cy.get('.cat-product').should('have.length.above', 0);
      });

      it('test8: dodanie do koszyka', () => {
        cy.visit(`${website}/laptop-lenovo-v15-g2-itl-i5-1135g7-8-gb-256-gb-w11-82kb019dpb-12368069/`);

        const productBoxMain = cy.get('div.product-box-main');
        const addToCartContainer = productBoxMain.get('div.add-to-cart');

        addToCartContainer.get('a.add-to-cart__btn').trigger('mouseover');
        cy.wait(2000);
        addToCartContainer.click({force: true });

        const warrantyModal = cy.get('.morele-dialog-warranty');
        warrantyModal.find('button.md-header-close-btn').click();

        productBoxMain.get('.product-price-container .product-price').then(($price) => {
            const price = $price.text().replace(/\n/g, '');
            cy.contains('.small-basket-price', `${price}`);
        })
      })

      it('test9: dodanie do koszyka czterech przedmiotów', () => {
        cy.visit(`${website}/laptop-lenovo-v15-g2-itl-i5-1135g7-8-gb-256-gb-w11-82kb019dpb-12368069/`);

        const productBoxMain = cy.get('div.product-box-main');
        const addToCartContainer = productBoxMain.get('div.add-to-cart');
        const addToCartDropdown = productBoxMain.get('div.add-to-cart div.add-to-cart__dropdown');
        const selectQuantityBtn = addToCartDropdown.find('button.md-button');

        selectQuantityBtn.trigger('mouseover');
        cy.wait(2000);
        selectQuantityBtn.click({force: true });
        cy.wait(2000);

        const addToCartDropdownOpened = productBoxMain.get('div.add-to-cart div.add-to-cart__dropdown.md-show-list');
        const selectQuantityList = addToCartDropdownOpened.find('div.md-list ul.md-list-collection li.md-list-item');
        selectQuantityList.eq(3).click({force: true })

        addToCartContainer.get('a.add-to-cart__btn').trigger('mouseover');
        cy.wait(2000);
        addToCartContainer.click({force: true });

        const warrantyModal = cy.get('.morele-dialog-warranty');
        warrantyModal.find('button.md-header-close-btn').click();

        productBoxMain.get('.product-price-container .product-price').then(($price) => {
          const price = $price.contents().first().text().replace(/\s/g, '')
          const numPrice = numberWithSpaces(Number(price) * 4);

          cy.contains('.small-basket-price', `${numPrice} zł`);
        })
      })

      it('test10 powinien wyswietlic informacje o braku wynikow', () => {
        const searchTerm = 'ewdedwedwe';

        cy.visit(`${website}`);
        cy.get('input.quick-search-autocomplete').eq(0).type(searchTerm);
        cy.wait(2000);
        cy.get('button.h-quick-search-submit').eq(0).click({force: true});
        // cy.get('.cat-list-products .cat-list-empty').contains('Brak wyników :(');
        cy.contains('Brak wyników :(').should('be.visible');
      });


      function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }

      // it('should display search results for a valid product', () => {
      //   // Enter a search query and verify that search results are displayed
      //   const searchTerm = 'book';
      //   cy.get('#search-input').type(searchTerm);
      //   cy.get('.search-button').click();
      //   cy.url().should('include', '/szukaj');
      //   cy.get('.product-list-item').should('have.length.above', 0);
      // });
      //

      // it('should navigate to a product details page', () => {
      //   // Click on a product and verify that the product details page loads successfully
      //   cy.get('.product-list-item').first().click();
      //   cy.url().should('include', '/product');
      //   cy.get('.product-details').should('be.visible');
      // });

      // Additional tests can be added as needed

    });