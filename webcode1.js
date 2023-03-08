const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const results = document.querySelector('#search-results');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const searchTerm = input.value.trim();
  
  if (searchTerm === '') {
    return;
  }
  
  try {
    const response = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${searchTerm}`);
    const data = await response.json();
    
    results.innerHTML = '';
    
    data.forEach(brewery => {
      const name = document.createElement('h2');
      name.textContent = brewery.name;
      
      const type = document.createElement('p');
      type.textContent = `Type: ${brewery.brewery_type}`;
      
      const address = document.createElement('p');
      address.textContent = `Address: ${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
      
      const website = document.createElement('p');
      website.innerHTML = `Website: <a href="${brewery.website_url}">${brewery.website_url}</a>`;
      
      const phone = document.createElement('p');
      phone.textContent = `Phone: ${brewery.phone}`;
      
      const breweryInfo = document.createElement('div');
      breweryInfo.appendChild(name);
      breweryInfo.appendChild(type);
      breweryInfo.appendChild(address);
      breweryInfo.appendChild(website);
      breweryInfo.appendChild(phone);
      
      results.appendChild(breweryInfo);
    });
  } catch (error) {
    console.log(error);
  }
});
