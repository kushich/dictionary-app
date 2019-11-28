import React, {useState, useEffect} from 'react';
import axios from 'axios';  
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

    const API = "dict.1.1.20191123T112800Z.7a33d0b49a0562f7.d9e7d3b2f1290c4640c0518f0a5ce7e6adcc0c0e";
const App = () => {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [request, setRequest] = useState('');
    const [lang, setLang] = useState('en-ru');

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API}&lang=${lang}&text=${request}`);
            setData(result.data.def);
        };
        fetchData();
      }, [request, lang]);

    const handleSubmit = (e) => {
        setRequest(query);
        e.preventDefault();
    }

    return <div>
        <Container>
        <Form onSubmit={handleSubmit} >
            <Form.Group controlId="formBasicEmail">
                <Row>
                    <Col xl={1}>
                <DropdownButton variant="drop" title={lang}>
                    <Dropdown.Item onClick={() => setLang("en-ru")}>EN to RU</Dropdown.Item>
                    <Dropdown.Item onClick={() => setLang("ru-en")}>RU to EN</Dropdown.Item>
                </DropdownButton>
                </Col>
                    <Col xl={11}>
                <Form.Control type="text"
                              value={query}
                              onChange={event => setQuery(event.target.value)}
                              placeholder="Enter a word" />
                    </Col>
                </Row>
            </Form.Group>
            <Row className="submitButton">
                <Col xl={12}>
            <Button variant="submit" type="submit">
                Submit
            </Button>
                </Col>
            </Row>
        </Form>

            <Tabs className="tabs">
            {data.map(w => <Tab eventKey={w.pos} title={w.pos}>
                <Row>
                    <Col>
                        <h3>Translation</h3>
                        {w.tr.map(t => <div>{t.text}</div>)}
                    </Col>
                    <Col>
                        <h3>Examples</h3>
                        {w.tr.map(t => {
                            if (t.ex) {
                            return <div>{t.ex.map(e => <div>{`${e.text}`}</div>)}</div>
                            } else return ""})}
                    </Col>
                </Row>
                </Tab>)
            }
            </Tabs>




</Container>
    </div>
}

export default App;
