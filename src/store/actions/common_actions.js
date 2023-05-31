import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export const get_members_list = (subject_id) => async dispatch => {
    try {
        firestore()
            .collection('Members')
            // .doc(subject_id)
            // .collection("modules")
            .get()
            .then(async querySnapshot => {
                // console.log('User ID: ', querySnapshot.id,);
                const members_list = [];
                await querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.data();
                    data.id = documentSnapshot.id;
                    members_list.push(data);
                });
                dispatch({ type: 'MEMBERS_LIST_SUCCESS', payload: members_list });
            });
        return null;
    } catch (err) {
        console.log(err)
    }
};

export const get_members_sortBy_active = (subject_id) => async dispatch => {
    try {
        firestore()
            .collection('Members')
            // .doc(subject_id)
            // .collection("modules")
            .where('is_package_selected', '==', true)
            .get()
            .then(async querySnapshot => {
                // console.log('User ID: ', querySnapshot.id,);
                const members_list = [];
                await querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.data();
                    data.id = documentSnapshot.id;
                    members_list.push(data);
                });
                dispatch({ type: 'MEMBERS_LIST_SUCCESS', payload: members_list });
            });
        return null;
    } catch (err) {
        console.log(err)
    }
};

export const get_members_sortBy_inactive = (subject_id) => async dispatch => {
    try {
        firestore()
            .collection('Members')
            // .doc(subject_id)
            // .collection("modules")
            .where('is_package_selected', '!=', true)
            .get()
            .then(async querySnapshot => {
                // console.log('User ID: ', querySnapshot.id,);
                const members_list = [];
                await querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.data();
                    data.id = documentSnapshot.id;
                    members_list.push(data);
                });
                dispatch({ type: 'MEMBERS_LIST_SUCCESS', payload: members_list });
            });
        return null;
    } catch (err) {
        console.log(err)
    }
};

export const get_members_sortBy_overdue = (subject_id) => async dispatch => {
    try {
        const today = moment(new Date()).format('YYYY-MM-DD');
        firestore()
            .collection('Members')
            // .doc(subject_id)
            // .collection("modules")
            .where('end_date', '<=', today)
            .get()
            .then(async querySnapshot => {
                // console.log('User ID: ', querySnapshot.id,);
                const members_list = [];
                await querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.data();
                    data.id = documentSnapshot.id;
                    members_list.push(data);
                });
                dispatch({ type: 'MEMBERS_LIST_SUCCESS', payload: members_list });
            });
        return null;
    } catch (err) {
        console.log(err)
    }
};

export const get_members_overdue_count = (data) => async dispatch => {
    const today = moment(new Date()).format('YYYY-MM-DD');
    try {
        const snapshot1 = await firestore()
            .collection('Members')
            //.orderBy('timestamp', 'desc')
            .count().get();
            console.log('snapshot1.data().count', snapshot1.data().count)   
        const snapshot2 = await firestore()
            .collection('Members')
            .where('is_package_selected', '==', true)
            //.orderBy('timestamp', 'desc')
            .count().get();
            console.log('snapshot2.data().count', snapshot2.data().count) 
        const snapshot3 = await firestore()
            .collection('Members')
            .where('end_date', '<=', today)
            //.orderBy('timestamp', 'desc')
            .count().get();
            console.log('snapshot3.data().count', snapshot3.data().count) 
        const snapshot4 = await firestore()
            .collection('Members')
            .where('is_package_selected', '!=', true)
            //.orderBy('timestamp', 'desc')
            .count().get();
            console.log('snapshot4.data().count', snapshot4.data().count) 
        dispatch(set_member_filter_tab_data(data, 1, snapshot1.data().count));
        dispatch(set_member_filter_tab_data(data, 2, snapshot2.data().count));
        dispatch(set_member_filter_tab_data(data, 3, snapshot3.data().count));
        dispatch(set_member_filter_tab_data(data, 4, snapshot4.data().count));
    } catch (err) {
        console.log('end_date', err)
    }
};

export const set_member_filter_tab_data = (data, id, count) => async dispatch => {
    try {
        console.log('coming here')
        let new_array = await data.map((_item) => {
            if (_item.id == id) _item.count = count
            if (_item.id == 3 && count > 0) _item.reddot = true
            return _item;
        })
        dispatch({ type: 'MEMBERS_FILTER_UPDATE', payload: new_array });
    } catch (err) {
        console.log(err)
    }
}

export const set_member_filter_tab_selection = (data, id) => async dispatch => {
    try {
        console.log('coming here')
        // const array = [...filter_data];
        let new_array = await data.map((item) => {
            if (item.id === id) item.selected = true;
            else item.selected = false
            return item
        }
        );

        dispatch({ type: 'MEMBERS_FILTER_UPDATE', payload: new_array });
    } catch (err) {
        console.log(err)
    }
}






export const get_packages_list = (subject_id) => async dispatch => {
    try {
        firestore()
            .collection('Packages')
            // .doc(subject_id)
            // .collection("modules")
            .get()
            .then(async querySnapshot => {
                // console.log('User ID: ', querySnapshot.id,);
                const packages_list = [];
                await querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.data();
                    data.id = documentSnapshot.id;
                    packages_list.push(data);
                });
                dispatch({ type: 'PACKAGE_LIST_SUCCESS', payload: packages_list });
            });
        return null;
    } catch (err) {
        console.log(err)
    }
};