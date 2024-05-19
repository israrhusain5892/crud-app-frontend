
const Nav = () => {

    return (
        <>

            <nav 
               style={{
                    zIndex:1
               }}
            className="navbar navbar-expand-lg navbar-light bg-primary text-white sticky-top ">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
                            </li>



                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}
export default Nav;