import React, { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import ButtonComponent from '../../Components/Button';
import * as DocumentPicker from 'expo-document-picker';
import { useEffect, useState } from 'react';
import ButtonOptions from '../../Components/ButtonOptions';
import { AntDesign } from '@expo/vector-icons'; 
import { ref, uploadBytes, listAll } from 'firebase/storage';
import { storage } from '../../config';
import 'firebase/storage';

export default function FirstScreen(){
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null);
    const [fileNames, setFileNames] = useState([]);

    function refresh(){
        const interval = setInterval(() => {
        getFilesFromStorage().then((names) => {
            setFileNames(names);
        });
        }, 1000); 
    
        return () => {
            clearInterval(interval); 
        };
    }

    const selectDoc = async () => {
        try {
            const doc = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });

            setFileName(doc.name);
            setFile(doc);
            console.log(doc.uri)
        } catch (error) {         
            console.log("Upload cancelled")       
        }
    }

    const uploadFile = async () => {     
        const response = await fetch(file.uri);
        const blob = await response.blob();  
        const storageRef = ref(storage, file.name);
        uploadBytes(storageRef, blob).then(() => {
            refresh();
        }).catch((error) => {
            console.log(error.message);
        })

        Alert.alert("File uploaded!");
        setFile(null);
        setFileName(null);     
    }

    const getFilesFromStorage = async () => {
        try {
          const storageRef = ref(storage);
          const listResult = await listAll(storageRef);
          const fileNames = listResult.items.map((item) => item.name);
          return fileNames;
        } catch (error) {
          console.log(error.message);
          return [];
        }
      };
    

    return(
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.fileSelect}>
          <Text style={styles.title}>Document Picker</Text>
          <ButtonComponent title="Select" onPress={selectDoc} />
        </View>

        {fileName ? (
          <View style={styles.selectedFileContainer}>
            <Text style={styles.selectedFileLabel}>Selected File:</Text>
            <Text style={styles.selectedFileName}>{fileName}</Text>
            <View style={styles.buttonContainer}>
              <ButtonOptions title="Send" backroundColor="#FF5733" onPress={uploadFile} />
              <View style={styles.buttonSpace} />
              <ButtonOptions title="Cancel" backroundColor="#FFFF" onPress={() => setFileName(null)} />
            </View>
          </View>
        ) : (
          <Text style={styles.selectedFileName}>No file selected</Text>
        )}
        <View style={styles.filesUploaded}>
            <Text style={styles.uploadedFileTxt}>Files already uploaded:</Text>
            {fileNames.map((fileName, index) => (
            <View style={{ flexDirection: 'row', marginTop: 8 }} key={index}>
                <AntDesign name="check" size={13} color="black" />
                <Text style={styles.uploadedFile}>{fileName}</Text>
            </View>
            ))}
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#d75056',
      alignSelf: 'center',
    },

    fileSelect: {
      width: '70%',
      height: '28%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    selectedFileContainer: {
        marginTop: 20,
        alignItems: 'center',
    },

    selectedFileLabel: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 10,
    },

    selectedFileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#d75056',
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justify: 'center',
    },

    buttonSpace: {
        width: 10,
    },

    filesUploaded: {
        marginTop: '20%'
    },

    uploadedFile: {
        fontSize: 12
    },

    uploadedFileTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray'
    }

});