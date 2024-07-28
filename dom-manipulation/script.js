document.addEventListener("DOMContentLoaded", () => {
  const quotes = JSON.parse(localStorage.getItem("quotes")) || [
    {
      text: "Life is what happens when you're busy making other plans.",
      category: "Life",
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      category: "Motivation",
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      category: "Perseverance",
    },
  ];

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const uniqueCategories = [
      ...new Set(quotes.map((quote) => quote.category)),
    ];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    uniqueCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
    categoryFilter.value = lastSelectedCategory;
  }

  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    lastSelectedCategory = selectedCategory;
    localStorage.setItem("lastSelectedCategory", lastSelectedCategory);

    const filteredQuotes =
      selectedCategory === "all"
        ? quotes
        : quotes.filter((quote) => quote.category === selectedCategory);
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const quote = filteredQuotes[randomIndex];
      const quoteDisplay = document.getElementById("quoteDisplay");
      quoteDisplay.innerHTML = `${quote.text} <br><br> <em>- ${quote.category}</em>`;
      sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
    } else {
      const quoteDisplay = document.getElementById("quoteDisplay");
      quoteDisplay.innerHTML = "No quotes available for the selected category.";
    }
  }

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `${quote.text} <br><br> <em>- ${quote.category}</em>`;
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
  }

  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("New quote added successfully!");
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
  }

  function createAddQuoteForm() {
    if (
      !document.getElementById("newQuoteText") &&
      !document.getElementById("newQuoteCategory")
    ) {
      const formContainer = document.createElement("div");
      formContainer.className = "form-container";

      const newQuoteTextInput = document.createElement("input");
      newQuoteTextInput.id = "newQuoteText";
      newQuoteTextInput.type = "text";
      newQuoteTextInput.placeholder = "Enter a new quote";

      const newQuoteCategoryInput = document.createElement("input");
      newQuoteCategoryInput.id = "newQuoteCategory";
      newQuoteCategoryInput.type = "text";
      newQuoteCategoryInput.placeholder = "Enter quote category";

      const addQuoteButton = document.createElement("button");
      addQuoteButton.id = "addQuote";
      addQuoteButton.textContent = "Add Quote";
      addQuoteButton.onclick = addQuote;

      formContainer.appendChild(newQuoteTextInput);
      formContainer.appendChild(newQuoteCategoryInput);
      formContainer.appendChild(addQuoteButton);

      document.body.appendChild(formContainer);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addQuote();
    }
  }

  // Event listeners
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteButton").addEventListener("click", addQuote);
  document
    .getElementById("exportQuotes")
    .addEventListener("click", exportQuotes);
  document.getElementById("addQuoteButton").addEventListener("Enter", addQuote);
  document
    .getElementById("importFile")
    .addEventListener("change", importFromJsonFile);

  document
    .getElementById("newQuoteText")
    .addEventListener("keydown", handleKeyDown);
  document
    .getElementById("newQuoteCategory")
    .addEventListener("keydown", handleKeyDown);

  const lastViewedQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  if (lastViewedQuote) {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `${lastViewedQuote.text} <br><br> <em>- ${lastViewedQuote.category}</em>`;
  } else {
    showRandomQuote();
  }
  
  populateCategories();
  filterQuotes();
  createAddQuoteForm();
});
