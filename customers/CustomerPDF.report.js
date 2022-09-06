// @flow

import React from 'react';
import * as R from 'ramda';
import { Document, Font, Page, Path, StyleSheet, Svg, Text, View, Image } from '@react-pdf/renderer';
import { convertBytes, dateConverter, getBytesUnitByMinRange, numberFormatter } from 'src/utils';

/*************
 *   TYPES   *
 *************/

type Props = {
  data: Object,
  logo: string | null,
  orgName: string,
  name: string
};

/*****************
 *   COMPONENT   *
 *****************/

const now = new Date();

const ConnectionsList = {
  '365Admin': '365 Admin (Graph)',
  azureAD: 'Active Directory',
  azureCostAPI: 'Azure Cost API',
  azurePerformance: 'Azure Performance',
  partnerCenter: 'Partner Center',
  securityCenter: 'Security Center'
};

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v8/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf' }, // font-style: normal
    {
      src: 'https://fonts.gstatic.com/s/inter/v8/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZg.ttf',
      fontWeight: 500
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v8/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZg.ttf',
      fontWeight: 600
    }
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    lineHeight: '1.5',
    color: '#6B7280',
    paddingTop: 0,
    paddingBottom: 40,
    fontFamily: 'Inter'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  headerRight: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0E0C22'
  },
  subheaderRight: {
    fontSize: 7
  },
  superscript: {
    position: 'relative',
    top: -0.2
  },
  logo: {
    color: '#0E0C22'
  },
  imageWrap: {
    width: 125,
    height: 50,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  logoImage: {
    maxWidth: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  text: {
    margin: 10,
    textAlign: 'justify'
  },
  text5: {
    fontSize: 5
  },
  text7: {
    fontSize: 7
  },
  text8: {
    fontSize: 8
  },
  text9: {
    fontSize: 8,
    color: '#0E0C22'
  },
  text10: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0E0C22'
  },
  textColorRed: {
    color: '#e92525'
  },
  textColorGreen: {
    color: '#5CD470'
  },
  sections: {
    marginTop: 5,
    marginBottom: 5
  },
  sectionHeading: {
    lineHeight: 2,
    color: '#0E0C22',
    borderBottomWidth: 1,
    borderColor: '#D1D5DB'
  },
  h2: {
    display: 'block',
    color: '#0E0C22',
    fontSize: 16,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 0,
    marginRight: 0,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  left: {
    // width: '33%',//<- working alternative
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 130
  },
  right: {
    paddingLeft: 10,
    // width: '66%', //<- working alternative
    flexShrink: 1,
    flexGrow: 2
  },
  recomm: {
    padding: 5
  },
  topRecomm: {
    paddingHorizontal: 30
  },
  diagnosticItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  execSummaryItemList: {
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  execSummaryItem: {
    width: '48%',
    marginBottom: 20,
    flexDirection: 'row'
  },
  execSummaryItemRight: {
    flexGrow: 1
  },
  infoHeadingText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#6B7280'
  },
  execSummaryItemHeadingText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#6B7280',
    paddingVertical: 7
  },
  execSummaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  count: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    lineHeight: '1.3'
  },
  label: {
    fontSize: 7
  },
  alignCenter: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  alignRight: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  flexRow: {
    flexDirection: 'row'
  },
  iconWrap: {
    backgroundColor: '#0d0b0b',
    width: 25,
    height: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  topRecommLeft: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 120,
    textAlign: 'right',
    paddingRight: 20,
    borderRightWidth: 1,
    borderColor: '#D1D5DB',
    position: 'relative'
  },
  topRecommRight: {
    flexGrow: 1,
    paddingLeft: 20,
    paddingVertical: 10
  },
  topRecommBlock: {
    marginTop: 20
  },
  topRecommTitle: {
    fontSize: 8,
    fontWeight: '700',
    color: '#000'
  },
  topRecommType: {
    fontSize: 8,
    fontWeight: '700',
    color: '#6B7280'
  },
  topRecommBlockLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#000'
  },
  topRecommBlockValue: {
    fontSize: 8,
    fontWeight: '700',
    color: '#000'
  },
  p0: {
    padding: 0
  },
  m0: {
    margin: 0
  },
  mt5: {
    marginTop: 5
  },
  mt10: {
    marginTop: 10
  },
  mt18: {
    marginTop: 18
  },
  recommSummary: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 8,
    borderLeftWidth: 3,
    borderColor: '#0d0b0b',
    backgroundColor: '#F3F4F6',
    marginBottom: 2,
    lineHeight: 1.3
  },
  topRecommContent: {
    marginTop: 0
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#0d0b0b',
    borderRadius: 20,
    position: 'absolute',
    right: '-6'
  },
  footer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 15,
    fontSize: 8,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  select: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0
  },
  bar: {
    flexGrow: 1,
    height: 8,
    borderRadius: 20,
    backgroundColor: '#bfbfbf',
    position: 'relative',
    paddingHorizontal: '30px'
  },
  progress: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '0',
    height: 8,
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: '#111827',
    fontSize: 8,
    top: 0,
    left: 0
  },
  chartContainer: {
    flexDirection: 'column'
  }
});

