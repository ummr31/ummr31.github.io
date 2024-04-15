document.getElementById('fetchSchedule').addEventListener('click', function() {
    const year = document.getElementById('yearInput').value;
    if (year) {
        fetch(`https://ergast.com/api/f1/${year}.json`)
            .then(response => response.json())
            .then(data => {
                const series = data.MRData.series;
                const season = data.MRData.RaceTable.season;
                const totalResults = data.MRData.total;

                document.getElementById('seriesInfo').textContent = `Series: ${series}`;
                document.getElementById('seasonInfo').textContent = `Season: ${season}`;
                document.getElementById('totalResultsInfo').textContent = `Total number of results returned: ${totalResults}`;

                displaySchedule(data.MRData.RaceTable.Races);
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        alert('Please enter a year.');
    }
});

function displaySchedule(races) {
    const scheduleTable = document.getElementById('raceSchedule').getElementsByTagName('tbody')[0];
    scheduleTable.innerHTML = ''; // Clear existing rows
    races.forEach(race => {
        const row = scheduleTable.insertRow();
        row.innerHTML = `
            <td>${race.season}</td>
            <td>${race.round}</td>
            <td>${race.raceName}</td>
            <td>${race.date}</td>
            <td>${race.time || 'N/A'}</td>
            <td>${race.Circuit.Location.country}</td>
            <td><a href="${race.url}" target="_blank">Link</a></td>
        `;
    });
}
