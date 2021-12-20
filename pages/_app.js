import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faBorderAll,
  faList,
  faSortNumericDown,
  faSortNumericUp,
} from "@fortawesome/free-solid-svg-icons";
import ThemeProvider from "providers/ThemeProvider";

config.autoAddCss = false;
library.add(faList, faBorderAll, faSortNumericDown, faSortNumericUp);

import "bootstrap/dist/css/bootstrap.min.css";
import "highlight.js/styles/foundation.css";
import "../styles/index.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";

function MyApp({ Component, pageProps }) {
  return (<ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
  )}

export default MyApp;
