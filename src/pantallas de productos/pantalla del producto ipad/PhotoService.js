export const PhotoService = {
  getData() {
    return [
      {
        itemImageSrc:
          "https://i.ibb.co/ZGdZtmF/apple-iphone-11-64gb-negro-b1971370829b42d8d716648229648108-1024-1024-1.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/mF85MqZ/apple-iphone-11-64gb-negro-b1971370829b42d8d716648229648108-1024-1024-1-mini.png",
        alt: "",
        title: "Title 1"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/3m4rSZc/Imagen-de-Whats-App-2023-08-07-a-las-20-16-05-3.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/56FSPML/Imagen-de-Whats-App-2023-08-07-a-las-20-16-05-3-mini.png",
        alt: "Description for Image 2",
        title: "Title 2"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/vmKQDjh/Imagen-de-Whats-App-2023-08-07-a-las-20-16-04-2.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/Xz1wrsR/Imagen-de-Whats-App-2023-08-07-a-las-20-16-04-2-mini.png",
        alt: "Description for Image 3",
        title: "Title 3"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/Wp873CB/Imagen-de-Whats-App-2023-08-07-a-las-20-16-05-4.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/wwWCYWL/Imagen-de-Whats-App-2023-08-07-a-las-20-16-05-4-mini.png",
        alt: "Description for Image 4",
        title: "Title 4"
      },
    ];
  },

  getImages() {
    return Promise.resolve(this.getData());
  }
};
