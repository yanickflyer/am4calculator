document.getElementById('spreadBtn').addEventListener('click', () => {
    // Collect demand inputs
    const eco = parseInt(document.getElementById('demand_only_eco').value) || 0;
    const bus = parseInt(document.getElementById('demand_only_business').value) || 0;
    const first = parseInt(document.getElementById('demand_only_first').value) || 0;

    // Convert roundtrip to one-way demand (divide by 2)
    const oneWayEco = eco / 2;
    const oneWayBus = bus / 2;
    const oneWayFirst = first / 2;
    const roundtripHours = parseFloat(document.getElementById('roundtrip_hours').value);
    const trips = roundtripHours > 0 ? Math.max(1, Math.floor(24 / roundtripHours)) : 1;

    const perTripEco = oneWayEco / trips;
    const perTripBus = oneWayBus / trips;
    const perTripFirst = oneWayFirst / trips;

    document.getElementById('trip-summary').textContent = `Trips in 24h: ${trips} · Demand per trip: Eco ${perTripEco.toFixed(1)}, Bus ${perTripBus.toFixed(1)}, First ${perTripFirst.toFixed(1)}`;

    // Populate the table
    const tbody = document.getElementById('spread-table-body');
    tbody.innerHTML = '';

    const classes = [
        { name: 'Economy', demand: perTripEco },
        { name: 'Business', demand: perTripBus },
        { name: 'First Class', demand: perTripFirst }
    ];

    const createSeatDistribution = (demand, aircraftCount) => {
        if (aircraftCount === 1) {
            return [Math.ceil(demand)];
        }

        const totalSeats = Math.round(demand);
        const base = Math.ceil(totalSeats / aircraftCount);
        const seats = Array(aircraftCount).fill(base);
        seats[aircraftCount - 1] = totalSeats - base * (aircraftCount - 1);
        return seats;
    };

    const createSeatCell = (seats) => {
        const cell = document.createElement('td');
        cell.className = 'p-3';

        if (seats.length === 1) {
            cell.textContent = seats[0];
            return cell;
        }

        const innerTable = document.createElement('table');
        innerTable.className = 'w-full text-xs border-collapse';
        const innerRow = document.createElement('tr');

        seats.forEach((seatCount, index) => {
            const innerCell = document.createElement('td');
            innerCell.className = 'border border-slate-600 p-1';
            innerCell.textContent = seatCount;
            innerRow.appendChild(innerCell);
        });

        innerTable.appendChild(innerRow);
        cell.appendChild(innerTable);
        return cell;
    };

    classes.forEach(cls => {
        const row = document.createElement('tr');
        row.className = 'border-b border-slate-600';
        const labelCell = document.createElement('td');
        labelCell.className = 'p-3 font-bold text-green-400';
        labelCell.textContent = cls.name;
        row.appendChild(labelCell);

        for (let i = 1; i <= 6; i++) {
            const seats = createSeatDistribution(cls.demand, i);
            row.appendChild(createSeatCell(seats));
        }

        tbody.appendChild(row);
    });

    // Show the modal
    document.getElementById('spread-modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('spread-modal').classList.add('hidden');
});

// Optional: Close modal when clicking outside
document.getElementById('spread-modal').addEventListener('click', (e) => {
    if (e.target.id === 'spread-modal') {
        document.getElementById('spread-modal').classList.add('hidden');
    }
});