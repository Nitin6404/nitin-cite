export type social = {
  id: number;
  title: string;
  link: string;
};
export type movie = {
  title: string;
  description?: string;
};

export type song = {
  title: string;
  link: string;
};

export type reading = {
  title: string;
  type: "book" | "manga" | "web-novel";
  description?: string;
  link?: string;
};

export type code_projects = {
  project_name: string;
  github: string;
  image?: string;
  live_link?: string;
  docs?: string;
  description?: string;
};

export const code_projects: code_projects[] = [
  {
    project_name: "agentsonweb",
    description: "the best background agents",
    github: "https://github.com/nitin6404/agentsonweb",
    live_link: "https://agentsonweb.com",
  },
  {
    project_name: "git-acm",
    description: "revamped version",
    github: "https://github.com/nitin6404/git-acm",
  },
  {
    project_name: "0bs.chat",
    description: "built with mantra",
    github: "https://github.com/nitin6404/0bs-chat",
    live_link: "https://0bs.chat",
  },
  {
    project_name: "supermemory.ai",
    description: "ai testing and v2 api testing",
    github: "https://github.com/nitin6404/supermemory-work",
  },
];

export const not_found_images = [
  {
    id: 1,
    url: "https://61izvpe5ob.ufs.sh/f/ghNXXt9jhBA7heePrgO1cBmwLdT5ZRyqHtP3IUGSA4gxfQV0",
  },
  {
    id: 2,
    url: "https://61izvpe5ob.ufs.sh/f/ghNXXt9jhBA7gFJs0j9jhBA7aDxcElbpQXquP9kMnvOLZ6Ci",
  },
  {
    id: 3,
    url: "https://61izvpe5ob.ufs.sh/f/ghNXXt9jhBA7qaa9EJEcIaOMeuEbCg1HmlAi9sxSNX24GV7y",
  },
  {
    id: 4,
    url: "https://61izvpe5ob.ufs.sh/f/ghNXXt9jhBA7gz3sS49jhBA7aDxcElbpQXquP9kMnvOLZ6Ci",
  },
  {
    id: 5,
    url: "https://61izvpe5ob.ufs.sh/f/ghNXXt9jhBA7htdZu71cBmwLdT5ZRyqHtP3IUGSA4gxfQV0D",
  },
  {
    id: 6,
    url: "https://61izvpe5ob.ufs.sh/f/ghNXXt9jhBA782wmUSLJcvMWsprOm12CiUPSoX4uyKq307Rn",
  },
  {
    id: 7,
    url: "https://61izvpe5ob.ufs.sh/f/ghNXXt9jhBA7iyZrlBRnAUwghlYnQ36TSrL0EupG5CascFRb",
  },
];

export const songs = [
  {
    title: "Requiem for the Brigadier General",
    link: "https://www.youtube.com/watch?v=G6kSqPpSz1g",
  },
  {
    title: "But Not For Me (Vocal Version) ",
    link: "https://www.youtube.com/watch?v=QwAwtMt8t4s",
  },
  {
    title: "Into the night",
    link: "https://youtu.be/d-ePNt_NlF4",
  },
  {
    title: "Lacrimosa",
    link: "https://youtu.be/k1-TrAvp_xs",
  },
  {
    title: "3.0_1-one2blame.fyc",
    link: "https://www.youtube.com/watch?v=0pux7a1y8xo",
  },
  {
    title: "Piano Black",
    link: "https://youtu.be/ssmYUDYtrKA",
  },
  {
    title: "Tank!",
    link: "https://youtu.be/UFFa0QoHWvE",
  },
  {
    title: "An Ordinary Day",
    link: "https://www.youtube.com/watch?v=dygUU9itPXw",
  },
  {
    title: "YouSeeBIGGIRL/T:T",
    link: "https://youtu.be/vy63u2hKoPE",
  },
  {
    title: "Idea 10",
    link: "https://www.youtube.com/watch?v=5OIeIaAhQOg",
  },
  {
    title: "1.4_1-squ4rewiththeuniverse.wma",
    link: "https://www.youtube.com/watch?v=n3x0GylBOM0",
  },
  {
    title: "Night of the end",
    link: "https://youtu.be/AVgrV4clLTc",
  },

  {
    title: "pseudo",
    link: "https://www.youtube.com/watch?v=t9i7lSpJyE8",
  },
  {
    title: "spotlight",
    link: "https://youtu.be/Rgy-eAzARNE?si=yx_7U3joB363dNeb",
  },
  {
    title: "what's your pleasure",
    link: "https://youtu.be/_R5NMcdpuO4?si=4eWNrrZIagem_dLN",
  },
  {
    title: "posterity",
    link: "https://youtu.be/ZE5zXLOyEOQ?si=8n6FsIkTSkul4PUs",
  },
  {
    title: "too easy",
    link: "https://youtu.be/pBeLI6zUjsE?si=-kCIff6t5IKfmIwj",
  },
];

