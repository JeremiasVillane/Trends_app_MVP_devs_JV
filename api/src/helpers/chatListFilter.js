const chatListFilter = (array, searchString) => {
  searchString = searchString.toLowerCase();

  return array.filter((obj) => {
    const name = obj.name.toLowerCase();
    const username = obj.username ? obj.username.toLowerCase() : "";

    const words = searchString.toLowerCase().split(" ");
    return words.every(
      (word) => name.includes(word) || (obj.username && username.includes(word))
    );
  });
};

module.exports = chatListFilter;
