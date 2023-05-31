import React, { useState, useContext, useEffect } from "react";
import { View, Switch, StyleSheet, Button, Platform, ToastAndroid, Text } from "react-native";


import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { useDispatch, useSelector } from "react-redux";

import firestore from '@react-native-firebase/firestore';


import { ColorThemeContext } from "../../../context/theme_context";
import ACTIONS from "../../../store/actions";
import SingleSelectionDropdown from "../../../components/single_selection_dropdown";
import IsEmpty from "../../../utils/IsEmpty";
import BarChart from "../../../components/BarChart";

const graphs = [
  {
    "name": "Based On Package",
    "id": "UoROHvBJ5JgO9mzmdoqu",
    "value": "Weight Gain",
  },
  {
    "name": "Based On Year",
    "id": "mCkgLfE7n60MVGjFr0pT",
    "value": "Weight Loss",
  }
]
const _graph_values = {
  data: [],
  max: 0,
  recommended: 0,
  title: ''
}

const Graphs = () => {
  const dispatch = useDispatch();
  const theme = useContext(ColorThemeContext)
  const members_list = useSelector(state => state.MembersListReducer.members_list);

  const [packages_list, set_packages_list] = useState([])

  const [selected_package, set_selected_package] = useState(null)
  const [graph_values, set_graph_values] = useState(_graph_values)

  useEffect(() => {
    if (selected_package) {
      if (selected_package.name == 'Based On Package') {
        async_packages_graph_values()
      } else {
        async_members_graph_values()
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

  const async_packages_graph_values = async () => {
    let mydata = await dispatch(ACTIONS.set_packages_graph_values(members_list, packages_list))
    set_graph_values({
      data: mydata,
      max: 100,
      recommended: 75,
      title: 'name'
    })
  }

  const async_members_graph_values = async () => {
    let mydata = await dispatch(ACTIONS.set_members_graph_values(members_list))
    set_graph_values({
      data: mydata,
      max: 100,
      recommended: 75,
      title: 'title'
    })
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.Colors.COLOR_BACKGROUND }]}>
      
      <AnimatedCircularProgress
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
      </AnimatedCircularProgress>

      <View style={{ margin: 12 }}>
        <SingleSelectionDropdown
          queTitle={`Select Package`}
          itemStyle={{ marginHorizaontal: 40 }}
          data={graphs}
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



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Graphs;