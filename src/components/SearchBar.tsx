import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SearchIcon } from '../utils/svgs';

interface Props {
    value: string;
    onChangeText: (text: string) => void;
}

const SearchBarComponent: React.FC<Props> = ({ value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search products..."
                    value={value}
                    onChangeText={onChangeText}
                />
                <SearchIcon style={styles.icon} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '80%'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
});

export default SearchBarComponent;
