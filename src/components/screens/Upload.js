import React, { useState } from 'react';
import { View, Button, Image, Text, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);

  const pickFile = () => {
    launchImageLibrary({ mediaType: 'mixed' }, (res) => {
      if (!res.didCancel && res.assets && res.assets.length > 0) {
        setFile(res.assets[0]);
      }
    });
  };

  const uploadFile = async () => {
    if (!file) return;

    const data = new FormData();
    data.append('file', {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    });

    setUploading(true);

    try {
    
      const res = await axios.post('https://file.io/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(res.data);
      console.log('success')
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick Image/Video" onPress={pickFile} />

      {file && (
        <View style={{ marginTop: 20 }}>
          {file.type.startsWith('image') ? (
            <Image
              source={{ uri: file.uri }}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
          ) : (
            <Text>📹 Selected Video: {file.fileName}</Text>
          )}
          <Button title="Upload" onPress={uploadFile} />
        </View>
      )}

      {uploading && <ActivityIndicator style={{ marginTop: 10 }} size="large" />}

      {response && (
        <Text style={{ marginTop: 10 }}>
          {response.success ? `Uploaded! Link: ${response.link}` : `Error: ${response.error}`}
        </Text>
      )}
    </View>
  );
};

export default Upload;
