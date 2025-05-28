import { render } from 'solid-js/web';
import { Router, Route } from "@solidjs/router";
import SizeChartEmbed from "./SizeChartEmbed";
import ShopBaseEmbed from "./shopbase-embed";

function EmbedApp() {
  return (
    <Router base="/size-chart-project">
      <Route path="/embed/:customerId/:sizeChartId" component={SizeChartEmbed} />
      <Route path="/embed/shopbase" component={ShopBaseEmbed} />
    </Router>
  );
}

render(() => <EmbedApp />, document.getElementById('root')!);

