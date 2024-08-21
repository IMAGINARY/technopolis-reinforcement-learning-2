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

  const exploreExploitInteractive = new ExploreExploitInteractive(config, textures);
  app.addComponent(exploreExploitInteractive, 20.25, 820.25, 480, (480 / 8) * 2);
  $('#explore-exploit-ui').append(exploreExploitInteractive.ui.$element);

  const rewardsInteractive = new RewardsInteractive(config, textures);
  app.addComponent(rewardsInteractive, 20.25, 500.25, 480, 480 / 8);
  $('#rewards-bar').append(rewardsInteractive.$barContainer);
  $('#rewards-ui').append(rewardsInteractive.ui.$element);
});
