const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrcodeDiv = document.getElementById('qrcode');
const saveBtn = document.getElementById('saveBtn'); // Get reference to save button

// Initialize QRCode object - we will update it later
let qrCodeInstance = null;

generateBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    saveBtn.style.display = 'none'; // Hide save button initially on each generate attempt

    if (!url) {
        alert('Please enter a URL');
        qrcodeDiv.innerHTML = ''; // Clear previous QR if input is empty
        return;
    }

    // Clear previous QR code
    qrcodeDiv.innerHTML = '';

    // Generate new QR code
    try {
        qrCodeInstance = new QRCode(qrcodeDiv, {
            text: url,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        saveBtn.style.display = 'inline-block'; // Show save button on success
    } catch (error) {
        console.error("Error generating QR code:", error);
        alert("Failed to generate QR code. Please check the console for errors.");
    }
});

// Add event listener for the save button
saveBtn.addEventListener('click', () => {
    const qrCodeImage = qrcodeDiv.querySelector('img');
    if (qrCodeImage && qrCodeImage.src) {
        const link = document.createElement('a');
        link.href = qrCodeImage.src;
        link.download = 'qrcode.png'; // Filename for the downloaded image
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Could not find the QR code image to save.");
    }
}); 
