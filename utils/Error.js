class MyError extends Error {
    constructor(message) {
      super(message);
      this.name = "MyError";
    }
  }

  export {MyError}