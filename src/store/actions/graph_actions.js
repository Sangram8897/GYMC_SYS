import firestore from '@react-native-firebase/firestore';
import moment from "moment";

const _months = [
    { month: 1, days_sch: 0 }, { month: 2, days_sch: 0 }, { month: 3, days_sch: 0 },
    { month: 4, days_sch: 0 }, { month: 5, days_sch: 0 }, { month: 6, days_sch: 0 },
    { month: 7, days_sch: 0 }, { month: 8, days_sch: 0 }, { month: 9, days_sch: 0 },
    { month: 10, days_sch: 0 }, { month: 11, days_sch: 0 }, { month: 12, days_sch: 0 },
]

export const set_members_graph_values = (members_list) => async dispatch => {
    let checkhere = []

    members_list.map((member) => {
        member.monthly_distrubution.map((oop) => {
            checkhere = _months.map((pop) => {
                if (pop.month == oop.month) {
                    pop.days_sch = pop.days_sch + oop.days_sch
                }
                return { ...pop }
            })
        })
    })
    console.log('ccc checkhere', checkhere)
    let pikachu = checkhere.map((lllp) => {
        lllp.title = moment(lllp.month, 'M').format('MMM')
        if (lllp.days_sch > 0) {
            let month__ = moment(lllp.month, "M").daysInMonth();
            let persent = (lllp.days_sch / (members_list.length * parseInt(month__))) * 100
            lllp.displayvalue = Number((Math.round(persent * 100) / 100).toFixed(0));
            lllp.value = Number((Math.round(persent * 100) / 100).toFixed(0));
        } else {
            lllp.displayvalue = 0
            lllp.value = 0
        }
        return { ...lllp }
    })
    return pikachu
};

export const set_packages_graph_values = (members_list, packages_list) => async dispatch => {
    let checkhere = []
    console.log('are lavdu', members_list)
    await members_list.map((member) => {

        checkhere = packages_list.map((pop) => {

            if (pop.id == member.selected_package.package_id) {
                pop.count = pop?.count ? pop?.count : 0 + 1
            } else {
                pop.count = pop?.count ? pop?.count : 0
            }
            return { ...pop }
        })
        console.log('are lavdu checkhere packages', checkhere)
    })
    let pikachu = await checkhere.map((lllp) => {

        if (lllp.count > 0) {

            let persent = (lllp.count / (members_list.length)) * 100
            lllp.displayvalue = Number((Math.round(persent * 100) / 100).toFixed(0));
            lllp.value = Number((Math.round(persent * 100) / 100).toFixed(0));
        } else {
            lllp.displayvalue = 0
            lllp.value = 0
        }
        return { ...lllp }
    })
    console.log('are lavdu checkhere packages', pikachu)
    return pikachu
};
