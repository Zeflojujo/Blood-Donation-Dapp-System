import React, { useState } from "react"
import Sidebar from "../layouts/Sidebar"
import DashboardHeader from "../layouts/DashboardHeader"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import swal from "sweetalert"
import { setAlert, setGlobalState, setLoadingMsg } from "../../store"
import { completeDonation } from "../../BlockchainService"
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loding"


const DonateBloodToMedicalCenter = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [transactionID, settransactionID] = useState("")
    const [hemoglobinLevel, setHemoglobinLevel] = useState("")
    const [medicalCenter, setmedicalCenter] = useState("")
    const [bloodPressure, setbloodPressure] = useState("")
    const [bloodTestResults, setBloodTestResults] = useState("")

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }
    

    const handleBloodChecking = async () => {

        setGlobalState('loading', { show: true, msg: 'Blood checking...' })
    
        try {
            const bloodDetails = { transactionID, medicalCenter, bloodPressure, hemoglobinLevel, bloodTestResults }
        
            setLoadingMsg('Intializing transaction...')
            const result = await completeDonation(bloodDetails)
            
            if(result){
                setAlert('Blood Checked successfully...', 'green')
                resetForm()
            }else {
                throw Error
            }

    } catch (error) {
          console.log('Error registering donor: ', error)
          setAlert('Blood Checking failed...', 'red')
        }
      }

      const resetForm = () => {
        settransactionID("")
        setHemoglobinLevel("")
        setmedicalCenter("")
        setbloodPressure("")
        setBloodTestResults("")
      }

    const initialValues = {
        transactionID: "",
        hemoglobinLevel: "",
        medicalCenter: "",
        bloodPressure: "",
        bloodTestResults: "",
    }

    const validationSchema = Yup.object().shape({
        transactionID: Yup.string().required("Public Address is required"),
        hemoglobinLevel: Yup.string().required("HemoglobinLevel is required"),
        medicalCenter: Yup.string().required("medicalCenter is required"),
        bloodPressure: Yup.string().required("Blood pressure is required"),
        bloodTestResults: Yup.string().required("lBoodTestResults is required"),
    })

    const handleSubmit = (values, { setSubmitting }) => {
        // Perform registration or login (this is where you would send data to the server)
        console.log("Authentication successful!", values)
        settransactionID(values.transactionID)
        setHemoglobinLevel(values.hemoglobinLevel)
        setmedicalCenter(values.medicalCenter)
        setbloodPressure(values.bloodPressure)
        setBloodTestResults(values.bloodTestResults)

        handleBloodChecking()
        setSubmitting(false)
    }

    return (
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Manufacturers Sidebar component is included */}
            <div className="relative">
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                <div className="mb-16">
                    {/* Manufacturers Header component is included */}
                    <DashboardHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* Manufactuerers ViewFakeProduct page should be created here */}
                <div className="flex flex-col justify-center items-center mx-auto w-full">
                    {/* Manufacturers Header component is included */}
                    <Alert />
                    <Loading />

                    <div
                        className={`w-4/5 px-4  md:w-3/4 lg:w-1/2 mt-8 flex-col items-center justify-center shadow-md bg-gray-100 dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400`}
                    >
                        <h2 className="text-1xl flex justify-center md:text-3xl font-bold mt-4 pt-3">
                            Blood Checking
                        </h2>
                        <hr className="w-full dark:border-gray-500 dark:h-1 mt-6" />

                        <div className=" w-full rounded-md px-0 py-4 md:p-6 mt-4 bg-white dark:bg-transparent dark:text-gray-300">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="transactionID"
                                                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                                            >
                                                Transaction ID:
                                            </label>
                                            <Field
                                                type="text"
                                                id="transactionID"
                                                name="transactionID"
                                                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 dark:text-gray-300 bg-clip-padding"
                                                placeholder="Enter your public address"
                                            />
                                            <ErrorMessage
                                                name="transactionID"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                htmlFor="medicalCenter"
                                                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                                            >
                                                Medical Center Name:
                                            </label>
                                            <Field
                                                type="text"
                                                id="medicalCenter"
                                                name="medicalCenter"
                                                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 dark:text-gray-300  bg-clip-padding"
                                                placeholder="Enter your medicalCenter"
                                            />
                                            <ErrorMessage
                                                name="medicalCenter"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                htmlFor="bloodPressure"
                                                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                                            >
                                                Blood Pressure:
                                            </label>
                                            <Field
                                                type="text"
                                                id="bloodPressure"
                                                name="bloodPressure"
                                                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                placeholder="Enter your bloodPressure"
                                            />
                                            <ErrorMessage
                                                name="bloodPressure"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                htmlFor="hemoglobinLevel"
                                                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                                            >
                                                hemoglobinLevel:
                                            </label>
                                            <Field
                                                type="text"
                                                id="hemoglobinLevel"
                                                name="hemoglobinLevel"
                                                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 dark:text-gray-300 bg-clip-padding"
                                                placeholder="Enter your hemoglobinLevel"
                                            />
                                            <ErrorMessage
                                                name="hemoglobinLevel"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                htmlFor="bloodTestResults"
                                                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                                            >
                                                bloodTestResults:
                                            </label>
                                            <Field
                                                type="text"
                                                id="bloodTestResults"
                                                name="bloodTestResults"
                                                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 dark:text-gray-300 bg-clip-padding"
                                                placeholder="Enter your bloodTestResults"
                                            />
                                            <ErrorMessage
                                                name="bloodTestResults"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-lg text-white p-2 rounded-md w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Processing..." : "Register"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonateBloodToMedicalCenter
