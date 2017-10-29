import React from 'react';
import CSSModules from 'react-css-modules';


let css = {}


// Home page component
class Home extends React.Component {
  constructor(props) {
	    super(props);

	    this.state = {
	    	topics: []
	    }

	    this.fetchPosts();
	}

  async request(url, config = {}) {
    if (!config.method) {
      config.method = 'GET'
    }  

    return new Promise((resolve, reject) => {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function onreadystatechange() {
        if (xmlhttp.readyState !== 4) {
          return;
        }

        const requestTime = Date.now() - startTime;

        if (xmlhttp.status !== 200) {
          console.error("There was an error downloading", url, config)
          reject(err);
          return;
        }

        const response = JSON.parse(xmlhttp.response);

        resolve(response);
      };

      xmlhttp.open(config.method, url, true);
      if (config.body && config.method == "POST") {
        xmlhttp.send(config.body);
      }
      else {
        xmlhttp.send();
      }
    });
  }

	async fetchPosts() {
		let posts = await this.request('/posts');



	}

	render() {
		return (
			<div>jfdljafls</div>
		);
	}
}




export default CSSModules(Home, css);
