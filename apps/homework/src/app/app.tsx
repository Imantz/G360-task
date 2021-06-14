/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { taskApi } from '../api';
import Checkbox from './checkbox/checkbox';
import TextField from './text-field/text-field';
//import styles from './app.module.css';

const notificationsProjectFinishKey = "notifications.project_finish";
const notificationsUpdates = "notifications.updates";

export interface RequestDto {
  email: string,
  company_id: string,
  first_name: string,
  last_name: string,
  password: string,
  company?: string | undefined,
  [notificationsProjectFinishKey]: boolean
  [notificationsUpdates]: boolean,
}

//@ts-ignore
const injectedValues = window.token as RequestDto;

const initialState: RequestDto = {
  email: injectedValues.email || '',
  company: injectedValues.company || '',
  company_id: injectedValues.company_id || '',
  first_name: injectedValues.first_name || '',
  last_name: injectedValues.last_name || '',
  password: injectedValues.password || '',
  [notificationsProjectFinishKey]: injectedValues[notificationsProjectFinishKey] || false,
  [notificationsUpdates]: injectedValues[notificationsUpdates] || false,
}

export function App() {
  const [state, setState] = useState<RequestDto>(initialState);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    if (!state.company) {
      delete state.company;
    }
    taskApi.create(state).then(() => alert('Success!')).catch(e => alert(e?.response?.data?.detail))
    event.preventDefault();
  }
  const handleChange = (event: { target: any; }) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value
    });
  }

  const checkboxFields = [notificationsProjectFinishKey, notificationsUpdates];

  const textFieldKeys = Object.keys(state).filter(key => !checkboxFields.includes(key));


  const generateTextfield = () => {
    return textFieldKeys.map((fieldName: string) => ( //@ts-ignore
      <TextField key={fieldName} fieldName={fieldName} value={state[fieldName]} handleChange={handleChange} />
    ))
  }

  const generateCheckboxFields = () => {
    return checkboxFields.map(fieldName => ( //@ts-ignore
      <Checkbox key={fieldName} fieldName={fieldName} checked={state[fieldName]} handleChange={handleChange} />
    ))
  }

  return (
    <form onSubmit={handleSubmit}>
      {generateTextfield()}
      {generateCheckboxFields()}
      <input type="submit" value="Submit" />
    </form>
  );
}

export default App;
