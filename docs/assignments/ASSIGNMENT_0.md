# Assignment TypeScript

## Assignment

The assignment needs to be solved in the [interactive editor](https://www.typescriptlang.org/play/?noCheck=true#code/PQKgUABCEMIE4FMCGAXBEUAt2II4FcBLRAEwgGMB7E9FSiAWyQGtbsIBzQgNwQDsK1HPgFU4icigA2ATwB0kaIogAlBEzjMAzgC5lAWggBxfoghbMlfFLIAjdEgEBRPvgYQA7oSwZ2AM0opKUovPg4IQj4tFEdyBF1lCAhDADlKXilE5Ig0vgAxQklCSj4swwBlckJ+OLKIAAlCaMo4GTq8xxitNqhsgEEIW0pKZnNLazJMJF5fdAAHOEo5hDgUaq0IACJCEk2AGi216QR9raR8LBbNiEcyTY5TE4NZrYAhYeYAGUJbOCRW64WKw2CJ8bBwbwvb6-f4yChSJBaLRgEDAMBgcgIpEQaF-VoAHgAKgA+CAAb0gEAWPFQ6G86l0EEJAG0ALoQAC8EDZAG4IMBgKC0HA+EgpBApE0UBBKH4ImgGMjKQKIABZBCXEg6G4kMiOeXqSlIXUASQVAAp6QxtYSAJTa7iUHbkylJLBNORWrRyOb4CyWhW2nmUgC+6KSKvVmu1iBQ+BFNyCBsVlIeKD6QXN9qZbJdSSSsfjAnd3q9waSYbDGJK0UYMlxsM5ED4CA8EHeIwbrSzwbAKr6usGH2RDHrPzx8mNJDN6nNFKSO21AEY9pSjlIENrNoT2PVKLZbN59kaLpY4FuAFJyFTXuRMwLMap8Y9JB58RDakzvhByDp8LoyKuIZBuio5dpOpoWvOERahAABMq5ut4G5bgMrwQggcqNM0rQynKhKEAwJyITcp4tFu5RoHM2ACPUSAeI+YQvpwjyfo8ciVE+cRASBYBgeOsJyFOM4MHOlKLhAADMJHrpuWw7ugnwtGQsovCokQcFozHnJc55bFeN43veUiPvwzFvh+xjsX+AE8b2KoAPIXL6KDamK4qyRskQQPgczLHA5CIggfaCoS9CEXMUhES2-4+VobA4IQHCYNKlEQmEMr+agxR8NqKUoHMugCjQGRLCscgMJQABehBBEgcgtBwwD8PoACq5TACQlDkFowAAOoILYwAXtMSCVBCcwoMAah+CsNQIMARjBLYYoAPoObYABWCCSL1aUadWUSBD+wQcOamytX5KyBfFGDIfEOinPxMKtHIaaXf5N0IARxxaFmvGOc5FxuUmQwjBsthwmFJlPiF94RAwkXRfw0p+glEAQsl0p9OISBwmVfxrCUeUoAVRWdQgpX+RV1W1QiDVwE1LXtZ13W9QNQ0jdwY3kBNU0zXNfBxIty1rRt227cAON-G0VBHRucinedHbaIMUMPk+j0HM9E5yH4kQkK8Mh9GRcDndDpnPraAOCk5BXA4m4pg6rqlIBQKwxN5FnoOaP4cHIBw2YiMi2nDYUI0j-Ao3F6OYylEDS3jmUrNlxMQPlhU6MVlMIME1OVTVdUM0zfBtR1XU9f1g3DaN42EJN02YYLwtLfuYtbTtKC9Ynss1sdiuUGdmxB90Q7g1rdbgXrBtG1+iDmnPP4jyHNsQHbLnaq4DD2HAeFj6r-ksd+YfhYjUVR7FaMvHH2O4-jWVE7l6ek5n2dU+VBd0-VjXNaXLMV+zauXMeZ80brNRAQsFqtxWlIdaHdJY90OlofuStNgqw2Ifb2E8daCSoCIFAs9Hj-R5EAA)

## Solution

```typescript
// Example solution:

// 1. Enum for book genres
enum Genre {
  Novel,
  NonFiction,
  Science,
  History,
  Fantasy,
}

// 2. Interface for the structure of a book
interface Book {
  id: number;       // unique ID
  title: string;    // title of the book
  author: string;   // name of the author
  genre: Genre;     // genre (enum)
}

// 3. Generic class for a general library
class Library<T> {
  private items: T[] = []; // internal list of items

  // Method: add an item
  addItem(item: T): void {
    this.items.push(item);
  }

  // Method: return all items
  getAll(): T[] {
    return this.items;
  }
}

// 4. Specialized class for books
class BookLibrary extends Library<Book> {
  // String operation: return all titles in uppercase
  getUppercaseTitles(): string[] {
    return this.getAll().map(book => book.title.toUpperCase());
  }

  // List operation: filter books by author (partial match allowed)
  findByAuthor(author: string): Book[] {
    return this.getAll().filter(book => book.author.includes(author));
  }

  // Extension: filter books by genre
  findByGenre(genre: Genre): Book[] {
    return this.getAll().filter(book => book.genre === genre);
  }

  // Bonus: count the number of books per genre
  countByGenre(): Record<string, number> {
    return this.getAll().reduce((stats, book) => {
      const key = Genre[book.genre]; // get genre name from enum
      stats[key] = (stats[key] || 0) + 1;
      return stats;
    }, {} as Record<string, number>);
  }
}

// 5. Test program
const myLibrary = new BookLibrary();

// Add books
myLibrary.addItem({
  id: 1,
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  genre: Genre.Fantasy,
});

myLibrary.addItem({
  id: 2,
  title: "A Brief History of Time",
  author: "Stephen Hawking",
  genre: Genre.Science,
});

myLibrary.addItem({
  id: 3,
  title: "The Lord of the Rings",
  author: "J.R.R. Tolkien",
  genre: Genre.Fantasy,
});

// Output: all titles in uppercase
// To implmenent use the right String operation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
console.log("Uppercase titles:", myLibrary.getUppercaseTitles());

// Output: all books by Tolkien
// To implmenent use the right Array operation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
console.log("Books by Tolkien:", myLibrary.findByAuthor("Tolkien"));

// Output: all books of a certain genre (e.g., Fantasy)
// To implmenent use the right Array operation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
console.log("Fantasy books:", myLibrary.findByGenre(Genre.Fantasy));

// Output: number of books per genre
// To implmenent use the right Array operation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
console.log("Books per genre:", myLibrary.countByGenre());
```