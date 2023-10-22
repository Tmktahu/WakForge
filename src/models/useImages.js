export const useImages = () => {
  const fetchItemImage = (imageId) => {
    fetch(`https://vertylo.github.io/wakassets/items/${imageId}.png`, {
      method: 'GET',
      mode: 'no-cors',
    })
      .then((response) => response.blob())
      .then((blob) => {
        return blob;
      });
  };

  return { fetchItemImage };
};
