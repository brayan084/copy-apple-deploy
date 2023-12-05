export const PhotoService = {
  getData() {
    return [
      {
        itemImageSrc:
          "https://i.ibb.co/QkKHTdg/IMG-20230807-WA0017.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/qxx1WJT/IMG-20230807-WA0017-mini.png",
        alt: "",
        title: "Title 1"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/Y2dqyyk/IMG-20230807-WA0019.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/QQ6bsP3/IMG-20230807-WA0019-mini.png",
        alt: "Description for Image 2",
        title: "Title 2"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/CMhnWk7/IMG-20230807-WA0016.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/Vwd5V6r/IMG-20230807-WA0016-mini.png",
        alt: "Description for Image 3",
        title: "Title 3"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/qs9QRNz/IMG-20230807-WA0018.jpg",
        thumbnailImageSrc:
          "https://i.ibb.co/9srBbdr/IMG-20230807-WA0018-mini.png",
          
        alt: "Description for Image 4",
        title: "Title 4"
      },
    ];
  },

  getImages() {
    return Promise.resolve(this.getData());
  }
};
