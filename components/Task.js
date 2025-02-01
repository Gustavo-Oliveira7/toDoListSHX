import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const linkTodo = 'https://jsonplaceholder.typicode.com/todos';

const Task = () => {

    const [isLoading,setLoading] = useState(true)
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(linkTodo)
            .then((response) => response.json())
                .then((data) => setData(data.slice(0,4)))
                    .catch((error) => alert(error))
                        .finally(setLoading(false))
    })


    return(
        <View>           
            <Text>
                {isLoading ? <Text>loading</Text> : <Text>done</Text>}
            </Text>
        </View>
    )
}

export default Task;