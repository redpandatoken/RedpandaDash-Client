import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: '', // e.g: 'Name | Developer'
  lang: 'en', // e.g: en, es, fr, jp
  description: 'Welcome to Redpanda Dashboard', // e.g: Welcome to my website
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'twitter',
      url: 'https://twitter.com/RedPandaToken',
    },
    {
      id: nanoid(),
      name: 'telegram',
      url: 'https://t.me/redPandaToken',
    },
    {
      id: nanoid(),
      name: 'reddit',
      url: 'https://reddit.com/r/FrogeFinance/',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: true, // set to false to disable the GitHub stars/fork buttons
};
