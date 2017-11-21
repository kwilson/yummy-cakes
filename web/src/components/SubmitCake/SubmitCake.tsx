import * as React from 'react';
import './SubmitCake.css';
import { FormEvent } from 'react';
import { NewCakeModel } from '../../models/NewCakeModel';

export interface SubmitCakeProps {
  submitCake: (cake: NewCakeModel) => any;
  cancel: () => any;
}

interface SubmitCakeState {
  [key: string]: string;
}

class SubmitCake extends React.Component<SubmitCakeProps, SubmitCakeState> {
  constructor(props: SubmitCakeProps) {
    super(props);
    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleInputChange(event: FormEvent<HTMLInputElement>) {
    const target = event.target;
    const value = (target as HTMLInputElement).value;
    const name = (target as HTMLInputElement).name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event: FormEvent<any>) {
    event.preventDefault();
    this.props.submitCake(this.state);
  }

  handleCancel() {
    this.props.cancel();
  }

  render() {
    return (
      <div className="submit-cake">
        <h1>Submit Your Cake</h1>
        <form className="submit-cake__form" onSubmit={this.handleSubmit}>
          <label>
            Cake Name
            <input name="name" type="text" required={true} onChange={this.handleInputChange} />
          </label>

          <label>
            Image URL
            <input name="imageUrl" type="text" required={true} onChange={this.handleInputChange} />
          </label>

          <label>
            Comment
            <input name="comment" type="text" onChange={this.handleInputChange} />
          </label>

          <label>
            Yum Factor
            <input name="yumFactor" type="number" onChange={this.handleInputChange} max={5} min={1} />
          </label>

          <div className="submit-cake__actions">
            <a onClick={this.handleCancel} className="submit-cake__btn submit-cake__btn--cancel">Cancel</a>
            <button className="submit-cake__btn submit-cake__btn--submit" type="submit">Submit Cake</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SubmitCake;
