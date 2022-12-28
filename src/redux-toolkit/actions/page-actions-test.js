import { actionWithContext } from '../redux-utils/redux-utils';

import { pageButton } from '../../config/stringsGeneric';

export const firstTest = (context) =>
   actionWithContext(context, pageButton.first.txt);

export const prevTest = (context) =>
   actionWithContext(context, pageButton.prev.txt);

export const nextTest = (context) =>
   actionWithContext(context, pageButton.next.txt);

export const lastTest = (context) =>
   actionWithContext(context, pageButton.last.txt);

export const goToPageNumberTest = (context) =>
   actionWithContext(context, 'goToPageNumber');

export const displayPerPageTest = (context) =>
   actionWithContext(context, 'displayPerPage');

export const setLastPageNumberTest = (context) =>
   actionWithContext(context, 'setLastPageNumber');
