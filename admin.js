// ==========================================================================
// FINALE BARBERSHOP - ADMIN MANAGEMENT SCRIPT
// ==========================================================================

const ADMIN_PASS = "finale1234";
const CLOUD_DB_ID = "ff808181a04ccf2d01a04e6c4e940c70";
const CLOUD_DB_URL = `https://api.restful-api.dev/objects/${CLOUD_DB_ID}`;

let allAppointments = [];
let salonConfig = {
    isOpen: true,
    openHour: "09:00",
    closeHour: "19:00"
};

// Check Login Session
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('barberAdminAuth') === 'true') {
        showAdminApp();
    }
});

function handleLogin(e) {
    e.preventDefault();
    const pass = document.getElementById('adminPass').value;
    const errorEl = document.getElementById('loginError');

    if (pass === ADMIN_PASS) {
        sessionStorage.setItem('barberAdminAuth', 'true');
        errorEl.classList.remove('show');
        showAdminApp();
    } else {
        errorEl.classList.add('show');
    }
}

function handleLogout() {
    sessionStorage.removeItem('barberAdminAuth');
    location.reload();
}

function showAdminApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminApp').style.display = 'block';
    
    syncAllFromCloud();
    // Auto-refresh every 10 seconds
    setInterval(() => syncAllFromCloud(false), 10000);
}

// --- Cloud & Local Data Synchronization ---
async function syncAllFromCloud(showFeedback = false) {
    try {
        const res = await fetch(CLOUD_DB_URL);
        if (res.ok) {
            const result = await res.json();
            if (result && result.data) {
                // 1. Settings
                salonConfig.isOpen = (result.data.isOpen === true || result.data.isOpen === "true");
                salonConfig.openHour = result.data.openHour || "09:00";
                salonConfig.closeHour = result.data.closeHour || "19:00";
                updateSalonUI();

                // 2. Appointments
                if (result.data.appointments) {
                    try {
                        allAppointments = JSON.parse(result.data.appointments);
                    } catch(err) {
                        allAppointments = [];
                    }
                }
            }
        }
    } catch(e) {
        console.error("Cloud fetch error:", e);
        // Fallback to local
        allAppointments = JSON.parse(localStorage.getItem('barber_appointments') || '[]');
    }

    renderAppointmentsTable(allAppointments);
    updateStats();

    if (showFeedback) {
        alert("Randevular ve ayarlar buluttan baÅŸarÄ±yla gÃ¼ncellendi!");
    }
}

function updateSalonUI() {
    const toggleBtn = document.getElementById('salonToggleBtn');
    const toggleIcon = document.getElementById('salonToggleIcon');
    const toggleText = document.getElementById('salonToggleText');
    const openSelect = document.getElementById('openHourSelect');
    const closeSelect = document.getElementById('closeHourSelect');

    if (openSelect) openSelect.value = salonConfig.openHour;
    if (closeSelect) closeSelect.value = salonConfig.closeHour;

    if (salonConfig.isOpen) {
        toggleBtn.className = 'status-switch-btn open';
        toggleIcon.className = 'fa-solid fa-circle-check';
        toggleText.textContent = 'SALON AÃ‡IK (Randevu AlÄ±nabilir)';
    } else {
        toggleBtn.className = 'status-switch-btn closed';
        toggleIcon.className = 'fa-solid fa-ban';
        toggleText.textContent = 'SALON KAPALI (Randevular Kilitli)';
    }
}

async function toggleSalonState() {
    salonConfig.isOpen = !salonConfig.isOpen;
    updateSalonUI();
    await saveCloudSettings();
}

async function saveHoursSettings() {
    salonConfig.openHour = document.getElementById('openHourSelect').value;
    salonConfig.closeHour = document.getElementById('closeHourSelect').value;
    await saveCloudSettings();
    alert(`Ã‡alÄ±ÅŸma saatleri ${salonConfig.openHour} â€“ ${salonConfig.closeHour} olarak kaydedildi!`);
}

async function saveCloudSettings() {
    try {
        const updateBody = {
            name: "FinaleBarber_Production_DB",
            data: {
                isOpen: String(salonConfig.isOpen),
                openHour: salonConfig.openHour,
                closeHour: salonConfig.closeHour,
                appointments: JSON.stringify(allAppointments)
            }
        };

        await fetch(CLOUD_DB_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateBody)
        });
    } catch(e) {
        console.error("Save cloud error:", e);
    }
}

