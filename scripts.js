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
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    `;

    return html;
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    // esta pegando o value transformando em Stringe fazendo uma
    // replace(subistituição) onde /\D/g quer dizer para ele procurar tudo que
    // não for numero e subistituir por nada("") 
    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    // transformando o valor em moeda brasileira
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    return signal + value;
  },
};

// para cada item dentro do array eu rodo a função addTransaction e passo 
// transação do momento
transactions.forEach((transaction) => {
  DOM.addTransaction(transaction);
});