import React from "react";

function useImagePreload(urls = []) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!urls.length) return;

    let loadedCount = 0;

    urls.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === urls.length) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === urls.length) {
          setLoaded(true);
        }
      };
    });
  }, [urls]);

  return false;
}

export default useImagePreload;
