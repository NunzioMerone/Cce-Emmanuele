import { aboutCommunityIntro } from '../components/about-community-intro.mjs';
import { aboutHero } from '../components/about-hero.mjs';
import { aboutStory } from '../components/about-story.mjs';
import { beliefs } from '../components/beliefs.mjs';
import { aboutVision } from '../components/about-vision.mjs';
import { communityGallery } from '../components/community-gallery.mjs';
import { aboutPastors } from '../components/pastor-profile.mjs';
import { aboutInvitation } from '../components/about-invitation.mjs';

export const about = () => `${aboutHero()}${aboutCommunityIntro()}${aboutVision()}${beliefs()}${aboutStory()}${aboutPastors()}${communityGallery()}${aboutInvitation()}`;
