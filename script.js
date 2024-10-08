// Select elements
const monthYearDisplay = document.getElementById('month-year');
const calendarDates = document.getElementById('calendar-dates');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const eventModal = document.getElementById('event-modal');
const closeModal = document.querySelector('.close');
const saveEventBtn = document.getElementById('save-event');

// Calendar state
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let events = [];

// Month names array
const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Function to render the calendar
function renderCalendar(year, month) {
    // Set month and year in header
    monthYearDisplay.textContent = `${months[month]} ${year}`;

    // Clear previous dates
    calendarDates.innerHTML = '';

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill the empty spaces before the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        calendarDates.appendChild(emptyDiv);
    }

    // Fill the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;

        // Highlight today
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayDiv.classList.add('today');
        }

        // Add click event for adding new events
        dayDiv.addEventListener('click', () => openEventModal(year, month, day));

        calendarDates.appendChild(dayDiv);
    }

    // Render events after rendering calendar
    renderEvents(year, month);
}

// Open the event modal
function openEventModal(year, month, day) {
    eventModal.style.display = 'block';
    document.getElementById('event-date').value = `${year}-${month + 1}-${day}`;
}

// Close modal
closeModal.addEventListener('click', () => {
    eventModal.style.display = 'none';
});

// Save event
saveEventBtn.addEventListener('click', () => {
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;

    // Save event to array
    events.push({ title, date });

    // Close modal
    eventModal.style.display = 'none';

    // Render the calendar again to show the event
    renderCalendar(currentYear, currentMonth);
});

// Handle previous and next month buttons
prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
});

// Render initial calendar
renderCalendar(currentYear, currentMonth);