(function() {

  // Name displayed under button.
  var APP_NAME = 'Avatars';
  // Resolve paths to relative resources.
  // Icon displayed on main tablet "home".
  var APP_ICON = Script.resolvePath('avatar-switcher.svg');
  // URL of the page to be displayed in the tablet.
  var APP_URL = Script.resolvePath('avatar-template.html?v1');

  var avatar_urls = [
    'http://www.frutigergroup.com/high_fidelity/avatar/kf_hifi/kf_hifi.fst',
    'http://www.frutigergroup.com/high_fidelity/avatar/' +
        'kf_hifi_glasses/kf_hifi_with_glasses.fst',
  ]

  var tablet = Tablet.getTablet('com.highfidelity.interface.tablet.system');
  var button = tablet.addButton({
    text: APP_NAME,
    icon: APP_ICON
  });

  // Callback for click on the tablet button.
  function clicked() {
    // Launch the app.
    tablet.gotoWebScreen(APP_URL);
  }

  button.clicked.connect(clicked);

  // Callback for web events from the web screen via EventBridge
  function onWebEventReceived(eventMessage) {
    print('script test v2');
    print('Received Web Event: ' + eventMessage);

    var event;

    try {
      event = JSON.parse(eventMessage);
    } catch(e) {
      print('WebEvent message is not a JSON string. ' +
            'Not going to process it further. ' + e);
      return;
    }

    if (event && event.type === 'click') {
      switch (event.data) {
        case 'Avatar 1':
          print('Avatar 1 data');
          MyAvatar.skeletonModelURL = avatar_urls[0];

          break;

        case 'Avatar 2':
          print('Avatar 2 data');
          MyAvatar.skeletonModelURL = avatar_urls[1];

          break;

        default:
          // nothing
      }
    }
  }

  tablet.webEventReceived.connect(onWebEventReceived);

  // Callback for the script ending
  function cleanup() {
    tablet.removeButton(button);
  }

  Script.scriptEnding.connect(cleanup);

}()); // Must auto-call the function.