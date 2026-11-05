import { createFileRoute } from '@tanstack/react-router';

import { staticPageRouteOptions } from './-static-page';

export const Route = createFileRoute('/(pages)/wordcraft-online-guide')(
  staticPageRouteOptions('wordcraft-online-guide')
);
