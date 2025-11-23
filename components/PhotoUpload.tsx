import Colors from '@/constants/Colors';
import { BORDER_RADIUS, FONT_SIZE, SPACING } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PhotoUploadProps {
  photoUri: string | null;
  onPhotoSelected: (uri: string) => void;
}

export default function PhotoUpload({ photoUri, onPhotoSelected }: PhotoUploadProps) {
  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload photos!');
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onPhotoSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.uploadBox}
        onPress={pickImage}
        activeOpacity={0.7}
      >
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.image} />
        ) : (
          <>
            <Ionicons name="person-outline" size={48} color={Colors.dark.primary} />
            <Text style={styles.uploadText}>Upload Photo KTM</Text>
          </>
        )}
      </TouchableOpacity>
      
      <Text style={styles.requirementText}>
        Format should be in .jpeg, .png atleast{'\n'}
        800x800px and less than 5MB
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  uploadBox: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.dark.textGray,
    borderRadius: BORDER_RADIUS.medium,
    backgroundColor: Colors.dark.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.medium,
  },
  uploadText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.dark.primary,
    marginTop: SPACING.xs,
  },
  requirementText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.dark.textGray,
    textAlign: 'center',
    lineHeight: 18,
  },
});
