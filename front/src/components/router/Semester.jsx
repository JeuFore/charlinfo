import React from 'react'
import DisplayCategorie from '../display/DisplayCategorie'
import fileSemester from '../../actions/fileSemester'
import { RequestStatus } from '../../utils/consts'

class Semester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: RequestStatus.Getting
        }
    }

    componentDidMount() {
        document.title = `Charlinfo | ${this.props.match.url.replace('/', '')}`;
        fileSemester.get(this.state, this.props.match.url).then((data) => this.setState(data));
    }

    render() {
        var informatique = [];
        var general = [];
        if (this.state.requestStatus === RequestStatus.Success) {
            informatique = this.state.data.filter(data => data.type === "informatique");
            general = this.state.data.filter(data => data.type === "general");
        }

        return (
            <div className="container mt-3">
                <h1 className="text-center mb-3">{this.props.title}</h1>
                <div className="s1_container">
                    <div className="s1_col">
                        <h3 className="text-center mb-3">UE Informatique</h3>
                        {informatique.map((data) => (
                            <DisplayCategorie data={data} link={`${this.props.match.url}/${data.link}`} key={data.id} />
                        ))}
                    </div>
                    <div className="s1_col">
                        <h3 className="text-center mb-3">UE Générale</h3>
                        {general.map((data) => (
                            <DisplayCategorie data={data} link={`${this.props.match.url}/${data.link}`} key={data.id} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Semester