// At first get data from api.
const loadAiData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const allApiData = data.data.tools;
    
    apiData(allApiData);
};

// Iterate all allApiData.
const apiData = (allApiData) => {
    allApiData.forEach(apiData => {
        
        showData(apiData);
    });
}

// Show all data on UI.
const showData = (apiData) => {
    
    console.log(apiData)

}

loadAiData();