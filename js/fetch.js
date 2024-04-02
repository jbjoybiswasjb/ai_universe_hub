// At first get data from api.
const loadAiData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const allApiData = data.data.tools;
    
    console.log(allApiData);
};

loadAiData();