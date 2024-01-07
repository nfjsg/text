// Get the reference to the install button element
const installButton = document.getElementById('buttonInstall');

// Logic for handling Progressive Web App (PWA) installation

// Event listener for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the 'beforeinstallprompt' event for later use
    window.deferredPrompt = event;

    // Display the install button by removing the 'hidden' class
    installButton.classList.toggle('hidden', false);
});

// Click event listener for the install button
installButton.addEventListener('click', async () => {
    // Retrieve the stored 'beforeinstallprompt' event
    const promptEvent = window.deferredPrompt;

    // If the event is not stored, exit the function
    if (!promptEvent) {
        return;
    }

    // Show the installation prompt
    promptEvent.prompt();

    // Reset the deferredPrompt variable as it can only be used once
    window.deferredPrompt = null;

    // Hide the install button after the installation prompt is shown
    installButton.classList.toggle('hidden', true);
});

// Event listener for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    // Clear the deferredPrompt property
    window.deferredPrompt = null;

    // Log information about the PWA installation event
    console.log('Progressive Web App has been successfully installed', event);
});
