/**
 * @fileOverview Base API Surface tests.
 */
var Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;

var helpers = require('../..');

describe('Base API Surface', function() {
  it('should export methods', function(){
    expect(helpers.setSalt).to.be.a('function');
    expect(helpers.addSingletonGetter).to.be.a('function');
    expect(helpers.generateRandomString).to.be.a('function');
    expect(helpers.generateRandomNumber).to.be.a('function');
    expect(helpers.hash).to.be.a('function');
    expect(helpers.hashVerify).to.be.a('function');
    expect(helpers.salt).to.be.a('function');
    expect(helpers.urlify).to.be.a('function');
    expect(helpers.truncateArgs).to.be.a('function');
    expect(helpers.pushCopy).to.be.a('function');
    expect(helpers.getUserHome).to.be.a('function');
  });
});

describe('Test "setSalt" method', function () {
  it('should set the internal salt var', function () {
    helpers.setSalt('custom salt');
    expect(helpers.__salt).to.equal('custom salt');
  });
});

describe('Test "addSingletonGetter" method', function () {
  it('should create a singleton Ctor', function () {
    function Ctor() {
      this.a = 1;
    }

    helpers.addSingletonGetter(Ctor);

    var instance = Ctor.getInstance();
    instance.a++;

    var second = Ctor.getInstance();
    expect(second.a).to.equal(2);
    expect(Ctor.getInstance().a).to.equal(2);
  });
});

describe('Test "generateRandomString" method', function () {
  it('should generate random strings as expected', function () {
    var res = helpers.generateRandomString();
    var res2 = helpers.generateRandomString();
    var res3 = helpers.generateRandomString(10);

    expect(res).to.have.length(32);
    expect(res2).to.have.length(32);
    expect(res).to.not.equal(res2);
    expect(res3).to.have.length(10);
  });
});

describe('Test "generateRandomNumber" method', function () {
  it('should generate random numbers?', function () {
    var res = helpers.generateRandomNumber();
    var res2 = helpers.generateRandomNumber();
    var res3 = helpers.generateRandomNumber(10);

    expect(res).to.have.length(20);
    expect(res2).to.have.length(20);
    expect(res).to.not.equal(res2);
    expect(res3).to.have.length(10);
    expect(res).to.match(/[\d]{20,20}/);
  });
});

describe('Test "hash" method', function () {
  it('should hash a string', function (done) {
    helpers.hash('string', function (err, hashed) {
      if (err) {
        done(err);
        return;
      }
      expect(hashed).to.not.equal('string');
      done();
    });
  });
});

describe('Test "hashVerify" method', function () {
  beforeEach(function (done) {
    var self = this;
    helpers.hash('string', function (err, hashed) {
      if (err) {
        done(err);
        return;
      }
      self.hashed = hashed;
      done();
    });
  });

  it('should properly verify an identical string', function (done) {
    helpers.hashVerify(this.hashed, 'string', function (match) {
      expect(match).to.be.true;
      done();
    });
  });
  it('should not verify a different string', function (done) {
    helpers.hashVerify(this.hashed, 'string2', function (match) {
      expect(match).to.be.false;
      done();
    });
  });
});

describe('Test "urlify" method', function () {
  it('should urlify a string', function () {
    var res = helpers.urlify('a name with spaces');
    expect(res).to.match(/[\d]{6,6}-a-name-with-spaces/);
  });
});

describe('Test "truncateArgs" method', function () {
  it('should truncate arguments', function () {
    function run(one, two, three) {
      expect(one).to.equal(1);
      expect(two).to.be.an('undefined');
      expect(three).to.be.an('undefined');
    }
    var cb = helpers.truncateArgs(run, 1);
    cb(1, 2, 3);
  });
  it('should apply context arguments', function () {
    function run(one, two, three) {
      expect(one).to.equal(1);
      expect(two).to.be.an('undefined');
      expect(three).to.be.an('undefined');
      expect(this.a).to.equal(1);
    }

    var obj = {
      a: 1,
    };
    var cb = helpers.truncateArgs(run, 1, obj);
    cb(1, 2, 3);
  });

});

describe('Test "pushCopy" method', function () {
  it('should copy an array using push', function () {
    var arDst = [1,2,3];
    var arSrc = [4,5,6];
    helpers.pushCopy(arSrc, arDst);

    expect(arDst).to.have.length(6);
  });
});

describe('Test "getUserHome" method', function () {
  it('should get the HOME path', function () {
    var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];

    var res = helpers.getUserHome();
    expect(res).to.equal(home);
  });
});

describe('Test "isNumber" method', function () {
  it('should pass the value: "-1"', function() {
    expect(helpers.isNumeric('-1')).to.be.true;
  });
  it('should pass the value: "-1.5"', function() {
    expect(helpers.isNumeric('-1.5')).to.be.true;
  });
  it('should pass the value: "0"', function() {
    expect(helpers.isNumeric('0')).to.be.true;
  });
  it('should pass the value: "0.42"', function() {
    expect(helpers.isNumeric('0.42')).to.be.true;
  });
  it('should pass the value: ".42"', function() {
    expect(helpers.isNumeric('.42')).to.be.true;
  });
  it('should pass the value: "99,999"', function() {
    expect(helpers.isNumeric('99,999')).to.be.false;
  });
  it('should pass the value: "0x89f"', function() {
    expect(helpers.isNumeric('0x89f')).to.be.true;
  });
  it('should pass the value: "#abc"', function() {
    expect(helpers.isNumeric('#abcde')).to.be.false;
  });
  it('should pass the value: "1.2.3"', function() {
    expect(helpers.isNumeric('1.2.3')).to.be.false;
  });
  it('should pass the value: ""', function() {
    expect(helpers.isNumeric('')).to.be.false;
  });
  it('should pass the value: "blah"', function() {
    expect(helpers.isNumeric('blah')).to.be.false;
  });
  it('should pass the value: " "', function() {
    expect(helpers.isNumeric(' ')).to.be.false;
  });
  it('should pass the value: "\t\t"', function() {
    expect(helpers.isNumeric('\t\t')).to.be.false;
  });
  it('should pass the value: "\n\r"', function() {
    expect(helpers.isNumeric('\n\r')).to.be.false;
  });
  it('should pass the value: -1', function() {
    expect(helpers.isNumeric(-1)).to.be.true;
  });
  it('should pass the value: 0', function() {
    expect(helpers.isNumeric(0)).to.be.true;
  });
  it('should pass the value: 1.1', function() {
    expect(helpers.isNumeric(1.1)).to.be.true;
  });
  it('should pass the value: 8e5', function() {
    expect(helpers.isNumeric(8e5)).to.be.true;
  });
});
