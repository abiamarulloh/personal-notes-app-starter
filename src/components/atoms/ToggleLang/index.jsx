import { LocaleConsumer } from '../../../contexts/LocaleContext';
import './index.css';

function ToggleLang() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return <button onClick={toggleLocale}>
          { locale === 'id' ? 'ID' : 'EN'}
        </button>;
      }}
    </LocaleConsumer>
  );
}

export default ToggleLang;
