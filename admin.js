document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();
});

function loadAppointments() {
    const tbody = document.getElementById('appointments-body');
    const appointments = JSON.parse(localStorage.getItem('barberAppointments')) || [];
    
    tbody.innerHTML = '';
    
    if (appointments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-state">Henüz hiç randevu bulunmamaktadır.</td></tr>`;
        return;
    }
    
    // Sort appointments by date and time
    appointments.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
    });

    appointments.forEach(app => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${formatDate(app.date)}</strong><br><small>${app.time}</small></td>
            <td>${app.name}</td>
            <td>${app.phone}</td>
            <td>${app.service}</td>
            <td><span class="status-badge ${app.status.toLowerCase()}">${app.status}</span></td>
            <td>
                <button class="btn-small btn-danger" onclick="deleteAppointment(${app.id})">Sil</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteAppointment(id) {
    if(confirm('Bu randevuyu silmek istediğinize emin misiniz?')) {
        let appointments = JSON.parse(localStorage.getItem('barberAppointments')) || [];
        appointments = appointments.filter(app => app.id !== id);
        localStorage.setItem('barberAppointments', JSON.stringify(appointments));
        loadAppointments();
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', options);
}
