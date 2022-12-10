import { useState } from 'react';
import { Loading } from '../components/atoms/Loading';

const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};


export default function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return [value, onValueChangeHandler];
}

export function showSpinner(show) {
  if(show) return  <Loading />
}

export function translate(locale, id, en) {
  if(locale === 'id') return id;
  return en
}

const NOTES_ROUTE_PATH = "/notes"

export { showFormattedDate, NOTES_ROUTE_PATH };
