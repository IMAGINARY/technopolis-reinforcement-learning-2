# Technopolis-specific documentation

## Configuring the screensaver

The exhibit has screensaver functionality that can be configured in the `settings-exhibit.yml` file.

Two settings are available:
```
idleTimeout: 300
screensaverVideo: 'static/screensaver/test.mp4'
```

The `idleTimeout` setting is the number of seconds of inactivity that the exhibit will wait for 
before starting the  screensaver. The `screensaverVideo` setting is the path to the video file that 
will be played during the screensaver.

The screensaver video file should be placed in the `static/screensaver` directory. The video file
should be in a format that is supported by the browser, such as `.mp4`. The video file should be
silent, and it will be played in a loop.

If a screen touch is detected during the screensaver, the exhibit will reload, guaranteeing that the
the state of the exhibit is reset.

If the `screensaverVideo` setting is not set (i.e. commented out), when `idleTimeout` seconds
have passed, the exhibit will simply reload, resetting its state.

It's recommended that the `idleTimeout` setting is always non-zero:

- To remove from screen any images in bad taste drawn with the map editor.
- To reset the AI, in case it diverged or became "too good" at the current map.
- To reset the exhibit to its initial state, in case of any other bugs or issues.

## Replacing image files

The images used for tiles (e.g. robot, wall, lava, etc.) and for tool palette icons can be replaced
by placing new image files in the `static/icons` directory and changing the corresponding entries in
`settings-exhibit.yml`.

The robot image is set in the following entry:

```
robot:
  texture: 'static/icons/robot.svg'
```

Tiles have more associated values. The entry that controls the "candy" tiles looks like this:

```
  5:
    name: Candy
    color: '#ffffff'
    walkable: true
    reward: -0.2
    texture: 'static/icons/candy-alt.png'
    textureVisited: 'static/icons/candy-alt-tr.png'
    editorIcon: 'static/icons/candy.svg'
    type: candy
    react: once
    reaction: 'static/openmoji/red-heart.svg'
```

The following image files are used:

- **texture**: The image that is displayed on the map.
- **textureVisited**: The image that is displayed on the map when the tile has been visited.
- **editorIcon**: The image that is displayed in the tool palette.
- **reaction**: The robot's reaction (emoji) when it steps on the tile.

For some uses, `textureVisited` and `reaction` are not required. See the entry you want to replace
for details.

The `texture` and `textureVisited` images can be PNG or SVG files. PNGs should be 120x120 pixels.

**IMPORTANT**: If SVG files are used, they should be responsive, and the <?xml> header element
must be removed, or they won't work. For these reasons, it's recommended to use PNG files.

For the `editorIcon` and `reaction` images, SVG files are recommended. Use the existing files as
reference.
