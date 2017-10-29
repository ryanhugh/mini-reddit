import React from 'react';
import CSSModules from 'react-css-modules';
import { Panel, Navbar, FormControl , Button  } from 'react-bootstrap';
import css from './Home.css'

// These were taken from here: https://www.iconfinder.com/search/?q=arrow
import down from './down.svg'
import up from './up.svg'

// Home page component
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      input: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);

    this.fetchTopics();
  }

  async request(url, body) {
    return new Promise((resolve, reject) => {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function onreadystatechange() {
        if (xmlhttp.readyState !== 4) {
          return;
        }

        if (xmlhttp.status !== 200) {
          console.error('There was an error downloading', url, body);
          reject();
          return;
        }

        resolve(JSON.parse(xmlhttp.response));
      };

      let method = 'GET'
      if (body) {
        method = 'POST'
      }

      xmlhttp.open(method, url, true);
      xmlhttp.setRequestHeader('Content-Type', 'application/json')
      if (body) {
        xmlhttp.send(JSON.stringify(body));
      } else {
        xmlhttp.send();
      }
    });
  }

  async fetchTopics() {
    const topics = await this.request('/topics');

    this.setState({
      topics: topics
    })

    console.log(topics)
  }

  async onSubmit () {
    if (!this.state.text || this.state.text.length > 255) {
      return;
    }


    await this.request('/newPost', {
        text: this.state.text,
    })

    this.fetchTopics();
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  async upvote(id) {
    await this.request('/upvote', {
        id: id
    })


    this.fetchTopics();
  }
  async downvote(id) {
    await this.request('/downvote', {
        id: id
    })


    this.fetchTopics();
  }

  render() {

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
