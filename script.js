const financeForm = document.getElementById('finance-form');
const transactionList = document.getElementById('transaction-list');
const themeToggle = document.getElementById('theme-toggle');
const clearBtn = document.getElementById('clear-data');

// Get data from localStorage or start with empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// 1. Dark Mode Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// 2. Add Transaction
financeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTransaction = {
        id: Date.now(),
        desc: document.getElementById('desc').value,
        amount: parseFloat(document.getElementById('amount').value),
        type: document.getElementById('type').value
    };

    transactions.push(newTransaction);
    saveAndRender();
    financeForm.reset();
});

// 3. Calculate and Show Data
function saveAndRender() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    let income = 0;
    let expense = 0;
    transactionList.innerHTML = '';

    transactions.slice().reverse().forEach(t => {
        if (t.type === 'income') income += t.amount;
        else expense += t.amount;

        const li = document.createElement('li');
        li.className = t.type === 'income' ? 'li-income' : 'li-expense';
        li.innerHTML = `
            <span>${t.desc}</span>
            <span style="color: ${t.type === 'income' ? '#22c55e' : '#ef4444'}">
                ${t.type === 'income' ? '+' : '-'}₹${t.amount}
            </span>
        `;
        transactionList.appendChild(li);
    });

    document.getElementById('total-income').innerText = `₹${income}`;
    document.getElementById('total-expense').innerText = `₹${expense}`;
    document.getElementById('total-balance').innerText = `₹${income - expense}`;
}

// 4. Clear All Data
clearBtn.addEventListener('click', () => {
    if(confirm("Clear all your history?")) {
        transactions = [];
        saveAndRender();
    }
});

// Initial Render
saveAndRender();