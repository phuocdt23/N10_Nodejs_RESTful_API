const chai = require('chai')
const { StatusCodes} = require('http-status-codes');
const chaiHttp = require('chai-http')
const router = require('./register.route')
// const APIStatus = require('../constants/APIStatus')

const expect = chai.expect()

const testData = {
  user: {
    userName:"admin",
    password:"1"
}
}

chai.use(chaiHttp)

describe('POST /register', () => {
  it('return status 201', (done) => {
    chai
      .request(router)
      .post('/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        userName: testData.user.userName,
        password: testData.user.password
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(StatusCodes.CREATED)
      })
      done()
  // })
  // it('return status 409 && message: "this user is already exists"', (done) => {
  //   chai
  //     .request(router)
  //     .post('/')
  //     .set('content-type', 'application/x-www-form-urlencoded')
  //     .send({
  //       userName: "p0912",
  //       password: "123123"
  //     })
  //     .end((err, res) => {
  //       expect(err).to.be.null
  //       expect(res).to.have.status(StatusCodes.CONFLICT)
  //       expect(res).to.have.property('message');
  //     })
  //     done()
  // })
// expect(res.body).to.have.property('status')
      // expect(res.body).to.have.property('data')
      // expect(res.body.status).to.equal(APIStatus.SUCCESS)
      // expect(res.body.data).to.have.property('token')



//   it('return 400 error when email is already registered', (done) => {
//     chai
//       .request(app)
//       .post('/api/users/signup')
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         userName: testData.user.userName,
//         email: testData.user.email,
//         password: testData.user.password
//       })
//       .end((err, res) => {
//         expect(err).to.be.null
//         expect(res).to.have.status(400)
//         expect(res.body).to.have.property('status')
//         expect(res.body).to.have.property('msg')
//         expect(res.body.status).to.equal(APIStatus.FAIL)
//         done()
//       })
//   })
})
})
