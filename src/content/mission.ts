export interface MissionHeroContent {
  /** Eyebrow badge text */
  eyebrow: string;
  /** Main display headline */
  headline: string;
  /** First line of headline for desktop wrapping */
  headlineLine1: string;
  /** Second line of headline for desktop wrapping */
  headlineLine2: string;
  /** Supporting editorial paragraph */
  description: string;
}

export const missionHeroContent: MissionHeroContent = {
  eyebrow: '100% donor-funded and volunteer-powered.',
  headline: 'Give, Serve, Share',
  headlineLine1: 'Give, Serve,',
  headlineLine2: 'Share',
  description:
    'Manna Share A Meal is sustained by individuals, businesses, and churches. Join us with fresh healthy food, volunteer time, and steady support.',
};
