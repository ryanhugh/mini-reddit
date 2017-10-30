import React from 'react';
import CSSModules from 'react-css-modules';
import { Panel, Navbar, FormControl , Button  } from 'react-bootstrap';
import css from './Home.css'
import request from './request'

// These SVG files were taken from here: https://www.iconfinder.com/search/?q=arrow
import down from './down.svg'
import up from './up.svg'

// Home page component
class Home extends React.Component {
  constructor(props) {
    super(props);

    // Keep track of the state of this component. 
    // Topics is the array of topics retrieved from the server.
    // Input is the current value of the text box. 
    this.state = {
      topics: [],
      input: ''
    };

    // Bind methods so 'this' references the instance of Home
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);

    // Start by downloading all the topics from the server
    this.fetchTopics();
  }

  // Download all the topics from the server. 
  async fetchTopics() {
    const topics = await request.main('/topics');

    this.setState({
      topics: topics
    })
  }

  // Verifies that the post if valid and then uploads it to the server. 
  async onSubmit () {
    if (!this.state.text || this.state.text.length > 255) {
      return;
    }

    await request.main('/newPost', {
        text: this.state.text,
    })

    this.fetchTopics();
  }

  // Updates this.state.text with the value from the text box. 
  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  // Tells the server to upvote a post
  async upvote(id) {
    await request.main('/upvote', {
        id: id
    })


    this.fetchTopics();
  }

  // Tells the server to downvote a post
  async downvote(id) {
    await request.main('/downvote', {
        id: id
    })


    this.fetchTopics();
  }

  // Renders the page. 
  render() {
    if (!this.state.topics) {
      return;
    }

    // Sort the topics. 
    let sortedTopics = this.state.topics.sort(function (a, b) {
      if (a.score > b.score) {
        return -1
      }
      else if (a.score < b.score) {
        return 1
      }
      else {
        return 0
      }
    })


    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Mini Reddit</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <div className="container bs-docs-container bs-docs-single-col-container">

          <form className={css.form}>
            <FormControl
              className={css.input}
              type="text"
              placeholder="Enter text"
              onChange={this.handleChange}
            />
           
            <Button onClick={this.onSubmit} className={css.submitButton}>
              Submit
            </Button>
          </form>

          {this.state.topics.map((topic) => {
            return (
              <Panel key={topic.id}>
                <span className={css.score}>
                  {topic.score}
                </span>

                <span className={css.imgContainer}>
                  <img src={up} className={css.arrowUp} onClick={this.upvote.bind(this, topic.id)}/>
                  <img src={down} className={css.arrowDown} onClick={this.downvote.bind(this, topic.id)}/>
                </span>

                <span className={css.text}>
                  {topic.text}
                </span>
              </Panel>
              )
          })}
        </div>
      </div>
    );
  }
}


export default CSSModules(Home, css);
