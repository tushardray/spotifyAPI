import React from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from "../navbar/NavBar"


const HomePage = () => {

    return (
        <>
            <NavBar />
            <div className={"App-header"}>

                <h1 style={{paddingTop: "15%", fontFamily: "Verdana"}}>
                    A pathway to better understand your musical taste
                </h1>

                <br/>

                <h3> Log in or search for an artist to get started! &rarr; </h3>
                {/*& Right arrow: rarr; */}
                {/*& Up arrow: uarr; */}

            </div>
        </>
    );
}

export default HomePage;
