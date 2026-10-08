import { aboutCommunityIntro } from '../components/about-community-intro.mjs';
import { aboutHero } from '../components/about-hero.mjs';
import { aboutStory } from '../components/about-story.mjs';
import { beliefs } from '../components/beliefs.mjs';
import { aboutTerritory } from '../components/about-territory.mjs';
import { aboutFurtherInfo } from '../components/about-further-info.mjs';
import { aboutPastors } from '../components/pastor-profile.mjs';
import { aboutInvitation } from '../components/about-invitation.mjs';

export const about = () => `${aboutHero()}${aboutCommunityIntro()}${beliefs()}${aboutStory()}${aboutTerritory()}${aboutPastors()}${aboutFurtherInfo()}${aboutInvitation()}`;
