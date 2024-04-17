const apiKey = '103128e06emsh9c3d9c2c93bba2bp1c80ccjsn84f6646e2f95'; // Replace with your LinkedIn API key
        const apiUrl = 'https://api.linkedin.com/v2/'; // Base URL for LinkedIn API

        const searchInput = document.querySelector('.search');
        const searchButton = document.querySelector('.submit');
        const profileInfo = document.querySelector('.profile-info');

        searchButton.addEventListener('click', fetchUserProfile);

        function fetchUserProfile() {
            const username = searchInput.value.trim();

            if (username === '') {
                alert('Please enter a LinkedIn username.');
                return;
            }

            const profileUrl = `${apiUrl}people/?q=username:${username}`;

            fetch(profileUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'cache-control': 'no-cache',
                    'X-Restli-Protocol-Version': '2.0.0'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display user profile information
                displayProfileInfo(data.elements[0]);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }

        // Function to display user profile information
        function displayProfileInfo(profileData) {
            const profileDetails = `
                <h2>${profileData.firstName} ${profileData.lastName}</h2>
                <p>Headline: ${profileData.headline}</p>
                <!-- Add more profile details here -->
            `;
            profileInfo.innerHTML = profileDetails;
        }