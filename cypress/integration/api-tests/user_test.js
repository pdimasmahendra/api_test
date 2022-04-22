//POST User
//update bfore run test!

const userId = 898912
const username = "dimasmahendrap4"
const usernameNotFound = "dimasmahendrap4"
const firstName = "Dimas"
const lastName = "Mahendra"
const email = "dimas2@gmail.com"
const password = "Qwerty123@"
const phone = "Qwerty123@"
const userStatus = 0

describe('POST User With Array', () => {    
  it('With Array', () => {
    cy.request({
      method: 'POST',
      url: `/user/createWithArray`,
      body: [{
        id: userId,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus
      }],
      failOnStatusCode: false
    }).then(response => {
        expect(response).property('status').to.equal(200);
        expect(response.body).property('code').to.equal(200)
    })
  })
})

describe('DELETE & GET user', () => {
  it('successfull delete order', () => {
    cy.request({
      method: 'DELETE',
      url: `/user/${username}`,
      failOnStatusCode: false
    }).then(response => {
      expect(response).property('status').to.equal(200);
      // expect(response.body).property('id').to.not.be.oneOf([null, ""])
      expect(response.body).property('message').to.equal(username)
      
    })
  })

  it('Get user not found', () => {
      cy.request({
      method : 'GET',
      url:`/user/${username}`, 
      failOnStatusCode: false
      }).then(response => {        
          // expect(response.body).property('id').to.not.be.oneOf([null, ""])
        expect(response).property('status').to.equal(404);
        expect(response.body).property('message').to.equal('User not found')
      })
  })
})

describe('POST User With List', () => {    
  it('With List', () => {
    cy.request({
      method: 'POST',
      url: `/user/createWithList`,
      body: [{
        id: userId,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus
      }],
      failOnStatusCode: false
    }).then(response => {
        expect(response).property('status').to.equal(200);
        expect(response.body).property('code').to.equal(200)
    })
  })
})

describe('PUT Existing user', function () {
   it('successfull put', () => {
      cy.request({
      method : 'PUT',
      url:`/user/${username}`, 
        body: {
        id: userId,
        username: username,
        firstName: "Mahendra",
        lastName: "Putra",
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus,
      },
      failOnStatusCode: false
      }).then(response => {        
        expect(response).property('status').to.equal(200);
          // expect(response.body).property('id').to.not.be.oneOf([null, ""])
        expect(response.body).property('code').to.equal(200)
      
      })
  })
})



describe('GET User', () => {  
  it('successfull get user by usename', () => {
      cy.request({
      method : 'GET',
      url:`/user/${username}`, 
      failOnStatusCode: false
      }).then(response => {        
          // expect(response.body).property('id').to.not.be.oneOf([null, ""])
        expect(response).property('status').to.equal(200);
        expect(response.body).property('id').to.equal(userId)
        expect(response.body).property('username').to.equal(username)
        expect(response.body).property('firstName').to.equal('Mahendra')
        expect(response.body).property('lastName').to.equal('Putra')
        expect(response.body).property('email').to.equal(email)
        expect(response.body).property('password').to.equal(password)
        expect(response.body).property('phone').to.equal(phone)
        expect(response.body).property('userStatus').to.equal(userStatus)
      })
  })
  
})


