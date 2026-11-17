
// АВТОМАТИЧЕСКИЙ ГОД В ПОДВАЛЕ

const yearElement = document.querySelector('#year');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// КОПИРОВАНИЕ НИКА XASLUE

const toast = document.querySelector('.toast');

let toastTimer;

async function copyNickname(button) {

    const nickname = button.dataset.copy || 'xaslue';

    const label = button.querySelector('.copy-label');

    try {

        await navigator.clipboard.writeText(nickname);

        if (label) {
            label.textContent = 'Скопировано!';
        }

        if (toast) {

            toast.textContent = `@${nickname} скопирован`;

            toast.classList.add('show');

            window.clearTimeout(toastTimer);

            toastTimer = window.setTimeout(() => {
                toast.classList.remove('show');
            }, 2200);

        }

    } catch (error) {

        window.prompt('Скопируй ник:', nickname);

    }

    window.setTimeout(() => {

        if (label) {

            label.textContent =
                button.classList.contains('button-light')
                ? 'Найти меня: xaslue'
                : 'Скопировать ник';

        }

    }, 2200);

}


// НАЗНАЧАЕМ СОБЫТИЯ КНОПКАМ

document.querySelectorAll('.copy-button').forEach((button) => {

    button.addEventListener('click', () => {

        copyNickname(button);

    });

});


// ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver((entries, currentObserver) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

                currentObserver.unobserve(entry.target);

            }

        });

    }, { threshold: 0.12 });

    revealElements.forEach((element) => {
        observer.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add('visible');
    });

}


// МОБИЛЬНОЕ МЕНЮ

const menuToggle = document.querySelector('.menu-toggle');

const navigation = document.querySelector('.navigation');

if (menuToggle && navigation) {

    menuToggle.addEventListener('click', () => {

        const isOpen = navigation.classList.toggle('open');

        menuToggle.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Закрыть меню' : 'Открыть меню'
        );

    });


    navigation.querySelectorAll('a').forEach((link) => {

        link.addEventListener('click', () => {

            navigation.classList.remove('open');

            menuToggle.setAttribute('aria-expanded', 'false');

            menuToggle.setAttribute('aria-label', 'Открыть меню');

        });

    });

}