const Progress = ({ value }) => (
  <View style={[styles.progress, { width: `${value}%` }]}>
    <Text style={{ fontSize: 8, marginTop: 4 }}>{value}</Text>
  </View>
);

const Select = props => (
  <View style={styles.select}>
    <View style={styles.bar}>
      <Progress {...props} />
    </View>
  </View>
);

const Report = ({ data, logo, orgName, name }: Props) => {
  const {
    accountManager,
    allocation,
    // azureSubscriptions,
    brandAccentColor,
    connections,
    m365Utilization,
    reportDate,
    security,
    topRecommendations
  } = data;

  return (
    <Document>
      <Page style={styles.page} wrap size="A4">
        <View style={styles.header} fixed>
          {logo ? (
            <View style={styles.imageWrap}>
              <Image style={styles.logoImage} src={logo} />
            </View>
          ) : (
            <Text style={styles.logo}>{orgName}</Text>
          )}

          <View style={[styles.alignRight]}>
            <Text style={[styles.headerRight]}>Modern Workplace Assessment</Text>
            <View style={[styles.flexRow]}>
              <Text style={[styles.subheaderRight, styles.text7]}>Powered by Entori</Text>
              <Text style={[styles.superscript, styles.text5]}>TM</Text>
            </View>
          </View>
        </View>

        <View style={[styles.row, styles.m0]}>
          <View style={styles.left}>
            <View style={styles.sections}>
              <Text style={styles.text8}>On Behalf of:</Text>
              <Text style={styles.text10}>{name}</Text>
            </View>
            <View style={styles.sections}>
              <Text style={styles.text9}>{accountManager?.fullName ?? ''}</Text>
              <Text style={styles.text7}>{accountManager?.phoneNumber ?? ''}</Text>
              <Text style={styles.text7}>{accountManager?.emailAddress ?? ''}</Text>
            </View>
            <View style={styles.sections}>
              <Text style={styles.text10}>Sync Date:</Text>
              <Text style={styles.text8}>{dateConverter('MM/DD/YY')(reportDate)}</Text>
            </View>

            <View style={styles.sections}>
              <Text style={styles.text10}>Diagnostic Sync:</Text>
              <View style={styles.sections}>
                {R.keys(connections).map((key, idx) => (
                  <View key={idx} style={styles.diagnosticItem}>
                    {connections[key] ? (
                      <Svg style={{ width: 10, height: 10, marginRight: 5 }} viewBox="0 0 24 24">
                        <Path
                          fill="currentColor"
                          d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                        />
                      </Svg>
                    ) : (
                      <Svg style={{ width: 10, height: 10, marginRight: 5 }} viewBox="0 0 24 24">
                        <Path
                          fill="currentColor"
                          d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
                        />
                      </Svg>
                    )}
                    <Text style={styles.text8}>{ConnectionsList[key]}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.right}>
            <Text style={[styles.sectionHeading, styles.text10]}>Executive Summary</Text>
            <View style={styles.execSummaryItemList}>
              <View style={styles.execSummaryItem}>
                <View style={[styles.iconWrap, { backgroundColor: brandAccentColor }]}>
                  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M5.814 0.0495622C5.87065 0.0172032 5.93476 0.000183105 6 0.000183105C6.06524 0.000183105 6.12935 0.0172032 6.186 0.0495622L8.9985 1.65681C9.0559 1.6896 9.1036 1.73697 9.1368 1.79413C9.16999 1.85129 9.18748 1.91621 9.1875 1.98231V4.97856L11.811 6.47856C11.8682 6.51122 11.9157 6.55836 11.9489 6.61523C11.9821 6.67211 11.9997 6.73672 12 6.80256V10.0171C12 10.0832 11.9825 10.1481 11.9493 10.2052C11.9161 10.2624 11.8684 10.3098 11.811 10.3426L8.9985 11.9498C8.94185 11.9822 8.87774 11.9992 8.8125 11.9992C8.74726 11.9992 8.68315 11.9822 8.6265 11.9498L6 10.4498L3.3735 11.9506C3.31685 11.9829 3.25274 11.9999 3.1875 11.9999C3.12226 11.9999 3.05815 11.9829 3.0015 11.9506L0.189 10.3433C0.131605 10.3105 0.0838948 10.2632 0.0507041 10.206C0.0175134 10.1488 2.13203e-05 10.0839 0 10.0178L0 6.80331C2.13203e-05 6.73721 0.0175134 6.67229 0.0507041 6.61513C0.0838948 6.55797 0.131605 6.5106 0.189 6.47781L2.8125 4.97856V1.98231C2.81252 1.91621 2.83001 1.85129 2.8632 1.79413C2.89639 1.73697 2.9441 1.6896 3.0015 1.65681L5.814 0.0495622ZM3.1875 5.62806L1.131 6.80331L3.1875 7.97856L5.244 6.80331L3.1875 5.62806ZM5.625 7.44981L3.5625 8.62806V10.9786L5.625 9.80031V7.44981ZM6.375 9.80031L8.4375 10.9786V8.62806L6.375 7.44981V9.80031ZM6.756 6.80331L8.8125 7.97856L10.869 6.80331L8.8125 5.62806L6.756 6.80331ZM8.4375 4.97856V2.62806L6.375 3.80706V6.15756L8.4375 4.97856V4.97856ZM5.625 6.15756V3.80706L3.5625 2.62806V4.97856L5.625 6.15756ZM3.9435 1.98231L6 3.15756L8.0565 1.98231L6 0.807062L3.9435 1.98231ZM11.25 7.44981L9.1875 8.62806V10.9786L11.25 9.80031V7.44981ZM2.8125 10.9786V8.62806L0.75 7.44981V9.80031L2.8125 10.9786Z"
                      fill="white"
                    />
                  </Svg>
                </View>
                <View style={styles.execSummaryItemRight}>
                  <Text style={styles.execSummaryItemHeadingText}>M365 Allocation</Text>
                  <View style={styles.chartContainer}>
                    <Text style={styles.label}>Licenses Assignments</Text>
                    <Select value={80} />
                  </View>
                  <View style={[styles.execSummaryContent, styles.mt18]}>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>{allocation?.totalUsers ?? 0}</Text>
                      <Text style={styles.label}>Total Users</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>{allocation?.totalLicenses ?? 0}</Text>
                      <Text style={styles.label}>Licenses</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>
                        <Text style={styles.text10}>$</Text>
                        {numberFormatter(allocation?.estimatedSpend ?? 0)}
                      </Text>
                      <Text style={styles.label}>Est. Spend</Text>
                    </View>
                  </View>
                  <View style={[styles.execSummaryContent, styles.mt18]}>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>{allocation?.unassigned ?? 0}</Text>
                      <Text style={styles.label}>Unassigned</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>{allocation?.misassigned ?? 0}</Text>
                      <Text style={styles.label}>Mis-Assigned</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>
                        <Text style={styles.text10}>$</Text>
                        {numberFormatter(allocation?.potentialSavings)}
                      </Text>
                      <Text style={styles.label}>Poten. Savings</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.execSummaryItem}>
                <View style={[styles.iconWrap, { backgroundColor: brandAccentColor }]}>
                  <Svg
                    style={{ width: 16, height: 16 }}
                    viewBox="0 0 28 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M26.9006 4.37519L14.2908 0.0779296C14.1387 0.0259765 13.9346 0 13.7305 0C13.5264 0 13.3223 0.0259765 13.1701 0.0779296L0.560352 4.37519C0.252344 4.4791 0 4.83535 0 5.16191V23.0635C0 23.39 0.211524 23.8205 0.467578 24.0246L13.2592 33.9922C13.3891 34.0924 13.5561 34.1443 13.7268 34.1443C13.8975 34.1443 14.0682 34.0924 14.1943 33.9922L26.9859 24.0246C27.242 23.8242 27.4535 23.3937 27.4535 23.0635V5.16191C27.4609 4.83535 27.2086 4.48281 26.9006 4.37519ZM24.7891 22.351L13.7305 30.9678L2.67188 22.351V6.48301L13.7305 2.71269L24.7891 6.48301V22.351ZM9.68184 17.6937L6.80586 20.5697C6.75061 20.6255 6.71962 20.7009 6.71962 20.7794C6.71962 20.8579 6.75061 20.9333 6.80586 20.9891L8.06758 22.2508C8.18262 22.3658 8.37188 22.3658 8.48691 22.2508L11.3629 19.3748C13.4299 20.6773 16.1908 20.4287 17.9906 18.6289C20.0799 16.5396 20.0799 13.1553 17.9906 11.066C15.9014 8.97676 12.517 8.97676 10.4277 11.066C8.62793 12.8658 8.3793 15.6305 9.68184 17.6937ZM12.1088 12.7471C13.2703 11.5855 15.1518 11.5855 16.3096 12.7471C17.4711 13.9086 17.4711 15.79 16.3096 16.9479C15.148 18.1094 13.2666 18.1094 12.1088 16.9479C10.951 15.7863 10.9473 13.9086 12.1088 12.7471Z"
                      fill="#fff"
                    />
                  </Svg>
                </View>
                <View style={styles.execSummaryItemRight}>
                  <Text style={styles.execSummaryItemHeadingText}>Security</Text>
                  <View style={styles.chartContainer}>
                    <Text style={styles.label}>Security Score</Text>
                    <Select value={(((security?.currentScore ?? 0) * 100) / (security?.maxScore ?? 1)).toFixed(1)} />
                  </View>
                  <View style={[styles.execSummaryContent, styles.mt18]}>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>{security?.currentScore ?? 0}</Text>
                      <Text style={styles.label}>Current Score</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>{security?.maxScore ?? 0}</Text>
                      <Text style={styles.label}>Max Score</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>
                        {(security?.mfaAdoptionPercentage ?? 0).toFixed(0)}
                        <Text style={styles.text9}>%</Text>
                      </Text>
                      <Text style={styles.label}>MFA Adoption</Text>
                    </View>
                  </View>
                  <Text style={[styles.text9, styles.mt5]}>Improvements</Text>
                  <View style={styles.execSummaryContent}>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>{security?.improvements?.total ?? 0}</Text>
                      <Text style={styles.label}>Total Actions</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>{security?.improvements?.uncompleted ?? 0}</Text>
                      <Text style={styles.label}>Uncompleted</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>{security?.riskyUsers ?? 0}</Text>
                      <Text style={styles.label}>Risky Users</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.execSummaryItem}>
                <View style={[styles.iconWrap, { backgroundColor: brandAccentColor }]}>
                  <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M10.875 12.125H2.125C1.79348 12.125 1.47554 11.9933 1.24112 11.7589C1.0067 11.5245 0.875 11.2065 0.875 10.875V2.125C0.875 1.79348 1.0067 1.47554 1.24112 1.24112C1.47554 1.0067 1.79348 0.875 2.125 0.875H10.875C11.2065 0.875 11.5245 1.0067 11.7589 1.24112C11.9933 1.47554 12.125 1.79348 12.125 2.125V10.875C12.125 11.2065 11.9933 11.5245 11.7589 11.7589C11.5245 11.9933 11.2065 12.125 10.875 12.125ZM2.125 2.125V10.875H10.875V2.125H2.125ZM9.625 9.625H8.375V5.25H9.625V9.625ZM7.125 9.625H5.875V3.375H7.125V9.625ZM4.625 9.625H3.375V6.5H4.625V9.625Z"
                      fill="white"
                    />
                  </Svg>
                </View>
                <View style={styles.execSummaryItemRight}>
                  <Text style={styles.execSummaryItemHeadingText}>Utilization</Text>
                  <View style={styles.chartContainer}>
                    <Text style={styles.label}>M365</Text>
                    <Select value={(m365Utilization?.exchangePercentActive ?? 0) * 100} />
                  </View>
                  <View style={[styles.execSummaryContent, styles.mt18]}>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>
                        {((m365Utilization?.teamsPercentActive ?? 0) * 100).toFixed(0)}
                        <Text style={styles.text9}>%</Text>
                      </Text>
                      <Text style={styles.label}>Teams</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>
                        {((m365Utilization?.sharepointPercentActive ?? 0) * 100).toFixed(0)}
                        <Text style={styles.text9}>%</Text>
                      </Text>
                      <Text style={styles.label}>Sharepoint</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>
                        {((m365Utilization?.yammerPercentActive ?? 0) * 100).toFixed(0)}
                        <Text style={styles.text9}>%</Text>
                      </Text>
                      <Text style={styles.label}>Yammer</Text>
                    </View>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>
                        {((m365Utilization?.skypeForBusinessPercentActive ?? 0) * 100).toFixed(0)}
                        <Text style={styles.text9}>%</Text>
                      </Text>
                      <Text style={styles.label}>Skype</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.execSummaryItem}>
                <View style={[styles.iconWrap, { backgroundColor: brandAccentColor }]}>
                  <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M6.5 0.523438C9.58789 0.523438 12.0078 1.91211 12.0078 3.6875V9.3125C12.0078 11.0879 9.58789 12.4766 6.5 12.4766C3.41211 12.4766 0.992188 11.0879 0.992188 9.3125V3.6875C0.992188 1.91211 3.41211 0.523438 6.5 0.523438ZM6.5 1.22656C3.89844 1.22656 1.69531 2.35156 1.69531 3.6875C1.69531 5.02344 3.89844 6.14844 6.5 6.14844C9.10156 6.14844 11.3047 5.02344 11.3047 3.6875C11.3047 2.35156 9.10156 1.22656 6.5 1.22656ZM1.69531 9.3125C1.69531 10.6484 3.89844 11.7734 6.5 11.7734C9.10156 11.7734 11.3047 10.6484 11.3047 9.3125V8.07031C10.3672 9.03125 8.58594 9.66406 6.5 9.66406C4.41406 9.66406 2.63281 9.03125 1.69531 8.07031V9.3125ZM1.69531 6.5C1.69531 7.83594 3.89844 8.96094 6.5 8.96094C9.10156 8.96094 11.3047 7.83594 11.3047 6.5V5.25781C10.3672 6.21875 8.58594 6.85156 6.5 6.85156C4.41406 6.85156 2.63281 6.21875 1.69531 5.25781V6.5Z"
                      fill="white"
                    />
                  </Svg>
                </View>

                <View style={styles.execSummaryItemRight}>
                  <Text style={styles.execSummaryItemHeadingText}>Storage</Text>

                  <View style={styles.execSummaryContent}>
                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>
                        {convertBytes(m365Utilization?.oneDriveStorage ?? 0, 1, true)}
                        <Text style={styles.text9}>
                          {getBytesUnitByMinRange(m365Utilization?.oneDriveStorage ?? 0, 0)}
                        </Text>
                      </Text>
                      <Text style={styles.label}>One Drive</Text>
                    </View>

                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>
                        {convertBytes(m365Utilization?.sharepointStorage ?? 0, 1, true)}
                        <Text style={styles.text9}>
                          {getBytesUnitByMinRange(m365Utilization?.sharepointStorage ?? 0, 0)}
                        </Text>
                      </Text>
                      <Text style={styles.label}>Sharepoint</Text>
                    </View>

                    <View style={styles.alignCenter}>
                      <Text style={styles.count}>
                        {convertBytes(m365Utilization?.exchangeStorage ?? 0, 1, true)}
                        <Text style={styles.text9}>
                          {getBytesUnitByMinRange(m365Utilization?.exchangeStorage ?? 0, 0)}
                        </Text>
                      </Text>
                      <Text style={styles.label}>Exchange</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* <View style={styles.execSummaryItem}>
              <View style={[styles.iconWrap, { backgroundColor: brandAccentColor }]}>
                <Svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16 }} viewBox="0 0 48 48">
                  <Path
                    d="M46 40L29.32 10.85 22.8 23.96l11.46 13.28L13 39.65zM13.1 18.18L2 36.9l9.44-.95 16.6-30.27z"
                    fill="#fff"
                  />
                </Svg>
              </View>
              <View style={styles.execSummaryItemRight}>
                <Text style={styles.execSummaryItemHeadingText}>Azure Subscriptions</Text>
                <View style={styles.chartContainer}>
                  <Text style={styles.label}>Current to Budget</Text>
                  <Select value={azureSubscriptions?.budget ?? 0} />
                </View>
                <View style={[styles.execSummaryContent, styles.mt18]}>
                  <View style={styles.alignCenter}>
                    <Text style={styles.count}>{azureSubscriptions?.totalSubcriptions ?? 0}</Text>
                    <Text style={styles.label}>Total</Text>
                  </View>
                  <View style={styles.alignCenter}>
                    <Text style={styles.count}>{azureSubscriptions?.increase ?? 0}</Text>
                    <Text style={styles.label}>Increase</Text>
                  </View>
                  <View style={styles.alignCenter}>
                    <Text style={styles.count}>
                      <Text style={styles.text10}>$</Text>
                      {azureSubscriptions?.spend ?? 0}
                    </Text>
                    <Text style={styles.label}>Spend</Text>
                  </View>
                </View>
              </View>
            </View> */}
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left}></View>
          <View style={styles.right}>
            <Text style={[styles.sectionHeading, styles.text10]}>Top Recommendations</Text>
          </View>
        </View>

        <View style={styles.topRecomm}>
          <View style={styles.topRecommContent}>
            {(topRecommendations ?? []).map((item, idx) => (
              <View key={idx} style={[styles.row, styles.p0, styles.m0]}>
                <View style={styles.topRecommLeft}>
                  <View style={[styles.dot, { backgroundColor: brandAccentColor }]}></View>
                  <Text style={styles.topRecommTitle}>{item.name}</Text>
                  {item.savings.map((item, idx) => (
                    <View key={idx} style={styles.topRecommBlock}>
                      <Text style={styles.topRecommType}>{item.name}</Text>
                      <Text style={styles.topRecommBlockLabel}>Total Savings</Text>
                      <Text style={styles.topRecommBlockValue}>${item.total}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.topRecommRight}>
                  {item.recommendations.map((item, idx) => (
                    <Text key={idx} style={[styles.recommSummary, { borderColor: brandAccentColor }]}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>{`${orgName} ${dateConverter('YYYY')(now)}, All Rights Reserved `}</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
          <Text>Report Date: {dateConverter('MM/DD/YY')(now)} </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Report;
