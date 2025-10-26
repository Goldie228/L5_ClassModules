
import Book        from './book.js';
import IndexObject from './index-object.js';


export default class Library extends IndexObject {

  static type = "Library";

  #books = [];
  #name;
  #address;
  #maxBookCount;
  #isOpen;
  #establishedYear;
  #totalVisitors;

  constructor(name, address, maxBookCount = 1000) {
    super();

    this.#name            = name;
    this.#address         = address;
    this.#maxBookCount    = maxBookCount;
    this.#isOpen          = true;
    this.#establishedYear = new Date().getFullYear();
    this.#totalVisitors   = 0;
  }

  // Геттеры
  get name()            { return this.#name;            }
  get address()         { return this.#address;         }
  get maxBookCount()    { return this.#maxBookCount;    }
  get books()           { return this.#books;           }
  get isOpen()          { return this.#isOpen;          }
  get establishedYear() { return this.#establishedYear; }
  get totalVisitors()   { return this.#totalVisitors;   }

  // Сеттеры
  set name(newName)           { this.#name           = newName;    }
  set address(newAddress)     { this.#address        = newAddress; }
  set maxBookCount(newLimit)  { this.#maxBookCount   = newLimit;   }
  set isOpen(status)          { this.#isOpen         = status;     }
  set totalVisitors(visitors) { this.#totalVisitors  = visitors;   }

  addBook(book) {
    if (!(book instanceof Book)) {
      throw new Error("Можно добавлять только экземпляры Book");
    }

    if (this.#books.length >= this.#maxBookCount) {
      throw new Error("Превышен лимит книг в библиотеке");
    }

    this.#books.push(book);
  }

  addBooks(booksArray) {
    if (!Array.isArray(booksArray)) {
      throw new Error("Ожидается массив книг");
    }

    booksArray.forEach(book => this.addBook(book));
  }

  show() {
    console.log(`
      - ID: ${this.id}
      - Библиотека: ${this.#name}
      - Адрес: ${this.#address}
      - Кол-во книг: ${this.#books.length} из ${this.#maxBookCount}
      - Открыта: ${this.#isOpen ? 'Да' : 'Нет'}
      - Год основания: ${this.#establishedYear}
      - Посетителей: ${this.#totalVisitors}
    `);
  }

  #resetBooks() {
    this.#books = [];
  }

  #increaseVisitors() {
    this.#totalVisitors++;
  }

  static clone(lib) {
    const clone = new Library(
      lib.name,
      lib.address,
      lib.maxBookCount
    );

    clone.isOpen        = lib.isOpen;
    clone.totalVisitors = lib.totalVisitors;

    return clone;
  }

  deleteBook(bookId) {
    this.#books = this.#books.filter(book => book.id !== bookId);
  }

  delete() {
    this.#books           = null;
    this.#name            = null;
    this.#address         = null;
    this.#maxBookCount    = null;
    this.#isOpen          = null;
    this.#establishedYear = null;
    this.#totalVisitors   = null;
    this.destroy();
  }

  copy() {
    const clone = new Library(
      this.#name, 
      this.#address, 
      this.#maxBookCount
    );

    clone.isOpen        = this.#isOpen;
    clone.totalVisitors = this.#totalVisitors;
    clone.#books        = [...this.#books];

    return clone;
  }
}
