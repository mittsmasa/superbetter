import { setProjectAnnotations } from '@storybook/react-vite';
import { setupVitestVRT } from '@superbetter/vrt';
import * as projectAnnotations from './preview';

setProjectAnnotations([projectAnnotations]);
setupVitestVRT();
