'use client'
import { useState } from "react";
import checkout from "../../utils/checkout";
import DisplayPdf from "../display-pdf";
import DisplayOneUser from "../display-one-user";
import DisplayOneReport from "../display-one-report";
import GoBackButton from "../go-back-button";

export default function DisplayReports({query_id, reports, reportLength, trial}: {reports: any[], reportLength: number, query_id: string, trial: boolean}) {
    const [downloadReport, setDownloadReport] = useState(false);
    
    const buyStripePlan = () => {
        checkout({
            lineItems: [{price: process.env.NEXT_PUBLIC_PRODUCT_ID, quantity: 1}],
            query_id
        })
    }
  
    if(reportLength == 0) {
        return(
            <div className="h-screen relative">
                <div className=" absolute top-0 left-0 w-full px-10 py-10">
                <GoBackButton type="standard" path='/home'/>
                </div>

                <div className=" flex justify-center items-center h-full">
                    No reports found
                </div>
            </div>
        )
    } else if (downloadReport) {
        return(
            <div>
                <DisplayPdf setDownloadReport={setDownloadReport} reports={reports} trial={trial} />
            </div> 
        )
    } else {
        return(
            <div className="h-screen">
              <div className="pt-10 pl-10 h-fit w-full">
                <GoBackButton type="standard" path='/home'/>
                </div>
                <div>
                {
                reports?.map((report:any, index: number) => {
                    return(
                        <div className="flex justify-center w-full">
                        <div style={trial ? { backgroundImage:`url('https://i.ibb.co/fY92TPZ/Screenshot-2023-12-14-at-8-07-27-PM.png')`, backgroundSize: "60%"} : {}} key={index}  className="mx-20 px-3 mb-10 rounded-lg py-3 bg-white drop-shadow-xl w-1/2 ">
                            {/* <img src='https://toppng.com/uploads/preview/stock-image-watermark-png-watermark-11562998932a4hruiv7na.png' /> */}
                            <div className="">
                            <DisplayOneUser user={report?.user} />
                            <DisplayOneReport content={report?.content} />
                            </div>
                        </div>
                        </div>
                    )
                })}
                {
                    !trial
                    ? 
                    <div className="sticky bottom-0">
                    <div className="flex justify-center items-center space-x-10 mx-10 px-10 my-10 py-10">
                        <button onClick={() => setDownloadReport(true)} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                            Download Reports
                        </button>
                    </div>
                    </div>
                    :   
                    <div className="sticky bottom-0">
                        <div className="flex justify-center items-center space-x-10 mx-10 px-10 my-10 py-10"> 
                            {/* <button onClick={() => setDownloadReport(true)} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                                Download Reports
                            </button> */}

                            <button onClick={() => buyStripePlan()} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                                View All Reports
                            </button>
                        </div>
                        </div>
                }
                </div>
            </div>
        )
    }
}