
export default class IndexObject {

  static type = "IndexObject";

  static _lastId = 0;

  constructor() {
    this.id = this.constructor.generateId();
  }

  static generateId() {
    return ++this._lastId;
  }

  static resetIdCounter() {
    this._lastId = 0;
  }

  get objectType() {
    return this.constructor.name;
  }

  show() {
    console.log(`ID: ${this.id}`);
  }

  destroy() {
    this.id = null;
  }
}
