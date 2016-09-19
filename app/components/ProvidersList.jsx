var React = require('react');
var Provider = require('Provider');


var ProvidersList = React.createClass({
  render: function () {
    var {providers} = this.props;
    var renderProviders = () => {
      if(providers.length === 0){
        return (
          <p>No Results</p>
        )
      }
      return providers.map((provider) => {
        return (
          <Provider key={provider.id} {...provider}/>
        );
      });
    };
    return (
      <div>
        {renderProviders()}
      </div>
    )
  }
});

module.exports = ProvidersList;
