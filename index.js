document.querySelector(".linkBtn").addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    document.getElementById("projectLink").click();
});




function updatePakistanTime() {
    const timeElement = document.querySelector('.heroTime');
    if (!timeElement) return;

    const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const currentTime = formatter.format(new Date());

    timeElement.textContent = `PK — ${currentTime}`;
}


updatePakistanTime();
