import { View, Text, Image } from "react-native";
import MyStyle from "../../style/MyStyle";
import React from "react";
import APIs, { endpoints } from "../../configs/APIs";
import { ActivityIndicator, Chip, List } from 'react-native-paper';

const Home = () => {
  const [categories, setCategories]= React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const[loading, setLoading] = React.useState(false)

  const loadCates = async ()=>{
    let res = await APIs.get(endpoints['categories']);
    console.info(res.data);
    setCategories(res.data);
  }

const loadCourses = async () => {
  setLoading(true);

  try{
    let res= await APIs.get(endpoints['courses']);
    setCourses(res.data.resluts)
  }catch (ex) {
    console.error(ex)
  }finally{
    setLoading(false);
  }
}

React.useEffect(()=>{
  loadCates();
},[]);

React.useEffect(()=>{
  loadCourses()
},[]);

  return (
    <View style={MyStyle.container}>
      <Text style={MyStyle.subject}> DANH MỤC KHÓA HỌC </Text>
      <View style={MyStyle.row}>
      {categories.map(c=><Chip icon="label" key={c.id}>{c.name}</Chip>)}
      </View>

      <View>
        {loading && <ActivityIndicator/>}

        {courses.map(c=><List.Item
             title={c.subject}
             description={c.created_date}
             left={props => <Image style={MyStyle.box} source = {{uri: c.image}}  />}
  />)}
      </View>
    
    </View>
  );
};

export default Home;




