import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, Image, Modal, FlatList } from 'react-native';
import { Button, Icon, Text, ListItem, Layout, Card } from '@ui-kitten/components';
import UserListService from '../service/UserList';

const { width } = Dimensions.get("window");

const Home = () => {
    const userlistService = new UserListService();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const obtenerUsers = async () => {
        try {
            const response = await userlistService.obtenerUser();
            setUsers(response.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const obtenerInfoUser = async (id) => {
        try {
            const response = await userlistService.obtenerInfoUser(id);
            setSelectedUser(response.data);
            setModalVisible(true);
        } catch (error) {
            console.error("Error al obtener información del usuario:", error);
        }
    };

    useEffect(() => {
        obtenerUsers();
    }, []);

    const renderUserItem = ({ item }) => (
        <ListItem
            title={`${item.first_name} ${item.last_name}`}
            accessoryLeft={renderUserIcon}
            accessoryRight={renderDetailsIcon}
            onPress={() => obtenerInfoUser(item.id)}
            style={styles.listItem}
        />
    );

    const renderUserIcon = (props) => (
        <Icon name='person-outline' {...props} />
    );

    const renderDetailsIcon = (props) => (
        <Layout style={styles.detailsIconContainer}>
            <Icon name='eye-outline' {...props} />
            <Text style={styles.detailsIconText}>Detalles</Text>
        </Layout>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Lista de usuarios</Text>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id.toString()}
            />

            <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                {selectedUser && (
                    <Card style={styles.modalCard}>
                        <Image style={styles.tinyLogo} source={{ uri: selectedUser.avatar }} />
                        <Text style={styles.modalTitle}>{`${selectedUser.first_name} ${selectedUser.last_name}`}</Text>
                        <Text style={styles.modalText}>{selectedUser.email}</Text>
                        <Button
                            size='tiny'
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            Regresar
                        </Button>
                    </Card>
                )}
            </Modal>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        marginTop: width * 0.1,
        flex: 1,
    },
    listItem: {
        margin: 10,
        elevation: 2,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
    },
    tinyLogo: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: 'center',
    },
    modalCard: {
        marginTop: width * 0.1,
        marginHorizontal: 5,
        marginBottom: 5,
        elevation: 5,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        width: width * 0.6,
        alignSelf: 'center',

    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 20,
        width: 100,
        alignSelf: 'center',
    },
    detailsIconContainer: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
    },
    detailsIconText: {
        fontSize: 10,
        textAlign: 'center',
    }

});
