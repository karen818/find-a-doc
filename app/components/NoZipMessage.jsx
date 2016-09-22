var React = require('react');


var NoZipMessage = ({searchZip}) => {
    return (
      <div data-alert className="alert-box alert round">
      Sorry. There are no results for the zip code entered. Please try another zip code.
      </div>
    )
};

module.exports = NoZipMessage;
