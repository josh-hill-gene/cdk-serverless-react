import { App } from '@aws-cdk/core';

import { SpaceStack } from './SpaceStack';

const app = new App();
const spaceStack = new SpaceStack(app, 'Space-Finder', {
    stackName: 'SpaceFinder'
});
