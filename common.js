document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
            // Remove 'active' class from all items
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

            // Add 'active' class to the clicked item
            this.classList.add('active');
        });
    });

    const displayBtn = document.getElementById('display-btn');
    const backBtn = document.getElementById('back-btn');
    const profileView = document.getElementById('profile-view');
    const settingsCard = document.getElementById('settings-card');

    // Display Settings Card
    displayBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent dropdown from closing
        profileView.style.display = 'none';
        settingsCard.style.display = 'block';
    });

    // Back to Profile View
    backBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent dropdown from closing
        settingsCard.style.display = 'none';
        profileView.style.display = 'block';
    });

    const darkModeToggle = document.getElementById('darkModeToggle');

    // Function to enable dark mode
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled'); // Save preference
    }

    // Function to disable dark mode
    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled'); // Save preference
    }

    // Check saved dark mode preference on page load
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        darkModeToggle.checked = true;
    }

    // Toggle dark mode on switch click
    darkModeToggle.addEventListener('change', function () {
        if (darkModeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
});

