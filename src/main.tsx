import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import Guide from "./guide";
import ProductTypeDetail from "./guide/[id]";
import SizeChartEmbed from "./embed/SizeChartEmbed";
import "./style.css";

function App() {
  return (
    <Router>
      <Route path="/embed/:customerId/:sizeChartId" component={SizeChartEmbed} />
      <Route path="/guide" component={Guide} />
      <Route path="/guide/:id" component={ProductTypeDetail} />
      <Route path="/" component={Guide} /> {/* Redirect root to Guide */}
    </Router>
  );
}

render(() => <App />, document.getElementById("root")!); 