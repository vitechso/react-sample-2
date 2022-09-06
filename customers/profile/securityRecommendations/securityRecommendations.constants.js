export const TABLE_COLUMNS = {
  IMPROVEMENT_ACTION: 'improvementAction',
  STATUS: 'status',
  SCORE: 'score',
  MAX_SCORE: 'maxScore',
  CONTROL_CATEGORY: 'controlCategory',
  USER_IMPACT: 'userImpact'
};

export const COL_WIDTHS = {
  [TABLE_COLUMNS.IMPROVEMENT_ACTION]: '15%',
  [TABLE_COLUMNS.STATUS]: '12%',
  [TABLE_COLUMNS.SCORE]: '15%',
  [TABLE_COLUMNS.MAX_SCORE]: '10%',
  [TABLE_COLUMNS.CONTROL_CATEGORY]: '10%',
  [TABLE_COLUMNS.USER_IMPACT]: '13%'
};

export const langTable = {
  [TABLE_COLUMNS.IMPROVEMENT_ACTION]: 'Improvement Actions',
  [TABLE_COLUMNS.STATUS]: 'Status',
  [TABLE_COLUMNS.SCORE]: 'Current Secure Score',
  [TABLE_COLUMNS.MAX_SCORE]: 'Max Secure Score',
  [TABLE_COLUMNS.CONTROL_CATEGORY]: 'Category',
  [TABLE_COLUMNS.USER_IMPACT]: 'User Impact'
};

export const STATUS = {
  COMPLETED: 'Completed',
  NOT_COMPLETED: 'Not Completed'
};

export const IMPACT = {
  LOW: 'Low',
  MODERATE: 'Moderate',
  HIGH: 'High'
};
