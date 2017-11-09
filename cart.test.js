const cart = require('./cart');
const cars = require('./data/cars');

describe('Cart Properties:', () => {
    test("Cart Should default to an empty array.", () =>{
        expect(Array.isArray( cart.cart) ).toEqual( true )
        expect( cart.cart.length ).toEqual( 0 );
    });

    test('Total should default to 0.', () => {
        expect( cart.total ).toEqual( 0 );
    })
});

describe('Cart Methods:', () => {
    afterEach( () => {
        cart.cart = [];
        cart.total = 0;
    });

    test('addToCart() should add a car object to the cart', () => {
        cart.addToCart( cars[0]);
        cart.addToCart( cars[1]);

        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[1]); 
    });

    test('addToCart() should increase the total property of the cart', () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );
        cart.addToCart(cars[2] );

        expect(cart.total).toEqual( cars[0].price + cars[1].price + cars[2].price );
    })

    test('removeFromCart() should remove a car from the cart', () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );
        cart.addToCart( cars[2] );
        
        cart.removeFromCart( 0, cars[0].price );

        expect( cart.cart.length).toEqual( 2 );
        expect( cart.cart[0] ).toEqual( cars[1] );
        expect( cart.cart[1] ).toEqual( cars[2] );
        
    })

    test('removeFromCart() should remove car price', () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );
        cart.addToCart( cars[2] );
        
        cart.removeFromCart( 0, cars[0].price );

        expect( cart.total ).toEqual( cars[1].price + cars[2].price );
    })

    test('checkout() Should reset the cart to 0', () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );
        cart.addToCart( cars[2] );

        cart.checkout();

        expect(cart.cart.length).toEqual(0);
        expect(cart.total).toEqual(0);
    })
})