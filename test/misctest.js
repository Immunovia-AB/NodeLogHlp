var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var assert = require('assert');
//var request = require('supertest')('http://localhost:8000/');
//var config = require("../config");
//var dynamodb = require("../dynamodb");
//var winstondynamodb = require("../winston-dynamodb");

describe("Config", function() {
    it("Set should return true with valid argument", function(done) {
        var res = require("../config").set('NodeLogHlp', 'unittestlog', __dirname);  
        expect(res).to.not.be.null;       
        assert.equal(res, true);
        done();        
    });
});

describe("Logger", function() {
    it("Info should return false without arguments", function(done) {
        var res = require("../config").set('NodeLogHlp', 'unittestlog', __dirname); 
        var logger = require("../logger"); 
        var res = logger.info();  
        expect(res).to.not.be.null;       
        assert.equal(res, false);
        done();        
    });
    it("Info should return true with valid argument", function(done) {
        var res = require("../config").set('NodeLogHlp', 'unittestlogg', __dirname); 
        var logger = require("../logger"); 
        var res = logger.info('Testing');    
        expect(res).to.not.be.null;       
        assert.equal(res, true);
        done();        
    });
    it("Changelevel should return false with invalid level", function(done) {
        var res = require("../config").set('NodeLogHlp', 'unittestlog', __dirname); 
        var logger = require("../logger"); 
        var res = logger.changelevel('TRACE', 'kalle');  
        expect(res).to.not.be.null;       
        assert.equal(res, false);
        done();        
    });
    it("Changelevel should return true with valid level", function(done) {
        var res = require("../config").set('NodeLogHlp', 'unittestlog', __dirname); 
        var logger = require("../logger"); 
        var res = logger.changelevel('INFO', 'kalle');      
        expect(res).to.not.be.null;       
        assert.equal(res, true);
        done();        
    });
});
