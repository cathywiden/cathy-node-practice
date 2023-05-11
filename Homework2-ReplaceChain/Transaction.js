class Transaction {
  constructor(sender, receiver, amount) {
    if (typeof sender !== "string" || sender.trim() === "") {
      throw new Error("Invalid sender");
    }

    if (typeof receiver !== "string" || receiver.trim() === "") {
      throw new Error("Invalid receiver");
    }

    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Invalid amount");
    }

    this.sender = sender.trim();
    this.receiver = receiver.trim();
    this.amount = amount;
  }

  isValid() {
    if (this.amount < 0) {
      return false;
    }
    return true;
  }
}

module.exports = Transaction;
