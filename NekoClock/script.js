// Храним предыдущее время для сравнения
let previousTime = {
    hours: '',
    minutes: ''
};

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    if (hours !== previousTime.hours || minutes !== previousTime.minutes) {
        updateDigit('hour-tens', hours[0], previousTime.hours[0] !== hours[0]);
        updateDigit('hour-ones', hours[1], previousTime.hours[1] !== hours[1]);
        updateDigit('minute-tens', minutes[0], previousTime.minutes[0] !== minutes[0]);
        updateDigit('minute-ones', minutes[1], previousTime.minutes[1] !== minutes[1]);

        previousTime = { hours, minutes };
    }
}

function updateDigit(elementId, newDigit, hasChanged) {
    const element = document.getElementById(elementId);
    
    if (hasChanged) {
        element.classList.add('changed');
        element.style.backgroundImage = `url('images/${newDigit}.png')`;
        
        setTimeout(() => {
            element.classList.remove('changed');
        }, 500);
    } else {
        element.style.backgroundImage = `url('images/${newDigit}.png')`;
    }
}

const now = new Date();
previousTime.hours = now.getHours().toString().padStart(2, '0');
previousTime.minutes = now.getMinutes().toString().padStart(2, '0');

document.getElementById('hour-tens').style.backgroundImage = `url('images/${previousTime.hours[0]}.png')`;
document.getElementById('hour-ones').style.backgroundImage = `url('images/${previousTime.hours[1]}.png')`;
document.getElementById('minute-tens').style.backgroundImage = `url('images/${previousTime.minutes[0]}.png')`;
document.getElementById('minute-ones').style.backgroundImage = `url('images/${previousTime.minutes[1]}.png')`;

setInterval(updateClock, 1000);