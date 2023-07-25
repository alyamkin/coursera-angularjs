var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Number array: ', numberArray);

function aboveFiveFilter(value) {
  return value > 5;
}
const filteredNUmberArray = numberArray.filter(aboveFiveFilter);
console.log('Filtered Number array: ', filteredNUmberArray);

const shoppingList = [
  'Milk',
  'Donuts',
  'Cookies',
  'Chocolate',
  'Peanut Butter',
  'Pepto Bismol',
  'Pepto Bismol (Chocolate flavor)',
  'Pepto Bismol (Cookie flavor)',
];

console.log('Shopping List: ', shoppingList);

const searchValue = 'Bismo';

function containsFilter(value) {
  return value.indexOf(searchValue) !== -1;
}

const searchedShoppingList = shoppingList.filter(containsFilter);

console.log('Searched Shopping List: ', searchedShoppingList);
