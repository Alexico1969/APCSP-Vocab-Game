// Vocabulary data
const vocabularyList = [
    { word: "Syntax Error", definition: "A mistake in typed code that violates the rules of the programming language. Typically, code with syntax errors will not run." },
    { word: "Logic Error", definition: "A mistake in an algorithm or program that causes it to behave unexpectedly or return the incorrect value." },
    { word: "Run-time Error", definition: "A mistake in a program that happens only when the program is actually run, such as a program attempting to access memory that does not exist." },
    { word: "Overflow Error", definition: "Error that results when the number of bits is not enough to represent the number (like a car's odometer 'rolling over')." },
    { word: "Bit", definition: "A binary digit, either 0 or 1." },
    { word: "Byte", definition: "A sequence of 8 bits." },
    { word: "Roundoff", definition: "Error that results when the number of bits is not enough to represent the number with full precision (like using 3 digits to represent pi as 3.14)." },
    { word: "Analog Data", definition: "Values that change smoothly, rather than in discrete intervals, over time. For example, the pitch and volume of a live concert." },
    { word: "Lossless", definition: "Compressing data in a way that preserves all data and allows full recovery of the original." },
    { word: "Lossy", definition: "Compressing data in a way that discards some data and makes it impossible to recover the original." },
    { word: "Metadata", definition: "Data about data, like descriptive information about a file or a row in a database." },
    { word: "Sequencing", definition: "The sequential execution of steps in an algorithm or code in a program (like steps in a recipe)." },
    { word: "Selection", definition: "A Boolean condition to determine which of two paths are taken in an algorithm or program." },
    { word: "Iteration", definition: "The repetition of steps in an algorithm or program for a certain amount of times or until a certain condition is met." },
    { word: "Linear Search", definition: "An algorithm that iterates through each item in a list until it finds the target value." },
    { word: "Binary Search", definition: "An algorithm that searches a sorted list for a value by repeatedly splitting the list in half." },
    { word: "Reasonable Time", definition: "A run time for an algorithm that doesn't increase faster than a polynomial function of the input size." },
    { word: "Heuristic", definition: "A technique that helps an algorithm find a good solution in a hard problem." },
    { word: "Undecidable", definition: "A problem so logically difficult that we can't create an algorithm to answer 'yes' or 'no' for all inputs." },
    { word: "Library", definition: "A collection of procedures that are useful in creating programs." },
    { word: "API", definition: "A library of procedures and a description of how to call each procedure." },
    { word: "Modularity", definition: "The separation of a program into independent modules that are each responsible for one aspect of the program's functionality." },
    { word: "Traversal", definition: "The iteration over the items in a list. A full traversal iterates over every item; a partial traversal iterates over a subset." },
    { word: "Computing Device", definition: "A physical device that can run a program, such as a computer, smartphone, or smart sensor." },
    { word: "Computer Network", definition: "A group of interconnected computing devices capable of sending or receiving data." },
    { word: "Bandwidth", definition: "The maximum amount of data that can be sent in a fixed period of time over a network connection, typically measured in bits per second." },
    { word: "Protocol", definition: "An agreed upon set of rules that specify the behavior of a system." },
    { word: "Scalability", definition: "The ability of a system to adjust in scale to meet new demands." },
    { word: "IP", definition: "The protocol that determines how to address nodes on the network and route data from one node to another." },
    { word: "TCP", definition: "A data transport protocol that includes mechanisms for reliably transmitting packets to a destination." },
    { word: "UDP", definition: "A lightweight data transport protocol with minimal error checking." },
    { word: "World Wide Web", definition: "A system of linked pages, media, and files, browsable over HTTP." },
    { word: "HTTP", definition: "The protocol that powers the Web, used to request webpages and submit form data to servers." },
    { word: "Parallel Computing", definition: "A computational model which splits a program into multiple tasks, some of which can be executed simultaneously." },
    { word: "Speedup", definition: "The improvement in the time a parallelized program takes to solve a problem, compared to running sequentially." },
    { word: "Distributed Computing", definition: "A computational model which uses multiple devices to run different parts of a program." },
    { word: "Digital Divide", definition: "The idea that some communities have less access to computing than others, often due to limitations of Internet speed or computer access." },
    { word: "Crowdsourcing", definition: "A model where many online users combine efforts to fund projects, generate ideas, or create goods/services." },
    { word: "Citizen Science", definition: "Crowdsourcing for science! Volunteers participate in scientific research projects." },
    { word: "Creative Commons", definition: "An alternative to copyright allowing people to declare how their creations can be shared or used." },
    { word: "Open Access", definition: "A policy allowing people to access documents or data freely for reading or analysis." },
    { word: "PII", definition: "Information that can be used to uniquely identify an individual." },
    { word: "Multifactor Authentication", definition: "A method of authentication requiring multiple pieces of evidence in different categories (e.g., password and a code)." },
    { word: "Encryption", definition: "The process of scrambling data to prevent unauthorized access." },
    { word: "Symmetric Encryption", definition: "An encryption technique where the same key is used to both encrypt and decrypt data." },
    { word: "Public Key Encryption", definition: "An asymmetric encryption method using different keys for encrypting and decrypting data." },
    { word: "Cookie", definition: "A small amount of text that tracks information about a user visiting a website." },
    { word: "Virus", definition: "A type of computer malware that can replicate itself." },
    { word: "Phishing", definition: "An attack where users are tricked into revealing private information, often via deceptive emails." },
    { word: "Rogue Access Point", definition: "A wireless access point that allows an attacker unauthorized access to network traffic." }
];

