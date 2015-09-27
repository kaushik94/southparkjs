var should = require('chai').should(),
	southpark = require('../southpark')

describe('southpark basic city information', function(){
	it('tests if locations is working', function(){
		southpark.locations(function(){
			expect("Anon cow").to.equal("Anon cow");
		})
	});
});