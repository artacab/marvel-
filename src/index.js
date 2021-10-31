import 'regenerator-runtime/runtime'
import App from './components/App/App'
import Comics from './components/Comics/Comics.js';

(async () => {
    await App.render()
    Comics.eventListener()
})();