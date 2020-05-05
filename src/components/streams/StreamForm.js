import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class StreamForm extends React.Component {

    displayErrorMessage({touched, error}) {
        if( touched && error) {
            return (
                <div className="ui error message">{error}</div>
            );
        }
    }

    renderText = ({input, label, meta}) => {
        const className = `field ${meta.touched && meta.error ? 'error' : ''}`;
        return (            
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                {this.displayErrorMessage(meta)}
            </div>            
        );
    }

    onFormSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <div>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                    <Field name="title" component={this.renderText} label="Enter Title"></Field>
                    <Field name="description" component={this.renderText} label="Enter Description"></Field>
                    <button className="ui primary button">Save</button>              
                </form>                
            </div>
        );
    }    
}

const validate = (formValues) => {
    const error = {};

    if(!formValues.title) {
        error.title = "Title is required";
    }

    if(!formValues.description) {
        error.description = "Description is required";
    }

    return error;
};

const mapStateToProps = (state, ownProps) => {
    return {initialValues : ownProps.stream};
}

export default connect(mapStateToProps)(reduxForm({
    form: 'StreamForm',
    validate
})(StreamForm));