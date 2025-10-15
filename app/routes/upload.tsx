import Navbar from "~/components/Navbar";
import {type FormEvent, useState} from "react";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv} = usePuterStore()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [file, setFile] = useState<File | null>(null)

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }
    const handleAnalyzer = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true)
        setStatusText('Uploading the file...')

        const uploadedFile = await fs.upload([file])
        if (!uploadedFile) return setStatusText('Error: Failed to upload file')

        setStatusText('Converting to image...')
        const formData = new FormData()
        formData.append('companyName', companyName)
        formData.append('jobTitle', jobTitle)
        formData.append('jobDescription', jobDescription)
        formData.append('file', file)
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget.closest('form')
        if (!form) return
        const formData = new FormData(form)
        const companyName = formData.get('company-name') as string
        const jobTitle = formData.get('job-title') as string
        const jobDescription = formData.get('job-description') as string

        if (!file) return

        handleAnalyzer({ companyName, jobTitle, jobDescription, file })
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className='w-full' alt=""/>
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" id="company-name" placeholder="Company Name" required/>
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" id="job-title" placeholder="Job Title" required/>
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" id="job-description" placeholder="Job Description" required/>
                            </div>
                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>
                            <button className="primary-button">
                                <p>Analyze Resume</p>
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
