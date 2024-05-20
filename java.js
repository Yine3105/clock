const UI = {
    date: document.querySelector('.date'),
    am_pm: document.querySelector('.am-pm'),
    second: document.querySelector('.hand--second'),
    minute: document.querySelector('.hand--minute'),
    hour: document.querySelector('.hand--hour'),
}
function update(){
    const now = new Date();
    const date = now.getDate();
    const seconds = (now.getSeconds() + now.setMilliseconds()/1000) / 60 * 360;
    const minutes = (now.getMinutes() + now.getSeconds()/ 60) / 60 * 360;
    const hours = (now.getHours() + now.getMinutes()/ 60) / 12 * 360;
    UI.date.textContent = date;
    UI.second.style.transform = 'rotate(${seconds}deg)';
    UI.minute.style.transform = 'rotate(${minutes}deg)';
    UI.hour.style.transform = 'rotate(${hours}deg)';
    requestAnimationFrame(update)
}
requestAnimationFrame(update)