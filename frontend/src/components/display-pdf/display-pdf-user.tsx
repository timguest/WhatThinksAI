import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
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
            // flexWrap: 'wrap',
            flexDirection:"column",
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
            // border: '1pt solid black', // Example border
            // backgroundColor: "red"
        },
        title: {
            fontSize: '14pt',
            fontWeight: 'bold',
            marginBottom: '12pt',
        },
        Text:{
            maxWidth:"80%",
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
                            <Text style={styles.Text} >First Name: {first_name}</Text>
                            <Text style={styles.Text}>Last Name: {last_name}</Text>
                            <Text style={styles.Text}>Age: {age}</Text>
                            <Text style={styles.Text}>Gender: {gender}</Text>
                            <Text style={styles.Text}>Marital Status: {marital_status}</Text>
                            <Text style={styles.Text}>Location: {location}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flexWrap}>
                    <View style={styles.column}>
                        <View style={styles.roundedBox}>
                            <View >Additional Information</View>
                            <View>
                                <Text style={styles.Text}>Income level: {income_level}</Text>
                                <Text style={styles.Text}>Education Level: {education_level}</Text>
                                <Text style={styles.Text}>Type of Area: {area_type}</Text>
                                <Text style={styles.Text}>Employment Industry: {employment_industry}</Text>
                                <Text style={styles.Text}>Children Amount: {children_amount}</Text>
                                <Text style={styles.Text}>Hobbies: {hobbies}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DisplayPdfUser;