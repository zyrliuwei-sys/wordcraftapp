import { createFileRoute } from '@tanstack/react-router';

import { staticPageRouteOptions } from './-static-page';

export const Route = createFileRoute('/(pages)/wordcraft-web-version-guide')(
  staticPageRouteOptions('wordcraft-web-version-guide')
);
