/* ===============================
   DADOS DA DEMONSTRAÇÃO
================================ */

const categories = [
  {
    name: "Carnes",
    code: "CA",
    total: 2780,
    purchases: 18
  },
  {
    name: "Queijos e frios",
    code: "QF",
    total: 1530,
    purchases: 14
  },
  {
    name: "Pães",
    code: "PA",
    total: 1120,
    purchases: 26
  },
  {
    name: "Hortifruti",
    code: "HF",
    total: 620,
    purchases: 19
  },
  {
    name: "Bebidas",
    code: "BE",
    total: 940,
    purchases: 11
  },
  {
    name: "Embalagens",
    code: "EM",
    total: 710,
    purchases: 8
  }
];


const suppliers = [
  {
    name: "Casa das Carnes",
    type: "Carnes e proteínas",
    initials: "CC",
    purchases: 8,
    total: 3240
  },
  {
    name: "Panificadora Central",
    type: "Pães",
    initials: "PC",
    purchases: 12,
    total: 1120
  },
  {
    name: "Hortifruti Ideal",
    type: "Hortifruti",
    initials: "HI",
    purchases: 9,
    total: 820
  },
  {
    name: "Distribuidora Brasil",
    type: "Bebidas",
    initials: "DB",
    purchases: 6,
    total: 1490
  },
  {
    name: "Frios Imperial",
    type: "Frios e laticínios",
    initials: "FI",
    purchases: 7,
    total: 1530
  },
  {
    name: "Pack Embalagens",
    type: "Embalagens",
    initials: "PE",
    purchases: 5,
    total: 710
  }
];


const transactions = [
  {
    date: "16/09/2026",
    description: "Compra semanal",
    supplier: "Casa das Carnes",
    category: "Carnes",
    value: 1240
  },
  {
    date: "15/09/2026",
    description: "Produtos de padaria",
    supplier: "Panificadora Central",
    category: "Pães",
    value: 380
  },
  {
    date: "14/09/2026",
    description: "Reposição hortifruti",
    supplier: "Hortifruti Ideal",
    category: "Hortifruti",
    value: 465.90
  },
  {
    date: "13/09/2026",
    description: "Reposição de bebidas",
    supplier: "Distribuidora Brasil",
    category: "Bebidas",
    value: 890
  },
  {
    date: "12/09/2026",
    description: "Compra de mussarela",
    supplier: "Frios Imperial",
    category: "Queijos e frios",
    value: 620
  },
  {
    date: "11/09/2026",
    description: "Embalagens delivery",
    supplier: "Pack Embalagens",
    category: "Embalagens",
    value: 310
  }
];


/* ===============================
   FORMATADOR
================================ */

function money(value){

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

}


/* ===============================
   NAVEGAÇÃO
================================ */

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

navItems.forEach(item => {

  item.addEventListener("click", () => {

    openPage(item.dataset.page);

    document.querySelector(".sidebar").classList.remove("open");

  });

});


document.querySelectorAll("[data-go]").forEach(button => {

  button.addEventListener("click", () => {

    openPage(button.dataset.go);

  });

});


