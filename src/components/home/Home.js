import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const Home = () => {
    return <>
    <Container>
        <Row>
            
    <div className="home">
        {/* home page title */}
        <Col>
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
        </Col>
    </div> 
    </Row>
    </Container>
    </>
}