//https://places-dsn.algolia.net/1/places/query ==> requete POST
//http://www.omdbapi.com/?s=harry+potter&&apikey=adf1f2d7 ==> requete GET




const algoliaSearch = () => {
    const URL = "https://places-dsn.algolia.net/1/places/query";
    fetch(URL, {
        method: "POST",
        body: JSON.stringify({query: userInput.value})
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        if(userInput.value.length === 0){
            autocompleteList.style.display = 'none';
        }else{
            autocompleteList.style.display = 'block';
        }
        autocompleteList.innerHTML = '';
        data.hits.forEach((item) => {
            console.log(item.locale_names.default[0]);
            autocompleteList.insertAdjacentHTML('beforeend', `
            <a class="dropdown-item" href="#">${item.locale_names.default[0]} ${item._geoloc.lat} ${item._geoloc.lng}</a>
            `)
        });
    })
    .catch((error) => {
        console.log("Voici mon erreur" + ' ' + error.message)
    });
};

const autocompleteList = document.querySelector('#autocomplete-list');
console.log(autocompleteList);
//document.querySelector('#userInput').focus();
const userInput = document.querySelector('#userInput');

userInput.addEventListener('keyup', algoliaSearch);