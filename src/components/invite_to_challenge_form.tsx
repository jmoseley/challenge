import * as React from 'react';
import {
  Field,
  InjectedFormProps,
  reduxForm,
  reset,
  SubmissionError,
} from 'redux-form';

import { Dispatch } from 'redux';
import { Errors } from '../models';
// import { ChallengeInviteOptions, Errors } from '../models';

const validateNotEmpty = (value: string) =>
  !value ? 'Must enter a value' : null;

export interface FormData {
  email: string;
}

export interface Props {
  challengeId: string;
  onSubmit: () => void;
}

const onSubmitFactory = (formName: string) => {
  return async (values: FormData, dispatch: Dispatch<any>, props: Props) => {
    // TODO: It would be nice if we could get this type checking for free. Maybe we add types for the Meteor.call method?
    // const args: ChallengeInviteOptions = {
    //   challengeId: props.challengeId,
    //   email: values.email,
    // };

    try {
      await new Promise((resolve, reject) => {
        // Meteor.call('challenge.invite', args, (error: Meteor.Error, r: any) => {
        //   if (error) {
        //     reject(error);
        //   }
        //   resolve(r);
        // });
      });
    } catch (err) {
      switch (err.error) {
        case Errors.ALREADY_MEMBER:
          throw new SubmissionError({
            email: 'User is already a member of this challenge. ',
          });
        case Errors.NOT_FOUND:
          throw new SubmissionError();
        case Errors.UNAUTHORIZED:
          throw new SubmissionError();
        default:
          throw new Error('Invalid response from server.');
      }
    }

    props.onSubmit();

    dispatch(reset(formName));
  };
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

const InviteToChallengeForm = ({
  handleSubmit,
  form,
}: InjectedFormProps<FormData, Props>) => {
  return (
    <form onSubmit={handleSubmit(onSubmitFactory(form) as any)}>
      <Field
        label="Email"
        name="email"
        component={renderField}
        validate={validateNotEmpty}
        type="text"
      />
      <button type="submit">Invite</button>
    </form>
  );
};

export default reduxForm<FormData, Props>({})(InviteToChallengeForm);
