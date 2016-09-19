var React = require('react');

var Provider = React.createClass({
  render: function(){
    var {providerName, providerSpecialty, providerStreet1, providerStreet2, providerCity} = this.props;

    return (
      <div>
        <h4>{providerName}</h4>
        <p>{providerSpecialty}</p>
        <p>{providerStreet1}, {providerStreet2}, {providerCity}</p>
      </div>
    )
  }
});

module.exports = Provider;
