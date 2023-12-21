// Given timestamp in UTC
const givenUtcTimestamp = new Date('2023-12-21T04:30:27.211458+00:00');

// Get the current system time in UTC
const currentUtcTime = new Date();

// Calculate the difference in milliseconds between the given timestamp and the current time
const timeDifference = currentUtcTime - givenUtcTimestamp;

// Check if the time difference is greater than 1 hour (in milliseconds)
const oneHourInMillis = 2 * 60 * 1000; // 1 hour in milliseconds

if (timeDifference > oneHourInMillis) {
  console.log('The difference is greater than 1 hour.');
} else {
  console.log('The difference is not greater than 1 hour.');
}
