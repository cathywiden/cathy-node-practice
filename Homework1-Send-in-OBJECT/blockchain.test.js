const Blockchain = require('./Blockchain');
const Block = require('./Block');

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => (blockchain = new Blockchain()));

  // Test 1. kontrollerar att chain är av typen Array
  // chain är en egenskap som kommer att finnas i blockchain klassen
  it('should contain an Array of blocks', () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  // Test 2. listan(array) ska alltid börja med ett genesis block...
  it('should start with the genesis block', () => {
    // expect(blockchain.chain[0]).toEqual(Block.genesis());
    expect(blockchain.chain.at(0)).toEqual(Block.genesis());
  });

  // Test 3. Det ska gå att lägga till ett nytt block i listan...
  // metoden kommer heta addBlock...
  // Kontrollen går ut på att titta på sista elementet i listan
  // och jämföra det med det vi adderar...
  it('should add a new block to the chain', () => {
    ////////////
    const data = { text: "New Data" };
    //////////////
    blockchain.addBlock({ data });
    // expect(blockchain.chain[blockchain.chain.length -1]).toEqual(data)
    expect(blockchain.chain.at(-1).data).toEqual(data);
  });

  describe('ChainIsValid', () => {
    describe('The genesis block is missing or not the first block in the chain', () => {
      it('should return false', () => {
        blockchain.chain[0] = 'bad-block';
        expect(Blockchain.isValid(blockchain.chain)).toBe(false);
      });
    });

    describe('When the chain starts with the genesis block and consists of multiple blocks', () => {
      beforeEach(() => {


      //////////////////
        blockchain.addBlock({ data: { title: "Avatar" } });
        blockchain.addBlock({ data: { title: "Aquaman" } });
        blockchain.addBlock({ data: { title: "The Batman" } });
        blockchain.addBlock({ data: { title: "Iron Man" } });
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
