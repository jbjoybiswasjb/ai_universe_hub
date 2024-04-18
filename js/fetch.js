// At first get data from api.
const loadAiData = async (isSeeMoreButton) => {

    // Show loading spinner.
    const loadingSpinner = document.getElementById('loading_spinner_div');
    loadingSpinner.classList.remove('hidden');

    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    let allApiData = data.data.tools;

    // Show the loading spinner.
    if (allApiData.length > 0) {
        loadingSpinner.classList.add('hidden');
    }

    const seeMoreButton = document.getElementById('see_more_button');
    // Hide see more button.
    if (allApiData.length > 6 && !isSeeMoreButton) {
        seeMoreButton.classList.remove('hidden');
    }
    else {
        seeMoreButton.classList.add('hidden');
    }

    // Limit 6 ai data on UI.
    if (!isSeeMoreButton) {
        allApiData = allApiData.slice(0, 6);
    }

    else {
        allApiData = allApiData.slice(6);
    }

    apiData(allApiData);
};

// Iterate all allApiData.
const apiData = (allApiData) => {
    allApiData.forEach(apiData => {

        showData(apiData);

        // const features = apiData.features;
        // for (const feature of features) {
        //     return feature;
        // }
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
            <img src="${apiData?.image ? apiData?.image : 'No image found.'}" alt="Image not found." title="${apiData?.name} image"/>
        </figure>
        <div class="card-body p-0">
            <h2 class="card-title work-sans-semi-bold mt-[1.5625em] mb-4 text-blackColor">Features</h2>
            <ol class="text-base text-textColor work-sans-regular list-decimal pl-[1.5625em]">
                <li>${apiData?.features[0]}</li>
                <li>${apiData?.features[1]}</li>
                <li>${apiData?.features[2]}</li>
                <li>${apiData?.features[3] ? apiData?.features[3] : 'No data found.'}</li>
            </ol>
            <hr class="border border-blackColor/20 my-6">
            <div class="card-actions justify-between items-center">
                <div>
                    <h3 class="work-sans-semi-bold text-[1.5625em] text-blackColor mb-4">${apiData?.name}</h3>
                    <div class="text-base text-textColor work-sans-medium">
                        <span class="pr-[0.6875em]"><i class="far fa-calendar-alt"></i></span>
                        <span>${apiData?.published_in}</span>
                    </div>
                </div>
                <button class="btn flex-nowrap h-[3.125em] w-[3.125em] text-arrowColor bg-arrowBg rounded-full" onclick="openAiModal('${apiData.id}')">
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>
    `;

    apiSection.appendChild(apiDiv);


}



// For show all button.
const seeMoreButton = () => {
    loadAiData(true);
}


// Get modal data for open ai modal.
const openAiModal = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const modalData = await res.json();
    const aiDetails = modalData.data;
    console.log(aiDetails);

    // Show open ai modal.
    const aiModalContainer = document.getElementById('ai_modal_container');
    aiModalContainer.innerHTML = `
    <!-- Modal body. -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5 p-1">

        <div class="border border-buttonBg p-4 lg:p-[1.875em] rounded-2xl bg-arrowColor/10">
            <h2 class="text-[1.5625em] work-sans-semi-bold">
                ${aiDetails?.description}
            </h2>
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 inter-extra-bold text-base my-[1.5625em]">
                <div
                    class="p-6 rounded-2xl bg-whiteColor flex justify-center items-center text-center text-modalGreenText">
                        ${aiDetails?.pricing ? aiDetails?.pricing[0]?.price : aiDetails?.pricing} ${aiDetails?.pricing ? aiDetails?.pricing[0]?.plan : aiDetails?.pricing}
                    </div>
                <div
                    class="p-6 rounded-2xl bg-whiteColor flex justify-center items-center text-center text-modalOrangeText">
                        ${aiDetails?.pricing ? aiDetails?.pricing[1]?.price : aiDetails?.pricing} ${aiDetails?.pricing ? aiDetails?.pricing[1]?.plan : aiDetails?.pricing}
                    </div>
                <div
                    class="p-6 rounded-2xl bg-whiteColor flex justify-center items-center text-center text-arrowColor">
                        ${aiDetails?.pricing ? aiDetails?.pricing[2]?.price : aiDetails?.pricing} ${aiDetails?.pricing ? aiDetails?.pricing[2]?.plan : aiDetails?.pricing}
                    </div>
            </div>
            <div class="flex flex-col md:flex-row text-textColor mb-10 gap-8">
                <div>
                    <h2 class="work-sans-semi-bold text-blackColor text-[1.5625em] mb-4">Features</h2>
                    <ul class="text-base work-sans-regular space-y-1 list-disc pl-7">
                        <li>${aiDetails?.features[1]?.feature_name}</li>
                        <li>${aiDetails?.features[2]?.feature_name}</li>
                        <li>${aiDetails?.features[3]?.feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h2 class="work-sans-semi-bold text-blackColor text-[1.5625em] mb-4">Integrations
                    </h2>
                    <ul class="text-base work-sans-regular space-y-1 list-disc pl-7">
                        <li>${aiDetails?.integrations[0] ? aiDetails?.integrations[0] : 'No data found.'}</li>
                        <li>${aiDetails?.integrations[1] ? aiDetails?.integrations[1] : 'No data found.'}</li>
                        <li>${aiDetails?.integrations[2] ? aiDetails?.integrations[2] : 'No data found.'}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="p-[1.5625em] border border-modalRDivColor rounded-2xl relative">
            <div class="">
                <figure class="text-center flex justify-center">
                    <img src="${aiDetails?.image_link[0]}" class="rounded-xl" alt="Image not found." title="image"/>
                </figure>
            </div>
            <div class="card-body items-center text-center pb-0 mx-auto">
                <h2 class="card-title mb-4 work-sans-semi-bold text-[1.5625em] text-blackColor">
                    ${aiDetails?.input_output_examples ? aiDetails?.input_output_examples[0]?.input : 'Data not found.'}
                </h2>
                <p class="text-textColor text-base inter-regular">
                    ${aiDetails?.input_output_examples ? aiDetails?.input_output_examples[0]?.output : 'No! Not yet! Take a break!!!'}
                </p>
            </div>

            ${aiDetails?.accuracy?.score ? `<span class="px-[0.9375em] pt-[0.3125em] pb-2 bg-buttonBg text-whiteColor text-base work-sans-semi-bold rounded-lg absolute top-[2.3125em] right-[2em]"> ${aiDetails?.accuracy?.score} % accuracy </span>` : ``}
        </div>

    </div>

    <!-- Modal Button div. -->
    <div
        class="inline-block z-20 absolute right-0 top-0 translate-x-2/4 -translate-y-2/4 rounded-full">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
                class="btn bg-buttonBg flex-nowrap h-[.5em] md:h-[2em] lg:h-[3.25em] w-[.5em] md:w-[2em] lg:w-[3.25em] rounded-full">
                <span class="text-base lg:text-xl text-whiteColor">
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </button>
        </form>
    </div>
    `;

    ai_modal_details.showModal();
}


loadAiData('');