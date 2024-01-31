// DisplayPdfUser.tsx

import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

const DisplayPdfUser = ({ user }: any) => {
    const { first_name, last_name, age, gender, marital_status, education_level, employment_industry, income_level, area_type, location, children_amount, hobbies } = user;

    const styles = StyleSheet.create({
        viewer: {
            // width: window.innerWidth,
            // height: window.innerHeight,
        },
        flexWrap: {
            display: 'flex',
            flexDirection: "column",
            marginLeft: '-4pt',
            marginRight: '-4pt',
        },
        column: {
            width: '100%',
            paddingLeft: '4pt',
            paddingRight: '4pt',
            marginBottom: '8pt',
        },
        roundedBox: {
            width: '100%',
            borderRadius: '4pt',
            padding: '12pt',
        },
        title: {
            fontSize: '14pt',
            fontWeight: 'bold',
            marginBottom: '12pt',
        },
        text: {
            maxWidth: "80%",
            fontSize: '14pt',
        }
    });

    return (
        <View style={styles.viewer}>
            <View style={styles.flexWrap}>
                <View style={styles.column}>
                    <View style={styles.roundedBox}>
                        <View >User Information</View>
                        <View>
                            <Text style={styles.text} >First Name: {first_name}</Text>
                            <Text style={styles.text}>Last Name: {last_name}</Text>
                            <Text style={styles.text}>Age: {age}</Text>
                            <Text style={styles.text}>Gender: {gender}</Text>
                            <Text style={styles.text}>Marital Status: {marital_status}</Text>
                            <Text style={styles.text}>Location: {location}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flexWrap}>
                    <View style={styles.column}>
                        <View style={styles.roundedBox}>
                            <View >Additional Information</View>
                            <View>
                                <Text style={styles.text}>Income level: {income_level}</Text>
                                <Text style={styles.text}>Education Level: {education_level}</Text>
                                <Text style={styles.text}>Type of Area: {area_type}</Text>
                                <Text style={styles.text}>Employment Industry: {employment_industry}</Text>
                                <Text style={styles.text}>Children Amount: {children_amount}</Text>
                                <Text style={styles.text}>Hobbies: {hobbies}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DisplayPdfUser;
