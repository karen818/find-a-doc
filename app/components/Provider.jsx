var React = require('react');


var Provider = React.createClass({
  render: function () {
    var {provName, provSpecialty, provStreet1, provStreet2, provCity} = this.props;
    return(
      <div className="callout">
        <h5>{provName}</h5>
        <p>{provSpecialty}</p>
        <p>{provStreet1} {provStreet2}, {provCity}</p>

      </div>
    )
  }
});

module.exports = Provider;
