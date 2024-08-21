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

  const mapEditorInteractive = new MapEditorInteractive(config, textures);
  app.addComponent(mapEditorInteractive, 1080 - 720 - 40 + 0.25, 200 + 0.25, 720, 720);
  mapEditorInteractive.setupKeyControls();
  $('#panel-1').append(mapEditorInteractive.$element);
});
