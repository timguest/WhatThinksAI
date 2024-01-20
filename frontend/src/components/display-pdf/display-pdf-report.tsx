import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer";

const DisplayPdfReport = ({report}:any) => {
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
            maxWidth:"100%",
            fontSize: '14pt',
        }
    });

    return(
        <View style={styles.viewer}>
            <View style={styles.flexWrap}>
                <View style={styles.column}>
                    <View style={styles.roundedBox}>
                        <View >Content</View>
                        <Text style={styles.Text}>{report}</Text>
                    </View>
                 </View>
                 </View>
                 </View>   
    )
}

export default DisplayPdfReport;