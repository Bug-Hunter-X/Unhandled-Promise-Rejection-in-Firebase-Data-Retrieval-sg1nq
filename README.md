# Unhandled Promise Rejection in Firebase Data Retrieval

This repository demonstrates a common error encountered when working with Firebase's asynchronous operations, specifically when accessing data from Firestore before the promise resolves.  The `bug.js` file showcases the problematic code, and `bugSolution.js` provides a corrected implementation.

## Problem
Accessing properties of a Firestore document snapshot before the promise fulfills results in an error because `snapshot.data()` might return `undefined`.  Additionally, not properly unsubscribing from `onSnapshot` listeners can cause memory leaks when the component unmounts.

## Solution
The solution involves using `.then()` or `async/await` to handle the promise returned by `getDoc()` or other asynchronous methods. For `onSnapshot`, it is crucial to unsubscribe when the component is unmounted.

## How to reproduce
Clone the repository and run `npm install`. Then run `node bug.js` to see the error. Run `node bugSolution.js` to see the corrected code.