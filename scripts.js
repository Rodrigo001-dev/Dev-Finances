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
  { description: 'Luz', amount: -50000, date: '23/01/2021' },
  { description: 'Website', amount: 500000, date: '23/01/2021' },
  { description: 'Internet', amount: -20000, date: '23/01/2021' },
  { description: 'App', amount: 200000, date: '23/01/2021' },
];

const Transaction = {
  all: transactions,

  add(transaction) {
    // O push esta entrelassado a um array e o push vai colocar dentro do array
    // alguma coisa
    Transaction.all.push(transaction);

    App.reload();
  },

  remove(index) {
    // o splice é aplicado em arrays e o splice vai esperar o número no index
    // dentro do array, ou seja, vai esperar qual a posição do array
    // o segundo parâmetro é quantos elementos eu vou deletar
    Transaction.all.splice(index, 1);

    App.reload();
  },

  incomes() {
    let income = 0;
    // para cada transação se for maior que zero vai somar os e colocar o valor
    // em uma variável
    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        // na primeira vez vai somar o income que é 0 e o amount, na segunda
        // vez que ele entrar aqui o income vai tger outro valor que vai ser o 
        // valor do amount que ele tinha somado antes e ele vai somar esse valor
        // com o valor de um novo amount
        income += transaction.amount; 
      };
    });
    return income;
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach(transaction => {
      // se for menor que zero vai somar os valores e colocar em uma variavel
      if (transaction.amount < 0) {
        expense += transaction.amount;
      };
    });
    return expense;
  },

  total() {
    // o total é a soma de incomes e expenses porque o expenses já tem um sinal
    // de negativo
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  addTransaction(transaction, index) {
    //criando a tag tr
    const tr = document.createElement('tr');
    // inserindo o HTML dentro do tr
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    //o index é a posição do array que vai estar guardado no objeto
    tr.dataset.index = index;

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
      </td>
    `;

    return html;
  },

  updateBalance() {
    document.
      getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes());

    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses());

    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total());
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
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

  formatAmount(value) {
    value = Number(value) * 100;

    return value;
  },

  formatDate(date) {
    // o split vai pegar e tirar o - e separa os valores que estavam sendo 
    // separados por - em 3 posições dentro de um array
    const splittedDate = date.split("-");

    // posição 2 está o dia,  posição 3 está o mês e a posição 0 está o ano
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },
};

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,  
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  validadeFields() {
    const { description, amount, date } = Form.getValues();

    if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
      throw new Error("Por favor, preencha todos os campos");
    }
  },
  
  formatValues() {
    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date
    };
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validadeFields();

      const transaction = Form.formatValues();
      Transaction.add(transaction);
      // apagar dados
      Form.clearFields();
      Modal.close();
    } catch (error) {
      alert(error.message)
    }
  },
};

const App = {
  init() {
    // para cada item dentro do array eu rodo a função addTransaction e passo 
    // transação do momento
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });

    DOM.updateBalance();

  },

  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();

Transaction.remove(0);