import { useEffect, useState } from "react"
import {Link, useNavigate} from "react-router"
import { usePuterStore } from "~/lib/puter"
import Navbar from "~/components/Navbar";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore()
    const navigate = useNavigate()
    const [files, setFiles] = useState<FSItem[]>([])

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[]
        setFiles(files)
    };

    useEffect(() => {
        loadFiles()
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe")
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path)
        });
        await kv.flush()
        loadFiles()
    };

    if (isLoading) {
        return <div className="flex flex-col items-center justify-center text-4xl !text-black font-bold pt-3">Loading...</div>
    }

    if (error) {
        return <div className="flex flex-col items-center justify-center text-4xl !text-black font-bold pt-3">Error {error}</div>
    }

    return (
        <section>
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-col items-center justify-start pt-4 bg-[url('/images/bg-main.svg')] bg-cover w-full h-[100vh]">
                <h2 className="text-2xl font-bold text-gradient pb-4">Authenticated as : {auth.user?.username}</h2>
                <h3 className="pb-4 text-xl">Existing files:</h3>
                <div className="flex flex-row gap-2 pb-4">
                    {files.map((file) => (
                        <ul key={file.id} className="group/item flex items-center border text-sm rounded-md flex-wrap border-border py-4 px-12 gap-4 bg-gray-200">
                            <li className="flex flex-1 flex-col gap-1">
                                <div>{file.name}</div>
                            </li>
                        </ul>
                    ))}
                </div>
                <div>
                    <button className="primary-button w-fit cursor-pointer" onClick={() => handleDelete()}>
                        Wipe App Data
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WipeApp;