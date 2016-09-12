var React = require('react');
var FindADocForm = require('FindADocForm');
// var zipCountiesResponse = require('zipCountiesResponse');
// var mockapi = require('mockapi');

var FindADoc = React.createClass({
  getInitialState: function () {
    return {
      searchZip: '78749',
      fipsCode: '48453'
    }
  },
  handleSearch: function () {
    console.log('handleSearch');
  },
  render: function() {
    var {searchZip} = this.state;
    return (
      <div>
        <h3 className='page-title'>Find A Doctor</h3>
        <FindADocForm onEnterZip={this.handleSearch} />
      </div>
    );
  }
});

module.exports = FindADoc;
