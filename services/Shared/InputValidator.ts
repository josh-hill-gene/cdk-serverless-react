import { Space } from './Model';

export class MissingFieldError extends Error { }

export function validateAsSpaceEntry(arg: any) {
    if (!(arg as Space).name) {
        throw new MissingFieldError("Value is required for name");
    }
    if (!(arg as Space).location) {
        throw new MissingFieldError("Value is required for location");
    }
    if (!(arg as Space).spaceId) {
        throw new MissingFieldError("Value is required for spaceId");
    }
}
