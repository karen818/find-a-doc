var React = require('react');

var ProviderFilter = React.createClass({
  handleSearch: function(){
    var searchText = this.refs.searchText.value;

    this.props.onSearch(searchText);
  },
  render: function() {
    return (
      <div>
        <div>
          <input type="search" ref="searchText" placeholder="Search for provider by name or specialty" onChange={this.handleSearch}></input>
        </div>
      </div>
    )
  }
});

module.exports = ProviderFilter;
