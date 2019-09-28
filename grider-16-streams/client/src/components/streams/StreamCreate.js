import React from "react";
import { Field, reduxForm } from "redux-form";

//import { connect } from "react-redux";
// import { createStream } from "../../actions";
// import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  //   onSubmit = formValues => {
  //     this.props.createStream(formValues);
  //   };
  renderInput(formProps) {
    return (
      <input
        onChange={formProps.input.onChange}
        value={formProps.input.value}
      />
    );
  }

  //   renderInput = ({ input, label, meta }) => {
  //     const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  //     return (
  //       <div className={className}>
  //         <label>{label}</label>
  //         <input {...input} autoComplete="off" />
  //         {this.renderError(meta)}
  //       </div>
  //     );
  //   };

  render() {
    return (
      <form>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}
export default reduxForm({
  form: "streamCreate"
})(StreamCreate);

//export default connect()(StreamCreate);
//   null
//   ,
//   { createStream }
