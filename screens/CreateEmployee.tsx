import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djpzhuqpv/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'employeeApp';
const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const CreateEmployee = ({ navigation, route }) => {
  const [form, setForm] = useState({
    name: route?.params?.name || '',
    phone: route?.params?.phone || '',
    email: route?.params?.email || '',
    salary: route?.params?.salary || '',
    position: route?.params?.position || '',
    picture: route?.params?.picture || '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [modal, setModal] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const validateField = (field, value) => {
    let msg = '';

    switch (field) {
      case 'name':
        if (!value.trim()) msg = 'Name is required';
        break;
      case 'phone':
        if (!value.trim()) msg = 'Phone number is required';
        else if (!/^[6-9]\d{9}$/.test(value)) msg = 'Enter valid 10-digit phone';
        break;
      case 'email':
        if (!value.trim()) msg = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = 'Invalid email';
        break;
      case 'salary':
        if (!value.trim()) msg = 'Salary is required';
        else if (isNaN(value)) msg = 'Salary must be a number';
        break;
      case 'position':
        if (!value.trim()) msg = 'Position is required';
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  const isFormValid = () => {
    const hasNoErrors = Object.values(errors).every((e) => !e);
    const requiredFields = ['name', 'phone', 'email', 'salary', 'position'];
    const allRequiredFieldsFilled = requiredFields.every(field => form[field].trim() !== '');
    return hasNoErrors && allRequiredFieldsFilled;
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS permissions are handled by Info.plist
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const androidVersion = Platform.Version;
        let permission;
        
        // Android 13+ (API 33+) uses READ_MEDIA_IMAGES
        if (androidVersion >= 33) {
          permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
        } else {
          permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        }
        
        const granted = await PermissionsAndroid.request(
          permission,
          {
            title: 'Gallery Permission',
            message: 'This app needs access to your gallery to select photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS permissions are handled by Info.plist
  };

  const handleUpload = async (image) => {
    const data = new FormData();
    data.append('file', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'photo.jpg',
    });
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: data });
      const json = await res.json();

      if (json.secure_url) {
        setForm((prev) => ({ ...prev, picture: json.secure_url }));
        setImageUploaded(true); // ✅ mark uploaded successfully
        Alert.alert('Success', 'Image uploaded successfully!');
      } else {
        throw new Error('Invalid Cloudinary response');
      }
    } catch (err) {
      console.error('Upload error:', err);
      Alert.alert('Error', 'Image upload failed. Please try again.');
      setImageUploaded(false);
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
      setModal(false);
      return;
    }

    setImageUploaded(false);
    launchCamera(
      { 
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      }, 
      (res) => {
        setModal(false);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          Alert.alert('Error', res.errorMessage || 'Failed to open camera');
        } else if (res.assets?.[0]) {
          handleUpload(res.assets[0]);
        }
      }
    );
  };

  const openGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Gallery permission is required to select photos.');
      setModal(false);
      return;
    }

    setImageUploaded(false);
    launchImageLibrary(
      { 
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      }, 
      (res) => {
        setModal(false);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          Alert.alert('Error', res.errorMessage || 'Failed to open gallery');
        } else if (res.assets?.[0]) {
          handleUpload(res.assets[0]);
        }
      }
    );
  };

  const saveData = () => {
    if (!isFormValid()) {
      Alert.alert('Please fix validation errors');
      return;
    }

    const url = route?.params ? `${BASE_URL}/update` : `${BASE_URL}/send-data`;
    const body = route?.params
      ? { ...form, id: route.params._id }
      : form;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          Alert.alert('Error', data.error);
        } else {
          Alert.alert('Success', `${data.name} saved successfully`);
          navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.error('Save error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        {['name', 'phone', 'email', 'salary', 'position'].map((field) => (
          <View key={field} style={styles.inputGroup}>
            <Text style={styles.label}>{field.toUpperCase()}</Text>
            <TextInput
              style={[
                styles.input,
                touched[field] && errors[field] ? { borderColor: 'red' } : {},
              ]}
              placeholder={`Enter ${field}`}
              placeholderTextColor="#888"
              keyboardType={
                field === 'phone'
                  ? 'phone-pad'
                  : field === 'salary'
                    ? 'numeric'
                    : 'default'
              }
              value={form[field]}
              onChangeText={(val) => handleChange(field, val)}
              onBlur={() => handleBlur(field)}
              onSubmitEditing={() => handleBlur(field)}
            />
            {touched[field] && errors[field] ? (
              <Text style={styles.errorText}>{errors[field]}</Text>
            ) : null}
          </View>
        ))}

        <View style={{ marginVertical: 10 }}>
          {/* <Button title="Upload Image" color="#6bc1ff" onPress={() => setModal(true)} /> */}
          {form.picture ? (
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Image
                source={{ uri: form.picture }}
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
            </View>
          ) : null}
          <Button
            title={imageUploaded ? 'Image Uploaded ✅' : 'Upload Image'}
            color={imageUploaded ? 'green' : '#6bc1ff'}
            onPress={() => setModal(true)}
          />
        </View>

        <Button
          title={route?.params ? 'Update Employee' : 'Save Employee'}
          color="#6bc1ff"
          onPress={saveData}
          disabled={!isFormValid()}
        />
      </ScrollView>

      <Modal visible={modal} animationType="slide" transparent>
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button title="Camera" color="#6bc1ff" onPress={openCamera} />
            <Button title="Gallery" color="#6bc1ff" onPress={openGallery} />
          </View>
          <Button title="Cancel" color="#6bc1ff" onPress={() => setModal(false)} />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default CreateEmployee;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f9f9f9' },
  container: { padding: 20 },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
  modalView: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});