import PropTypes from 'prop-types';
import React from "react";
import { LocaleConsumer } from '../../../contexts/LocaleContext';
import { translate } from '../../../utils';
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
            <LocaleConsumer>
                {
                ({ locale }) => {
                        return <>
                            <div className="form" >
                                <Title title={ translate(locale, 'Buat Catatan', 'Create Note')  } size="20px" />
                                <p> { translate(locale, 'Sisa Karakter: ', 'Remaining Characters: ') }   { 50 - this.state.title.length }</p>
                                <form  onSubmit={this.handleSubmit}>
                                    <Input type="text" value={this.state.title} onChange={this.handleChangeTitle}  placeholder={ translate(locale, 'Tulis Judul catatan mu disini', 'Enter your note title here')  } />
                                    <Textarea value={this.state.body} onChange={this.handleChangeBody} placeholder={ 
                                        translate(locale, 'Tulis Catatan mu disini', 'Enter your note here') } />
                                    <Button title={ translate(locale, 'Tambah', 'submit') } type="submit" />
                                </form>
                            </div>
                        </>

                }
            }
            </LocaleConsumer>
        );
    }
}

Form.propTypes = {
    onSubmitForm: PropTypes.func,
}