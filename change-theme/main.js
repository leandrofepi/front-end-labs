document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = 
        document.getElementById('theme-toggle');
    const body = document.body;
    const icon = 
        themeToggle.querySelector('.icon');
    //Verifica tema salvo ou do SO.
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); 
    
    if (savedTheme === 'dark'){
        body.classList.replace('light-theme', 'dark-theme');
        icon.textContent = '🌞';
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        icon.textContent = '🌚';
    }
    
    themeToggle.addEventListener('click', () => {
        if(body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            icon.textContent = '🌞';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            icon.textContent = '🌚';
            localStorage.setItem('theme', 'light');
        }
    });


    });

    

