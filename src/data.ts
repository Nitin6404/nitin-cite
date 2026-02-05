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
    title: "Attack On Titan",
    description: "one of my favourites. heartbound. ",
  },
  {
    title: "FA:Brotherhood(2011)",
    description: "one of my favourites.",
  },
  {
    title: "Jujutsu Kaisen",
    description:
      "best worldbuilding, best power structure. manga is super good.",
  },
  {
    title: "Se7en",
    description:
      "simple and sanguinary. ofc by david fincher. what's in the box?",
  },
  {
    title: "Hunter x Hunter(2011)",
    description: "one of my favourites. reading the manga currently.",
  },
  {
    title: "Whiplash",
    description: "obsession explained. on the point cast. ",
  },
  {
    title: "Mr Robot",
    description: "you should watch this. rami malek went godmode.",
  },
  {
    title: "The Prestige",
    description: "a not so much talked about great movie by christopher nolan.",
  },
  {
    title: "nymphomaniac vol 1&2",
    description: "one of the most interesting movies i've seen lately.",
  },
  {
    title: "orb: about the movements of earth",
    description:
      "beautiful, it gets better every time you watch it. i can say it's one of my favourites",
  },
  {
    title: "kengen ashura",
    description: "i loved it. this was very very good.",
  },
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
