import firestore from '@react-native-firebase/firestore';

export const get_members_sortBy_active  = (subject_id) => async dispatch => {
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