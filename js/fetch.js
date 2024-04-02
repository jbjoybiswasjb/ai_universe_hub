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
    
    const apiSection = document.getElementById('api_section');
    const apiDiv = document.createElement('div');
    apiDiv.classList.add('card', 'bg-base-100', 'p-[1.5625em]', 'border', 'border-blackColor/10');
    apiDiv.innerHTML = `
    <div class="card bg-base-100 p-[1.5625em] border border-blackColor/10">
        <figure class="rounded-2xl">
            <img src="images/chatgpt_assistant_1.png" alt="Chatgpt Assistant Image." title="Chat GPT Assistant Photo." />
        </figure>
        <div class="card-body p-0">
            <h2 class="card-title work-sans-semi-bold mt-[1.5625em] mb-4 text-blackColor">Features</h2>
            <ol class="text-base text-textColor work-sans-regular list-decimal pl-[1.5625em]">
                <li>Natural language processing</li>
                <li>Contextual understanding</li>
                <li>Text generation</li>
            </ol>
            <hr class="border border-blackColor/20 my-6">
            <div class="card-actions justify-between items-center">
                <div>
                    <h3 class="work-sans-semi-bold text-[1.5625em] text-blackColor mb-4">ChatGPT</h3>
                    <div class="text-base text-textColor work-sans-medium">
                        <span class="pr-[0.6875em]"><i class="far fa-calendar-alt"></i></span>
                        <span>11/01/2022</span>
                    </div>
                </div>
                <button class="btn flex-nowrap h-[3.125em] w-[3.125em] text-arrowColor bg-arrowBg rounded-full">
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>
    `;

    apiSection.appendChild(apiDiv);


}

loadAiData();