
import React, { useEffect, useState, useContext } from 'react';
// Import required components
import {
    SafeAreaView,
    LayoutAnimation,
    StyleSheet,
    View,
    Text,
    ScrollView,
    UIManager,
    Keyboard,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Container, DatePicker, Header, Button, Input } from 'components'
import { useDispatch } from 'react-redux';
import { ColorThemeContext } from '../../../../context/theme_context';

const ExpandableComponent = ({ item, onClickFunction }) => {
    //Custom Component for the Expandable List
    const [layoutHeight, setLayoutHeight] = useState(0);

    useEffect(() => {
        if (item.isExpanded) {
            setLayoutHeight(null);
        } else {
            setLayoutHeight(0);
        }
    }, [item.isExpanded]);

    return (
        <View>
            {/*Header of the Expandable List Item*/}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClickFunction}
                style={styles.item}>
                <Text style={styles.title}>
                    {item.title}
                </Text>
            </TouchableOpacity>
            <View
                style={{
                    height: layoutHeight,
                    overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                <View style={{
                    paddingHorizontal: 20,
                    paddingBottom:20,
                    marginHorizontal: 12, backgroundColor: '#FFF'
                }}>
                    <Text style={styles.addre}>{'Height   '}
                        <Text style={styles.sub_title}>{'158`2 cm'}</Text></Text>

                    <Text style={styles.addre}>{'Weight   '}
                        <Text style={styles.sub_title}>{'94 KG'}</Text></Text>

                    <Text style={styles.addre}>{'Age     '}
                        <Text style={styles.sub_title}>{'25 Years'}</Text></Text>
                </View>
            </View>
        </View>
    );
};

const MemberInfo = () => {

    const dispatch = useDispatch();
    const { Colors, ToggleTheme } = useContext(ColorThemeContext);
    const [listDataSource, setListDataSource] = useState(DATA);

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listDataSource];
        if (1==3) {
          // If multiple select is enabled
          array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
          // If single select is enabled
          array.map((value, placeindex) =>
            placeindex === index
              ? (array[placeindex]['isExpanded'] =
                 !array[placeindex]['isExpanded'])
              : (array[placeindex]['isExpanded'] = false),
          );
        }
        setListDataSource(array);
      };

    return (
        <Container >

            <View style={{ height: 100, width: 100, alignSelf: 'center', borderRadius: 50, backgroundColor: 'yellow', margin: 10 }}></View>

            <View style={{ padding: 10, alignItems: 'center' }}>
                <Text style={styles.title}>{'Sangram Paste'}</Text>
                <Text style={styles.addre}>{'Mob : 9021010551'}</Text>
                <Text style={styles.addre}>{'At post Adare (DeulWadi), chiplun, ratnagiri'}</Text>
            </View>

            <ScrollView>
                {listDataSource.map((item, key) => (
                    <ExpandableComponent
                        key={item.title}
                        onClickFunction={() => {
                            updateLayout(key);
                        }}
                        item={item}
                    />
                ))}
            </ScrollView>
        </Container >
    );
};

export default MemberInfo;
const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        color: '#222',
    },
    item: {
        backgroundColor: '#FFF',
        padding: 20,
        marginTop: 6,
        marginHorizontal: 12,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    addre: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: '#222',
    },

    container: {
        flex: 1,
    },
    titleText: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 20,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#808080',
        width: '95%',
        marginLeft: 16,
        marginRight: 16,
    },
    text: {
        fontSize: 16,
        color: '#606070',
        padding: 10,
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
    },
});

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Physical Information',
        navigation: 'PhysicalInfo',
        isExpanded: false,
        subcategory: [
            { id: 26, val: 'Sub Cat 26' },
            { id: 27, val: 'Sub Cat 7' },
        ],
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Contact Information',
        navigation: 'PhysicalInfo',
        isExpanded: false,
        subcategory: [
            { id: 26, val: 'Sub Cat 26' },
            { id: 27, val: 'Sub Cat 7' },
        ],
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Package Information',
        navigation: 'PhysicalInfo',
        isExpanded: false,
        subcategory: [
            { id: 26, val: 'Sub Cat 26' },
            { id: 27, val: 'Sub Cat 7' },
        ],
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'History & Graphs',
        navigation: 'PhysicalInfo',
        isExpanded: false,
        subcategory: [
            { id: 26, val: 'Sub Cat 26' },
            { id: 27, val: 'Sub Cat 7' },
        ],
    },
];

// import { StyleSheet, Text, View,TouchableOpacity, Keyboard, FlatList } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import { Container, DatePicker, Header, Button, Input } from 'components'


// import { useDispatch } from 'react-redux';
// import { ColorThemeContext } from '../../../../context/theme_context';

// const DATA = [
//     {

//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: 'Physical Information',
//         navigation: 'PhysicalInfo'
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: 'Contact Information',
//         navigation: 'PhysicalInfo'
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'Package Information',
//         navigation: 'PhysicalInfo'
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'History & Graphs',
//         navigation: 'PhysicalInfo'
//     },
// ];

// const Item = ({ item,onItemPress }) => (
//     <TouchableOpacity onPress={()=>onItemPress(item.navigation)} style={styles.item}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.addre}>{'At post Adare (DeulWadi), chiplun, ratnagiri'}</Text>
//         <Text style={styles.addre}>{'Mob : 9021010551'}</Text>

//     </TouchableOpacity>
// );

// const MemberInfo = ({ navigation, route }) => {
//     const dispatch = useDispatch();
//     const { Colors, ToggleTheme } = useContext(ColorThemeContext);
//     const [start_date, set_start_date] = useState(new Date())
//     const [packages_list, set_packages_list] = useState(null)
//     const [selected_package, set_selected_package] = useState(null)

//     const onItemPress = (screen) => {
//         navigation.navigate(screen)
//     }

//     return (
//         <Container >

//             <View style={{ height: 100, width: 100, alignSelf: 'center', borderRadius: 50, backgroundColor: 'yellow', margin: 10 }}></View>

//             <View style={{ padding: 10, alignItems: 'center' }}>
//                 <Text style={styles.title}>{'Sangram Paste'}</Text>
//                 <Text style={styles.addre}>{'Mob : 9021010551'}</Text>
//                 <Text style={styles.addre}>{'At post Adare (DeulWadi), chiplun, ratnagiri'}</Text>
//             </View>
//             <FlatList
//                 style={{ marginTop: 6 }}
//                 data={DATA}
//                 renderItem={({ item }) => <Item item={item} onItemPress={onItemPress}/>}
//                 keyExtractor={item => item.id}
//             />
//         </Container>
//     )
// }

// export default MemberInfo

// const styles = StyleSheet.create({
//     title: {
//         fontSize: 17,
//         fontFamily: 'Montserrat-Medium',
//         color: '#222',
//     },
//     item: {
//         backgroundColor: '#FFF',
//         padding: 20,
//         marginVertical: 6,
//         marginHorizontal: 12,
//         borderRadius: 10,
//     },
//     addre: {
//         marginTop: 3,
//         fontSize: 14,
//         fontFamily: 'Montserrat-Medium',
//         color: '#222',
//     },
// })