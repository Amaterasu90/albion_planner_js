import React from "react";
import Headers from "./headerLine/Headers";
import Rows from "./rowLine/Rows";

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

            }
        };

        fetch("https://localhost:44310/artifact/list", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result,
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Ładowanie...</div>;
        } else {
            return <table>
                <thead>
                    <Headers json={items} />
                </thead>
                <tbody>
                    <Rows json={items} />
                </tbody>
            </table>;
        }
    }
}

export default Grid;