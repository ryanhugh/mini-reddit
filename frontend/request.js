class Request {

  async main(url, config = {}) {
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
}

export default new Request();
