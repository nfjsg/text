// Importing the openDB function from 'idb' library
import { openDB } from 'idb';

// Function to initialize the 'JATE' database
const initializeDatabase = async () => {
  try {
    // Opening or creating the 'JATE' database with version 1
    const db = await openDB('JATE', 1, {
      // Upgrade function called when the database version changes
      upgrade(database) {
        // Checking if the 'JATE' object store already exists
        if (database.objectStoreNames.contains('JATE')) {
          console.log('JATE database already exists');
          return;
        }
        // Creating a new 'JATE' object store with an auto-incrementing 'id' key
        database.createObjectStore('JATE', { keyPath: 'id', autoIncrement: true });
        console.log('JATE database created');
      },
    });
  } catch (error) {
    console.error('Error initializing the JATE database', error);
  }
};

// Function to insert or update data in the 'JATE' database
export const saveToDatabase = async (content) => {
  try {
    // Opening the 'JATE' database, named JATE, version 1
    const db = await openDB('JATE', 1);
    // Starting a new read/write transaction on the 'JATE' object store
    const transaction = db.transaction('JATE', 'readwrite');
    // Accessing the 'JATE' object store
    const objectStore = transaction.objectStore('JATE');
    // Attempting to add or update the content within the store
    const request = objectStore.put({ id: 1, value: content });
    // Waiting for the request to complete and getting the result
    const result = await request;
    // Ensuring the transaction is completed before moving on
    await transaction.done;
    // Logging a successful operation to the console
    console.log('Data saved to the JATE database', result);
    // Returning the result for processing or confirmation
    return result;
  } catch (error) {
    console.error('Error saving data to the JATE database', error);
  }
};

// Function to retrieve all content from the 'JATE' database
export const retrieveFromDatabase = async () => {
  console.log('Retrieving data from the JATE database');

  try {
    // Creating a connection to the 'JATE' database, specifying version 1
    const db = await openDB('JATE', 1);
    // Creating a new transaction, specifying object store and setting it to 'readonly'
    const transaction = db.transaction('JATE', 'readonly');
    // Opening the desired 'JATE' object store
    const objectStore = transaction.objectStore('JATE');
    // Using the .get(1) method to get all data from the store
    const result = await objectStore.get(1);

    // Logging the results and returning them
    console.log('All data retrieved from the JATE database:', result);
    return result?.value;
  } catch (error) {
    console.error('Error retrieving data from the JATE database', error);
  }
};

// Calling the initializeDatabase function to initialize the 'JATE' database
initializeDatabase();
