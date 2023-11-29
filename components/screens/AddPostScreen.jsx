import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateRandomId = () => {
    return Math.floor(Math.random() * 5000); // Replace this with your logic to generate unique IDs
};

const AddPostScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [latestPost, setLatestPost] = useState({});

    const savePostToStorage = async () => {
        try {
            const randomUserId = generateRandomId();
            const randomId = generateRandomId();

            const newPost = {
                userId: randomUserId,
                id: randomId,
                title: title,
                body: content,
            };

            const existingPosts = await AsyncStorage.getItem('posts');
            const parsedPosts = existingPosts ? JSON.parse(existingPosts) : [];

            parsedPosts.push(newPost);
            await AsyncStorage.setItem('posts', JSON.stringify(parsedPosts));

            setLatestPost(newPost);
            setShowModal(true);
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter content"
                value={content}
                onChangeText={(text) => setContent(text)}
                multiline={true}
            />
            <Button title="Submit" onPress={savePostToStorage} />

            {/* Custom Popup */}
            <Modal visible={showModal} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            New post has been saved!
                        </Text>
                        <Text style={styles.modalText}>
                            Title: {latestPost.title}
                        </Text>
                        <Text style={styles.modalText}>
                            Content: {latestPost.body}
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setShowModal(false);
                                navigation.navigate('Feed');
                            }}
                        >
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
    },
    // Styles for Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        paddingHorizontal: 80,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontWeight: "500",
        fontSize: 18,
        marginBottom: 10,
    },
    modalText: {
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AddPostScreen;
