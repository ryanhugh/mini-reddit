


// This is a list of all the topics. They are kept in order that they are added


// Could optimize for either upvotes and downvotes (hash map/list where nothing moves) to make vote changing O(1) but would have to sort every render O(n*log(n))
// Could also optimize for sorting (keep topics sorted) but then voting would be complicated (O(n) to find the topic and then worst case O(n) to insert this topic into the correct spot)
// Additional features, such as the ability to exit topics, would be easier 


class Topics {

  constructor(props) {

    // Array to keep track of all the posts. 
    this.topics = [];
  }

  addTopic(text) {

    this.topics.push({
      text: text,
      score: 0,
      id: this.topics.length
    })
  }

  upvote(id) {
   if (!this.topics[id]) {
      res.send("Invalid id.")
      return;
    }

    this.topics[id].score ++;
  }


  downvote(id) {
   if (!this.topics[id]) {
      res.send("Invalid id.")
      return;
    }

    this.topics[id].score --;
  }

  getTopics() {
    return this.topics;
  }

}


export default Topics;