'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../loader';

export default function BaseForm({ setReportLength, setReports, loading, setLoading, setFormSubmitted, setQueryId }: any) {
    const initialValues = {
        input_text: '',
        description: '',
        ageRange: '',
        education_level: '',
        income_level: '',
        gender: '',
        marital_status: '',
        area_type: '',
    };

    const validationSchema = Yup.object().shape({
        input_text: Yup.string().required('Input Text is required'),
        description: Yup.string().required('Description is required'),
        ageRange: Yup.string().required('Age Range is required'),
        education_level: Yup.string().required('Education Level is required'),
        income_level: Yup.string().required('Income Level is required'),
        gender: Yup.string().required('Gender is required'),
        marital_status: Yup.string().required('Marital Status is required'),
        area_type: Yup.string().required('Area Type is required'),
    });

    const separateTheAgeRanges = (ageRange: string): { lowerLimit: number, upperLimit: number | undefined } => {
        let lowerLimit = 0;
        let upperLimit: number | undefined;

        if (ageRange === '70+') {
            lowerLimit = 70;
            // No upper limit for '70+'
        } else {
            const [lowerStr, upperStr] = ageRange.split('-');

            if (lowerStr && upperStr) {
                lowerLimit = parseInt(lowerStr, 10);
                upperLimit = parseInt(upperStr, 10);
            }
        }

        return { lowerLimit, upperLimit };
    };

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        setLoading(true);
        const { input_text, description, ageRange, education_level, income_level, gender, marital_status, area_type } = values;
        const age = separateTheAgeRanges(ageRange);
        const requestBody = {
            age,
            education_level,
            income_level,
            gender,
            marital_status,
            area_type,
            input_text,
            description
        };
        // form is submitted
        setSubmitting(false);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/openai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as needed
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                // Handle successful response data
                setReportLength(data.count);
                setReports(data.result);
                setQueryId(data.query_id);
                setFormSubmitted(true);
                setLoading(false);
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
    };

    return (
        <>
            <div className="container mx-auto py-5 select-none">
                <h1 className="text-3xl font-semibold text-center mb-8">
                    <i className="fas fa-file-alt"></i> WHAT THINKS AI
                </h1>
                <div className="shadow-md flex">
                    <div className="hidden rounded-2xl lg:w-1/2 bg-yellow-300 lg:rounded-l-2xl lg:rounded-r-none lg:flex items-center justify-center">
                        <div className="text-center">
                            <div className='flex justify-center'>
                                <img src='/assets/logo.png' width={300} height={300} />
                            </div>
                            <p className="text-3xl font-semibold my-5">{`Let's get you set up`}</p>
                            <p>{`It should only take a couple of minutes`}</p>
                            <div className='flex justify-center mt-10'>
                                <img src='/assets/right-arrow.png' width={50} height={50} />
                            </div>
                            
                        </div>
                    </div>
                    <div className="w-full rounded-2xl lg:w-1/2 bg-white lg:rounded-r-2xl lg:rounded-l-none relative">
                        {loading && (
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-5 flex items-center justify-center z-50 rounded-2xl lg:rounded-r-2xl lg:rounded-l-none">
                                <Loader />
                            </div>
                        )}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form className="p-8 w-full">
                                    <div className="mb-6">
                                        <label htmlFor="input_text" className="block font-semibold text-gray-700 mb-1">
                                            Input Text
                                        </label>
                                        <Field
                                            as="textarea"
                                            className="form-textarea w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-4 py-4"
                                            id="input_text"
                                            name="input_text"
                                            rows={6}
                                        />
                                        <ErrorMessage name="input_text" component="div" className="text-red-500" />
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="description" className="block font-semibold text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <Field
                                            as="textarea"
                                            className="form-textarea w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-4 py-4"
                                            id="description"
                                            name="description"
                                            rows={2}
                                        />
                                        <ErrorMessage name="description" component="div" className="text-red-500" />
                                    </div>

                                    <div className="flex gap-1">
                                        {/** Age range dropdown */}
                                        <div className="mb-6 w-full">
                                            <label htmlFor="ageRange" className="block font-semibold text-gray-700 mb-1">
                                                Age Range
                                            </label>

                                            <div className="relative">
                                                <div className="">
                                                    {/** svg on the left */}
                                                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none" style={{ fontSize: '1.5rem' }}>
                                                        &#127874;
                                                    </div>
                                                    {/** svg on the right */}
                                                    <div className="absolute inset-y-0 right-1 flex items-center px-2 pointer-events-none">
                                                        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                    <Field
                                                        as="select"
                                                        className="pl-10 form-select w-full h-12 rounded-md border border-black focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 pr-10 bg-white text-black appearance-none"
                                                        id="ageRange"
                                                        name="ageRange"
                                                    >
                                                        <option value="">Select Age Range</option>
                                                        <option value="20-30">20-30</option>
                                                        <option value="31-40">31-40</option>
                                                        <option value="41-50">41-50</option>
                                                        <option value="51-60">51-60</option>
                                                        <option value="61-70">61-70</option>
                                                        <option value="70+">70+</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <ErrorMessage name="ageRange" component="div" className="text-red-500" />
                                        </div>


                                        {/** Education dropdown */}
                                        <div className="mb-6 w-full">
                                            <label htmlFor="ageRange" className="block font-semibold text-gray-700 mb-1">
                                                Education Level
                                            </label>

                                            <div className="relative">
                                                <div>
                                                    {/** svg on the left */}
                                                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none" style={{ fontSize: '1.5rem' }}>
                                                        &#127891;
                                                    </div>
                                                    {/** svg on the right */}
                                                    <div className="absolute inset-y-0 right-1 flex items-center px-2 pointer-events-none">
                                                        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                    <Field
                                                        as="select"
                                                        className="pl-10 form-select w-full h-12 rounded-md border border-black focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 pr-10 bg-white text-black appearance-none"
                                                        id="education_level"
                                                        name="education_level"
                                                    >
                                                        <option value="">Select Education Level</option>
                                                        <option value="High">High</option>
                                                        <option value="Middle">Middle</option>
                                                        <option value="Low">Low</option>
                                                        <option value="No">No</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <ErrorMessage name="education_level" component="div" className="text-red-500" />
                                        </div>

                                        {/** Income level dropdown */}

                                        <div className="mb-6 w-full">
                                            <label htmlFor="ageRange" className="block font-semibold text-gray-700 mb-1">
                                                Income level
                                            </label>

                                            <div className="relative">
                                                <div>
                                                    {/** svg on the left */}
                                                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none" style={{ fontSize: '1.5rem' }}>
                                                        &#128176;
                                                    </div>
                                                    {/** svg on the right */}
                                                    <div className="absolute inset-y-0 right-1 flex items-center px-2 pointer-events-none">
                                                        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                    <Field
                                                        as="select"
                                                        className="pl-10 form-select w-full h-12 rounded-md border border-black focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 pr-10 bg-white text-black appearance-none"
                                                        id="income_level"
                                                        name="income_level"
                                                    >
                                                        <option value="">Select Income Level</option>
                                                        <option value="Low">Low</option>
                                                        <option value="Middle">Middle</option>
                                                        <option value="High">High</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <ErrorMessage name="income_level" component="div" className="text-red-500" />
                                        </div>

                                    </div>
                                    <div className="flex gap-1">


                                        {/** Gender dropdown */}

                                        <div className="mb-6 w-full">
                                            <label htmlFor="ageRange" className="block font-semibold text-gray-700 mb-1">
                                                Gender
                                            </label>

                                            <div className="relative">
                                                <div>
                                                    {/** svg on the left */}
                                                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none" style={{ fontSize: '1.5rem' }}>
                                                        &#129489;
                                                    </div>
                                                    {/** svg on the right */}
                                                    <div className="absolute inset-y-0 right-1 flex items-center px-2 pointer-events-none">
                                                        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                    <Field
                                                        as="select"
                                                        className="pl-10 form-select w-full h-12 rounded-md border border-black focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 pr-10 bg-white text-black appearance-none"
                                                        id="gender"
                                                        name="gender"
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Man">Man</option>
                                                        <option value="Woman">Woman</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <ErrorMessage name="gender" component="div" className="text-red-500" />
                                        </div>

                                        {/** Marital status */}

                                        <div className="mb-6 w-full">
                                            <label htmlFor="ageRange" className="block font-semibold text-gray-700 mb-1">
                                                Marital Status
                                            </label>

                                            <div className="relative">
                                                <div>
                                                    {/** svg on the left */}
                                                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none" style={{ fontSize: '1.5rem' }}>
                                                        &#128141;
                                                    </div>
                                                    {/** svg on the right */}
                                                    <div className="absolute inset-y-0 right-1 flex items-center px-2 pointer-events-none">
                                                        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                    <Field
                                                        as="select"
                                                        className="pl-10 form-select w-full h-12 rounded-md border border-black focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 pr-10 bg-white text-black appearance-none"
                                                        id="marital_status"
                                                        name="marital_status"
                                                    >
                                                        <option value="">Select Marital Status</option>
                                                        <option value="Married">Married</option>
                                                        <option value="Single">Single</option>
                                                        <option value="Widowed">Widowed</option>
                                                        <option value="Divorced">Divorced</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <ErrorMessage name="marital_status" component="div" className="text-red-500" />
                                        </div>

                                        {/** Area type dropdown */}
                                        <div className="mb-6 w-full">
                                            <label htmlFor="ageRange" className="block font-semibold text-gray-700 mb-1">
                                                Area Type
                                            </label>

                                            <div className="relative">
                                                <div>
                                                    {/** svg on the left */}
                                                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none" style={{ fontSize: '1.5rem' }}>
                                                        &#128205;
                                                    </div>
                                                    {/** svg on the right */}
                                                    <div className="absolute inset-y-0 right-1 flex items-center px-2 pointer-events-none">
                                                        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                    <Field
                                                        as="select"
                                                        className="pl-10 form-select w-full h-12 rounded-md border border-black focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 pr-10 bg-white text-black appearance-none"
                                                        id="area_type"
                                                        name="area_type"
                                                    >
                                                        <option value="">Select Area Type</option>
                                                        <option value="City">City</option>
                                                        <option value="Village">Village</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <ErrorMessage name="area_type" component="div" className="text-red-500" />
                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-buttonBlue hover:bg-buttonBlueHover text-white py-2 px-4 rounded inline-flex items-center justify-center w-full"
                                        disabled={isSubmitting}
                                    >
                                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                                        </svg>
                                        <span>Generate</span>
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}