document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Motivation" },
      { text: "The purpose of our lives is to be happy.", category: "Happiness" }
    ];
  
    function showRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
    }
  
    function createAddQuoteForm() {
      const formContainer = document.createElement('div');
      const newQuoteTextInput = document.createElement('input');
      newQuoteTextInput.setAttribute('id', 'newQuoteText');
      newQuoteTextInput.setAttribute('type', 'text');
      newQuoteTextInput.setAttribute('placeholder', 'Enter a new quote');
  
      const newQuoteCategoryInput = document.createElement('input');
      newQuoteCategoryInput.setAttribute('id', 'newQuoteCategory');
      newQuoteCategoryInput.setAttribute('type', 'text');
      newQuoteCategoryInput.setAttribute('placeholder', 'Enter quote category');
  
      const addQuoteButton = document.createElement('button');
      addQuoteButton.textContent = 'Add Quote';
      addQuoteButton.addEventListener('click', addQuote);
  
      formContainer.appendChild(newQuoteTextInput);
      formContainer.appendChild(newQuoteCategoryInput);
      formContainer.appendChild(addQuoteButton);
  
      document.body.appendChild(formContainer);
    }
  
    function addQuote() {
      const newQuoteText = document.getElementById('newQuoteText').value;
      const newQuoteCategory = document.getElementById('newQuoteCategory').value;
      if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
      } else {
        alert('Please enter both quote text and category.');
      }
    }
  
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
    // Display a random quote on initial load
    showRandomQuote();
  
    // Create the form for adding new quotes
    createAddQuoteForm();
  });
  