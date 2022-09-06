import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genSuccessfulSecureAppId = langHelper.genLangId('shell.aco.customers.successfulSecureAppModal');
const genSuccessfulSecureAppLang = langHelper.genLangOptions(genSuccessfulSecureAppId);

export default {
  headerText: genSuccessfulSecureAppLang('modalTitle', 'Your Partner Center has been connected successfully!'),
  contentTitle: genSuccessfulSecureAppLang('contentTitle', 'What now?'),
  stepText: genSuccessfulSecureAppLang('stepText', 'Step'),
  stepNumber: genSuccessfulSecureAppLang('stepNumber', '3'),
  paragraphTitle: genSuccessfulSecureAppLang('paragraphTitle', 'Select and Import Clients'),
  paragraph: genSuccessfulSecureAppLang(
    'paragraph',
    "Select the clients whose data you wish to import into Entori, then click ‘Sync Client Data’ in order to start automatic syncing of your clients' license, consumption, and security data."
  ),
  button: genSuccessfulSecureAppLang('button', 'Continue'),
  noteText: genSuccessfulSecureAppLang(
    'noteText',
    'Previously added clients with delegated access have been re-synced where possible.'
  )
};
