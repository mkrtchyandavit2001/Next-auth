import Link from "next/link"

export const Navbar = () => {
    return <>
        <nav className="has-background-dark	p-5 has-text-white-ter	">
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link href='/' className="navbar-item">
                        Signup
                    </Link>
                    <Link href='/login' className="navbar-item">
                       Login
                    </Link>
                </div>
            </div>
        </nav>
    </>
}