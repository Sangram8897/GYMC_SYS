import React, { useState, useContext, useEffect } from "react";
import { View, Switch, StyleSheet, Button, Platform, ToastAndroid, Text } from "react-native";
import { ColorThemeContext } from "../../context/theme_context";
import Themes from "../../style/AppThemeColors";
import ImagePicker from 'react-native-image-crop-picker';
//import CircularProgress from 'react-native-circular-progress-indicator';
import storage from '@react-native-firebase/storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BarChart from "../../components/BarChart";
import moment from "moment";
import { extendMoment } from 'moment-range';
import { useSelector } from "react-redux";
import IsEmpty from "../../utils/IsEmpty";
import firestore from '@react-native-firebase/firestore';

const moment43 = extendMoment(moment);

const _months = [
  { month: 1, days_sch: 0 }, { month: 2, days_sch: 0 }, { month: 3, days_sch: 0 },
  { month: 4, days_sch: 0 }, { month: 5, days_sch: 0 }, { month: 6, days_sch: 0 },
  { month: 7, days_sch: 0 }, { month: 8, days_sch: 0 }, { month: 9, days_sch: 0 },
  { month: 10, days_sch: 0 }, { month: 11, days_sch: 0 }, { month: 12, days_sch: 0 },
]
//let dummy_months_ = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 }

