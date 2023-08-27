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
            cy.wait(1000);

            cy.get('button.h-quick-search-submit').eq(0).click();
            cy.wait(7000);
            cy.url().should('include', '/wyszukiwarka');
            cy.get('.cat-product').should('have.length.above', 0);
        });

        it('test8: dodanie do koszyka', () => {
            cy.visit(`${website}/laptop-asus-vivobook-pro-oled-15-d6500-ryzen-5-5600h-16-gb-512-gb-w11-rtx-3050-d6500qc-l1132w-12894052/`);

            const productBoxMain = cy.get('div.product-box-main');
            const addToCartContainer = productBoxMain.get('div.add-to-cart');

            addToCartContainer.get('a.add-to-cart__btn').trigger('mouseover');
            cy.wait(4000);
            addToCartContainer.click({force: true});

            const warrantyModal = cy.get('.morele-dialog-warranty');
            warrantyModal.find('button.md-header-close-btn').click();

            productBoxMain.get('.product-price-container .product-price').then(($price) => {
                const price = $price.text().replace(/\n/g, '');
                cy.wait(4000);

                cy.contains('.small-basket-price', `${price}`);
            })
        })

        it('test9: dodanie do koszyka czterech przedmiotów', () => {
            cy.visit(`${website}/laptop-asus-vivobook-pro-oled-15-d6500-ryzen-5-5600h-16-gb-512-gb-w11-rtx-3050-d6500qc-l1132w-12894052/`);

            const productBoxMain = cy.get('div.product-box-main');
            const addToCartContainer = productBoxMain.get('div.add-to-cart');
            const addToCartDropdown = productBoxMain.get('div.add-to-cart div.add-to-cart__dropdown');
            const selectQuantityBtn = addToCartDropdown.find('button.md-button');

            selectQuantityBtn.trigger('mouseover');
            cy.wait(4000);
            selectQuantityBtn.click({force: true});
            cy.wait(4000);

            const addToCartDropdownOpened = productBoxMain.get('div.add-to-cart div.add-to-cart__dropdown.md-show-list');
            const selectQuantityList = addToCartDropdownOpened.find('div.md-list ul.md-list-collection li.md-list-item');
            selectQuantityList.eq(3).click({force: true})

            addToCartContainer.get('a.add-to-cart__btn').trigger('mouseover');
            cy.wait(4000);
            addToCartContainer.click({force: true});

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
            cy.wait(2000);
            const search = cy.get('input.quick-search-autocomplete').eq(0);
            search.type(searchTerm);
            cy.wait(4000);
            cy.get('button.h-quick-search-submit').eq(0).click({force: true});
            cy.contains('Brak wyników :(').should('be.visible');
        });

        it('test11 powinien nawigowac do strony produktu', () => {
            cy.visit(`${website}`);
            const productFromRecomemended = cy.get('.slider-box-recommended a.product-slide').first();
            productFromRecomemended.trigger('mouseover');
            cy.wait(4000);
            productFromRecomemended.click();
            cy.wait(4000);
            cy.get('.product-row').should('be.visible');
        })

        it('test12 powinien pokazac popup z informacja o rozszerzeniu gwarancji', () => {
            cy.visit(`${website}/laptop-lenovo-v15-g2-itl-i5-1135g7-8-gb-256-gb-w11-82kb019dpb-12368069/`);

            const productBoxMain = cy.get('div.product-box-main');
            const addToCartContainer = productBoxMain.get('div.add-to-cart');

            addToCartContainer.get('a.add-to-cart__btn').trigger('mouseover');
            cy.wait(4000);
            addToCartContainer.click({force: true});

            const warrantyModal = cy.get('.morele-dialog-warranty');
            warrantyModal.should('be.visible');
        })

        it('test13 wyszukiwarka powinna miec liste działów do przeszukania', () => {
            cy.visit(`${website}`);

            const ulList = cy.get('form.h-quick-search-box .h-quick-search-dropdown ul.md-list-collection');

            ulList.get('li.md-list-item').should('have.length.above', 0);
        })

        it('test14 strona koszyka powinna wskazywac brak dodanych elementow', () => {
            cy.visit(`${website}/koszyk`);
            cy.contains('Nie znaleźliśmy żadnych produktów w Twoim koszyku!').should('be.visible');
        })

        it('test15 strona koszyka powinna wskazywac dodany element', () => {
            cy.visit(`${website}/smartfon-samsung-galaxy-a34-5g-6-128gb-czarny-1392798-12775312/`);

            const productBoxMain = cy.get('div.product-box-main');
            const addToCartContainer = productBoxMain.get('div.add-to-cart');

            addToCartContainer.get('a.add-to-cart__btn').trigger('mouseover');
            cy.wait(2000);
            addToCartContainer.click({force: true});
            cy.wait(4000);

            cy.visit(`${website}/koszyk`);

            cy.get('.basket-box-items .item-container').should('have.length.above', 0);
        })

        it('test16 powinien sprawdzic poprawnosc emaila podczas logowania', () => {
            cy.visit(`${website}/login`);

            const loginContainer = cy.get('div#login-container');
            const emailInput = loginContainer.find('input#username');

            emailInput.type('test');
            loginContainer.get('form#login_form').find('button').click();

            loginContainer.get('div.form-control-error').should('be.visible');
        })

        it('test17 powinien sprawdzic dane logowania - nieprawdlowe dane', () => {
            cy.visit(`${website}/login`);
            const loginContainer = cy.get('div#login-container');

            loginContainer.get('input#username').type('test@o2.pl');
            loginContainer.get('input#password-log').type('test');
            cy.wait(1000);

            loginContainer.get('form#login_form').find('button').click();

            cy.wait(1000);

            cy.get('div.morele-notify-container')
                .get('div.mn-item')
                .get('div.mn-body-wr')
                .get('div.mn-body')
                .should('be.visible');
        })

        it('test18 sprawdzenie czy jest przycisk do logowania przez facebooka', () => {
            cy.visit(`${website}/login`);
            const socials = cy.get('div.social-login-strip');

            socials.get('a#facebook-login').should('be.visible');
        })

        it('test19 sprawdzenie czy jest przycisk do logowania przez google', () => {
            cy.visit(`${website}/login`);
            const socials = cy.get('div.social-login-strip');

            socials.get('a#google-login').should('be.visible');
        });

        it('test20 sprawdzenie czy jest przycisk do logowania przez konto apple', () => {
            cy.visit(`${website}/login`);
            const socials = cy.get('div.social-login-strip');

            socials.get('a#apple-login').should('be.visible');
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