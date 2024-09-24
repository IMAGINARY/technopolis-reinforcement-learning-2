const EventEmitter = require('events');

class Screensaver {
  constructor(videoPath) {
    this.events = new EventEmitter();
    this.$video = $('<video></video>')
      .attr({
        src: videoPath,
        autoplay: true,
        loop: true,
        muted: true,
      });
    this.$element = $('<div></div>')
      .addClass('screensaver')
      .append(this.$video);

    this.$element.on('pointerdown', () => {
      this.handleUserInteraction();
    });
  }

  show() {
    this.$element.appendTo('body');
    this.$video[0].play().catch((err) => {
      console.error(`Error playing screensaver video: ${err}`);
    });
  }

  hide() {
    this.$element.remove();
  }

  handleUserInteraction() {
    this.hide();
    this.events.emit('userInteraction');
  }
}

module.exports = Screensaver;
