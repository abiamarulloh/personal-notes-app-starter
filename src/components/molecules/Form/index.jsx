import PropTypes from 'prop-types';
import React from "react";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { Textarea } from "../../atoms/Textarea";
import { Title } from "../../atoms/Title";
import './index.css';

export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            createdAt: new Date(),
            archived: false
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
        if(event.target.value.length <= 50) {
            this.setState({title: event.target.value});
        }
    }

    handleChangeBody(event) {
        this.setState({body: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmitForm(this.state);            
    }
    
    render() { 
        return (
            <div className="form" >
                <Title title="Buat Catatan" size="20px" />
                <p>Sisa Karakter: { 50 - this.state.title.length }</p>
                <form  onSubmit={this.handleSubmit}>
                    <Input type="text" value={this.state.title} onChange={this.handleChangeTitle}  placeholder="Tuliskan Judul disini..." />
                    <Textarea value={this.state.body} onChange={this.handleChangeBody} placeholder="Tuliskan catatanmu disini.." />
                    <Button title="Submit" type="submit" />
                </form>
            </div>
        );
    }
}

Form.propTypes = {
    onSubmitForm: PropTypes.func,
}