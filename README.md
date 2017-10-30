# mini reddit

Submittion for the Carousell codeing challenge

[minireddit.courseboard.io](https://minireddit.courseboard.io)

# Overview

The site itself is hosted on AWS. Node.js is used for the backend and React is used for the frontend. The topics are stored in RAM in Node.js on AWS. They are downloaded to the frontend when the user loads the page. When a user submits a new topic, it is uploaded to the server. Both the client and the server ensure that the text is valid. When the user upvotes or downvotes a topic, the client tells the server about the changes and then reloads the topics. The topics are sorted in the frontend. It is assumed that the number of topics is reasonably low and it will not take an unreasonable amount of time to processes them. More optimizations could be done if a very large number of topics is expected.



# Credits

Many files (a large chunk of server.js, the webpack config, index.html, index.js, package.json) were copied from another Node.js project of mine, [Search NEU](https://github.com/ryanhugh/searchneu). I made some changes to some of these files for this project. All the files inside the \_\_snapshots\_\_ directory were generated automatically by Jest. The SVG files were downloaded from the internet (https://www.iconfinder.com/search/?q=arrow). All the other files were written for this project. 


