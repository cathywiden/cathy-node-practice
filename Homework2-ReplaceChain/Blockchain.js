const Block = require("./Block");
const crypto = require("./hash");
const Transaction = require("./Transaction");
const replaceChain = require("./ReplaceChain");


class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    if (
      !Array.isArray(data) ||
      data.some(
        (transaction) =>
          !(transaction instanceof Transaction && transaction.isValid())
      )
    ) {
      throw new Error(
        "Invalid data: must be an array of valid Transaction objects"
      );
    }

    const addedBlock = Block.mineBlock({ lastBlock: this.chain.at(-1), data });
    this.chain.push(addedBlock);
  }

  static isValid(chain) {
    if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis())) {
      // console.log("Genesis blocks do not match.");
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, data, hash, lastHash } = chain.at(i);
      const prevHash = chain[i - 1].hash;

      if (lastHash !== prevHash) {
        // console.log("Last hash does not match previous hash.");
        return false;
      }

      const validHash = crypto(
        [timestamp, JSON.stringify(data), lastHash].sort().join(" ")
      );
      if (hash !== validHash) {
        // console.log("Hash is not valid.");
        return false;
      }
    }

    return true;
  }

  isValidChain(chain) {
    return Blockchain.isValid(chain);
  }

  //////////////
  replaceChain(newChain) {
    return replaceChain(this, newChain);
  }
  //////////////
}

module.exports = Blockchain;
