import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const MemoItem = memo(({ item }) => (
    <View style={styles.card}>
        <Text style={{fontWeight: "500", paddingBottom: 6}}>{item.title}</Text>
        <Text>{item.body}</Text>
    </View>
));

const FeedScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(API_URL);
            setPosts(response.data);
            setFilteredPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        setSearching(true);

        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(text.toLowerCase())
        );

        setTimeout(() => {
            setFilteredPosts(filtered);
            setSearching(false);
        }, 300);
    };

    const renderItem = ({ item }) => {
        return <MemoItem item={item} />;
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 8, borderColor: "gray" }}
                placeholder="Search"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={searching ? [] : filteredPosts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    searching ? (
                        <Text style={{ alignSelf: 'center' }}>Searching...</Text>
                    ) : (
                        <Text style={{ alignSelf: 'center' }}>No results found</Text>
                    )
                }
            />
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <Ionicons
                    name="add-circle"
                    size={50}
                    color="lightblue"
                    onPress={() => navigation.navigate('AddPost')}
                />
            </View>
        </View>
    );
};

export default FeedScreen;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})