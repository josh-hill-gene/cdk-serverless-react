import { handler } from '../../services/SpacesTable/Create';

const event = {
    body: {
        location: 'Sugar Land'
    }
};

handler(event as any, {} as any);
