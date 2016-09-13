var React = require('react');
var FindADocForm = require('FindADocForm');
var ZipSearchMessage = require('ZipSearchMessage');
// var zipCountiesResponse = require('zipCountiesResponse');
// var mockapi = require('mockapi');

var FindADoc = React.createClass({
  getInitialState: function () {
    return {
      searchZip: '78749',
      fipsCode: ''
    }
  },
  handleSearchZip: function (searchZip) {
    this.setState({
      searchZip: searchZip
    });
    console.log(searchZip);
  },
  render: function() {
    var {searchZip} = this.state;

    function renderMessage(){
      return <ZipSearchMessage searchZip={searchZip}/>
    }
    return (
      <div>
        <div className='row'>
          <div className='columns small-11 medium-6 large-4 small-centered'>
            <h3 className='page-title'>Find A Doctor</h3>
            <FindADocForm onSearchZip={this.handleSearchZip} />
            {renderMessage()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FindADoc;
