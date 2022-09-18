export const Home = () => {
    return <>
    <div className="home">
        {/* home page title */}
        <h2 className="subTitle">Your 2022 Lineup</h2>
        <>
        <section>
            <fieldset>
                {/* lineup image */}
                {
                    <div>
                        <img 
                        className="meadows"
                        src="/images/GrooveLineup.png"
                        alt="meadows"
                    />
                    </div>
                }
            </fieldset>
        </section>
        </>
    </div>
    </>
}