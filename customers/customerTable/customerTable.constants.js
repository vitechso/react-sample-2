const isWideScreen = window.matchMedia('(min-width: 1640px)').matches;

export const COL_WIDTHS = {
  ACTIVE_USERS: 75,
  TOTAL_LICENCES: 110,
  AVAL_LICENCES: 135,
  CONNECTION_STATUS: isWideScreen ? 160 : 100,
  VISIT_CONNECTION: 110,
  LAST_REFRESHED: isWideScreen ? 160 : 100,
  CONNECTION_TYPE: isWideScreen ? 160 : 145,
  LINK_CONNECTION: isWideScreen ? 140 : 110,
  EDIT_BUTTON: isWideScreen ? 60 : 30
};
