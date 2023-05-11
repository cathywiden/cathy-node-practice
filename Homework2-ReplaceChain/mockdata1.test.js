const Blockchain = require("./Blockchain");
const Transaction = require("./Transaction");

test("new chain is not longer", () => {
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

  // new chain that is shorter (1 block only)
  let newBlockchain = new Blockchain();

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
