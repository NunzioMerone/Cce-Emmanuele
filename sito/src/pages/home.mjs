import { homeHero } from '../components/home-hero.mjs';
import { homeAboutIntro } from '../components/home-about-intro.mjs';
import { homeAppointments } from '../components/home-appointments.mjs';
import { sermonPreview } from '../components/sermon-preview.mjs';
import { homeVisit } from '../components/home-visit.mjs';

export const home = () => `${homeHero()}${homeAboutIntro()}${homeAppointments()}${sermonPreview()}${homeVisit()}`;
