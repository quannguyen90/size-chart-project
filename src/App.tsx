import { Router, Route } from "@solidjs/router";
import Guide from "./guide";
import SizeChartEmbed from "./embed/SizeChartEmbed";
import ShopBaseEmbed from "./embed/shopbase-embed";

function App() {
  return (
    <Router>
      <Route path="/" component={Guide} />
      <Route path="/embed/:customerId/:sizeChartId" component={SizeChartEmbed} />
      <Route path="/embed/shopbase" component={ShopBaseEmbed} />
    </Router>
  );
}

export default App; 