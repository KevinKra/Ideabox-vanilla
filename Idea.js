class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.quality = "Swill";
    this.id = Date.now();
  }
  updateQuality(quality) {
    this.quality = quality;
  }
}
