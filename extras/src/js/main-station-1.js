/* eslint-disable no-console */

const PixiCompositeApp = require('./view-pixi/pixi-composite-app');
const ExploreExploitInteractive = require('./components/interactive-explore-exploit');
const RewardsInteractive = require('./components/interactive-rewards');
const MapEditorInteractive = require('./components/interactive-map-editor');
const runExhibit = require('./run-exhibit');
require('../sass/technopolis.scss');
const ReactionController = require('./view-html/reaction-controller');
const { installIdleHandler } = require('./helpers-html/idle');

runExhibit((config, textures) => {
  const app = new PixiCompositeApp(
    1080,
    1920,
    0xffffff,
    config.pixiOptions || {}
  );
  $('#pixi-app-container').append(app.getView());

  const paddingX = 80;
  const paddingY = 40;
  const uiSpacing = 100;

  const rewardsPanel = $('#rewards-component').parent("[class*='tl-panel-']");
  const rewardsInteractive = new RewardsInteractive(config, textures);
  $('#rewards-bar').append(rewardsInteractive.$barContainer);
  $('#rewards-ui').append(rewardsInteractive.ui.$element);
  app.addComponent(rewardsInteractive,
    rewardsPanel.offset().left + paddingX + 0.25,
    rewardsPanel.offset().top + uiSpacing + paddingY + 0.25,
    720,
    720 / 8
  );

  const exploreExploitPanel = $('#explore-exploit-component').parent("[class*='tl-panel-']");
  const exploreExploitInteractive = new ExploreExploitInteractive(config, textures);
  app.addComponent(exploreExploitInteractive,
    exploreExploitPanel.offset().left + paddingX + 0.25,
    exploreExploitPanel.offset().top + paddingY + 0.25,
    720,
    (720 / 8) * 2
  );
  $('#explore-exploit-ui').append(exploreExploitInteractive.ui.$element);

  const reactionController = new ReactionController($('body'), config);
  exploreExploitInteractive.view.robotView.events.on('reactEnd', (animation) => {
    const bounds = exploreExploitInteractive.view.robotView.sprite.getBounds();
    reactionController.launchReaction(
      animation.reaction,
      bounds.x,
      bounds.y - bounds.height / 2
    );
  });

  if (config.idleTimeout) {
    installIdleHandler(() => {
      window.location.reload();
    }, config.idleTimeout);
  }
});
