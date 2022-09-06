// @flow

import React from 'react';
import { useTranslate } from '@accordo-feed/language.entry';
import { constants } from '@accordo-feed/aco-styled-components';

import * as Styled from './sucessfulSecureAppModal.styled';
import lang from './sucessfulSecureAppModal.lang';

const { colors } = constants;

/*************
 *   TYPES   *
 *************/

export type Actions = {
  closeSecureAppModal: Function
};

type Props = {
  actions: Actions,
  secureAppModalState: Boolean
};

/******************
 *   COMPONENTS   *
 ******************/

export default ({ actions, secureAppModalState }: Props) => {
  const translate = useTranslate();

  const onClose = () => actions.closeSecureAppModal();

  return (
    <Styled.Modal visible={secureAppModalState} onCancel={onClose} destroyOnClose={true}>
      <Styled.GlobalStyle />
      <Styled.SuccessHeader>
        <Styled.CheckIcon twoToneColor={colors.lightGreen} />
        <Styled.HeaderText>{translate(lang.headerText)}</Styled.HeaderText>
      </Styled.SuccessHeader>

      <Styled.ContentWrapper>
        <Styled.ContentTitle>{translate(lang.contentTitle)}</Styled.ContentTitle>
        <Styled.DetailWrapper>
          <Styled.StepWrapper>
            {translate(lang.stepText)}
            <Styled.StepNumber> {translate(lang.stepNumber)} </Styled.StepNumber>
          </Styled.StepWrapper>

          <Styled.DescriptionWrapper>
            <Styled.ParagraphTitle>{translate(lang.paragraphTitle)}</Styled.ParagraphTitle>
            <Styled.Paragraph>{translate(lang.paragraph)}</Styled.Paragraph>
          </Styled.DescriptionWrapper>
        </Styled.DetailWrapper>

        <Styled.ContinueButton onClick={onClose}>{translate(lang.button)}</Styled.ContinueButton>
        <Styled.NoteText>{translate(lang.noteText)}</Styled.NoteText>
      </Styled.ContentWrapper>
    </Styled.Modal>
  );
};
