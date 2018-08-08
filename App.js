import {
  createStackNavigator,
} from 'react-navigation';

import CarMasterView from './src/scenes/carMasterView';
import CarDetailView from './src/scenes/carDetailView';

const reactNativeMasterDetail = createStackNavigator({
  CarMasterView: {screen: CarMasterView},
  CarDetailView: {screen: CarDetailView}
});

export default reactNativeMasterDetail;
