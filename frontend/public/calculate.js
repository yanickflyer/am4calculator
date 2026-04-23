document.getElementById('sendBtn').addEventListener('click', async () => {
    // 1. Collect Data
    const payload = {
        plane_eco: parseInt(document.getElementById('plane_eco').value) || 0,
        plane_business: parseInt(document.getElementById('plane_business').value) || 0,
        plane_first: parseInt(document.getElementById('plane_first').value) || 0,
        demand_eco: parseInt(document.getElementById('demand_eco').value) || 0,
        demand_business: parseInt(document.getElementById('demand_business').value) || 0,
        demand_first: parseInt(document.getElementById('demand_first').value) || 0
    };

    try {
        // 2. Send to Express server (which forwards to Flask)
        const response = await fetch('/calc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json(); // This is your {business: 10, economy: 100...}

        // 3. Update the UI with the return values
        document.getElementById('res-economy').innerText = data.economy;
        document.getElementById('res-business').innerText = data.business;
        document.getElementById('res-first').innerText = data.first_class;

        // 4. Reveal the card
        document.getElementById('results-card').classList.remove('hidden');
        
        // Optional: Smooth scroll to results on mobile
        document.getElementById('results-card').scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
        alert("Server connection failed. Is Flask running on port 5001?");
    }
});