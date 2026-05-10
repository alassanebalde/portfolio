function getRandomItems(array, numItems) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
}

fetch('./json/networkconfig.json')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    })

    .then(function (response) {
        console.log(response);

        const randomNetworkDevices = getRandomItems(response.network_devices, 6);

        let html = '<div class="accordion accordion-flush" id="accordionExample">';

        randomNetworkDevices.forEach((networkDevice, i) => {
            html += `<div class="accordion-item">

                <h2 class="accordion-header">
                    <button class="accordion-button collapsed text-lowercase fs-6 fw-bolder pt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                        ${networkDevice.name}
                    </button>
                </h2>

                <div id="collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="row justify-content-start">
                            <div class="col col-md-4 col-lg-4">
                                <img src="${networkDevice.image}" class="img-thumbnail float-start" alt="${networkDevice.name}">
                            </div>

                            <div class="col col-md-8 col-lg-8">
                                <span class="h6 mt-2">naam</span>: ${networkDevice.name}<br>
                                <span class="h6 mt-2">type</span>: ${networkDevice.type} van "${networkDevice.brand}"<br>
                                <span class="h6 mt-2">status</span>: ${networkDevice.status}
                            </div>
                        </div>

                        <br>${networkDevice.description}<hr>
                        <span class="h6 mt-2">locatie</span>: ${networkDevice.location.address}<br>
                        <span class="h6 mt-2">ip</span>: ${networkDevice.ip_address}
                    </div>
                </div>
            </div>`;
        });

        html += '</div>';
        document.getElementById("networkDevicesAccordion").innerHTML = html;
    })

    .catch(function (error) {
        console.error("Error with message: " + error);
    });

    const dropdownLink = document.querySelector('.dropdown > a');
    const dropdown = document.querySelector('.dropdown');

    dropdownLink.addEventListener('click', function(event) {
    event.preventDefault();
    dropdown.classList.toggle('active');
});

/* LEAFLET MAP */
const mapElement = document.getElementById('map');

if (mapElement) {

    const map = L.map('map').setView([51.2194, 4.4025], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([51.2194, 4.4025])
        .addTo(map)
        .bindPopup('Hoofdkantoor - Balde Technology, Antwerpen')
        .openPopup();
}
