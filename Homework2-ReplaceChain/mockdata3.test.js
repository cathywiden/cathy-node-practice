const Blockchain = require("./Blockchain");
const Transaction = require("./Transaction");

test("add and replace chain", () => {

    // create a new blockchain instance
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

  // cvheck if the block has been added correctly
  expect(blockchain.chain.length).toEqual(2);
  expect(blockchain.chain[1].data[0]).toEqual(transaction);

  // new chain with two test blocks
  let newBlockchain = new Blockchain();
  const transaction1 = new Transaction(sender, receiver, amount + 10);
  const transaction2 = new Transaction(sender, receiver, amount + 20);
  newBlockchain.addBlock({ data: [transaction1] });
  newBlockchain.addBlock({ data: [transaction2] });

  // null: print all properties
  // 2: format with 2 spaces of indentation
  console.log("New blockchain: ", JSON.stringify(newBlockchain.chain, null, 2));

  blockchain.replaceChain(newBlockchain.chain);

  // print the updated chain formatted
  console.log(
    "Updated original blockchain: ",
    JSON.stringify(blockchain.chain, null, 2)
  );

  expect(blockchain.chain.length).toEqual(3);

  expect(blockchain.chain[1].data[0]).toEqual(transaction1);
  expect(blockchain.chain[2].data[0]).toEqual(transaction2);
});
