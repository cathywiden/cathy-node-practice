const Block = require('./Block');
const GENESIS_DATA = require('./config');
const crypto = require('./hash');

//////////////////
const Transaction = require("./Transaction");
//////////////////

describe('Block', () => {
  const timestamp = new Date().toString();
  const lastHash = "prev-hash";
  const hash = "curr-hash";
  const data = ["Avatar", "Ant-Man", "Cocaine Bear"];

  const block = new Block({ timestamp, data, hash, lastHash });

  it("should set a timestamp", () => {
   
    expect(block.timestamp).not.toEqual(undefined);
  });

  it("should set the data", () => {
    expect(block.data).toEqual(data);
  });

  it("should have a hash", () => {
    expect(block.hash).toEqual(hash);
  });

  it("should set the lasthash to the hash of the previous block", () => {
    expect(block.lastHash).toEqual(lastHash);
  });

  it("should return an instance of Block", () => {
    expect(block instanceof Block).toBe(true);
  });


  //////////////
  it("should create a block object of type Block", () => {
    const block = new Block({ timestamp, data, hash, lastHash });
    expect(block instanceof Block).toBe(true);
  });
  //////////////


});

describe('genesis function', () => {
  const genesisBlock = Block.genesis();

  it('(should return an instance of Block)', () => {
    expect(genesisBlock instanceof Block).toBeTruthy();
  });

  it('should return the genesis data', () => {
    expect(genesisBlock).toEqual(GENESIS_DATA);
  });
});

describe('mineBlock function', () => {
  const lastBlock = Block.genesis();

  //////////////
 const transaction = new Transaction("sender", "receiver", 55);

 const minedBlock = Block.mineBlock({ lastBlock, data: [transaction] });
  //////////////

  it("should return an instance of Block", () => {
    expect(minedBlock instanceof Block).toBeTruthy();
  });

  it("should set the lastHash to the hash of the previous block", () => {
    expect(minedBlock.lastHash).toEqual(lastBlock.hash);
  });

  //////////////
  it("should set the data", () => {
    expect(minedBlock.data).toEqual([transaction]);
  });
  //////////////

  it("should set a timestamp", () => {
    expect(minedBlock.timestamp).not.toEqual(undefined);
  });


  ///////////////////////////
  it("should create a hash based on input arguments", () => {
   expect(minedBlock.hash).toEqual(
     crypto(minedBlock.timestamp, lastBlock.hash, JSON.stringify([transaction]))
   );
  });

  it("should throw an error if data is not an array of transactions", () => {
    const lastBlock = Block.genesis();
    expect(() => {
      Block.mineBlock({ lastBlock, data: "not an array" });
    }).toThrowError("data must be an array of valid transactions");
  });
  ////////////////////////////
});
