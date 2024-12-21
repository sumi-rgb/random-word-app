const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const randomWordUrl = 'https://www.vocabulary.com/randomword';

document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-word');
    const revealButton = document.getElementById('reveal-definition');
    const wordDisplay = document.getElementById('word');
    const definitionDisplay = document.getElementById('definition');

    fetchButton.addEventListener('click', async () => {
        try {
            const { word, definition } = await getRandomWordAndDefinition();
            wordDisplay.textContent = word;
            definitionDisplay.textContent = definition;
            revealButton.style.display = 'inline-block';
            definitionDisplay.style.display = 'none';
        } catch (error) {
            console.error('Error fetching word:', error);
            wordDisplay.textContent = 'Error fetching word';
            definitionDisplay.textContent = '';
            revealButton.style.display = 'none';
        }
    });

    revealButton.addEventListener('click', () => {
        definitionDisplay.style.display = 'block';
        revealButton.style.display = 'none';
    });
});

async function getRandomWordAndDefinition() {
    const response = await fetch(proxyUrl + randomWordUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const word = doc.querySelector('#hdr-word-area').textContent.trim();
    const definition = doc.querySelector('.short').textContent.trim();
    return { word, definition };
}