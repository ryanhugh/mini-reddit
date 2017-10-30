
// This file is a small wrapper around window.XMLHttpRequest 
// This file assumes that every post request sends and receives JSON
// and that every GET request receives JSON from the server. 

async function request(url, body) {
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
    if (body) {
      xmlhttp.setRequestHeader('Content-Type', 'application/json')
      xmlhttp.send(JSON.stringify(body));
    } else {
      xmlhttp.send();
    }
  });
}

export default request;