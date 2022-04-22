//POST Store Order

const userId = 5 //check id from swagger before run test, make sure this code doesn't exist

describe('POST Store', () => {    
  it('succesfull order', () => {
    cy.request({
      method: 'POST',
      url: `/store/order`,
      body: {
        id: userId,
        petId: 9223372000001107000,
        quantity: 0,
        shipDate: "2022-04-21T23:03:53.536Z",
        status: "placed",
        complete: true
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response).property('status').to.equal(200);
      expect(response.body).property('id').to.not.be.oneOf([null, ""])
      
    })
  })
})

describe('GET Store Order', () => { 
  const userIdError = 1 
  it('successfull get order', () => {
      cy.request({
      method : 'GET',
      url:`/store/order/${userId}`, 
      failOnStatusCode: false
      }).then(response => {        
          expect(response).property('status').to.equal(200);
          // expect(response.body).property('id').to.not.be.oneOf([null, ""])
          expect(response.body).property('status').to.equal('placed')
      
      })
  })
  
  it('error get order', () => {
    cy.request({
      method: 'GET',
      url: `/store/order/${userIdError}`,
      failOnStatusCode: false
    }).then(response => {
      expect(response).property('status').to.equal(404);
      expect(response.body).property('type').to.equal('error')
  
    })
  })
})

describe('DELETE Store Order', () => { 
  const userIdError = 1 
  it('successfull get order', () => {
      cy.request({
      method : 'DELETE',
      url:`/store/order/${userId}`, 
      failOnStatusCode: false
      }).then(response => {        
          expect(response).property('status').to.equal(200);
          // expect(response.body).property('id').to.not.be.oneOf([null, ""])
          expect(response.body).property('code').to.equal(200)
      
      })
  })
  
  it('order not found', () => {
    cy.request({
      method: 'DELETE',
      url: `/store/order/${userIdError}`,
      failOnStatusCode: false
    }).then(response => {
      expect(response).property('status').to.equal(404);
      expect(response.body).property('message').to.equal('Order Not Found')
  
    })
  })
})

describe('Get Inventory', () => { 
  it('successfull get ', () => {
      cy.request({
      method : 'GET',
      url:`/store/inventory`, 
      failOnStatusCode: false
      }).then(response => {        
          expect(response).property('status').to.equal(200);
          // expect(response.body).property('id').to.not.be.oneOf([null, ""])
          expect(response.body).property('0').to.equal(1)
      
      })
  })
})
