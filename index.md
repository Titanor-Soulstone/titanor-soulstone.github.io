---
layout: layouts/home.njk
---

# Hello World!

Welcome to my blog!

### Posts


# titanor-soulstone.github.io

---

[Titanor's Random Dimeshan Name Generator](https://titanor-soulstone.github.io/Titanors-Random-Dimeshan-Name-Generator/)

---



[![Dragon Cave: Adopt one today!](https://dragcave.net/image/HUZ3m.gif)](https://dragcave.net/view/HUZ3m)
[![Dragon Cave: Adopt one today!](https://dragcave.net/image/CazFE.gif)](https://dragcave.net/view/CazFE)
[![Dragon Cave: Adopt one today!](https://dragcave.net/image/zNJA2.gif)](https://dragcave.net/view/zNJA2)
[![Dragon Cave: Adopt one today!](https://dragcave.net/image/6HyRJ.gif)](https://dragcave.net/view/6HyRJ)

---

# My Dragon Hatchery
Click my eggs and hatchlings to help them grow!

<div class="hatchery" id="hatchery">Loading my scroll...</div>

<script>
    // Replace with your actual Dragon Cave username
    const scrollName = "TitanorSoulstone"; 

    async function loadHatchery() {
        try {
            // Fetches scroll data from the public Dragon Cave API view
            const response = await fetch(`https://dragcave.net/user/{scrollName}`);
            const data = await response.json();
            
            const hatcheryContainer = document.getElementById('hatchery');
            hatcheryContainer.innerHTML = ''; // Clear loading text

            // Filter for only eggs and hatchlings
            const youngDragons = data.dragons.filter(d => d.stage === 'egg' || d.stage === 'hatchling');

            if (youngDragons.length === 0) {
                hatcheryContainer.innerHTML = '<p>No eggs or hatchlings right now!</p>';
                return;
            }

            youngDragons.forEach(dragon => {
                const card = document.createElement('div');
                card.className = 'dragon-card';
                
                // Create the click link and image
                card.innerHTML = `
                    <a href="https://dragcave.net/v/{dragon.id}" target="_blank">
                        <img src="https://dragcave.net/image/{dragon.id}.gif" alt="Dragon Egg/Hatchling">
                    </a>
                    <small>Time left: ${dragon.hours_left}h</small>
                `;
                hatcheryContainer.appendChild(card);
            });

        } catch (error) {
            document.getElementById('hatchery').innerHTML = '<p>Failed to load dragons. Check scroll name.</p>';
            console.error(error);
        }
    }

    loadHatchery();
</script>
