let isDragging = false;
let offsetX, offsetY;

// Draggable Modal
function dragMouseDown(e, modalId) {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - document.getElementById(modalId).offsetLeft;
    offsetY = e.clientY - document.getElementById(modalId).offsetTop;

    document.onmousemove = function (e) {
        if (isDragging) {
            moveModal(e, modalId);
        }
    };

    document.onmouseup = function () {
        isDragging = false;
        document.onmousemove = null;
        document.onmouseup = null;
    };
}

function moveModal(e, modalId) {
    let modal = document.getElementById(modalId);
    modal.style.left = `${e.clientX - offsetX}px`;
    modal.style.top = `${e.clientY - offsetY}px`;
}

// Time update function
function updateTime() {
    const timeElement = document.querySelector('.time');
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Start Timer
function startTimer() {
    const timerInput = document.getElementById('timerInput');
    let time = timerInput.value * 60;
    const timerDisplay = document.getElementById('timerDisplay');
    
    const interval = setInterval(() => {
        if (time <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = '00:00';
        } else {
            time--;
            timerDisplay.textContent = formatTime(time);
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Open App (Finder, Safari, Messages)
function openApp(appName) {
    alert(`Opening ${appName}...`);
    // Here you can add specific functionality for each app
}

// Open Timer
function openTimer() {
    document.getElementById('timerModal').style.display = 'block';
}

// Open Calendar
function openCalendar() {
    document.getElementById('calendarModal').style.display = 'block';
}

// Open Battery Menu
function openBatteryMenu() {
    document.getElementById('batteryMenuModal').style.display = 'block';
}

// Open Wi-Fi Menu
function openWiFiMenu() {
    const wifiList = document.getElementById('wifiList');
    const networks = [
        { name: 'Network 1', ip: '192.168.1.1' },
        { name: 'Network 2', ip: '192.168.1.2' },
        { name: 'Network 3', ip: '192.168.1.3' },
        { name: 'Network 4', ip: '192.168.1.4' }
    ];

    wifiList.innerHTML = '';
    networks.forEach(network => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${network.name} <button onclick="openWiFiDetails('${network.name}', '${network.ip}')">Connect</button>`;
        wifiList.appendChild(listItem);
    });

    document.getElementById('wifiMenuModal').style.display = 'block';
}

// Open Wi-Fi Network Details
function openWiFiDetails(name, ip) {
    document.getElementById('wifiNetworkName').textContent = name;
    document.getElementById('wifiIPAddress').textContent = ip;
    document.getElementById('wifiDetailsModal').style.display = 'block';
}

// Connect to Wi-Fi (placeholder)
function connectToWiFi() {
    alert('Connecting to Wi-Fi...');
}

// Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();

// Calendar Modal Functionality
let currentDate = new Date();
let selectedDate = null;

// Function to display the calendar
function displayCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const monthName = document.getElementById('monthName');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    // Set the month name
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthName.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Get the first day of the month and the number of days in the month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    // Clear the calendar grid
    calendarGrid.innerHTML = "";

    // Create empty spaces for the first week
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement("span");
        calendarGrid.appendChild(emptyCell);
    }

    // Create the days of the month
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dayCell = document.createElement("span");
        dayCell.textContent = day;
        dayCell.addEventListener('click', () => selectDate(day));
        calendarGrid.appendChild(dayCell);
    }

    // Update navigation buttons
    prevMonthButton.addEventListener('click', () => changeMonth(-1));
    nextMonthButton.addEventListener('click', () => changeMonth(1));
}

// Function to handle date selection
function selectDate(day) {
    const calendarGrid = document.getElementById('calendarGrid');
    // Remove previous selected date styling
    if (selectedDate) {
        selectedDate.classList.remove('selected');
    }
    // Highlight the selected date
    const dateCells = calendarGrid.getElementsByTagName('span');
    for (let cell of dateCells) {
        if (cell.textContent == day) {
            selectedDate = cell;
            selectedDate.classList.add('selected');
        }
    }
}

// Function to change the month
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    displayCalendar();
}

// Initialize the calendar
displayCalendar();

// Open Calendar Function (For Button Click)
document.getElementById('status-date').addEventListener('click', () => {
    document.getElementById('calendarModal').style.display = 'block';
});

// Close Calendar Function
document.getElementById('closeCalendar').addEventListener('click', () => {
    document.getElementById('calendarModal').style.display = 'none';
});