function openPage(pageId){

  pages.forEach(page => {
    page.classList.remove("active");
  });

  navItems.forEach(item => {
    item.classList.remove("active");
  });

  const targetPage = document.getElementById(pageId);

  if(targetPage){
    targetPage.classList.add("active");
  }

  const targetNav = document.querySelector(
    `.nav-item[data-page="${pageId}"]`
  );

  if(targetNav){
    targetNav.classList.add("active");
  }

  const pageName = targetNav
    ? targetNav.textContent.trim().replace(/[0-9]/g, "")
    : "Dashboard";

  document.querySelector(".page-title h1").textContent = pageName;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ===============================
   MENU MOBILE
================================ */

document.getElementById("menuButton")
  .addEventListener("click", () => {

    document.querySelector(".sidebar")
      .classList.toggle("open");

  });


/* ===============================
   CATEGORIAS
================================ */

function renderCategories(){

  const grid = document.getElementById("categoryGrid");

  grid.innerHTML = "";

  categories.forEach(category => {

    const card = document.createElement("article");

    card.className = "category-card";

    card.innerHTML = `

      <div class="category-card-top">

        <div class="category-symbol">
          ${category.code}
        </div>

        <button>•••</button>

      </div>

      <h3>${category.name}</h3>

      <p>
        ${category.purchases} lançamentos neste mês
      </p>

      <div class="category-total">

        <span>Total mensal</span>

        <strong>
          ${money(category.total)}
        </strong>

      </div>

    `;

    grid.appendChild(card);

  });

}


/* ===============================
   FORNECEDORES
================================ */

function renderSuppliers(){

  const grid = document.getElementById("supplierGrid");

  grid.innerHTML = "";

  suppliers.forEach(supplier => {

    const card = document.createElement("article");

    card.className = "supplier-card";

    card.innerHTML = `

      <div class="supplier-header">

        <div class="supplier-avatar">
          ${supplier.initials}
        </div>

        <div>
          <strong>${supplier.name}</strong>
          <span>${supplier.type}</span>
        </div>

      </div>

      <div class="supplier-stats">

        <div>
          <span>COMPRAS</span>
          <strong>${supplier.purchases}</strong>
        </div>

        <div>
          <span>TOTAL</span>
          <strong>${money(supplier.total)}</strong>
        </div>

      </div>

    `;

    grid.appendChild(card);

  });

}


/* ===============================
   TRANSAÇÕES
================================ */

function renderTransactions(data = transactions){

  const table = document.getElementById("allTransactions");

  table.innerHTML = "";

  data.forEach(transaction => {

    const row = document.createElement("tr");

    row.innerHTML = `

      <td>${transaction.date}</td>

      <td>
        <strong>${transaction.description}</strong>
      </td>

      <td>${transaction.supplier}</td>

      <td>
        <span class="category-tag">
          ${transaction.category}
        </span>
      </td>

      <td class="value">
        ${money(transaction.value)}
      </td>

    `;

    table.appendChild(row);

  });

}


/* ===============================
   PESQUISA
================================ */

document.getElementById("transactionSearch")
  .addEventListener("input", event => {

    const search = event.target.value.toLowerCase();

    const result = transactions.filter(transaction => {

      return (
        transaction.description.toLowerCase().includes(search) ||
        transaction.supplier.toLowerCase().includes(search) ||
        transaction.category.toLowerCase().includes(search)
      );

    });

    renderTransactions(result);

  });


/* ===============================
   MODAL GASTO
================================ */

const expenseModal =
  document.getElementById("expenseModal");

const openExpense =
  document.getElementById("openExpense");

const closeExpense =
  document.getElementById("closeExpense");

const cancelExpense =
  document.getElementById("cancelExpense");


function showExpenseModal(){

  expenseModal.classList.add("show");

}


function hideExpenseModal(){

  expenseModal.classList.remove("show");

}


openExpense.addEventListener(
  "click",
  showExpenseModal
);


document.querySelectorAll(".open-expense")
  .forEach(button => {

    button.addEventListener(
      "click",
      showExpenseModal
    );

  });


closeExpense.addEventListener(
  "click",
  hideExpenseModal
);


cancelExpense.addEventListener(
  "click",
  hideExpenseModal
);


/* ===============================
   SALVAR GASTO
================================ */

document.getElementById("expenseForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    const date =
      document.getElementById("expenseDate").value;

    const value =
      Number(document.getElementById("expenseValue").value);

    const category =
      document.getElementById("expenseCategory").value;

    const supplier =
      document.getElementById("expenseSupplier").value ||
      "Não informado";

    const description =
      document.getElementById("expenseDescription").value ||
      "Novo lançamento";


    const formattedDate =
      date
        ? date.split("-").reverse().join("/")
        : "Hoje";


    transactions.unshift({

      date: formattedDate,
      description,
      supplier,
      category,
      value

    });


    renderTransactions();

    hideExpenseModal();

    event.target.reset();

    showToast(
      "Lançamento salvo",
      `${money(value)} adicionado em ${category}.`
    );

  });


/* ===============================
   NOVA CATEGORIA
================================ */

const categoryModal =
  document.getElementById("categoryModal");


document.getElementById("newCategory")
  .addEventListener("click", () => {

    categoryModal.classList.add("show");

  });


document.querySelectorAll(".close-category")
  .forEach(button => {

    button.addEventListener("click", () => {

      categoryModal.classList.remove("show");

    });

  });


