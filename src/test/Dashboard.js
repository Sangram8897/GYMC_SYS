import React, { useEffect, useState } from 'react'
import { ScrollView, FlatList, TouchableOpacity, View, Alert, RefreshControl, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Config } from '@Config'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import i18n from 'i18next'
import { getNavigation } from '@Store/Navigation'
import { useTranslation } from 'react-i18next'
import { SVGIcons, MyButton, Header, Loader, Typography, Container } from '@Components'
import NavigationService from '@Navigators/rootNavigationService'
import { Keys } from '@Utils/variableConstant'
import { getVerifyDSA, getCommonPropertySuggest, getCityandState, resetCommonProperties } from '@Store/User'
import { resetNavigation } from '@Store/Navigation'
import { useTheme } from '@Theme'
import { getLoanProducts, getMyLoans, getActiveLoanDetails, getMyApplication, getMoreMyApplication, resetActiveBorrowerAndLoanState, setApplyLoanData, getProfileDetails } from '@Store/Loans'
import DeviceInfo, { isTablet } from 'react-native-device-info'
import { LOAN_STATS_KEYWORDS } from '../../Config/enum'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

const Dashboard = props => {
  const { Layout, Gutters, Fonts, Colors, DualTheme, Common } = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const numColumns = 2

  const [statistics_loding, set_statistics_loding] = useState(false)
  const stateAndCity = useSelector(state => state?.user?.stateAndCity)
  const loanProducts = useSelector(state => state?.loans?.loanProducts)
  const isFetchingLoanProducts = useSelector(state => state?.loans?.isFetchingLoanProducts)
  const isLoansLoading = useSelector(state => state?.loans?.isLoansLoading)
  const isVerifyReqPending = useSelector(state => state?.user?.isVerifyReqPending)
  const commonPropertySuggest = useSelector(state => state?.user?.commonPropertySuggest)
  const loanDetails = useSelector(state => state?.loans?.myLoanDetails)
  const checkStatus = useSelector(state => state?.user?.verifyProfile?.data?.profileStauts)
  const activeLoanUuid = useSelector(state => state.loans?.activeLoanDetails?.loanUuid)
  const accessToken = useSelector(state => state?.user?.accessToken)
  const isDarkTheme = useSelector(state => state.theme.darkMode)
  const borrowerDetail = useSelector(state => state.loans?.borrowerDetail)
  const loanCountsDetails = useSelector(state => state?.loans?.loanCountsDetails)

  const [loaderProps, setLoaderProps] = useState({
    visible: true,
    message: 'Please wait...',
    type: 'animating',
  })

  useEffect(() => {
    setLoaderProps({ ...loaderProps, visible: isVerifyReqPending, wait: false })
  }, [isVerifyReqPending])

  useEffect(() => {
    i18n.changeLanguage('en')
    if (accessToken) {
     /* Config.ENTERPRISE == false && */  dispatch(getLoanProducts())
      verifyDsaProfile()
      Config.ENTERPRISE == true && assignLoanCount()
    }
  }, [])

  useEffect(() => {
    !commonPropertySuggest.hasOwnProperty('GENDER') && setDropDowns(Keys?.commonPropertySuggest.GENDER)
    !commonPropertySuggest.hasOwnProperty('MARITAL_STATUS') && setDropDowns(Keys?.commonPropertySuggest.MARITAL_STATUS)
    !commonPropertySuggest.hasOwnProperty('DSA_CATEGORY') && setDropDowns(Keys?.commonPropertySuggest.DSA_CATEGORY)

    // setDropDowns(Keys.commonPropertySuggest.WORK_EXPERIENCE)
    // setDropDowns(Keys.commonPropertySuggest.EMPLOYER_TYPE)
    // setDropDowns(Keys.commonPropertySuggest.EDUCATION_TYPE)
    // setDropDowns(Keys.commonPropertySuggest.RESIDENCE_TYPE)
    // setDropDowns(Keys.commonPropertySuggest.RESIDENT_OWNERSHIP_TYPE)
    // setDropDowns(Keys.commonPropertySuggest.BORROWER_DETAIL_VARIABLE3)
    // setDropDowns(Keys.commonPropertySuggest.BORROWER_DETAIL_VARIABLE4)
    // setDropDowns(Keys.commonPropertySuggest.BORROWER_DETAIL_VARIABLE6)
    // setDropDowns(Keys.commonPropertySuggest.BORROWER_DETAIL_VARIABLE10)
    // setDropDowns(Keys.commonPropertySuggest.BORROWER_DETAIL_VARIABLE9)
    // setDropDowns(Keys.commonPropertySuggest.ORGANIZATION_TYPE)
    fetchStatesAndCities()
  }, [])
  const fetchStatesAndCities = () => {
    !stateAndCity.hasOwnProperty('cities') && !stateAndCity.hasOwnProperty('states') && dispatch(getCityandState())
    if ((stateAndCity.hasOwnProperty('cities') && stateAndCity?.cities.length == 0) || (stateAndCity.hasOwnProperty('states') && stateAndCity?.states?.length == 0)) {
      dispatch(getCityandState())
    }
  }
  // useEffect(() => {
  //   if (accessToken) {
  //     verifyDsaProfile();
  //     assignLoanCount();
  //   }
  //   i18n.changeLanguage('en')
  // }, [props, accessToken]);

  const setDropDowns = dropdown => {
    dispatch(getCommonPropertySuggest({ propertyType: dropdown }))
  }

  const onRefresh = () => {
    dispatch(getLoanProducts())
    verifyDsaProfile()
    Config.ENTERPRISE == true && assignLoanCount()
    fetchStatesAndCities()
  }

  const verifyDsaProfile = () => {
    var params = {
      access_token: accessToken,
    }
    dispatch(getVerifyDSA(params))
  }

  const assignLoanCount = async () => {
    set_statistics_loding(true)
    var params = {
      access_token: accessToken,
      statusList: ['INITIALIZED', 'AWAITING', 'APPROVED', 'DISBURSED'],
    }
    await setTimeout(() => { dispatch(getMyLoans(params))
      set_statistics_loding(false)
    }, 2000)

  
  }

  const handleNavigation = () => {
    loanProducts[0]?.loanPurposeUuid &&
      dispatch(
        getNavigation({
          accessToken: accessToken,
          params: {
            loanPurposeUuid: loanProducts[0]?.loanPurposeUuid,
            applicationLoad: true,
          }, //Put your screen name[Demo, you can call and use it anywhere.]
        }),
      )
  }

  const onStatesticsPress = (item) => {
    props.navigation.navigate('Applications', { status: LOAN_STATS_KEYWORDS[item.tableColumnType] })
  }

  const renderItem = ({ item, value, n }) => {
    if (!item?.localization) return null

    return (
      <TouchableOpacity onPress={() => onStatesticsPress(item)} style={[Common.dashCard, { flex: loanCountsDetails?.length % 2 != 0 ? 0.5 : 1 }]}>
        <Text style={[Fonts.titleRegular, Fonts.textCenter, { color: Colors.labelColor }]}>{item?.count}</Text>
        <Text style={[Fonts.textTiny, { color: Colors.text, textAlign: 'center' }]}>{item?.localization}</Text>
      </TouchableOpacity>
    )
  }

  const renderStatistics = () => {

    return (
      <Container isLoading={statistics_loding}>
        <FlatList
          style={[Gutters.smallVMargin, { minHeight: 300 }]}
          columnWrapperStyle={{ justifyContent: 'space-between', }}
          data={loanCountsDetails}
          keyExtractor={item => item.toString()}
          horizontal={false}
          numColumns={isTablet() ? 4 : 2}
          renderItem={renderItem}
        />
      </Container>
    );
  }

  return (
    <View style={Common.container}>
      <Header mode={'dashboard'} onClickNotification={() => Alert.alert('Demo')} navigation={props.navigation} />

      <View style={[Gutters.regularHPadding, Gutters.regularTPadding, Layout.fill]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
          nestedScrollEnabled={true}
        >
          {checkStatus == 'APPROVED' ? (
            <View style={Layout.fill}>
              {renderStatistics()}

              <TouchableOpacity
                style={[Common.dashApplyBtn, Layout.center]}
                onPress={() => {
                  dispatch(resetActiveBorrowerAndLoanState())
                  dispatch(resetCommonProperties())
                  dispatch(resetNavigation())
                  Config.ENTERPRISE == true && NavigationService.navigate('LoanProductsEnterprise', { 'userType': 1 })
                  Config.ENTERPRISE == false && NavigationService.navigate('BorrowerRegisteration')
                }}
              >
                <SVGIcons name={'applyLoan'} />
                <Text style={[Fonts.titleSmall, Gutters.smallLMargin, { color: Colors.borderSecondary }]}>{t('dashboard.applyLoan')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[Common.dashApplyBtn, Layout.center, Gutters.regularTMargin]}
                onPress={() => { }}
              >
                {/* <SVGIcons name={'applyLoan'} /> */}
                <FontAwesome name='step-forward' color={Colors.buttonColor} size={20} />
                <Text style={[Fonts.titleSmall, Gutters.smallLMargin, { color: Colors.borderSecondary }]}>{t('dashboard.resumeLoan')}</Text>
              </TouchableOpacity>

              {/* <View style={Common.dashApplyCard}>
                <View style={[Layout.row, { alignItems: 'flex-start' }]}>
                  <View style={[Layout.center, { backgroundColor: Colors.bgColor2, borderRadius: 10, padding: 12 }]}>
                    <SVGIcons name={'applyLoan'} />
                  </View>

                  <View style={[Gutters.regularLMargin, Layout.column, Layout.fill]}>
                    <Text style={[Fonts.titleSmall, Gutters.smallBMargin, { color: Colors.text }]}>{t('dashboard.applyLoan')}</Text>
                    <Text style={[Fonts.textTiny, { color: Colors.text }]}>{t('dashboard.lopanDesc')}</Text>
                    <View style={[Gutters.smallTMargin, isTablet() && [Layout.rowHCenter, Layout.justifyContentBetween]]}>
                      <MyButton
                        dark={true}
                        type={'containedHome'}
                        title={Config.ENTERPRISE == true ? t('dashboard.createNewApplication') : t('dashboard.newBorrower')}
                        onPress={() => {
                          dispatch(resetActiveBorrowerAndLoanState())
                          dispatch(resetCommonProperties()) //
                          dispatch(resetNavigation())
                          Config.ENTERPRISE == true && NavigationService.navigate('LoanProductsEnterprise', { 'userType': 1 })
                          Config.ENTERPRISE == false && NavigationService.navigate('BorrowerRegisteration')
                        }}
                        style={[Gutters.regularTMargin, isTablet() && { width: '40%' }]}
                      />

                      {Config.ENTERPRISE == false && <MyButton
                        dark={true}
                        type={'containedHome'}
                        title={t('dashboard.existingBorrower')}
                        onPress={() => {
                          dispatch(resetActiveBorrowerAndLoanState())
                          dispatch(resetCommonProperties()) //
                          dispatch(resetNavigation())
                          Config.ENTERPRISE == true && NavigationService.navigate('LoanProductsEnterprise')
                          Config.ENTERPRISE == false && NavigationService.navigate('ExistingBorrower', { 'userType': 2 })
                        }
                        }
                        style={[Gutters.regularTMargin, isTablet() && { width: '50%' }]}
                      />}
                    </View>
                  </View>

                </View>
              </View> */}

              {Config.SANDBOX == true && Config.ENTERPRISE == false && <MyButton
                dark={true}
                type={'contained'}
                title={'DemoPurposesOnly'}
                onPress={() => {
                  if (!activeLoanUuid) return Alert.alert('Sandbox Mode', 'To enable bypass mode, please select a loan under ->My Applications->Then come back here. ->Continue Development')
                  NavigationService.navigate('BankDetail')
                  // NavigationService.navigate('OtherLoanDetail')
                }}
                style={[Layout.dashboardButton, Gutters.smallTMargin, { backgroundColor: isDarkTheme ? Colors.chip : Colors.secondaryOpacity, width: '50%' }]}
                labelStyle={[Fonts.textTiny, { color: Colors.labelColor }]}
                labelColor={Colors.labelColor}
              />}
            </View>
          ) : (!isVerifyReqPending &&
            <View style={Layout.center}>
              <SVGIcons name={'exclamation'} />
              <Typography
                type="title"
                textStyle={[Fonts.titleMediumSmall, Gutters.regularTMargin, { color: Colors.warning }]}
                content={t('dashboard.dsaTitle')}
              />
              <Typography
                type="subtitle"
                textStyle={[Fonts.textCenter, Gutters.largeTMargin, Gutters.smallHMargin, { color: Colors.text, width: '100%' }]}
                content={t('dashboard.dsaDesc')}
              />
              <Typography
                type="subtitle"
                textStyle={[Fonts.textCenter, Gutters.largeTMargin, Gutters.smallHMargin, { color: Colors.text, width: '100%' }]}
                content={t('dashboard.contactAdmin')}
              />
              <MyButton
                dark={true}
                type={'contained'}
                title={'Refresh.'}
                onPress={onRefresh}
                style={[Common.dashboardButton, Gutters.regularTMargin, { backgroundColor: Colors.bgColor2, width: '55%' }]}
                labelStyle={[Fonts.textTiny, { color: Colors.labelColor }]}
                labelColor={Colors.labelColor}
              />
            </View>
          )}
        </ScrollView>
      </View>
      <Loader
        visible={isVerifyReqPending || isLoansLoading || isFetchingLoanProducts}
        {...loaderProps}
        defaultOnClose={() => setLoaderProps({ visible: false, message: t('common.pleaseWait'), type: '' })}
      />
    </View>
  )
}

export default Dashboard