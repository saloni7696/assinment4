document.addEventListener('DOMContentLoaded', () => {
    const profileInfoContainer = document.querySelector('.profile-info');
    const searchButton = document.getElementById('search-btn');

    searchButton.addEventListener('click', async () => {
        const username = document.getElementById('search').value;
        if (!username) {
            alert('Please enter a username.');
            return;
        }

        const url = `https://linkedin-api8.p.rapidapi.com/?username=${username}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '103128e06emsh9c3d9c2c93bba2bp1c80ccjsn84f6646e2f95',
                'X-RapidAPI-Host': 'linkedin-api8.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);

            // Extract first name, last name, and profile picture URL from the response
            const firstName = data.firstName;
            const lastName = data.lastName;
            const profilePicUrl = data.profilePicture;
            const isOpenToWork = data.isOpenToWork;

            // Create an image element
            const img = document.createElement('img');
            img.src = profilePicUrl;
            img.alt = 'Profile Picture';

            // Display the extracted information
            profileInfoContainer.innerHTML = ''; // Clear previous content
            profileInfoContainer.appendChild(img);
            profileInfoContainer.innerHTML += `
                <p>First Name: ${firstName}</p>
                <p>Last Name: ${lastName}</p>
                <p>Is Open to Work: ${isOpenToWork}</p>
            `;

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again.');
        }
    });
});
// this is the ai that i used https://rapidapi.com/rockapis-rockapis-default/api/linkedin-api8
