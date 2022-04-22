const idPet = 1000 //ganti sebelum run test

describe('POST / pet', function () {
 it('succesfull post', () => {
    cy.request({
      method: 'POST',
      url: `/store/order`,
      body: {
        id: idPet,
        category: {
          id: 456,
          name: "Kucing"
        },
        name: "kampung",
        photoUrls: [
          "string"
        ],
        tags: [
          {
            id: 0,
            name: "string"
          }
        ],
        status : "available"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response).property('status').to.equal(200);
      expect(response.body).property('id').to.equal(idPet)
      
    })
  })
})

describe('GET Pets by Status', function () {
  it('Get Pets by Status - Available', () => {
    cy.request('/pet/findByStatus?status=available').as('getPetbyStatus');
    cy.get('@getPetbyStatus').then(getPet => {
      expect(getPet.status).to.eq(200);
      assert.isArray(getPet.body, 'Response is Array')
    });
  });
  it('Get Pets by Status - Pending ', () => {
    cy.request('/pet/findByStatus?status=pending').as('getPetbyStatus');
    cy.get('@getPetbyStatus').then(getPet => {
      expect(getPet.status).to.eq(200);
      assert.isArray(getPet.body, 'Response is Array')
    });
  });
  it('Get Pets by Status - Sold', () => {
    cy.request('/pet/findByStatus?status=sold').as('getPetbyStatus');
    cy.get('@getPetbyStatus').then(getPet => {
      expect(getPet.status).to.eq(200);
      assert.isArray(getPet.body, 'Response is Array')
    });
  });
})

describe('GET Pets by Id', function () {
  it('successfull get pet by Id', () => {
    cy.request({
      method: 'GET',
      url: `/pet/${idPet}`,
      failOnStatusCode: false
    }).then(response => {
      expect(response).property('status').to.equal(200);
      // expect(response.body).property('id').to.not.be.oneOf([null, ""])
      expect(response.body).property('status').to.equal('available')
      
    })
  })
})
  
  describe('PUT Existing Pet', function () {
   it('successfull put', () => {
      cy.request({
      method : 'PUT',
      url:`/pet`, 
      body: {
        id: idPet,
        category: {
          id: 789,
          name: "kucing"
        },
        name: "anggora",
        photoUrls: [
          "string"
        ],
        tags: [
          {
            id: 0,
            name: "string"
          }
        ],
        status : "available"
      },
      failOnStatusCode: false
      }).then(response => {        
          expect(response).property('status').to.equal(200);
          // expect(response.body).property('id').to.not.be.oneOf([null, ""])
        expect(response.body).property('id').to.equal(idPet)  
        expect(response.body).property('name').to.equal('anggora')
        expect(response.body).property('category').property('id').to.equal(789)
      
      })
  })
})