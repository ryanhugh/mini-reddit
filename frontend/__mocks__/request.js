

class MockRequest {


	async main(url, config) {


		if (url === '/topics') {
			return [{"text":"f","score":1,"id":0},{"text":"Two","score":2,"id":1},{"text":"Three","score":3,"id":2}]
		}


	}
}



export default new MockRequest();