'use client'
import BaseForm from "@/components/base-form";
import DisplayReports from "@/components/displayReports";
import Loader from "@/components/loader";
import { useState } from "react";

function Home() {
    const [reportLength, setReportLength] = useState<any>(0);
    const [reports, setReports] = useState([])
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [query_id, setQueryId] = useState('')

    return (
        <div>
            {!formSubmitted ?
                <BaseForm setReports={setReports} setReportLength={setReportLength} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} setQueryId={setQueryId} />
                :
                <DisplayReports query_id={query_id} reportLength={reportLength} reports={reports} trial={true} />
            }
        </div>
    )
}

export default Home;
