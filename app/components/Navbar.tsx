import { Link } from 'react-router'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>
                <Link to="/">
                    <p className='text-2xl font-bold text-gradient'>RESUMIND</p>
                </Link>
            </div>
            <div>
                <Link to="/upload" className='primary-button w-fit mr-2'>Upload Resume</Link>
                <Link to="/wipe" className="primary-button w-fit">Wipe Data</Link>
            </div>
        </nav>
    )
}

export default Navbar