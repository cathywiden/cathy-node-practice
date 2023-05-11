const Blockchain = require("./Blockchain");
const Transaction = require("./Transaction");
const replaceChain = require("./ReplaceChain");

describe("ReplaceChain", () => {
  let blockchain, newChain, originalChain;

  beforeEach(() => {
    blockchain = new Blockchain();
    newChain = new Blockchain();
    originalChain = blockchain.chain;
  });

  describe("when the new chain is not larger", () => {
    it("should not replace the chain", () => {
      newChain.chain[0] = { new: "chain" }; // shorter chain

      replaceChain(blockchain, newChain.chain);

      expect(blockchain.chain).toEqual(originalChain);
    });
  });

  describe("when the new chain is larger", () => {
    beforeEach(() => {
      const transaction = new Transaction("sender", "receiver", 55);
      newChain.addBlock({ data: [transaction] }); // making newChain longer
    });

    describe("but is invalid", () => {
      it("should not replace the chain", () => {
        newChain.chain[1].data = "Shit in the pancake"; // making newChain invalid

        // trying to replace with invaqlid chain. Invalid newChain should eb rejected.
        replaceChain(blockchain, newChain.chain);

        expect(blockchain.chain).toEqual(originalChain);
      });
    });

    describe("and when it is valid", () => {
      it("should replace the chain", () => {
        replaceChain(blockchain, newChain.chain);

        expect(blockchain.chain).toEqual(newChain.chain);
      });
    });
  });
});