document.getElementById("saveCategory")
  .addEventListener("click", () => {

    const input =
      document.getElementById("categoryName");

    const name = input.value.trim();

    if(!name){
      return;
    }

    const code =
      name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0,2)
        .toUpperCase();


    categories.push({

      name,
      code,
      total: 0,
      purchases: 0

    });


    renderCategories();

    input.value = "";

    categoryModal.classList.remove("show");

    showToast(
      "Categoria criada",
      `${name} foi adicionada ao negócio.`
    );

  });


/* ===============================
   NOVO FORNECEDOR DEMO
================================ */

document.getElementById("newSupplier")
  .addEventListener("click", () => {

    const name = prompt(
      "Nome do fornecedor:"
    );

    if(!name){
      return;
    }

    const initials =
      name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0,2)
        .toUpperCase();


    suppliers.push({

      name,
      type: "Fornecedor",
      initials,
      purchases: 0,
      total: 0

    });


    renderSuppliers();

    showToast(
      "Fornecedor criado",
      `${name} foi cadastrado.`
    );

  });


/* ===============================
   UPLOAD NOTA
================================ */

document.getElementById("invoiceFile")
  .addEventListener("change", event => {

    const file = event.target.files[0];

    if(!file){
      return;
    }

    showToast(
      "Documento recebido",
      `${file.name} está pronto para processamento.`
    );

  });


/* ===============================
   TOAST
================================ */

let toastTimeout;

function showToast(title, message){

  const toast =
    document.getElementById("toast");

  toast.querySelector("strong").textContent =
    title;

  toast.querySelector("span").textContent =
    message;

  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}


/* ===============================
   GRÁFICO PRINCIPAL
================================ */

const expenseCanvas =
  document.getElementById("expenseChart");


new Chart(expenseCanvas, {

  type: "line",

  data: {

    labels:[
      "01 Set",
      "05 Set",
      "10 Set",
      "15 Set",
      "20 Set",
      "25 Set",
      "30 Set"
    ],

    datasets:[{

      data:[
        720,
        1620,
        2480,
        4010,
        5480,
        6890,
        8450
      ],

      borderColor:"#147d64",

      backgroundColor:"rgba(20,125,100,.08)",

      borderWidth:2,

      fill:true,

      tension:.4,

      pointRadius:0,

      pointHoverRadius:4

    }]

  },

  options:{

    responsive:true,

    maintainAspectRatio:false,

    plugins:{
      legend:{
        display:false
      }
    },

    scales:{

      x:{

        grid:{
          display:false
        },

        border:{
          display:false
        },

        ticks:{
          color:"#98a2b3",
          font:{
            size:9
          }
        }

      },

      y:{

        border:{
          display:false
        },

        grid:{
          color:"#eef1f4"
        },

        ticks:{
          color:"#98a2b3",

          font:{
            size:9
          },

          callback:value =>
            "R$ " + value / 1000 + "k"

        }

      }

    }

  }

});


/* ===============================
   DONUT
================================ */

new Chart(
  document.getElementById("categoryChart"),
  {

    type:"doughnut",

    data:{

      labels:[
        "Carnes",
        "Frios",
        "Pães",
        "Outros"
      ],

      datasets:[{

        data:[
          2780,
          1530,
          1120,
          3020
        ],

        backgroundColor:[
          "#147d64",
          "#4e6e81",
          "#9a7c4a",
          "#cbd3da"
        ],

        borderWidth:0

      }]

    },

    options:{

      responsive:true,

      maintainAspectRatio:false,

      cutout:"78%",

      plugins:{
        legend:{
          display:false
        }
      }

    }

  }
);


/* ===============================
   RELATÓRIO
================================ */

new Chart(
  document.getElementById("monthlyChart"),
  {

    type:"bar",

    data:{

      labels:[
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set"
      ],

      datasets:[{

        data:[
          6120,
          6580,
          7020,
          7480,
          8063,
          8450
        ],

        backgroundColor:"#147d64",

        borderRadius:5,

        barThickness:40

      }]

    },

    options:{

      responsive:true,

      maintainAspectRatio:false,

      plugins:{
        legend:{
          display:false
        }
      },

      scales:{

        x:{

          grid:{
            display:false
          },

          border:{
            display:false
          }

        },

        y:{

          border:{
            display:false
          },

          grid:{
            color:"#eef1f4"
          }

        }

      }

    }

  }
);


/* ===============================
   INICIALIZAÇÃO
================================ */

renderCategories();
renderSuppliers();
renderTransactions();
