# Assignment Project Setup and HTML Basics

## Setup

Create a new Angular project using npx `npx -p @angular/cli ng new <repo-name>` (replace "`<repo-name>`") with the name of your choice.

Then remove all lines from the files `styles.scss` and `app.html`.

## 1. Create a Simple User Form

### Goal
Build a basic form for entering user data.

In this exercise, you will **only write HTML** — no TypeScript, no data binding, no logic yet.  
All code should go inside the `app.html` file. Remove all existing code first.

### Simple Form

Add a `<form>` element at the top of the page.  
Inside it, include the following input fields:

| Field | Type | Hint |
|--------|------|------|
| **First name** | text | Use `<input type="text">` |
| **Last name** | text | Use `<input type="text">` |
| **Age** | number | Use `<input type="number">` |

💡 *Tip:* Use `<label>` elements for each input for better accessibility.

Example (for inspiration):

```html
<label>First name:</label>
<input type="text" />
```

Also add a button using a `<button>` element. Set the `type="button"` as a HTML attribute to indicate that it's a normal button.

## 2. Create a user table

### Goal

Create a HTML table that contains the information about the existing users.

Below the form, add a <table> element that shows 3 example users.
The table should have a header row (<thead>) and a body (<tbody>).

| Column | Example values |
|---------|----------------|
| First name | Alice, Bob, Carol |
| Last name | Miller, Smith, Johnson |
| Age | 25, 31, 42 |

💡 *Tip:* Use `<th>` for table headers and `<td>` for table data.

Example structure:

```html
<table>
  <thead>
    <tr>
      <th>First name</th>
      <th>Last name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Miller</td>
      <td>25</td>
    </tr>
  </tbody>
</table>
```

You can add the following CSS to make the table look nicer. Find out in which file it should be added.

```css
table {
    margin-top: 30px;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}
```


## 3. Make table dynamic

- Use the `@for` and a field in the `app.ts` to generate the rows in the table dynamically.
  - consider this [guide on `@for`](https://angular.dev/guide/templates/control-flow#repeat-content-with-the-for-block)
- you can copy the following definition for the example data:
```javascript
[
  {
    firstName: 'Alice',
    lastName: 'Miller',
    age: 25
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    age: 31
  },
  {
    firstName: 'Carol',
    lastName: 'Johnson',
    age: 42
  }
];
```

## 4. Add the "Save" functionality

### Goal
When the user entered a new user and clicks "Save" the new user should be added to the table.

### Step by Step
- add the module `FormsModule` to the imports of the `App` component
- bind the values of the input fields to a field in the component
  - add a new field in the `app.ts` for each user param (`firstName`, `lastName`, `age`)
  - the fields must be `public` (`public` is the default, so you can just avoid it)
  - use the banana-in-the-box operator to bind the field's values to the input values (`[(ngModel)]="firstName"`)
- add a event listener to the button using the `(click)` event
  - add a method in the `app.ts` to create a new user and add it to the array of existing users

References:
- [How to bind to input field values](https://angular.dev/guide/forms/template-driven-forms#bind-input-controls-to-data-properties)
