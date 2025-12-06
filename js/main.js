console.log('Main.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Find all elements with class .product-card and change their style
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.backgroundColor = '#f0f8ff'; // AliceBlue
        card.style.border = '1px solid #add8e6'; // LightBlue border
    });

    // 2. Add a new element <p> to the end of <main>
    const mainElement = document.querySelector('main');
    if (mainElement) {
        const newParagraph = document.createElement('p');
        newParagraph.style.padding = '20px';
        newParagraph.style.color = '#555';
        newParagraph.style.fontWeight = 'bold';
        mainElement.append(newParagraph);

        // 3. Show current date in footer
        const footer = document.querySelector('footer p');
        if (footer) {
            const date = new Date();
            const dateString = date.toLocaleDateString('uk-UA');
            footer.innerHTML += ` | Сьогодні: ${dateString}`;
        }

        // 4. "Show More" Accordion
        const accordionContainer = document.createElement('div');
        accordionContainer.style.marginTop = '20px';
        accordionContainer.style.textAlign = 'center';

        const hiddenText = document.createElement('p');
        hiddenText.textContent = `У TEALAND ми віримо, що чай — це більше, ніж напій. Це ритуал, що дарує спокій, затишок і турботу про себе. Саме тому ми ретельно вивчаємо кожен сорт, дегустуємо його та обираємо листочки, які передають справжній характер чаю.
Ми працюємо без посередників і співпрацюємо лише з тими постачальниками, які поділяють наші цінності — чесність, натуральність та прозорість. Кожна партія проходить контроль якості, щоб у вашу чашку потрапляв тільки чистий смак природи.
TEALAND створено для тих, хто хоче перетворити щоденні моменти на маленькі церемонії. Ми прагнемо надихнути вас на те, щоб знаходити час для себе — хоча б на кілька ковтків теплого чаю.`;
        hiddenText.style.display = 'none';
        hiddenText.style.whiteSpace = 'pre-line'; // Enable newline rendering
        hiddenText.style.padding = '10px';
        hiddenText.style.border = '1px dashed #ccc';
        hiddenText.style.margin = '10px auto';
        hiddenText.style.maxWidth = '600px';

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Показати більше';
        toggleButton.style.padding = '10px 20px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.backgroundColor = '#4CAF50';
        toggleButton.style.color = 'white';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '5px';

        toggleButton.addEventListener('click', () => {
            if (hiddenText.style.display === 'none') {
                hiddenText.style.display = 'block';
                toggleButton.textContent = 'Приховати';
            } else {
                hiddenText.style.display = 'none';
                toggleButton.textContent = 'Показати більше';
            }
        });

        accordionContainer.append(toggleButton, hiddenText);
        mainElement.append(accordionContainer);

        // 5. Theme Switcher
        const themeButton = document.createElement('button');
        themeButton.textContent = 'Змінити тему';
        themeButton.style.position = 'fixed';
        themeButton.style.bottom = '20px';
        themeButton.style.right = '20px';
        themeButton.style.padding = '10px 15px';
        themeButton.style.borderRadius = '30px';
        themeButton.style.border = 'none';
        themeButton.style.backgroundColor = '#333';
        themeButton.style.color = '#fff';
        themeButton.style.cursor = 'pointer';
        themeButton.style.zIndex = '1000';
        themeButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';

        // Check localStorage for saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeButton.style.backgroundColor = '#eee';
            themeButton.style.color = '#333';
        }

        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                themeButton.style.backgroundColor = '#eee';
                themeButton.style.color = '#333';
                localStorage.setItem('theme', 'dark');
            } else {
                themeButton.style.backgroundColor = '#333';
                themeButton.style.color = '#fff';
                localStorage.setItem('theme', 'light');
            }
        });

        document.body.appendChild(themeButton);

        // 6. Highlight navigation menu on hover
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.classList.add('nav-item-hover');
            });
            link.addEventListener('mouseleave', () => {
                link.classList.remove('nav-item-hover');
            });
        });

        // 7. Change font size with Arrow keys
        let currentFontSize = 16;
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') {
                currentFontSize += 1;
                document.body.style.fontSize = `${currentFontSize}px`;
            } else if (event.key === 'ArrowDown') {
                currentFontSize = Math.max(10, currentFontSize - 1); // Prevent too small font
                document.body.style.fontSize = `${currentFontSize}px`;
            }
        });
    }
});
