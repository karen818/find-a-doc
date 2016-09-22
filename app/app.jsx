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
    <img src={'https://cdn.kindhealth.co/wp-content/uploads/2015/08/KND-logo.png'}/>
    <Router history={hashHistory}>
      <Route path='/' component={FindADoc}>
      </Route>
    </Router>
  </div>,
    document.getElementById('app')
);
