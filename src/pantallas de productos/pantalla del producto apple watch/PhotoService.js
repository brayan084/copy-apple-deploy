export const PhotoService = {
  getData() {
    return [
      {
        /* imagen principal que se ven grande en el carrusel */
        itemImageSrc:
          "https://i.ibb.co/mTTf8qM/Imagen-de-Whats-App-2023-08-07-a-las-20-09-45-1.jpg",
        /* imagen de previsualizacion del carrusel */
        thumbnailImageSrc:
          "https://i.ibb.co/M283qDh/Imagen-de-Whats-App-2023-08-07-a-las-20-09-45-1-mini.png",
        alt: "",
        title: "Title 1"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/VHQRfYY/Imagen-de-Whats-App-2023-08-07-a-las-20-09-45-2.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/2F6ZWkG/Imagen-de-Whats-App-2023-08-07-a-las-20-09-45-2-mini.png",
        alt: "Description for Image 2",
        title: "Title 2"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/S7W0H3M/Imagen-de-Whats-App-2023-08-07-a-las-20-09-46-3.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/18F5ckB/Imagen-de-Whats-App-2023-08-07-a-las-20-09-46-3-mini.png",
        alt: "Description for Image 3",
        title: "Title 3"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/vB22p1B/Imagen-de-Whats-App-2023-08-07-a-las-20-09-46-4.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/NSk88nf/Imagen-de-Whats-App-2023-08-07-a-las-20-09-46-4-mini.png",
        alt: "Description for Image 4",
        title: "Title 4"
      },
    ];
  },

  getImages() {
    return Promise.resolve(this.getData());
  }
};
