import {View, Image, Text, Button, Linking, Alert} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile = ({route, navigation}) => {
  const {_id, name, position, email, phone, salary, picture} =
    route.params.item;

  const deleteEmployee = () => {
    fetch('http://10.0.2.2:3000/delete', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: _id}),
    })
      .then(res => res.json())
      .then(deletedEmp => {
        if (deletedEmp.error) {
          Alert.alert('Error', deletedEmp.error);
        } else {
          Alert.alert('Success', `${deletedEmp.name} deleted`);
          navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.error('Delete error:', error);
        Alert.alert('Error', 'Something went wrong');
      });
  };
  return (
    <View style={{flex: 1}}>
      <LinearGradient colors={['#6bc1ff', 'white']} style={{height: '20%'}} />
      <View style={{alignItems: 'center'}}>
        <Image
          style={{
            width: 140,
            height: 140,
            borderRadius: 140 / 2,
            marginTop: -50,
          }}
          source={{
            uri: picture,
          }}
        />
      </View>
      <View style={{alignItems: 'center', margin: 15}}>
        <Title style={{fontWeight: 'bold'}}>{name}</Title>
        <Text style={{fontSize: 17}}>{position}</Text>
      </View>
      <Card
        style={{margin: 5, backgroundColor: 'white'}}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 8,
            alignItems: 'center',
          }}>
          <Icon name="email" size={32} color="#6bc1ff" />
          <Text
            style={{
              fontSize: 18,
              marginTop: 3,
              marginLeft: 5,
            }}>
            {email}
          </Text>
        </View>
      </Card>
      <Card
        style={{margin: 5, backgroundColor: 'white'}}
        onPress={() => {
          Linking.openURL(`tel:${phone}`);
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 8,
            alignItems: 'center',
          }}>
          <Icon name="phone" size={32} color="#6bc1ff" />
          <Text
            style={{
              fontSize: 18,
              marginTop: 3,
              marginLeft: 5,
            }}>
            {phone}
          </Text>
        </View>
      </Card>
      <Card style={{margin: 5, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 8,
            alignItems: 'center',
          }}>
          <Icon name="attach-money" size={32} color="#6bc1ff" />
          <Text
            style={{
              fontSize: 18,
              marginTop: 3,
              marginLeft: 5,
            }}>
            {salary}
          </Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'space-around',
        }}>
        <Button
          title="Edit Employee"
          onPress={() => {
            navigation.navigate('CreateEmployee'),
              {
                _id: _id,
                name: name,
                position: position,
                email: email,
                phone: phone,
                salary: salary,
                picture: picture,
              };
          }}
          color="#6bc1ff"
        />
        <Button
          title="Fire Employee"
          onPress={deleteEmployee}
          color="#6bc1ff"
        />
      </View>
    </View>
  );
};

export default Profile;
