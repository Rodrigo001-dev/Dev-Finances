const Modal = {
  open() {
    document
      .querySelector('.modal-overlay')
      .classList.add('active')
  },
  close() {
    document
      .querySelector('.modal-overlay')
      .classList.remove('active')
  }
};

const transactions = [
  { id: 1, description: 'Luz', amount: -50000, date: '23/01/2021' },
  { id: 2, description: 'Website', amount: 500000, date: '23/01/2021' },
  { id: 3, description: 'Internet', amount: -20000, date: '23/01/2021' },
  { id: 4, description: 'App', amount: 200000, date: '23/01/2021' },
];

const Transaction = {
  incomes() {
    // somar entradas
  },
  expenses() {
    // somar saídas
  },
  total() {},
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  addTransaction(transaction, index) {
    //criando a tag tr
    const tr = document.createElement('tr');
    // inserindo o HTML dentro do tr
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction) {
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="expense">${transaction.amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    `;

    return html;
  },
};

// para cada item dentro do array eu rodo a função addTransaction e passo 
// transação do momento
transactions.forEach((transaction) => {
  DOM.addTransaction(transaction);
});