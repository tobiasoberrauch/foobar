import React, { Component, Suspense } from "react";
import { useTranslation, withTranslation } from "react-i18next";

// use hoc for class based components
class LegacyWelcomeClass extends Component {
  render() {
    const { t } = this.props;
    return <h2>{t("TaskList")}</h2>;
  }
}
const Welcome = withTranslation()(LegacyWelcomeClass);

// page uses the hook
function Page() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <div className="App-header">
        <Welcome />
        <button onClick={() => changeLanguage("ch")}>ch</button>
        <button onClick={() => changeLanguage("en")}>en</button>
      </div>
      <div>{t("Overview")}</div>
    </div>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}
