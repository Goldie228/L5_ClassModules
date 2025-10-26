
import Library from './library.js';
import Book from './book.js';
import DigitalLibrary from './digital-library.js';

// Глобальные переменные для демонстрации
let currentLibrary = null;
let books = [];

// Функция для вывода в HTML консоль
function logToHTML(message, type = 'info') {
    const consoleOutput = document.getElementById('consoleOutput');
    if (!consoleOutput) return; // Проверка на всякий случай
    
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-${type}`;
    // Заменяем переносы строк на <br> для корректного отображения в HTML
    logEntry.innerHTML = `[${timestamp}] ${message.replace(/\n/g, '<br>')}`;
    consoleOutput.appendChild(logEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Функция для отображения информации о библиотеке
function showLibraryInfo(library, prefix = '') {
    try {
        // Используем геттеры, которые работают и для Library, и для DigitalLibrary
        const info = `
 ${prefix}ID: ${library.id}
 ${prefix}Библиотека: ${library.name}
 ${prefix}Адрес: ${library.address}
 ${prefix}Книг: ${library.books.length} из ${library.maxBookCount}
 ${prefix}Открыта: ${library.isOpen ? 'Да' : 'Нет'}
 ${prefix}Год основания: ${library.establishedYear}
 ${prefix}Посетителей: ${library.totalVisitors}`;
        logToHTML(info, 'info');
    } catch (error) {
        logToHTML(`Ошибка при отображении информации о библиотеке: ${error.message}`, 'error');
    }
}

// Функция для отображения информации о книге
function showBookInfo(book, prefix = '') {
    try {
        const info = `
 ${prefix}ID: ${book.id}
 ${prefix}Название: ${book.title}
 ${prefix}Автор: ${book.author}
 ${prefix}Цена: ${book.price} BYN`;
        logToHTML(info, 'info');
    } catch (error) {
        logToHTML(`Ошибка при отображении информации о книге: ${error.message}`, 'error');
    }
}

// Основная демонстрационная функция
function runDemo() {
    logToHTML('=== ЗАПУСК ДЕМОНСТРАЦИИ РАБОТЫ БИБЛИОТЕКИ ===', 'success');
    
    try {
        // 1. СОЗДАЕМ ОБЫЧНУЮ БИБЛИОТЕКУ
        logToHTML('1. Создаем центральную библиотеку...', 'info');
        currentLibrary = new Library("Центральная библиотека", "Минск, пр. Независимости, 1", 5);
        showLibraryInfo(currentLibrary);

        // 2. СОЗДАЕМ КНИГИ
        logToHTML('2. Создаем книги...', 'info');
        const book1 = new Book(
            "JavaScript для начинающих",
            "Основы программирования на JavaScript",
            "Иван Иванов",
            25.50
        );
        
        const book2 = new Book(
            "Продвинутый JavaScript", 
            "Современные возможности ES6+",
            "Петр Петров",
            35.00
        );

        books.push(book1, book2);

        showBookInfo(book1);
        showBookInfo(book2);

        // 3. ДОБАВЛЯЕМ КНИГИ В БИБЛИОТЕКУ
        logToHTML('3. Добавляем книги в библиотеку...', 'info');
        currentLibrary.addBook(book1);
        currentLibrary.addBook(book2);
        showLibraryInfo(currentLibrary);

        // 4. ДЕМОНСТРАЦИЯ КОПИРОВАНИЯ
        logToHTML('4. Копируем библиотеку...', 'info');
        const libraryCopy = currentLibrary.copy();
        showLibraryInfo(libraryCopy, 'Копия: ');

        // 5. ДЕМОНСТРАЦИЯ УДАЛЕНИЯ
        logToHTML('5. Удаляем книгу из библиотеки...', 'info');
        currentLibrary.deleteBook(book1.id);
        showLibraryInfo(currentLibrary);

        // 6. ДЕМОНСТРАЦИЯ ЦИФРОВОЙ БИБЛИОТЕКИ (без проблемного await)
        logToHTML('6. Создаем цифровую библиотеку...', 'info');
        const digitalLib = new DigitalLibrary(
            "Цифровая библиотека IT",
            "https://digital-library.by",
            1000,
            "https://digital-library.by",
            9.99,
            true
        );
        showLibraryInfo(digitalLib, "Цифровая: ");

        logToHTML('=== ДЕМОНСТРАЦИЯ УСПЕШНО ЗАВЕРШЕНА ===', 'success');
        
        updateLibraryInfo();

    } catch (error) {
        logToHTML(`❌ Ошибка: ${error.message}`, 'error');
        console.error('Детали ошибки:', error);
    }
}

// Функция для добавления случайной книги
function addRandomBook() {
    if (!currentLibrary) {
        logToHTML('❌ Сначала создайте библиотеку!', 'error');
        return;
    }

    try {
        const adjectives = ["Интересная", "Увлекательная", "Познавательная", "Захватывающая", "Практическая"];
        const topics = ["JavaScript", "Python", "React", "Node.js", "Базы данных", "Алгоритмы"];
        const authors = ["А. Иванов", "П. Петров", "С. Сидоров", "М. Ковалева", "Д. Смирнов"];
        
        const randomBook = new Book(
            `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${topics[Math.floor(Math.random() * topics.length)]}`,
            "Автоматически сгенерированная книга для демонстрации",
            authors[Math.floor(Math.random() * authors.length)],
            parseFloat((Math.random() * 50 + 10).toFixed(2))
        );

        currentLibrary.addBook(randomBook);
        books.push(randomBook);
        
        logToHTML(`✅ Добавлена книга: "${randomBook.title}"`, 'success');
        showLibraryInfo(currentLibrary);
        updateLibraryInfo();

    } catch (error) {
        logToHTML(`❌ Ошибка при добавлении книги: ${error.message}`, 'error');
    }
}

// Функция для обновления информации о библиотеке в правой панели
function updateLibraryInfo() {
    const libraryInfo = document.getElementById('libraryInfo');
    
    if (!currentLibrary) {
        libraryInfo.innerHTML = '<p>Библиотека не создана</p>';
        return;
    }

    try {
        let html = `
            <div class="library-card">
                <h3>${currentLibrary.name}</h3>
                <p><strong>ID:</strong> ${currentLibrary.id}</p>
                <p><strong>Адрес:</strong> ${currentLibrary.address}</p>
                <p><strong>Книг:</strong> ${currentLibrary.books.length} / ${currentLibrary.maxBookCount}</p>
                <p><strong>Открыта:</strong> ${currentLibrary.isOpen ? 'Да' : 'Нет'}</p>
                <p><strong>Год основания:</strong> ${currentLibrary.establishedYear}</p>
                <p><strong>Посетителей:</strong> ${currentLibrary.totalVisitors}</p>
            </div>
        `;

        if (currentLibrary.books.length > 0) {
            html += '<h4>Книги в библиотеке:</h4>';
            currentLibrary.books.forEach(book => {
                html += `
                    <div class="book-card">
                        <h4>${book.title}</h4>
                        <p><strong>Автор:</strong> ${book.author}</p>
                        <p><strong>Цена:</strong> ${book.price} BYN</p>
                        <p><strong>ID книги:</strong> ${book.id}</p>
                    </div>
                `;
            });
        }

        libraryInfo.innerHTML = html;
    } catch (error) {
        libraryInfo.innerHTML = `<p>Ошибка при обновлении информации: ${error.message}</p>`;
    }
}

// Функция для очистки вывода
function clearOutput() {
    document.getElementById('consoleOutput').innerHTML = '';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    logToHTML('Система управления библиотекой загружена!', 'success');
    logToHTML('Нажмите "Запустить демонстрацию" для начала работы.', 'info');
    
    // Назначаем обработчики событий на существующие кнопки
    const runDemoBtn = document.getElementById('runDemo');
    const clearOutputBtn = document.getElementById('clearOutput');
    const addRandomBookBtn = document.getElementById('addRandomBook');

    if (runDemoBtn) runDemoBtn.addEventListener('click', runDemo);
    if (clearOutputBtn) clearOutputBtn.addEventListener('click', clearOutput);
    if (addRandomBookBtn) addRandomBookBtn.addEventListener('click', addRandomBook);
});