let currentScore = 0;
let lives = 3;
let currentWordIndex = 0;

function initGame() {
    updateScore(0);
    updateLives(3);
    displayNewWord();
}

function displayNewWord() {
    const correctWord = vocabularyList[currentWordIndex];
    
    // Get three different wrong words
    let wrongWords = [];
    let usedIndices = new Set([currentWordIndex]);
    
    while (wrongWords.length < 3) {
        let randomIndex = Math.floor(Math.random() * vocabularyList.length);
        if (!usedIndices.has(randomIndex)) {
            wrongWords.push(vocabularyList[randomIndex]);
            usedIndices.add(randomIndex);
        }
    }
    
    $('.word-choices').empty();
    
    // Combine all words and shuffle them
    let allWords = [correctWord, ...wrongWords];
    allWords.sort(() => Math.random() - 0.5);
    
    allWords.forEach(word => {
        const wordElement = $('<div>')
            .addClass('word-choice')
            .text(word.word)
            .click(() => checkAnswer(word.word === correctWord.word));
        $('.word-choices').append(wordElement);
    });
    
    $('#current-definition').text(correctWord.definition);
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        updateScore(currentScore + 10);
        currentWordIndex = (currentWordIndex + 1) % vocabularyList.length;
    } else {
        updateLives(lives - 1);
        if (lives <= 0) {
            gameOver();
            return;
        }
    }
    displayNewWord();
}

function updateScore(newScore) {
    currentScore = newScore;
    $('#score-count').text(currentScore);
}

function updateLives(newLives) {
    lives = newLives;
    $('#lives-count').text(lives);
}

function gameOver() {
    $('.game-area').html(`
        <div class="game-over" style="text-align: center; padding: 20px;">
            <h2>Game Over!</h2>
            <p>Final Score: ${currentScore}</p>
            <button id="play-again" class="play-again-btn">Play Again</button>
        </div>
    `);

    // Add click handler for the new button
    $('#play-again').on('click', function() {
        // Reset game state
        currentScore = 0;
        lives = 3;
        currentWordIndex = 0;
        
        // Restore original game area structure
        $('.game-area').html(`
            <div class="word-choices"></div>
            <div class="player-area">
                <div class="player"></div>
            </div>
        `);
        
        // Restart the game
        initGame();
    });
}

// Start the game when document is ready
$(document).ready(initGame);