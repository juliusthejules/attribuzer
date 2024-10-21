document.addEventListener('DOMContentLoaded', function () {
    fetch('./attribution/attribution.xml')
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(data, 'text/xml');
            
            let title = xml.querySelector('credits > title').textContent;
            let projectUrl = xml.querySelector('credits > url').textContent;
            let creatorName = xml.querySelector('creator > name').textContent;
            let creatorUrl = xml.querySelector('creator > url').textContent;
            let licenseType = xml.querySelector('license > type').textContent;
            let licenseUrl = xml.querySelector('license > url').textContent;

            let attributionDiv = document.getElementById('attribution');
            attributionDiv.innerHTML = `
                <p><strong>Project:</strong> <a href="${projectUrl}" target="_blank">${title}</a></p>
                <p><strong>Creator:</strong> <a href="${creatorUrl}" target="_blank">${creatorName}</a></p>
                <p><strong>License:</strong> <a href="${licenseUrl}" target="_blank">${licenseType}</a></p>
            `;
        })
        .catch(error => console.error('Error loading attribution:', error));
});