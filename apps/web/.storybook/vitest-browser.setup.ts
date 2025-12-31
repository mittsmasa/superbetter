import { setProjectAnnotations } from '@storybook/nextjs-vite';
import { setupVitestVRT } from '@superbetter/vrt';
import * as projectAnnotations from './preview';

setProjectAnnotations([projectAnnotations]);
setupVitestVRT();
