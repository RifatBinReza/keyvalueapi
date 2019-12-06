//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe('key_values', ()=>{

  /**
  * Test post object route
  */
  describe('POST key_value', ()=>{
    it('it should POST a key value', (done)=>{
      let key_value = {
        key: '9d5ed769-a97a-47d5-8acb-0586f1cf660d',
        value: {
          name: 'Node.js',
          version: 'v10.15.3'
        }
      }
      chai.request(server)
      .post('/api/object')
      .send(key_value)
      .end((err, res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status');
        res.body.should.have.property('status').eql('success');
        done()
      })
    })
  })

  /**
  * Test get object route
   */
  describe('GET/:key object', ()=>{
    it('it should get an object by the given key', (done)=>{
      chai.request(server)
      .get('/api/object/9d5ed769-a97a-47d5-8acb-0586f1cf660d')
      .end((err, res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status')
        res.body.should.have.property('status').eql('success')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('timestamp');
        res.body.data.timestamp.should.be.a('string');
        res.body.data.should.have.property('id')
        res.body.data.should.have.property('value')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('key');
        res.body.data.should.have.property('key').eql('9d5ed769-a97a-47d5-8acb-0586f1cf660d');
        done()
      })
    })
  })
})