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
import { useDispatch, useSelector } from "react-redux";
import IsEmpty from "../../utils/IsEmpty";
import firestore from '@react-native-firebase/firestore';
import SingleSelectionDropdown from "../../components/single_selection_dropdown";
import ACTIONS from "../../store/actions";


const _months3 = [
  {
    "package_image_url": "https://firebasestorage.googleapis.com/v0/b/gymc-d2bf7.appspot.com/o/2899b391-58a6-4bb5-8a6f-afba5a107cd2.jpg?alt=media&token=5aca157f-1078-47d2-9d22-9afb09112236",
    "name": "Weight Gain",
    "id": "UoROHvBJ5JgO9mzmdoqu",
    "value": "Weight Gain",
    "count": 1
  },
  {
    "package_image_url": "https://firebasestorage.googleapis.com/v0/b/gymc-d2bf7.appspot.com/o/cd38b550-231c-4c4f-90c3-67490fb3fdf9.jpg?alt=media&token=714d13e1-5623-4e47-b2c0-90d3692def8b",
    "name": "Weight Loss",
    "id": "mCkgLfE7n60MVGjFr0pT",
    "value": "Weight Loss",
    "count": 1
  },
  {
    "package_image_url": null,
    "name": "Personal Training",
    "id": "vZyyAAsJ20PhhaXVorU8",
    "value": "Personal Training",
    "count": 1
  }
]
const _graph_values = {
  data: [],
  max: 0,
  recommended: 0,
  title: ''
}

const Profile = () => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const theme = useContext(ColorThemeContext)
  const members_list = useSelector(state => state.MembersListReducer.members_list);
  const [_months_data, set_months_data] = useState([])
  const [packages_list, set_packages_list] = useState([])
  const [packages_graph_values, set_packages_graph_values] = useState([])

  const [selected_package, set_selected_package] = useState(null)
  const [graph_values, set_graph_values] = useState(_graph_values)

  console.log('ccc packages_list', packages_list)
  useEffect(() => {
    if (selected_package) {
      if (selected_package.name == 'Weight Gain') {
        asyncFunction()
      } else {
        asyncFunction2()
      }
      console.log('kklp', selected_package)
    }
  }, [selected_package])

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

  const asyncFunction = async () => {
    let mydata = await dispatch(ACTIONS.set_packages_graph_values(members_list, packages_list))
    set_graph_values({
      data: mydata,
      max: 100,
      recommended: 75,
      title: 'name'
    })
  }//set_members_graph_values

  const asyncFunction2 = async () => {
    let mydata = await dispatch(ACTIONS.set_members_graph_values(members_list))
    set_graph_values({
      data: mydata,
      max: 100,
      recommended: 75,
      title: 'title'
    })
  }//

  // useEffect(() => {
  //   if (!IsEmpty(members_list)) {
  //     asyncFunction()
  //   }
  // }, [members_list, packages_list])


  // useEffect(() => {
  //   if (!IsEmpty(members_list)) {
  //     asyncFunction2()
  //   }
  // }, [members_list])

  const calcAndReturn = (array, distr_month, distr_days_sch) => array.map((_mon) => {
    if (_mon.month == distr_month) {
      let item = { ..._mon, days_sch: _mon.days_sch + distr_days_sch }
      return item;
    } else return { ..._mon }
  })

  /**
   *    
   let new_data=await calcAndReturn(_months,distr.month,distr.days_sch)
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
  console.log('log', graph_values);
  return (
    <View style={[styles.container, { backgroundColor: theme.Colors.COLOR_BACKGROUND }]}>
      <View style={{ margin: 12 }}>
        <SingleSelectionDropdown
          queTitle={`Select Package`}
          itemStyle={{ marginHorizaontal: 40 }}
          data={_months3}
          _dropdownValue={selected_package?.name ? selected_package?.name : ''}
          set_dropdownValue={async (item) => {
            set_selected_package(item)
          }} />
      </View>

      <View style={{ maxHeight: 600, width: '100%' }}>

        {(!IsEmpty(graph_values.data) && graph_values.data.length > 0) &&
          <BarChart
            key={graph_values.title}
            graphdata={graph_values.data}
            graphHeight={300}
            max={graph_values.max}
            recomended={graph_values.recommended}
            isPersentage={true}
            numColumns={graph_values.data.length}
            titleText={graph_values.title}
            maerginBetweenBars={'15%'}
          />}
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