export const movies: movie[] = [
  {
    title: "Fight Club",
    description: "where is my mind",
  },
  {
    title: "Dune",
    description:
      "The Hand of God be my witness, I am the Voice from the Outer World! I will lead you to PARADISE!",
  },
  {
    title: "Prisoners",
    description: "it a maze",
  },
  {
    title: "The Prestige",
    description: "Are you watching closely?",
  },
  {
    title: "Whiplash",
    description: "Were you rushing or were you dragging?",
  },
  {
    title: "Se7en",
    description: "What's in the box?",
  },
  {
    title: "Zodiac",
    description: "Just because you can't prove it doesn't mean it isn't true",
  },
  {
    title: "The Godfather",
    description: "I'm gonna make him an offer he can't refuse.",
  },
  {
    title: "Inception",
    description:
      "An idea is like a virus... It can grow to define or destroy you.",
  },
  {
    title: "Nightcrawler",
    description:
      "If you want to win the lottery, you have to make the money to buy the ticket.",
  },
  {
    title: "Enemy",
    description: "there is a pattern",
  },
  {
    title: "Star Wars",
    description: "Anakin is gone. I am what remains",
  },
  {
    title: "Tenet",
    description: "Don't try to understand it. Feel it.",
  },
  {
    title: "Shutter Island",
    description:
      "Which would be worse – to live as a monster, or to die as a good man?",
  },
  {
    title: "Oppenheimer",
    description: "Now I am become Death, the destroyer of worlds",
  },
  {
    title: "American Psycho",
    description: "its just an abstraction, there's no real me",
  },
  {
    title: "Margin Call",
    description:
      "It's just money; it's made up. Pieces of paper with pictures on it",
  },
  {
    title: "The Machinist",
    description: "How do you wake up from a nightmare, if you're not asleep?",
  },
];

export const webSeries: movie[] = [
  {
    title: "Mr. Robot",
    description:
      "top 1% that plays god without permission and now, they are following me",
  },
  {
    title: "True Detective (S1)",
    description:
      "human consciousness, is a tragic misstep in evolution. We became too self-aware,",
  },
  {
    title: "Game of Thrones",
    description: "winter is coming",
  },
  {
    title: "House of the Dragon",
    description: "History does not remember blood. It remembers names.",
  },
  {
    title: "Hannibal",
    description: "Killing must feel good to God too. He does it all the time.",
  },
  {
    title: "Money Heist",
    description: "BELLA CIAO CIAO CIAO!!",
  },
  {
    title: "Suits",
    description: "I'm not lucky, I make my own luck.",
  },
];

export const anime: movie[] = [
  {
    title: "Death Note",
    description: "I've won. Exactly as planned.",
  },
  {
    title: "Attack on Titan",
    description:
      "I Just Keep Moving Forward. Until My Enemies Are Destroyed.",
  },
  {
    title: "Vinland Saga",
    description: "I have no enemies",
  },
  {
    title: "Black Clover",
    description: "If you die, I'll kill you.",
  },
  {
    title: "Baki Hanma",
    description: "Only by death is a true warrior defeated.",
  },
  {
    title: "One Piece",
    description: "The One Piece... is real!",
  },
  {
    title: "Monster",
    description: "The only thing all humans are equal in is death.",
  },
];

export const cinemaGallery: string[] = [];

export const readingItems: reading[] = [
  // Add your reading items here
];

export const socials: social[] = [
  {
    id: 1,
    title: "x/twitter",
    link: "https://x.com/nitinnennn",
  },
  {
    id: 2,
    title: "github",
    link: "https://github.com/nitin6404",
  },
  {
    id: 3,
    title: "linkedin",
    link: "https://www.linkedin.com/in/nitin6404/",
  },
];

export const walls = [
  {
    id: 1,
    link: "https://utfs.io/f/cd8841e4-0cd3-4c3a-b260-6c1b416f45bf-ar80q7.png",
  },
];
