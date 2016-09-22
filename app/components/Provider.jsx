var React = require('react');


var Provider = React.createClass({
  render: function () {
    var {provName, provSpecialty, provStreet1, provStreet2, provCity, provId} = this.props;
    return(
      <a href="#">
        <div className="khProviderCard" id={provId}>
          <h5>{provName}</h5>
          <p>{provSpecialty}</p>
          <p>{provStreet1} {provStreet2}, {provCity}</p>
        </div>
      </a>
    )
  }
});

module.exports = Provider;
