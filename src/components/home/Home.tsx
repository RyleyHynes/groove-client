import "./Home.css"
import React from "react";


export const Home = () => {
    return <>
    <div>
        {/* home page title */}
        
        <h2 className="lineupTitle">Your 2022 Groove Lineup</h2>
        <>
        <section>
            <fieldset>
                {/* lineup image */}
                {
                    <div>
                        <img 
                        className="grooveLineup"
                        src="/images/GrooveLineup.png"
                        alt="grooveLineup"
                    />
                    </div>
                }
            </fieldset>
            
        </section>
        </>
    </div> 
    </>
}