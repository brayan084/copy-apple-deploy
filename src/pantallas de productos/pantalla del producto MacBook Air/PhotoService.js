export const PhotoService = {
  getData() {
    return [
      {
        itemImageSrc:
          "https://i.ibb.co/yWC3q5s/mac-2.png",
        thumbnailImageSrc:
          "https://i.ibb.co/gjJ9ffS/mac-2-1-mini.png",
        alt: "",
        title: "Title 1"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/6Zs9L5t/mac-2.png",
        thumbnailImageSrc:
          "https://i.ibb.co/k3QT0Rp/mac-2-2-mini.png",
        alt: "Description for Image 2",
        title: "Title 2"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/bdv4QPY/mac-3.png",
        thumbnailImageSrc:
          "https://i.ibb.co/z60kKrZ/mac-3-3-mini.png",
        alt: "Description for Image 3",
        title: "Title 3"
      },
      {
        itemImageSrc:
          "https://i.ibb.co/bPDJVRx/mac.png",
        thumbnailImageSrc:
          "https://i.ibb.co/xCkSWDV/mac-4-mini.png",
        alt: "Description for Image 4",
        title: "Title 4"
      },
    ];
  },

  getImages() {
    return Promise.resolve(this.getData());
  }
};
