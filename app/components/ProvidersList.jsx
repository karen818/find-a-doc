var React = require('react');


var ProvidersList = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    }
  },
  handleProviderSearch: function () {
    var that = this;

    this.setState({
      isLoading: true,
      searchZip: undefined,
      fipsCode: undefined
    });


  },
  render: function () {
    return(
      <div>
        <p>providers list here</p>
      </div>
    )
  }
});

module.exports = ProvidersList;
