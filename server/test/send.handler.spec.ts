/*
	Test send handler
*/

class MockSendHandler {
	onMessage(message) {
		if (message.type === 'login') {
			return 'login';
		} else if (message.type === 'date') {
			return 'date';
		} else if (message.type === 'book') {
			return 'book';
		}
	}
}

let msgLogin = {
	type: 'login',
	email: '123',
	password: '123'
};

let msgDate = {
	type: 'date',
	idToken: '123',
	date: '2017-01-01'
};

let msgBook = {
	type: 'book',
	idToken: '123',
	time: '07:00 - 11:00',
	name: 'da'
};

describe('Test: SendHandler', () => {
	let mockSendHandler;
	beforeEach(() => {
		mockSendHandler = new MockSendHandler();
	});
	it('should equals login', () => {
		expect(mockSendHandler.onMessage(msgLogin)).toEqual('login');
	});

	it('should equals date', () => {
		expect(mockSendHandler.onMessage(msgDate)).toEqual('date');
	});

	it('should equals book', () => {
		expect(mockSendHandler.onMessage(msgBook)).toEqual('book');
	});
});
