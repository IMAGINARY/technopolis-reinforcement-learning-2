/* eslint-disable no-console */

const PixiCompositeApp = require('./view-pixi/pixi-composite-app');
const ExploreExploitInteractive = require('./components/interactive-explore-exploit');
const RewardsInteractive = require('./components/interactive-rewards');
const MapEditorInteractive = require('./components/interactive-map-editor');
const runExhibit = require('./run-exhibit');
const { installIdleHandler } = require('./helpers-html/idle');
require('../sass/technopolis.scss');

runExhibit((config, textures) => {
  const app = new PixiCompositeApp(
    1080,
    1920,
    0xffffff,
    config.pixiOptions || {}
  );
  $('#pixi-app-container').append(app.getView());

  const paddingX = 285;
  const paddingY = 40;
  const uiSpacing = 100;

  const mapEditorPanel = $('#map-editor-component').parent("[class*='tl-panel-']");
  const mapEditorInteractive = new MapEditorInteractive(config, textures);
  app.addComponent(mapEditorInteractive,
    mapEditorPanel.offset().left + paddingX + 0.25,
    mapEditorPanel.offset().top + paddingY + uiSpacing + 0.25,
    720,
    720
  );
  mapEditorInteractive.setupKeyControls();
  $('#palette').append(mapEditorInteractive.$element);

  if (config.idleTimeout) {
    installIdleHandler(() => {
      window.location.reload();
    }, config.idleTimeout);
  }
});
