const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this._currentBufferSize = 0;
  }

  _transform(chunk, encoding, callback) {
    const chunkByteSize = Buffer.byteLength(chunk, encoding);
    if (this.limit - this._currentBufferSize >= chunkByteSize) { 
      this._currentBufferSize += chunkByteSize;
      callback(null, chunk);
    } else callback(new LimitExceededError, null);
  }
}

module.exports = LimitSizeStream;
