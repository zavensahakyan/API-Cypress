describe('Testing API Part2 ', () => {
    let token = 'a15766f036d51ec7d9792261e9e879552029686e3715de375e3c6275660035e7';
    let Id;
    let NewId;
    let Email1 = 'zavensahakyan7005@gmail.com';
    let NewEmail = 'zavensahakyan7006@gmail.com'

    it('Test case 1' , () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body:{
                name: "YOUR_NAME",
                gender: "male",
                email: Email1,
                status: "active"
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('name', "YOUR_NAME");
            expect(response.body).to.have.property('gender', "male");
            expect(response.body).to.have.property('email', Email1);
            expect(response.body).to.have.property('status', "active");
            Id = response.body.id;
        });

    });

    it('Test case 2', () => {
        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${Id}`,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', Id);
            expect(response.body).to.have.property('name', "YOUR_NAME");
            expect(response.body).to.have.property('gender', "male");
            expect(response.body).to.have.property('email', Email1);
            expect(response.body).to.have.property('status', "active");
        });
    });

    it('Test case 3', () => {
        cy.request({
            method: 'PATCH',
            url: `https://gorest.co.in/public/v2/users/${Id}`,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body:{
                name: "UPDATED_NAME",
                email: NewEmail,
                status: "active"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', "UPDATED_NAME");
            expect(response.body).to.have.property('email', NewEmail);
            expect(response.body).to.have.property('status', "active");
            NewId = response.body.id;
        });

    });

    it('Test case 4', () => {

        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${NewId}`,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', NewId);
            expect(response.body).to.have.property('name', "UPDATED_NAME");
            expect(response.body).to.have.property('gender');
            expect(response.body).to.have.property('email', NewEmail);
            expect(response.body).to.have.property('status', "active");
        });

        cy.request({
            method: 'Delete',
            url: `https://gorest.co.in/public/v2/users/${NewId}`,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(204);
        });

        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${NewId}`,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'Resource not found');
        });
    });


});
