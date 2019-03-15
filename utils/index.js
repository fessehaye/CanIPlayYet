export const Steps = [
  {
    selector: '#slugTutorial',
    content:
      'Copy the slug from the Challonge bracket and paste it here. https://challonge.co' +
      'm/<slug> should be the format.',
  },
  {
    selector: '#setupTutorial',
    content: 'Enter the number of setups that you have available.',
  },
  {
    selector: '#checkTutorial',
    content:
      'Once you click check, a message will appear if there are available setups for fr' +
      'ee play.',
  },
  {
    selector: '#loopTutorial',
    content:
      'If you want to continuously check for updates, check this section and the update' +
      's will occur every 30 seconds. This is for the TO use only!',
  },
  {
    selector: '#shareTutorial',
    content:
      'That being said, if you want a link to share with others, this icon will open a ' +
      'shareable link that just needs to be refreshed if they want to see the current u' +
      'pdated message.',
  },
  {
    selector: '#slugTutorial',
    content:
      'If you need an incomplete bracket to test out, trying using https://challonge.co' +
      'm/caniplayexample with the slug caniplayexample. Try setting the setups to be gr' +
      'eater and less than six to see the different messages. Have fun!',
  },
];

export const SERVER =
  process.env.NODE_ENV === 'production'
    ? '/.netlify/functions/index'
    : 'http://localhost:9000';
