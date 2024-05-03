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
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours(); 
    UI.date.textContent = date;
    UI.second.style.transform = 'rotate(${seconds}deg)';
    requestAnimationFrame(update)
}
requestAnimationFrame(update)