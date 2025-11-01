/* eslint-disable react-native/no-inline-styles */
import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Card, FAB} from 'react-native-paper';

const Home = ({navigation}) => {
  // const data = [
  //   {
  //     _id: 1,
  //     name: 'Vanshika',
  //     email: 'vansh@gmail.com',
  //     salary: '5 lpa',
  //     phone: '9834982393',
  //     position: 'Software Developer',
  //     picture:
  //       'https://plus.unsplash.com/premium_photo-1723568425978-81ef0ab51252?q=80&w=3409&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     _id: 2,
  //     name: 'Janhvi',
  //     email: 'jang@gmail.com',
  //     salary: '7 lpa',
  //     phone: '9832334893',
  //     position: 'Designer',
  //     picture:
  //       'https://plus.unsplash.com/premium_photo-1689564003745-946f35267ffe?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     _id: 3,
  //     name: 'Jatin',
  //     email: 'vansh@gmail.com',
  //     salary: '6 lpa',
  //     phone: '9833484893',
  //     position: 'Software Developer',
  //     picture:
  //       'https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=3080&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     _id: 4,
  //     name: 'Vaibhav',
  //     email: 'vaibh@gmail.com',
  //     salary: '3 lpa',
  //     phone: '9834982393',
  //     position: 'Software Developer',
  //     picture:
  //       'https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     _id: 5,
  //     name: 'Chirag',
  //     email: 'chirag@gmail.com',
  //     salary: '5 lpa',
  //     phone: '9839682393',
  //     position: 'Security Analyst',
  //     picture:
  //       'https://plus.unsplash.com/premium_photo-1689570350306-3aa2bc42189e?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     _id: 6,
  //     name: 'Vanshika',
  //     email: 'vansh@gmail.com',
  //     salary: '6 lpa',
  //     phone: '9867344521',
  //     position: 'Software Developer',
  //     picture:
  //       'https://plus.unsplash.com/premium_photo-1689564003745-946f35267ffe?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     _id: 7,
  //     name: 'Janhvi',
  //     email: 'vansh@gmail.com',
  //     salary: '8 lpa',
  //     phone: '9456738933',
  //     position: 'Designer',
  //     picture:
  //       'https://plus.unsplash.com/premium_photo-1723568425978-81ef0ab51252?q=80&w=3409&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     _id: 8,
  //     name: 'Jatin',
  //     email: 'jatin@gmail.com',
  //     salary: '5 lpa',
  //     phone: '9824934893',
  //     position: 'Software Developer',
  //     picture:
  //       'https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=3080&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     _id: 9,
  //     name: 'Vaibhav',
  //     email: 'vaibh@gmail.com',
  //     salary: '9 lpa',
  //     phone: '9834984893',
  //     position: 'Software Developer',
  //     picture:
  //       'https://plus.unsplash.com/premium_photo-1689570350306-3aa2bc42189e?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     _id: 10,
  //     name: 'Chirag',
  //     email: 'chir45@gmail.com',
  //     salary: '7 lpa',
  //     phone: '9420490249',
  //     position: 'Security Analyst',
  //     picture:
  //       'https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  // ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch('http://10.0.2.2:3000/')
      .then(res => res.json())
      .then(results => {
        setData(results);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert('someting went wrong');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (item: any) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => {
          navigation.navigate('Profile', {item});
        }}>
        <View style={styles.cardView}>
          <Image
            style={{width: 60, height: 60, borderRadius: 30}}
            source={{
              uri: item.picture,
            }}
          />
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'column',
              marginStart: 34,
            }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
          size="large"
          color="#6bc1ff"
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => {
            return renderList(item);
          }}
          keyExtractor={item => `${item._id}`}
          onRefresh={() => fetchData()}
          refreshing={loading}
        />
      )}

      <FAB
        color="white"
        onPress={() => {
          navigation.navigate('CreateEmployee');
        }}
        style={styles.fab}
        label="Add Employee"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
  },
  cardView: {
    flexDirection: 'row',
    padding: 6,
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#6bc1ff',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
