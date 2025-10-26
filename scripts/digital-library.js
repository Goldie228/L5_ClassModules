
import Library from './library.js';


export default class DigitalLibrary extends Library {

  static type = "DigitalLibrary";

  #books = [];
  #name;
  #address;
  #maxBookCount;
  #isOpen;
  #establishedYear;
  #totalVisitors;
  #website;
  #subscriptionPrice;
  #isSubscriptionActive;

  constructor(
    name, 
    address, 
    maxBookCount = 1000, 
    website = "", 
    subscriptionPrice = 0, 
    isSubscriptionActive = false
  ) {
    super(name, address, maxBookCount);

    this.#name                 = name;
    this.#address              = address;
    this.#maxBookCount         = maxBookCount;
    this.#isOpen               = true;
    this.#establishedYear      = new Date().getFullYear();
    this.#totalVisitors        = 0;
    this.#website              = website;
    this.#subscriptionPrice    = subscriptionPrice;
    this.#isSubscriptionActive = isSubscriptionActive;
  }

  // Геттеры
  get name()                 { return this.#name;                 }
  get address()              { return this.#address;              }
  get maxBookCount()         { return this.#maxBookCount;         }
  get books()                { return this.#books;                }
  get isOpen()               { return this.#isOpen;               }
  get establishedYear()      { return this.#establishedYear;      }
  get totalVisitors()        { return this.#totalVisitors;        }
  get website()              { return this.#website;              }
  get subscriptionPrice()    { return this.#subscriptionPrice;    }
  get isSubscriptionActive() { return this.#isSubscriptionActive; }

  // Сеттеры
  set name(newName)                  { this.#name               = newName;    }
  set address(newAddress)            { this.#address            = newAddress; }
  set maxBookCount(newLimit)         { this.#maxBookCount       = newLimit;   }
  set isOpen(status)                 { this.#isOpen             = status;     }
  set totalVisitors(visitors)        { this.#totalVisitors      = visitors;   }
  set website(newWebsite)            { this.#website            = newWebsite; }
  set subscriptionPrice(newPrice)    { this.#subscriptionPrice  = newPrice;   }
  set isSubscriptionActive(status)   { this.#isSubscriptionActive = status;   }

  show() {
    console.log(`
      - ID: ${this.id}
      - Цифровая библиотека: ${this.#name}
      - Адрес: ${this.#address}
      - Веб-сайт: ${this.#website}
      - Кол-во книг: ${this.#books.length} из ${this.#maxBookCount}
      - Открыта: ${this.#isOpen ? 'Да' : 'Нет'}
      - Год основания: ${this.#establishedYear}
      - Посетителей: ${this.#totalVisitors}
      - Цена подписки: ${this.#subscriptionPrice} BYN
      - Подписка активна: ${this.#isSubscriptionActive ? 'Да' : 'Нет'}
    `);
  }

  #activateSubscription() {
    this.#isSubscriptionActive = true;
  }

  #deactivateSubscription() {
    this.#isSubscriptionActive = false;
  }

  toggleSubscription() {
    this.#isSubscriptionActive = !this.#isSubscriptionActive;
  }

  static clone(digitalLib) {
    const clone = new DigitalLibrary(
      digitalLib.name,
      digitalLib.address,
      digitalLib.maxBookCount,
      digitalLib.website,
      digitalLib.subscriptionPrice,
      digitalLib.isSubscriptionActive
    );

    clone.isOpen        = digitalLib.isOpen;
    clone.totalVisitors = digitalLib.totalVisitors;
    clone.#books        = [...digitalLib.books];
    return clone;
  }

  delete() {
    this.#books                = null;
    this.#name                 = null;
    this.#address              = null;
    this.#maxBookCount         = null;
    this.#isOpen               = null;
    this.#establishedYear      = null;
    this.#totalVisitors        = null;
    this.#website              = null;
    this.#subscriptionPrice    = null;
    this.#isSubscriptionActive = null;

    this.destroy();
  }

  copy() {
    const clone = new DigitalLibrary(
      this.#name, 
      this.#address, 
      this.#maxBookCount,
      this.#website,
      this.#subscriptionPrice,
      this.#isSubscriptionActive
    );

    clone.isOpen        = this.#isOpen;
    clone.totalVisitors = this.#totalVisitors;
    clone.#books        = [...this.#books];

    return clone;
  }
}