// --- Render Table ---
function renderAppointmentsTable(list) {
    const tbody = document.getElementById('appointmentsTableBody');
    if (!tbody) return;

    if (!list || list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">HenÃ¼z randevu bulunmamaktadÄ±r.</td></tr>`;
        return;
    }

    tbody.innerHTML = list.map(apt => {
        const isBahattin = (apt.barber && apt.barber.includes('Bahattin'));
        const barberBadgeClass = isBahattin ? 'bahattin' : 'team';
        const barberIcon = isBahattin ? '<i class="fa-solid fa-scissors"></i>' : '<i class="fa-solid fa-users"></i>';
        const code = apt.authCode || 'FN-000000';

        let statusClass = 'offen';
        if (apt.status === 'OnaylandÄ±') statusClass = 'onaylandi';
        if (apt.status === 'Ä°ptal Edildi') statusClass = 'iptal';

        return `
            <tr>
                <td>
                    <strong>${apt.date}</strong><br>
                    <span style="color: var(--primary-gold); font-weight: 700;"><i class="fa-regular fa-clock"></i> ${apt.time}</span>
                </td>
                <td>
                    <span class="code-pill">${code}</span>
                </td>
                <td>
                    <span class="barber-badge ${barberBadgeClass}">${barberIcon} ${apt.barber || 'Bahattin'}</span>
                </td>
                <td>
                    <strong>${apt.name}</strong><br>
                    <a href="tel:${apt.phone}" style="color: var(--text-secondary); font-size: 0.85rem;"><i class="fa-solid fa-phone"></i> ${apt.phone}</a>
                </td>
                <td>
                    <a href="mailto:${apt.email || ''}" style="color: var(--text-secondary); font-size: 0.85rem;"><i class="fa-regular fa-envelope"></i> ${apt.email || '-'}</a>
                </td>
                <td>
                    <span style="font-weight: 600;">${apt.service}</span><br>
                    <small style="color: var(--text-muted);">${apt.notes && apt.notes !== '-' ? apt.notes : ''}</small>
                </td>
                <td>
                    <span class="status-badge ${statusClass}">${apt.status || 'Offen'}</span>
                </td>
                <td>
                    <div class="action-btns">
                        <button class="btn-action confirm" title="Randevuyu Onayla ve MÃ¼ÅŸteriye Kod GÃ¶nder" onclick="confirmAppointment('${apt.id}')">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button class="btn-action cancel" title="Ä°ptal Et" onclick="cancelAppointment('${apt.id}')">
                            <i class="fa-solid fa-ban"></i>
                        </button>
                        <button class="btn-action delete" title="Sil" onclick="deleteAppointment('${apt.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// --- Status Updates & Customer Confirmation Mail ---
async function confirmAppointment(id) {
    const apt = allAppointments.find(a => a.id === id);
    if (!apt) return;

    apt.status = 'OnaylandÄ±';
    saveLocal();
    await saveCloudSettings();
    renderAppointmentsTable(allAppointments);
    updateStats();

    // Send confirmation email to customer if email is provided
    if (apt.email && apt.email.includes('@')) {
        await sendCustomerConfirmationEmail(apt);
        alert(`Randevu onaylandÄ±! MÃ¼ÅŸteriye (${apt.email}) ${apt.authCode} gÃ¼venlik kodunu iÃ§eren onay maili iletildi.`);
    } else {
        alert(`Randevu onaylandÄ±! GÃ¼venlik Kodu: ${apt.authCode}`);
    }
}

async function cancelAppointment(id) {
    const apt = allAppointments.find(a => a.id === id);
    if (!apt) return;

    apt.status = 'Ä°ptal Edildi';
    saveLocal();
    await saveCloudSettings();
    renderAppointmentsTable(allAppointments);
    updateStats();
}

async function deleteAppointment(id) {
    if (!confirm("Bu randevuyu silmek istediÄŸinizden emin misiniz?")) return;
    allAppointments = allAppointments.filter(a => a.id !== id);
    saveLocal();
    await saveCloudSettings();
    renderAppointmentsTable(allAppointments);
    updateStats();
}

function saveLocal() {
    localStorage.setItem('barber_appointments', JSON.stringify(allAppointments));
}

// Send Email to Customer on Confirmation
async function sendCustomerConfirmationEmail(apt) {
    try {
        const payload = {
            "_subject": `ğŸ’ˆ DER FINALE BARBERSHOP - Randevunuz OnaylandÄ±! [Kod: ${apt.authCode}]`,
            "_template": "table",
            "_captcha": "false",
            "MÃ¼ÅŸteri": apt.name,
            "Randevu Kodu": apt.authCode,
            "Berber": apt.barber,
            "Tarih": apt.date,
            "Saat": apt.time,
            "Hizmet": apt.service,
            "Adres": "WestendstraÃŸe 3, 64546 MÃ¶rfelden-Walldorf",
            "Telefon": "0152 5164 9190",
            "Bilgi": "Randevunuz berberimiz tarafÄ±ndan onaylanmÄ±ÅŸtÄ±r. Salona geldiÄŸinizde bu kodu iletmeniz yeterlidir."
        };

        // Send via FormSubmit
        await fetch(`https://formsubmit.co/ajax/${apt.email}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        console.log("Customer email dispatch:", e);
    }
}

// --- Filter Appointments ---
function filterAppointments() {
    const query = (document.getElementById('searchInput').value || '').toLowerCase();
    const barber = document.getElementById('barberFilter').value;
    const status = document.getElementById('statusFilter').value;

    const filtered = allAppointments.filter(apt => {
        const matchesQuery = (
            (apt.name && apt.name.toLowerCase().includes(query)) ||
            (apt.phone && apt.phone.includes(query)) ||
            (apt.authCode && apt.authCode.toLowerCase().includes(query)) ||
            (apt.email && apt.email.toLowerCase().includes(query))
        );
        const matchesBarber = (barber === 'all' || (apt.barber && apt.barber.includes(barber)));
        const matchesStatus = (status === 'all' || apt.status === status);

        return matchesQuery && matchesBarber && matchesStatus;
    });

    renderAppointmentsTable(filtered);
}

// --- Update Stats ---
function updateStats() {
    document.getElementById('statTotal').textContent = allAppointments.length;
    document.getElementById('statPending').textContent = allAppointments.filter(a => a.status === 'Offen').length;
    document.getElementById('statConfirmed').textContent = allAppointments.filter(a => a.status === 'OnaylandÄ±').length;
    document.getElementById('statBahattin').textContent = allAppointments.filter(a => a.barber && a.barber.includes('Bahattin')).length;
}