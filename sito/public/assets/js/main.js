import { initializeImageLoading } from './components/image-loading.js';
import { initializeNavbar } from './components/navbar.js';
import { initializeVideoPlayers } from './components/video-player.js';
import { initializePhotoSlideshows } from './components/photo-slideshow.js';
import { initializeMotion } from './components/motion.js';
import { initializeCurrentYear } from './components/current-year.js';
import { initializeVisitDirections } from './components/visit-directions.js';
import { initializeCarousels } from './components/carousel.js';
import { initializeAboutStories } from './components/about-story.js';

initializeNavbar();
initializeVideoPlayers();
initializePhotoSlideshows();
initializeAboutStories();
initializeMotion();
initializeCurrentYear();
initializeVisitDirections();
initializeCarousels();

initializeImageLoading();
