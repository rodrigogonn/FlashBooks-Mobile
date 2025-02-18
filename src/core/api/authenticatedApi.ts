import { createApiInstance } from './createApiInstance';
import { withAuthorization } from './utils/withAuthorization';

export const authenticatedApi = withAuthorization(createApiInstance());
