export const favouriteLocation = () => {
  let favourite = [];
  const addFavourite = (item) => {
    favourite.push(item);
  };

  const removeFavourite = (item) => {
    const index = favourite.indexOf(item);
    if (index !== -1) favourite.splice(index, 1);
  };

  const saveData = () => {
    localStorage.setItem('favourites', JSON.stringify(favourite));
  };
  const saved = localStorage.getItem('favourites');
  if (saved) {
    const loaded = JSON.parse(saved);
    favourite.splice(0, favourite.length, ...loaded);
  }

  return { favourite, addFavourite, saveData, removeFavourite };
};
