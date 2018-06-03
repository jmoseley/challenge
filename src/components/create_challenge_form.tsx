import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

// import { ChallengeCreateOptions } from '../models';

const validateNotEmpty = (value: string) =>
  !value ? 'Must enter a value' : null;
const isNumber = (value: string) =>
  !value || isNaN(parseFloat(value)) ? 'Must be a number' : null;

export interface FormData {
  challengeName: string;
  goal: string;
}

const onSubmit = async (values: FormData) => {
  // TODO: It would be nice if we could get this type checking for free. Maybe we add types for the Meteor.call method?
  // Bunch of defaults for now.
  // const args: { newChallenge: ChallengeCreateOptions } = {
  //   newChallenge: {
  //     distanceMiles: parseFloat(values.goal),
  //     durationWeeks: 1, // 1 week,
  //     name: values.challengeName,
  //     repeats: true,
  //     startDayOfWeek: 0, // Sunday
  //   },
  // };
  // Meteor.call('challenge.create', args);
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}: any) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

const CreateChallengeForm = ({ handleSubmit }: InjectedFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        label="Challenge Name"
        name="challengeName"
        component={renderField}
        validate={validateNotEmpty}
        type="text"
      />
      <Field
        label="Target Miles"
        name="goal"
        component={renderField}
        validate={[validateNotEmpty, isNumber]}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default reduxForm({
  form: 'createChallenge',
})(CreateChallengeForm);
