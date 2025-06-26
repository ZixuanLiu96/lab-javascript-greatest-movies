// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directorsArr = moviesArray.map((item) => item.director);
  const cleanDirectorsArr = directorsArr.filter(
    (item, index, self) => self.indexOf(item) === index
  );
  // console.log(cleanDirectorsArr);
  return cleanDirectorsArr;
}

// console.log(getAllDirectors(movies));

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const stevenArr = moviesArray.filter(
    (item) => item.director === "Steven Spielberg"
  );
  let count = 0;
  stevenArr.forEach((item) => {
    if (item.genre.includes("Drama")) count++;
  });
  return count;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!moviesArray.length) return 0;
  let totalScore = 0;
  moviesArray.forEach((item) => {
    if (item.score) {
      totalScore += item.score;
    }
  });
  return parseFloat((totalScore / moviesArray.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMoviesArr = moviesArray.filter((item) =>
    item.genre.includes("Drama")
  );
  if (!dramaMoviesArr.length) return 0;
  let totalDramaScore = 0;
  dramaMoviesArr.forEach((item) => {
    if (item.score) totalDramaScore += item.score;
  });
  return parseFloat((totalDramaScore / dramaMoviesArr.length).toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const newArr = moviesArray.toSorted((a, b) =>
    a.year === b.year ? a.title.localeCompare(b.title) : a.year - b.year
  );
  return newArr;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const titleArr = moviesArray.map((item) => item.title).sort();
  return titleArr.splice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map((item) => {
    const newItem = { ...item };
    const hoursToMins = parseInt(item.duration.split("")[0]) * 60;
    // console.log(hoursToMins);

    let mins = item.duration.split(" ")[1];
    if (mins) mins = item.duration.split(" ")[1];
    else mins = "0min";
    const newMins = parseInt(mins.slice(0, mins.length - "min".length));

    const newDuration = hoursToMins + newMins;
    // console.log(newDuration);
    newItem["duration"] = newDuration;
    // console.log(item);
    return newItem;
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) return null;
  const newArr = moviesArray
    .map((item) => item.year)
    .filter((item, index, self) => self.indexOf(item) === index);

  console.log(newArr);

  const yearlyArr = newArr.map((year) => {
    let count = 0;
    let totalScore = 0;
    moviesArray.forEach((element) => {
      if (year === element.year) {
        count++;
        totalScore += element.score ? element.score : 0;
      }
    });
    return { year: year, count: count, score: totalScore / count };
  });
  console.log(yearlyArr);
  let bestScore = 0;
  yearlyArr.forEach(
    (item, index) =>
      (bestScore = bestScore > item.score ? bestScore : item.score)
  );
  console.log(bestScore);
  const bestYearMovie = yearlyArr.filter((item) => item.score === bestScore);

  let oldestYear = bestYearMovie[0].year;
  if (bestYearMovie.length > 1) {
    bestYearMovie.forEach(
      (item) => (oldestYear = oldestYear < item.year ? oldestYear : item.year)
    );
    const oldestYearMovie = bestYearMovie.filter(
      (item) => item.year === oldestYear
    );
    return `The best year was ${oldestYearMovie[0].year} with an average score of ${bestScore}`;
  }

  return `The best year was ${bestYearMovie[0].year} with an average score of ${bestScore}`;
}

console.log(bestYearAvg(movies));
