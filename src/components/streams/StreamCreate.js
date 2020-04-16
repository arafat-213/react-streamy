import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends Component {
  /**
   *
   * @param {erorr, touched} meta
   */
  renderError({ error, touched }) {
    if (touched && error)
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
  }

  /**
   *
   * @param {input}formProps Passed by <Field/>, contains various input element attributes
   * @returns an Input element for form
   */
  renderInput = ({ input, label, meta }) => {
    const classes = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={classes}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * @handler for form submit evetn
   * Is fired whenever the redux-form is submitted
   * @param formValues event-args
   */
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Enter Title"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Title can not be empty';
  }
  if (!formValues.description) {
    errors.description = 'Ddescription can not be empty';
  }
  return errors;
};

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.stream,
  };
};
export default connect(mapStateToProps, { createStream })(formWrapped);
