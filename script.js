// To dynamically update the time
function updateTime() {
    const timeElement = document.querySelector('.time');
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

setInterval(updateTime, 1000);
updateTime();
