// @flow

import React from 'react';
import { useTranslate } from '@accordo-feed/language.entry';

import lang from './consentBanner.lang';
import { BannerAlert } from './consentBanner.styled';

/*****************
 *   COMPONENT   *
 *****************/

const ConsentBanner = () => {
  const translate = useTranslate();

  return <BannerAlert className="at_consentBanner">{translate(lang.consentBanner)}</BannerAlert>;
};

export default ConsentBanner;
