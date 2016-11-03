# Easymoney project details
-----

## Project structure

Here is a snapshot of the project global structure :


  - **<span style="color:royalblue">client</span>** : contains most of the code
  - <span style="color:yellow">index.html</span>
  - <span style="color:orange">main.js</span> : reducers initialization
  - <span style="color:orange">package.json</span> : all the dependencies used for the project
  - <span style="color:purple">ProjectDetails.md</span> : this file, describes the project in details
  - <span style="color:purple">README.md</span> : Installtion instructions and project summary
  - <span style="color:orange">webpack.config.js</span>

Here is a snapshot of the client folder :

  - **<span style="color:royalblue">app</span>** : contains the routes and the compiled js/css files
    - <span style="color:orange">app.js</span> : js code compiled from other js files used in the project
    - <span style="color:cyan">app.less</span> : app less css file, assembled from all the other less css files used in the project
    - <span style="color:orange">app.router.js</span>
    - **<span style="color:royalblue">foo</span>** : template folder to take as an example for development
    - **<span style="color:royalblue">home</span>**
  - **<span style="color:royalblue">components</span>** : equivalent to a model folder
    - **<span style="color:royalblue">reducers</span>**
  - **<span style="color:royalblue">config</span>**
    - <span style="color:orange">common.constants.js</span> : contains the constants of the project
  - <span style="color:yellow">index.html</span>

## Project tools

TODO

## Atom plugins used
  - *less-language* for less css pre-processor
  - *eslinter* to keep consistent code (See the eslintrc in the home folder)  
