import { langHelper } from '@accordo-feed/micro-frontends-utils';

const genId = langHelper.genLangId('shell.aco.consentBanner');
const genOpts = langHelper.genLangOptions(genId);

export default {
  consentBanner: genOpts(
    'consentBanner',
    'This site uses cookies for analytics, personalized content and ads. By continuing to browse this site, you agree to this use.'
  )
};
