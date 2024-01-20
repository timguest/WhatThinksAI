'use client'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image
  } from "@react-pdf/renderer";
import DisplayPdfUser from "./display-pdf-user";
import DisplayPdfReport from "./display-pdf-report";
import GoBackButton from "../go-back-button";
import { useEffect, useState } from "react";
import { fetchImage } from "@/app/home/actions";
  // Create styles
  const imageUrl = 'https://w7.pngwing.com/pngs/482/705/png-transparent-xslt-watermark-others-miscellaneous-angle-white-thumbnail.png';

export default function DisplayPdf({ setDownloadReport, reports, trial}: {setDownloadReport: any, reports: any[], trial: boolean}) {
  const [image, setImage] = useState<any>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const base64String:any = await fetchImage(imageUrl);  
        console.log({base64String});
        setImage(`data:image/png;base64,${base64String}`);

        // setImage(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once, similar to componentDidMount

  
  const styles = StyleSheet.create({
        page: {
          // backgroundColor: "red",
          color: "black",
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 5,
          padding: 20,
          position: "relative",
        },
        overlay: {
          position: 'absolute',
          opacity: 0.5,
          top: '30%',
          left: '10%',
          transform: 'rotate(45deg)', // Rotate by 45 degrees
          zIndex: 99999
        },
        section: {
           zIndex: 1,
           backgroundColor: "transparent"
        },
        viewer: {
          width: window.innerWidth, //the pdf viewer will take up all of the width and height
          height: window.innerHeight,
        },
        
        backgroundImage: {
          position: 'absolute',
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 5,
          padding: 20,
          width: window.innerWidth/2,
          height: window.innerHeight,
          zIndex: 2,
        },
      });
    
    return(
        <div>
            <div className="absolute w-fit px-20 py-20">
                <GoBackButton onClickFunc={() => setDownloadReport((downloadReport :any) => !downloadReport)} type='standard' path='/home'/>
            </div>


            <PDFViewer showToolbar={trial ? false : true} style={styles.viewer}>
        <Document>
          {/* Render each page separately */}
          {reports.map((report: any, index: number) => (
                        <Page size="A4" style={styles.page} key={index}>
                            {/* Render background image */}
                           {/* {image && trial && <Image src={image} style={styles.backgroundImage} />} */}

                            {trial && ( // Render overlay only if 'trial' is true
                                <View style={styles.overlay}>
                                    <Text style={{ fontSize: 50 }}>This is a preview</Text>
                                </View>
                            )}

                            <View style={styles.section}>
                                <DisplayPdfUser user={report?.user} />
                                <DisplayPdfReport report={report?.content} />
                            </View>
                        </Page>
                    ))}
        </Document>
      </PDFViewer>

        </div>
    )
    
}