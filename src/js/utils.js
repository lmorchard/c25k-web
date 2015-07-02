exports.zeroPad = function zeroPad (value, length) {
  var padded = '' + '000' + parseInt(value);
  return padded.substr(padded.length - length);
};
