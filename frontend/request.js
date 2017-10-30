class Request {

  async main(url, body) {
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
}

export default new Request();