chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.brands) {
      fetchBrandData(request.brands);
    }
  });
  
  function fetchBrandData(brands) {
    const SHEET_ID = '1lM5yQNy5dpfE6sj3D2mclG-1lM5yQNy5dpfE6sj3D2mclG-sj2ofzaUcyOZeUNSTQYQ';
    const API_KEY = 'AIzaSyBU38J6tLbf5AaY9Ytt5KSAUBvXApuRzn8';
    const RANGE = 'Brands!A:D'; // Adjust the range according to your sheet
  
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const brandData = data.values.filter(row => brands.includes(row[1]));
        chrome.storage.local.set({ brandData });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  