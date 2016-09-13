var React = require('react');


var ZipSearchMessage = ({searchZip}) => {
    return (
      <p className='text-center'>Searching for doctors in {searchZip}</p>
    )
};

module.exports = ZipSearchMessage;
