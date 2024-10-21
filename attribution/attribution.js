async function loadAttribution() {
    try {
        // Fetch the XML file asynchronously
        const response = await fetch('./attribution/attribution.xml');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.text();

        // Parse the XML data
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");

        // Extract information from XML
        const title = xmlDoc.getElementsByTagName("title")[0]?.textContent || 'Unknown Project';
        const projectUrl = xmlDoc.getElementsByTagName("credits")[0]?.getElementsByTagName("url")[0]?.textContent || '#';
        const creatorName = xmlDoc.getElementsByTagName("creator")[0]?.getElementsByTagName("name")[0]?.textContent || 'Unknown Creator';
        const creatorUrl = xmlDoc.getElementsByTagName("creator")[0]?.getElementsByTagName("url")[0]?.textContent || '#';
        const licenseType = xmlDoc.getElementsByTagName("license")[0]?.getElementsByTagName("type")[0]?.textContent || 'Unknown License';
        const licenseUrl = xmlDoc.getElementsByTagName("license")[0]?.getElementsByTagName("url")[0]?.textContent || '#';
        
        // Create the HTML content to display
        const attributionHtml = `
            <p>
                <a href="${projectUrl}" target="_blank">${title}</a> 
                created by <a href="${creatorUrl}" target="_blank">${creatorName}</a>.
                <br> Licensed under <a href="${licenseUrl}" target="_blank">${licenseType}</a>.
            </p>
        `;

        // Insert the attribution HTML into the page
        document.getElementById('attribution').innerHTML = attributionHtml;
    } catch (error) {
        console.error('Error loading attribution:', error);
    }
}

// Run the function after the DOM content is loaded
document.addEventListener("DOMContentLoaded", loadAttribution);
