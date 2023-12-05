export const PhotoService = {
  getData() {
    return [
      {
        itemImageSrc:
          "https://i.ibb.co/MVrJVPK/auri.png",
        thumbnailImageSrc:
          "https://i.ibb.co/44HxH3r/ipods1-mini.png",
        alt: "",
        title: "Title 1"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/VvskVQZ/auri.png",
        thumbnailImageSrc:
          "https://i.ibb.co/C1ptp0K/ipods2-mini.png",
        alt: "Description for Image 2",
        title: "Title 2"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/tP651Dc/auri-3.png",
        thumbnailImageSrc:
          "https://i.ibb.co/HKJghKX/ipods3-mini.png",
        alt: "Description for Image 3",
        title: "Title 3"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/k3NhHLP/auri-2.png",
        thumbnailImageSrc:
          "https://i.ibb.co/RjVCW1b/ipods4-mini.png",
        alt: "Description for Image 4",
        title: "Title 4"
      },
    ];
  },

  getImages() {
    return Promise.resolve(this.getData());
  }
};
