document.addEventListener('DOMContentLoaded', () => {
    initializeClocks();
    setInterval(updateAllClocks, 1000); // Cập nhật mỗi giây
});

const clocks = [
    { id: 'clock1', timezone: 'Asia/Ho_Chi_Minh' },
    { id: 'clock2', timezone: 'Asia/Seoul' },
    { id: 'clock3', timezone: 'Australia/Sydney' },
    { id: 'clock4', timezone: 'Europe/Paris' },
];

function initializeClocks() {
    clocks.forEach(clock => updateClock(clock.id, clock.timezone));
}

function updateAllClocks() {
    clocks.forEach(clock => updateClock(clock.id, clock.timezone));
}

function updateClock(clockId, timeZone) {
    try {
        // Lấy thời gian chính xác theo múi giờ
        const now = new Date();
        const timeZoneTime = new Intl.DateTimeFormat('en-US', {
            timeZone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        }).formatToParts(now);

        // Lấy giá trị giờ, phút, giây
        let hours = parseInt(timeZoneTime.find(part => part.type === 'hour').value, 10);
        const minutes = parseInt(timeZoneTime.find(part => part.type === 'minute').value, 10);
        const seconds = parseInt(timeZoneTime.find(part => part.type === 'second').value, 10);
        const day = now.getDate();

        // Xác định AM/PM
        const amPm = hours >= 12 ? 'PM' : 'AM';

        // Chuyển về 12h
        if (hours > 12) hours -= 12;
        if (hours === 0) hours = 12;

        // Kiểm tra xem phần tử có tồn tại không
        const clock = document.getElementById(clockId);
        if (!clock) {
            console.error(`Clock element with id ${clockId} not found.`);
            return;
        }

        const hourHand = clock.querySelector('.hand--hours');
        const minuteHand = clock.querySelector('.hand--minute');
        const secondHand = clock.querySelector('.hand--second');
        const dateText = clock.querySelector('.date');
        const amPmText = clock.querySelector('.am-pm');

        if (!hourHand || !minuteHand || !secondHand || !dateText || !amPmText) {
            console.error(`Missing elements for clock ${clockId}`);
            return;
        }

        // Tính toán góc quay
        const hourRotation = (hours % 12) * 30 + (minutes * 0.5);
        const minuteRotation = minutes * 6 + (seconds * 0.1);
        const secondRotation = seconds * 6;

        // Cập nhật kim đồng hồ
        hourHand.style.transform = `rotate(${hourRotation}deg)`;
        minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
        secondHand.style.transform = `rotate(${secondRotation}deg)`;

        // Cập nhật ngày và AM/PM
        dateText.textContent = day;
        amPmText.textContent = amPm;
    } catch (error) {
        console.error(`Error updating clock for timezone ${timeZone}:`, error);
    }
}
