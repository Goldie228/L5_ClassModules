
import IndexObject from './index-object.js';


export default class Book extends IndexObject {

  static type = "Book";

  #title;
  #desc;
  #author;
  #price;

  constructor(title, desc, author, price = 10.0) {
    super();

    this.#title  = title;
    this.#desc   = desc;
    this.#author = author;
    this.#price  = price;
  }

  // Геттеры
  get title()  { return this.#title;  }
  get desc()   { return this.#desc;   }
  get author() { return this.#author; }
  get price()  { return this.#price;  }

  // Сеттеры
  set title(newTitle)   { this.#title  = newTitle;  }
  set desc(newDesc)     { this.#desc   = newDesc;   }
  set author(newAuthor) { this.#author = newAuthor; }
  set price(newPrice)   { this.#price  = newPrice;  }

  show() {
    console.log(`
      - ID: ${this.id}
      - Название: ${this.#title}
      - Автор: ${this.#author}
      - Описание: ${this.#desc}
      - Цена: ${this.#price} BYN
    `);
  }

  delete() {
    this.#title  = null;
    this.#desc   = null;
    this.#author = null;
    this.#price  = null;
    super.destroy();
  }

  copy() {
    return new Book(
      this.#title,
      this.#desc,
      this.#author,
      this.#price
    );
  }
}
