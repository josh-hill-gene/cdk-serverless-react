import { AuthService } from './AuthService';
import { config } from './config';
import * as AWS from 'aws-sdk';

async function callStuff() {
    const authService = new AuthService();

    const user = await authService.login(config.TEST_USER_NAME, config.TEST_USER_PASSWORD);
    await authService.getAWSTemporaryCredentials(user);
    const creds = AWS.config.credentials;
    const breakpointLine = 'breakpoint line';
}

callStuff();
