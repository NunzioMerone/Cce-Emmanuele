export interface HeroSentence {
  text: string;
  delay: number;
}

export interface HeroContent {
  sentences: HeroSentence[];
  ctaText: string;
  ctaAction: () => void;
  videoSrc: string;
}
