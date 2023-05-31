import { StyleSheet, Text, View, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Container, DatePicker, Header, Button, Input } from 'components'
import { ColorThemeContext } from '../../../context/theme_context';
import firestore from '@react-native-firebase/firestore';
import SingleSelectionDropdown from '../../../components/single_selection_dropdown';
import moment from 'moment';
import { CommonActions } from '@react-navigation/native';
import ACTIONS from '../../../store/actions';
import { useDispatch } from 'react-redux';

const SelectPackage = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { Colors, ToggleTheme } = useContext(ColorThemeContext);
    const [start_date, set_start_date] = useState(new Date())
    const [packages_list, set_packages_list] = useState(null)
    const [selected_package, set_selected_package] = useState(null)
    const [member_personal_info, set_member_personal_info] = useState(null)
    const [selected_package_duration_rates, set_selected_package_duration_rates] = useState(null)

    const { member_id } = route?.params

    useEffect(() => {
        get_packages_list()
        get_member_data()
    }, [])

    const get_member_data = async () => {
        await firestore()
            .collection('Members')
            .doc(member_id)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', member_id, documentSnapshot.exists);
                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    set_member_personal_info(documentSnapshot.data())
                }
            });
    }

    const get_packages_list = () => {
        try {
            firestore()
                .collection('Packages')
                // .doc(subject_id)
                // .collection("modules")
                .get()
                .then(async querySnapshot => {
                    // console.log('User ID: ', querySnapshot.id,);
                    const _packages_list = [];
                    await querySnapshot.forEach(documentSnapshot => {
                        let data = documentSnapshot.data();
                        data.id = documentSnapshot.id;
                        _packages_list.push(data);
                    });
                    let updated_packages_list = await _packages_list.map((i) => { return { ...i, value: i.name } })
                    set_packages_list(updated_packages_list)
                });
            return null;
        } catch (err) {
            console.log(err)
        }
    }

    
    const calculate_monthly_distrubution = async (startDate, period) => {
        let month_report = [];

        var a = await moment(startDate);
        var b = await moment(a, "YYYY/MM/DD").endOf('month').format('YYYY/MM/DD');
        var c = moment(a, "YYYY/MM/DD").add(period, 'days').format('YYYY/MM/DD');

        let c_diff = a.diff(b, 'days') - 1
        let month_count = Math.ceil((period + c_diff) / 30)

        let CD = period + c_diff;
        await month_report.push({ 'month': moment(a).month() + 1, 'days_sch': -c_diff, 'start_date': moment(a).format('YYYY/MM/DD') })

        for (let i = 1; i <= month_count; i++) {
            let next_month_start = await moment(a, "YYYY/MM/DD").add(i, 'M').startOf("month").format('YYYY/MM/DD')
            let MD = await moment(next_month_start, "YYYY/MM/DD").daysInMonth()
            if (CD > MD) {
                month_report.push({ 'month': moment(next_month_start).month() + 1, 'days_sch': MD, 'start_date': next_month_start })
                CD = CD - MD
            } else {
                if (moment(next_month_start).isBefore(c, 'day') && MD >= CD) {
                    await month_report.push({ 'month': moment(next_month_start).month() + 1, 'days_sch': CD, 'start_date': next_month_start })
                }
                break;
            }
        }
        console.log('ccc month_report', month_report)
        return month_report;
    }

    const calculateNextDate = async (start_date, days) => {
        return await moment(start_date).add(days - 1, "days").format("YYYY-MM-DD");
    }

    const onSubmit = async () => {
        let selected_package_of_user = {
            package_id:selected_package.id,
            package_name: selected_package.name,
            package_duration_rates: selected_package_duration_rates
        }
        let _monthly_distrubution = await calculate_monthly_distrubution(start_date, selected_package_duration_rates.durationInDays)
        let end_date = await calculateNextDate(start_date, selected_package_duration_rates.durationInDays)

        Keyboard.dismiss()
        await firestore()
            .collection('Members')
            .doc(member_id)
            .set({
                ...member_personal_info,
                is_package_selected: true,
                selected_package: selected_package_of_user,
                start_date: start_date,
                end_date: end_date,
                monthly_distrubution: _monthly_distrubution
            })
            .then(() => {
                console.log('User updated!');
            });
        await dispatch(ACTIONS.get_members_list())
        const resetAction = CommonActions.reset({
            index: 1,
            routes: [{ name: 'Home' }]
        });
        navigation.dispatch(resetAction);
    }
console.log('packages_list',packages_list)
    return (
        <Container >
            <Header
                showBackButton={true}
                onBackButtonPress={() => navigation.goBack()}
                showPlusButton={true}
                onPlusButtonPress={() => ToggleTheme()}
            />
            <View style={{ flex: 1, padding: 10 }}>

               {start_date && <DatePicker
                    selectedDate={new Date(start_date)}
                    onDateChange={(current_date) => set_start_date(moment(current_date).format('YYYY-MM-DD'))}
                />}

                {packages_list && <SingleSelectionDropdown
                    queTitle={`Select Package`}
                    itemStyle={{ marginHorizaontal: 40 }}
                    data={packages_list}
                    _dropdownValue={selected_package?.name ? selected_package?.name : ''}
                    set_dropdownValue={async (item) => {
                        let updated_durationAndRates = await item.durationAndRates.map((item_) => {
                            return { ...item_, name: item_.title }
                        })
                        item.durationAndRates = updated_durationAndRates;
                        set_selected_package(item)
                    }} />}

                {selected_package?.durationAndRates && <SingleSelectionDropdown
                    queTitle={`Select Duration`}
                    itemStyle={{ marginHorizaontal: 40 }}
                    data={selected_package?.durationAndRates}
                    _dropdownValue={selected_package_duration_rates?.name ? selected_package_duration_rates?.name : ''}
                    set_dropdownValue={(item) => set_selected_package_duration_rates(item)} />}

            </View>
            <Button
                onPress={onSubmit}
                label={'SELECT PACKAGE'}
                textColor={Colors.COLOR_WHITE}
                backgroundColor={Colors.COLOR_PINK}
                borderColor={Colors.COLOR_INACTIVE}
                borderWidth={0} />
        </Container>
    )
}

export default SelectPackage

const styles = StyleSheet.create({})