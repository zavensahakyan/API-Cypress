import {faker} from '@faker-js/faker'

describe('Testing API Part1 ', () => {
    let token;
    let bookingId;
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body:{
                username: "admin",
                password: "password123"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.token;
        });
    });

    it('Create Booking request' , () => {
       const firstName = faker.person.firstName()
       const lastName = faker.person.lastName()
       const totalPrice = faker.number.int({ min: 100, max: 50000 });

       cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body:{
                firstname: firstName,
                lastname: lastName,
                totalprice: totalPrice,
                depositpaid: true,
                bookingdates: {
                    checkin : "2018-01-01",
                    checkout : "2019-01-01"
                },
                additionalneeds: "Breakfast"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.booking).to.have.property('firstname', firstName);
            expect(response.body.booking).to.have.property('lastname', lastName);
            bookingId = response.body.bookingid;
        });

    });

    it('Get Booking request', () => {
        cy.request({
            method: 'GET',
            url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('firstname', firstName);
            expect(response.body).to.have.property('lastname', lastName);
            expect(response.body.additionalneeds).to.eq('Breakfast');
        });
    });
});