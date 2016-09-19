var React = require('react');
var Provider = require('Provider');


var ProvidersList = React.createClass({
  render: function () {
    var {providers} = this.props;
    var renderProviders = () => {
      return providers.map((provider) => {
        return(
          <Provider key={provider.provId} {...provider}/>
        );
      });
    };
    return(
      <div>
        {renderProviders()}
      </div>
    )
  }
});

module.exports = ProvidersList;
