var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var FindADoc = require('FindADoc');

//Load foundation

$(document).foundation();

// app css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <div>
    <Router history={hashHistory}>
      <Route path='/' component={FindADoc}>
      </Route>
    </Router>
  </div>,
    document.getElementById('app')
);
