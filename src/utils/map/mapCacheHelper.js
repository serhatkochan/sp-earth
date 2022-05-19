import { Icon } from 'ol/style';

import offenderIcon from 'assests/images/map/offender-location.png';
import victimIcon from 'assests/images/map/victim-location.png';
import routeIcon from 'assests/images/map/route.png';
import routeStartIcon from 'assests/images/map/route-start.png';
import routeEndIcon from 'assests/images/map/route-end.png';
import alertIcon from 'assests/images/map/alert-location.png';

import { HumanTypes, RouteIconTypes } from './mapConstant';

export const HumanIconCache = {
  [HumanTypes.VICTIM]: alertIcon,
  [HumanTypes.OFFENDER]: offenderIcon,
};

export const HumanMapIconCache = {
  [HumanTypes.VICTIM]: new Icon({
    src: alertIcon,
  }),
  [HumanTypes.OFFENDER]: new Icon({
    src: offenderIcon,
  }),
};

export const UnitRouteIconCache = {
  [RouteIconTypes.ROUTE]: routeIcon,
  [RouteIconTypes.ROUTE_START]: routeStartIcon,
  [RouteIconTypes.ROUTE_END]: routeEndIcon,
};
