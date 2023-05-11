const Blockchain = require("./Blockchain");
const Block = require("./Block");

//////////////////
const Transaction = require("./Transaction");
//////////////////

describe("Blockchain", () => {
  let blockchain;

  beforeEach(() => (blockchain = new Blockchain()));

  it("should contain an Array of blocks", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("should start with the genesis block", () => {
    // expect(blockchain.chain[0]).toEqual(Block.genesis());
    expect(blockchain.chain.at(0)).toEqual(Block.genesis());
  });

  it("should add a new block to the chain", () => {

    ////////////
    const transaction = new Transaction("sender", "receiver", 55);
    blockchain.addBlock({ data: [transaction] });
    expect(blockchain.chain.at(-1).data).toEqual([transaction]);

    //////////////
  });

  describe("ChainIsValid", () => {
    describe("The genesis block is missing or not the first block in the chain", () => {
      it("should return false", () => {
        blockchain.chain[0] = "bad-block";
        expect(Blockchain.isValid(blockchain.chain)).toBe(false);
      });
    });

    describe("When the chain starts with the genesis block and consists of multiple blocks", () => {
      beforeEach(() => {

        
        //////////////////
        const transaction1 = new Transaction("sender1", "receiver1", 20);
        const transaction2 = new Transaction("sender2", "receiver2", 30);
        const transaction3 = new Transaction("sender3", "receiver3", 40);
        blockchain.addBlock({ data: [transaction1] });
        blockchain.addBlock({ data: [transaction2] });
        blockchain.addBlock({ data: [transaction3] });
      });
      //////////////////

      describe("and the lasthash as changed", () => {
        it("should return false", () => {
          blockchain.chain.at(2).lastHash = "ooops!!!";
          expect(Blockchain.isValid(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain contains a block with invalid information", () => {
        it("should return false", () => {
          blockchain.chain.at(1).data = "Very bad data";
          expect(Blockchain.isValid(blockchain.chain)).toBe(false);
        });
      });
    });
  });
});
