var should = require('chai').should(),
	expect = require("chai").expect,
	southpark = require('../southpark')

describe('southpark basic city information', function(){
	it('tests if locations is returning correct type of object', function(done){
		var check = function(list){
			Array.isArray(list).should.equal(true);
			done();
		}
		southpark.locations(check);
	});
});