export const PhotoService = {
  getData() {
    return [
      {
        itemImageSrc:
          "https://i.ibb.co/hcx9Hxy/iphone.png",
        thumbnailImageSrc:
          "https://i.ibb.co/G21bd5L/iphone-chiquito1.png",
        alt: "",
        title: "Title 1"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/pRphp76/Imagen-de-Whats-App-2023-07-24-a-las-17-13-56.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/ZJg1Wfq/iphone-chiquito2.png",
        alt: "Description for Image 2",
        title: "Title 2"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/hVZ0Lmk/Imagen-de-Whats-App-2023-07-24-a-las-17-13-55.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/F8DMW6r/iphone-chiquito.png",
        alt: "Description for Image 3",
        title: "Title 3"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/PQb4gtp/Imagen-de-Whats-App-2023-07-24-a-las-17-13-54.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/6D6KBLk/iphone-chiquito3.png",
        alt: "Description for Image 4",
        title: "Title 4"
      },
    ];
  },

  getImages() {
    return Promise.resolve(this.getData());
  }
};
