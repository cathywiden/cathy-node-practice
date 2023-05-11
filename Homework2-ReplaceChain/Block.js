const crypto = require("./hash");
const GENESIS_DATA = require("./config");

//////////////////
const Transaction = require("./Transaction");
//////////////////


class Block {
  constructor({ timestamp, data, hash, lastHash }) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  //////////////////
   static mineBlock({ lastBlock, data }) {
    if (!Array.isArray(data) || data.some(transaction => !(transaction instanceof Transaction && transaction.isValid()))) {
      throw new Error("data must be an array of valid transactions");
    }
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    return new this({
      timestamp,
      lastHash,
      data,
      hash: crypto(timestamp, lastHash, JSON.stringify(data)),
    });
  } 
  //////////////////
}

module.exports = Block;


