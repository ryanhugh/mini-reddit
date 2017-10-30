


let data = [{"text":"f","score":1,"id":0},{"text":"Two","score":2,"id":1},{"text":"Three","score":3,"id":2}]

async function mockRequest(url, body) {

  if (url === '/topics') {
    return data
  }

  else if (url == '/downvote') {
    if (!data[body.id]) {
      console.trace('Invalid id', body.id)
      return;
    }

    data[body.id].score --;
  }

  else if (url == '/upvote') {
    if (!data[body.id]) {
      console.trace('Invalid id', body.id)
      return;
    }

    data[body.id].score ++;
  }
  else if (url == '/newPost') {
    data.push({
      text: body.text,
      score: 0,
      id: data.lenght - 1
    })
  }
}


export default mockRequest;