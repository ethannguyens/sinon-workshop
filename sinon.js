Sinon.js

Recap:
	* What is test doubles? Test double is a replacement. Taking complicated and annoying function normally generate side effects and replace it with a friendly Test double. Those functions are Ajax, database calls, Timers.
	* What are 3 main types of test doubles?
		+ Spy: check what functions are doing without affecting their behaviour
		+ Stub: change behaviour of some function
		+ Mock: contaisn built-in verification and often used as an assertion

Sinon Sandbox

describe('some tests', function() { 
	var sandbox; 
	beforeEach(function() {
    	sandbox = sinon.sandbox.create();
	});
});

afterEach(function() { 
	sandbox.restore();
});

	* Cleaning up test doubles for every tests.
	* Avoid cascading faillure


SPY
	* Checking how many times a function was called
	* Checking whats arguments were passed to a function

Stub
	* replace problematic pieces of code
	* change behaviour of side effect function for you intended outcome

Mock
	* Can use stub but you need to verify multiple and more specific behaviours.




