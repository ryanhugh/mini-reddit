

// Model to keep track of the topics. 


class Topics {

  constructor(props) {

    // There are a couple different ways that it is possible to keep track of these topics. 

    // It would be possible to optimize for either direct topic access and store the topics in a hash map or optimize for sorting times and keep the topics in a list.
    //      This would make vote changing O(1) because we know where every item is, but would have to sort the topics ever time they are retrieved from the server. 

    // It would also be possible to keep the items sorted in memory. This would mean that the topics would not have to be sorted every time they are processed.
    //      However, it would mean that changing any information about topics is more complicated. This would require a linear scan of all the objects to find the one that the user is editing. 
    //      Then, once it is found, we may have to change the topic's location in the array if the score of the topic was changed. 

    // It would also be possible to have multiple data structures referencing the same objects. This would be complicated, however. 

    // I chose to stick with a simple array of topics to avoid over-engineering this problem. 
    // More optimizations could be done if we are expecting a very large number of topics or if the requirements change. 


    // Array to keep track of all the topics. 
    this.topics = [];
  }

  addTopic(text) {

    this.topics.push({
      text: text,
      score: 0,
      id: this.topics.length
    })
  }

  // Increase the score of a topic. 
  upvote(id) {
   if (!this.topics[id]) {
      res.send("Invalid id.")
      return;
    }

    this.topics[id].score ++;
  }

  // Decrease the score of a topic. 
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