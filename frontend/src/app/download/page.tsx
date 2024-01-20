'use client'
import DisplayReports from '@/components/displayReports';
import Loader from '@/components/loader';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Download() {
    const search_params = useSearchParams()
    const query_id = search_params.get('query_id')
    const [reports, setReports] = useState([])
    const [downloadReport, setDownloadReport] = useState(false);
    const [loading, setLoading] = useState(true);
    // const session_id = search_params.get('session_id')

    const getAllReports = async (query_id: any) => {
        setLoading(true);
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/openai?query_id=${query_id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
              },
            });
        
            if (response.ok) {
              const data = await response.json();
              const {count, result} = data;
              setReports(result)           
              setLoading(false)     
              // Handle successful response data
            } else {
              // Handle response errors
              const errorData = await response.json();
              console.error('Error:', errorData);
              setLoading(false)
            }
          } catch (error) {
            // Handle network errors or exceptions
            console.error('Error:', error);
            setLoading(false)
          }
    }

    useEffect(() => {
        if (!!query_id) {
            getAllReports(query_id)
        }
    }, [query_id])
    
    if (loading) {
        return(<div className="flex w-full h-screen justify-center items center">
            <Loader />
        </div>)
    } else {
    return (
      <main>
            <div className="flex min-h-screen flex-col items-center justify-between">
                <DisplayReports reportLength={reports.length} reports={reports} query_id={query_id || ""} trial={false}/>
            </div>
      </main>
    )
    }
  }