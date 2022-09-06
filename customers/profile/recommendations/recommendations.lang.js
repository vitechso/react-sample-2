import React from 'react';
import { langHelper } from '@accordo-feed/micro-frontends-utils';
import { LanguageEntry } from '@accordo-feed/language.entry';
import { RECOMMENDATIONS_ACTION_TYPES } from 'src/constants';

const genId = langHelper.genLangId('consumption.overviewpage.subpage.recommendations');
export const genLang = langHelper.genLangOptions(genId);

export const lang = {
  // The actions key come from pre-defined enums and each key should match to a language entry:
  // https://accordo.atlassian.net/wiki/spaces/PD/pages/688750593/Consumption+Recommendation+Language+Entries
  recommendedActions: {
    [RECOMMENDATIONS_ACTION_TYPES.SWITCH_PLAN]: genLang(
      'switch_plan',
      'Save {cost} annually. You have {quantity} users who do not use the full range of  products in their plans. You can switch these to less expensive plans'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.STOP_RENEWING]: genLang(
      'stop_renewing',
      'Save {cost} annually by removing your {quantity} unassigned {subscription} subscription plans.'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.REASSIGNABLE]: genLang(
      'reassignable',
      'Save {cost} annually. You have {quantity} users who have not used their assigned plan for over 90 days. You can reassign these plans to save money.'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.CONSULT_TEAMS]: genLang(
      'consult_teams',
      '{percentage}% of {subscription} users currently use Microsoft Teams. Offer adoption training to increase consulting revenue, while helping your customer collaborate better.'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.ONEDRIVE_DATA_FLUCTUATION]: {
      ACTION: (
        <LanguageEntry
          {...genLang(
            'onedrive_data_fluctuation',
            '<b>OneDrive storage space</b> - There was a sudden fluctuation in OneDrive storage space. Consider investigating this activity, and offering backup or security solutions.'
          )}
        />
      ),
      ADDED: genLang('onedrive_data_fluctuation_added', '{quantity} GB of files added'),
      REMOVED: genLang('onedrive_data_fluctuation_removed', '{quantity} GB of files removed')
    },
    [RECOMMENDATIONS_ACTION_TYPES.ONEDRIVE_FILE_FLUCTUATION]: {
      ACTION: (
        <LanguageEntry
          {...genLang(
            'onedrive_file_fluctuation',
            '<b>OneDrive files</b> - There was a sudden fluctuation in OneDrive files. Consider investigating this activity, and offering backup or security solutions.'
          )}
        />
      ),
      ADDED: genLang('onedrive_file_fluctuation_added', '{quantity} files added'),
      REMOVED: genLang('onedrive_file_fluctuation_removed', '{quantity} files removed')
    },
    [RECOMMENDATIONS_ACTION_TYPES.STORAGE_ONEDRIVE_DATA_FLUCTUATION]: genLang(
      'storage_onedrive_data_fluctuation',
      '<b>OneDrive storage space</b> - There was a sudden fluctuation in OneDrive storage space. Consider investigating this activity, and offering backup or security solutions.'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.STORAGE_ONEDRIVE_FILE_FLUCTUATION]: genLang(
      'storage_onedrive_file_fluctuation',
      '<b>OneDrive files</b> - There was a sudden fluctuation in OneDrive files. Consider investigating this activity, and offering backup or security solutions.'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.OPTIMIZE_TEAMS]: genLang(
      'optimize_teams',
      'Increase employee efficiencies. Use more of your unused applications like Teams in your in your {subscription} plans.'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.OPTIMIZE_CLOUD]: genLang(
      'optimize_cloud',
      'Consider moving more of your infrastructure to the cloud. {quantity}% of your organisationâ€™s devices are ready to support Microsoft cloud products.'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.MFA_REGISTRATION]: genLang(
      'mfa_registration',
      'Encourage users to register for Azure AD Multifactor Authentication, there are {quantity} accounts not benefiting from increased security benefits.  Have users sign in to  <a target="_blank" href="https://account.activedirectory.windowsazure.com">Azure Active Directory</a> to configure their account.'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.MFA_CAPABLE]: genLang(
      'mfa_capable',
      '{quantity} accounts are currently not benefiting from increased security Azure Active Directory Multi-factor authentication provides. Multi-factor authentication (MFA) is a process where a user is prompted during a sign-in event for additional forms of identification. This prompt could be to enter a code on their cellphone or to provide a fingerprint scan. When you require a second form of authentication, security is increased as this additional factor is not something that is easy for an attacker to obtain or duplicate. Consider enabling Azure AD MultiFactor Authentication by following steps outlined <a target="_blank" href="https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-azure-mfa">here</a>. For help planning an Azure AD Multifactor Authentication deployment see <a target="_blank" href="https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-getstarted">here</a>.'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.SSPR_ENABLED]: genLang(
      'sspr_enabled',
      `Azure Active Directory (Azure AD) self-service password reset (SSPR) gives users the ability to change or reset their password, with no administrator or help desk involvement. If Azure AD locks a user's account or they forget their password, they can follow prompts to unblock themselves and get back to work. This ability reduces help desk calls and loss of productivity when a user can't sign in to their device or an application. Currently there are {quantity} users that could benefit from Self Serve Password Reset click <a target="_blank" href="https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr">here</a> for tutorials on how to enable this feature.`
    ),
    [RECOMMENDATIONS_ACTION_TYPES.SSPR_REGISTRATION]: genLang(
      'sspr_registration',
      'Encourage users to register for Self Serve Password Reset, there are {quantity} users that could benefit from Self Serve Password Reset.  They will only need to sign in again.'
    ),
    [RECOMMENDATIONS_ACTION_TYPES.MISASSIGNED_OFFBOARDED]: genLang(
      'misassigned_offboarded',
      'Save {cost} annually by removing {quantity} {subscription} licenses currently assigned to deactivated users.'
    )
  }
};
