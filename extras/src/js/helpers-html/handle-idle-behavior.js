const Screensaver = require('../view-html/screensaver');
const { installIdleHandler } = require('./idle');

function initIdleBehavior(config) {
  if (config.idleTimeout) {
    if (config.screensaverVideo) {
      const screensaver = new Screensaver(config.screensaverVideo);
      screensaver.events.on('userInteraction', () => {
        window.location.reload();
      });
      installIdleHandler(() => {
        screensaver.show();
      }, config.idleTimeout);
    } else {
      installIdleHandler(() => {
        window.location.reload();
      }, config.idleTimeout);
    }
  }
}

module.exports = initIdleBehavior;
