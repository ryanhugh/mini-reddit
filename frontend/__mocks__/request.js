

class MockRequest {

  constructor(props) {

    this.data = [{"text":"f","score":1,"id":0},{"text":"Two","score":2,"id":1},{"text":"Three","score":3,"id":2}]
  }

  async main(url, body) {

    if (url === '/topics') {
      return this.data
    }

    else if (url == '/downvote') {
      this.data[body.id].score --;
    }

    else if (url == '/upvote') {
      this.data[body.id].score ++;
    }
    else if (url == '/newPost') {
      this.data.push({
        text: body.text,
        score: 0,
        id: this.data.lenght - 1
      })
    }
  }
}



export default new MockRequest();