const Profile = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const theme = useContext(ColorThemeContext)
  const members_list = useSelector(state => state.MembersListReducer.members_list);
  const [_months_data, set_months_data] = useState([])
  const [packages_list, set_packages_list] = useState([])
  const [packages_graph_values, set_packages_graph_values] = useState([])

  console.log('ccc packages_list', packages_list)

  useEffect(() => {
    get_packages_list()
  }, [])

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
  
  useEffect(() => {
    console.log('mmm checkhere pop', members_list)
    if (!IsEmpty(members_list)) {
      let checkhere = []
      let packages_array = [...packages_list]
      members_list.map((member) => {

        checkhere = packages_array.map((pop) => {
          console.log('mmm checkhere pop', pop)
          if (pop.id == member.selected_package.package_id) {
            pop.count = pop?.count ? pop?.count : 0 + 1
          }else{
            pop.count = pop?.count ? pop?.count : 0 
          }
          return { ...pop }
        })
        console.log('mmm checkhere packages', checkhere)
      })
     
      let pikachu = checkhere.map((lllp) => {
        
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
      console.log('mmm pikachu',pikachu)
      set_packages_graph_values(pikachu)
    }
  }, [members_list,packages_list])


  // useEffect(() => {
  //   if (!IsEmpty(members_list)) {
  //     let checkhere = []
  //     let months_array = [..._months]
  //     members_list.map((member) => {
  //       member.monthly_distrubution.map((oop) => {
  //         checkhere = months_array.map((pop) => {
  //           if (pop.month == oop.month) {
  //             pop.days_sch = pop.days_sch + oop.days_sch
  //           }
  //           return { ...pop }
  //         })
  //       })
  //     })
  //     console.log('ccc checkhere', checkhere)
  //     let pikachu = checkhere.map((lllp) => {
  //       lllp.title = moment(lllp.month, 'M').format('MMM')
  //       if (lllp.days_sch > 0) {
  //         let month__ = moment(lllp.month, "M").daysInMonth();
  //         let persent = (lllp.days_sch / (members_list.length * parseInt(month__))) * 100
  //         lllp.displayvalue = Number((Math.round(persent * 100) / 100).toFixed(0));
  //         lllp.value = Number((Math.round(persent * 100) / 100).toFixed(0));
  //       } else {
  //         lllp.displayvalue = 0
  //         lllp.value = 0
  //       }
  //       return { ...lllp }
  //     })
  //     set_months_data(pikachu)
  //   }
  // }, [members_list])

  const calcAndReturn = (array, distr_month, distr_days_sch) => array.map((_mon) => {
    if (_mon.month == distr_month) {
      let item = { ..._mon, days_sch: _mon.days_sch + distr_days_sch }
      return item;
    } else return { ..._mon }
  })

  /**
   *    let new_data=await calcAndReturn(_months,distr.month,distr.days_sch)
      console.log('ccc abe yede new_data', new_data);
      _months=await [...new_data]
   */

  const toggleSwitch = () => {
    console.log('theme.Colors.COLOR_THEME', theme.Colors.COLOR_THEME)
    if (theme.Colors.COLOR_THEME == 'light') theme.setColors(Themes.darkTheme)
    else theme.setColors(Themes.lightTheme)
    setIsEnabled(previousState => !previousState)
  }

  const openCamera = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(async response => {

      let path = await getPlatformPath(response).value;
      console.log(path);
      let fileName = await getFileName(response.fileName, path);
      uploadImageToStorage(path, fileName);
    });
  }

  const getPlatformPath = ({ path, uri }) => {
    return Platform.select({
      android: { "value": path },
      ios: { "value": uri }
    })
  }

  const getFileName = (name, path) => {
    if (name != null) { return name; }

    if (Platform.OS === "ios") {
      path = "~" + path.substring(path.indexOf("/Documents"));
    }
    return path.split("/").pop();
  }

  const uploadImageToStorage = (path, name) => {
    let reference = storage().ref(name);
    let task = reference.putFile(path);
    task.then(() => {

      ToastAndroid.show("Image uploaded successfully !", ToastAndroid.SHORT);

    }).catch((e) => {

      ToastAndroid.show("Something went wrong !", ToastAndroid.SHORT);

    });
  }

  const aad = [
    {
      "date": "2022-11-28",
      "value": 80,
      "displayvalue": 80
    },
    {
      "date": "2022-11-29",
      "value": 75,
      "displayvalue": 75
    },
    {
      "date": "2022-11-30",
      "value": 30,
      "displayvalue": 30
    },
    {
      "date": "2022-11-30",
      "value": 100,
      "displayvalue": 100
    },
  ]

  useEffect(() => {
    // var a = moment([2022, 0, 1]);
    // var b = moment([2022, 0, 4]);
    // let c=a.to(b) 

    const start = new Date(2012, 0, 15);
    const end = new Date(2012, 4, 23);
    const range = moment43.range(start, end);
    //console.log('ccc', range)
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: theme.Colors.COLOR_BACKGROUND }]}>
      <View style={{ maxHeight: 600, width: '100%' }}>

       {!IsEmpty(packages_graph_values) &&
          <BarChart
            graphdata={packages_graph_values}
            graphHeight={300}
            max={100}
            recomended={75}
            isPersentage={true}
            numColumns={packages_graph_values.length}
            titleText={'name'}
            maerginBetweenBars={'15%'}
          />}

        {/* {!IsEmpty(_months_data) &&
          <BarChart
            graphdata={_months_data}
            graphHeight={300}
            max={100}
            recomended={75}
            isPersentage={true}
            numColumns={_months_data.length}
            titleText={'title'}
            maerginBetweenBars={'15%'}
          />} */}
      </View>


      {/* <View style={{ maxHeight: 600, width: '100%' }}>
        {!IsEmpty(aad) &&
          <BarChart
            graphdata={aad}
            graphHeight={300}
            max={100}
            recomended={75}
            isPersentage={false}
            numColumns={aad.length}
          />}
      </View> */}

      {/* <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Button title="camera" onPress={openCamera}></Button> */}

      {/* <AnimatedCircularProgress
        size={100}
        width={10}
        fill={70}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={0}
        >
        {
          (fill) => (
            <Text>
              {'23'}
            </Text>
          )
        }
      </AnimatedCircularProgress> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
  }
});

export default Profile;

// import React, { useEffect } from 'react';
// import { useCallback } from 'react';
// import { Dimensions, TouchableOpacity } from 'react-native';
// import { StyleSheet, Text, View } from 'react-native';
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedProps,
// } from 'react-native-reanimated';
// import { useDerivedValue } from 'react-native-reanimated';
// import { ReText } from 'react-native-redash';

// import Svg, { Circle } from 'react-native-svg';

// const BACKGROUND_COLOR = '#444B6F';
// const BACKGROUND_STROKE_COLOR = '#303858';
// const STROKE_COLOR = '#A6E1FA';

// const { width, height } = Dimensions.get('window');

// const CIRCLE_LENGTH = 1000; // 2PI*R
// const R = CIRCLE_LENGTH / (2 * Math.PI);

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// export default function Profile() {
//   const progress = useSharedValue(0);

//   const animatedProps = useAnimatedProps(() => ({
//     strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
//   }));

//   const progressText = useDerivedValue(() => {
//     return `${Math.floor(progress.value * 100)}`;
//   });

//   const onPress = useCallback(() => {
//     progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ReText style={styles.progressText} text={progressText} />
//       <Svg style={{ position: 'absolute' }}>
//         <Circle
//           cx={width / 2}
//           cy={height / 2}
//           r={R}
//           stroke={BACKGROUND_STROKE_COLOR}
//           strokeWidth={30}
//         />
//         <AnimatedCircle
//           cx={width / 2}
//           cy={height / 2}
//           r={R}
//           stroke={STROKE_COLOR}
//           strokeWidth={15}
//           strokeDasharray={CIRCLE_LENGTH}
//           animatedProps={animatedProps}
//           strokeLinecap={'round'}
//         />
//       </Svg>
//       <TouchableOpacity onPress={onPress} style={styles.button}>
//         <Text style={styles.buttonText}>Run</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: BACKGROUND_COLOR,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   progressText: {
//     fontSize: 80,
//     color: 'rgba(256,256,256,0.7)',
//     width: 200,
//     textAlign: 'center',
//   },
//   button: {
//     position: 'absolute',
//     bottom: 80,
//     width: width * 0.7,
//     height: 60,
//     backgroundColor: BACKGROUND_STROKE_COLOR,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontSize: 25,
//     color: 'white',
//     letterSpacing: 2.0,
//   },
// });

// import React, { useState, useContext } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { ColorThemeContext } from "../../context/theme_context";
// import Themes from "../../style/AppThemeColors";
// const Profile = () => {
//   const theme = useContext(ColorThemeContext)
//   console.log('theme',theme)
//   return (
//     <View>
//       <Text>Profile</Text>
//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({})
