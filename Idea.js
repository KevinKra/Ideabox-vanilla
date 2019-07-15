class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.quality = "Swill";
    this.favorite = false;
    this.id = Date.now();
  }
  updateQuality(quality) {
    this.quality = quality;
  }
  toggleFavoriteCard() {
    this.favorite = !this.favorite;
  }
}
