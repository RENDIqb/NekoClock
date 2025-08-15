let previousTime = {
    hours: '',
    minutes: ''
};
let visibilityHandler;

function updateClock(forceUpdate = false) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const shouldUpdate = forceUpdate || 
                       hours !== previousTime.hours || 
                       minutes !== previousTime.minutes;
    
    if (shouldUpdate) {
        updateDigit('hour-tens', hours[0], previousTime.hours[0] !== hours[0]);
        updateDigit('hour-ones', hours[1], previousTime.hours[1] !== hours[1]);
        updateDigit('minute-tens', minutes[0], previousTime.minutes[0] !== minutes[0]);
        updateDigit('minute-ones', minutes[1], previousTime.minutes[1] !== minutes[1]);

        previousTime = { hours, minutes };
    }
}

function updateDigit(elementId, newDigit, hasChanged) {
    const element = document.getElementById(elementId);
    element.style.backgroundImage = `url('images/${newDigit}.png')`;
    
    if (hasChanged) {
        element.classList.add('changed');
        setTimeout(() => {
            element.classList.remove('changed');
        }, 500);
    }
}

function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        updateClock(true);
        
        const now = new Date();
        const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
        
        setTimeout(() => {
            updateClock();
            setInterval(updateClock, 60000);
        }, delay);
    }
}

function initClock() {
    const clock = document.querySelector('.clock');
    const hourOnes = document.getElementById('hour-ones');
    
    const separator = document.createElement('div');
    separator.className = 'digit';
    separator.id = 'separator';
    separator.style.backgroundImage = "url('images/sep.png')";
    clock.insertBefore(separator, hourOnes.nextSibling);
    
    const now = new Date();
    previousTime.hours = now.getHours().toString().padStart(2, '0');
    previousTime.minutes = now.getMinutes().toString().padStart(2, '0');
    
    document.getElementById('hour-tens').style.backgroundImage = `url('images/${previousTime.hours[0]}.png')`;
    document.getElementById('hour-ones').style.backgroundImage = `url('images/${previousTime.hours[1]}.png')`;
    document.getElementById('minute-tens').style.backgroundImage = `url('images/${previousTime.minutes[0]}.png')`;
    document.getElementById('minute-ones').style.backgroundImage = `url('images/${previousTime.minutes[1]}.png')`;
    
    visibilityHandler = handleVisibilityChange;
    document.addEventListener('visibilitychange', visibilityHandler);
    
    updateClock();
    setInterval(updateClock, 60000);
}

window.addEventListener('load', initClock);