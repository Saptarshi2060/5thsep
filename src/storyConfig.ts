/**
 * STORY CONFIGURATION
 * 
 * You can easily customize names, dates, quotes, and music here!
 * All text and milestones can be edited to match your personal relationship.
 */

export interface StoryConfig {
  boyName: string;
  girlName: string;
  anniversaryDate: string; // The day you met / first interaction
  currentDate: string;     // Today (1 year milestone)
  musicTitle: string;
  musicUrl: string;        // Direct MP3 URL or Pixabay audio link
  quotes: {
    opening: string;
    chapter1: string;
    chapter2: string;
    chapter3Intro: string;
    chapter3Outro: string;
    chapter4: string[];
    chapter5: string[];
    chapter6Intro: string;
    chapter6CareLines: string[];
    chapter6Outro: string;
    chapter7: {
      tag1: string;
      tag2: string;
      tag3: string;
    };
    todayReflection: {
      stats: string[];
      apologyLines: string[];
      reassurance: string;
    };
    ifICouldGoBack: string;
    finalGratitude: string[];
  };
}

export const storyConfig: StoryConfig = {
  // Names of you and your girlfriend
  boyName: "Him",
  girlName: "Her",
  
  // Important Dates
  anniversaryDate: "5 September 2025",
  currentDate: "5 September 2026",

  // Music settings:
  // You can paste a direct .mp3 file URL here (e.g. from your Pixabay download or hosted MP3).
  // If left as is or if network audio is unavailable, our built-in romantic acoustic melody
  // synth will automatically play a warm, soothing romantic music box tune!
  musicTitle: "Our Song",
  musicUrl: "https://pixabay.com/music/upbeat-romantic-romantic-music-493488/",

  quotes: {
    opening: "And that's where our story began.",
    chapter1: "Two people who didn't know that a random follow request would eventually become something this important.",
    chapter2: "Somewhere between the conversations, the laughs and the countless little moments... we started becoming us.",
    chapter3Intro: "Our little world began to take shape.",
    chapter3Outro: "The little things became my favorite things.",
    chapter4: [
      "Of course, we weren't perfect.",
      "We argued.",
      "We misunderstood each other.",
      "Sometimes we said things we wished we hadn't."
    ],
    chapter5: [
      "Because love isn't about never fighting.",
      "It's about learning how to find your way back to each other."
    ],
    chapter6Intro: "Maybe love isn't always the big dramatic moments.",
    chapter6CareLines: [
      "\"Did you eat?\"",
      "\"Are you okay?\"",
      "\"Text me when you reach.\"",
      "\"Come here.\"",
      "\"I missed you.\""
    ],
    chapter6Outro: "It's caring about someone even when nobody is watching.",
    chapter7: {
      tag1: "We are cute.",
      tag2: "Mostly.",
      tag3: "Okay... sometimes we're absolute chaos."
    },
    todayReflection: {
      stats: [
        "365 days.",
        "One year.",
        "Countless conversations.",
        "A ridiculous number of arguments.",
        "Even more laughs.",
        "So many hugs.",
        "So many little moments.",
        "And somehow... we're still here."
      ],
      apologyLines: [
        "And today, I got something very important wrong.",
        "I hurt you.",
        "I'm sorry.",
        "You didn't deserve to cry because of my words.",
        "I don't want to make excuses for it. I was wrong.",
        "I'm still learning how to love someone without letting anger speak for me.",
        "And I want to do better."
      ],
      reassurance: "I know an animation can't undo what happened. But I hope this reminds you of what I'm trying to build with you."
    },
    ifICouldGoBack: "If I could go back to this exact moment... knowing everything I know now... I'd still send it.",
    finalGratitude: [
      "One year since you accepted my request.",
      "One year since a tiny notification changed my life.",
      "Thank you for every laugh.",
      "Every hug.",
      "Every kiss.",
      "Every meal.",
      "Every stupid argument.",
      "Every apology.",
      "Every moment you cared.",
      "Every moment you stayed.",
      "I'm sorry for today.",
      "I'm grateful for this year."
    ]
  }
};
