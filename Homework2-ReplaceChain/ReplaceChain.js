function replaceChain(blockchainInstance, newChain, isValidChain) {
  // console.log("New chain being replaced:", JSON.stringify(newChain));

  if (newChain.length <= blockchainInstance.chain.length) {
    return blockchainInstance.chain;
  }

  if (!blockchainInstance.isValidChain(newChain)) {
    return blockchainInstance.chain;
  }

  blockchainInstance.chain = newChain;
  return newChain;
}

module.exports = replaceChain;
