const Blockchain = require("./Blockchain");
const Transaction = require("./Transaction");

test("new chain is longer but invalid", () => {
  // new blockchain instance
  let blockchain = new Blockchain();

  // mock data
  const sender = "Cathy";
  const receiver = "Johnny";
  const amount = 555;

  const transaction = new Transaction(sender, receiver, amount);
  blockchain.addBlock({ data: [transaction] });

  console.log(
    "Original blockchain: ",
    JSON.stringify(blockchain.chain, null, 2)
  );

  // create a new chain with two blocks
  let newBlockchain = new Blockchain();
  const transaction1 = new Transaction(sender, receiver, amount + 10);
  const transaction2 = new Transaction(sender, receiver, amount + 20);
  newBlockchain.addBlock({ data: [transaction1] });
  newBlockchain.addBlock({ data: [transaction2] });

  // exploit new chain so it's invalid
  newBlockchain.chain[1].data = "Invalid data";

  // attempt to replace
  blockchain.replaceChain(newBlockchain.chain);

  console.log(
    "Attempted new blockchain: ",
    JSON.stringify(newBlockchain.chain, null, 2)
  );
  console.log(
    "Update rejected. Original blockchain: ",
    JSON.stringify(blockchain.chain, null, 2)
  );

  expect(blockchain.chain.length).toEqual(2);
});
