/* eslint-disable no-console */

const PixiCompositeApp = require('./view-pixi/pixi-composite-app');
const ExploreExploitInteractive = require('./components/interactive-explore-exploit');
const RewardsInteractive = require('./components/interactive-rewards');
const MapEditorInteractive = require('./components/interactive-map-editor');
const runExhibit = require('./run-exhibit');
require('../sass/technopolis.scss');

runExhibit((config, textures) => {
  const app = new PixiCompositeApp(
    1080,
    1920,
    0xffffff
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
});
