var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMap']);

// Routes
myApp.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'HomeController as hc',
    })
    .when('/aboutrider', {
      templateUrl: '/views/templates/aboutrider.html',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/aboutdriver', {
      templateUrl: '/views/templates/aboutdriver.html',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/contact', {
      templateUrl: '/views/templates/contact_us.html',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'RiderLoginController as rc',

    })
    .when('/ride-purpose', {
      templateUrl: '/views/templates/rider/ride-purpose.html',
      controller: 'RidePurposeController as rc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/driver-login', {
      templateUrl: '/views/templates/driver/driver-login.html',
      controller: 'DriverLoginController as dc'
    })
    .when('/rider-login', {
      templateUrl: '/views/templates/rider/rider-login.html',
      controller: 'RiderLoginController as rc'
    })
    .when('/rider-profile-setup', {
      templateUrl: '/views/templates/rider/rider-profile-setup.html',
      controller: 'RiderProfileController as rc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/driver-profile-setup', {
      templateUrl: '/views/templates/driver/driver-profile-setup.html',
      controller: 'DriverProfileController as dc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/on-demand', {
      templateUrl: '/views/templates/rider/on-demand.html',
      // controller: 'OnDemandController as oc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/input-ride', {
      templateUrl: '/views/templates/rider/input-ride.html',
      controller: 'RidePurposeController as rc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/default-view', {
      templateUrl: '/views/templates/driver/default-view.html',
      controller: 'DefaultViewController as dc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/trip-view', {
      templateUrl: '/views/templates/rider/trip-view.html',
      controller: 'RiderNotificationController as rc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });


  // Defines primary palette scheme
  $mdThemingProvider.definePalette('mobilityPalette', {
    '50': 'e3f0fd',
    '100': 'b9d8fa',
    '200': '8abff6',
    '300': '5ba5f2',
    '400': '3791f0',
    '500': '147eed',
    '600': '1276eb',
    '700': '0e6be8',
    '800': '0b61e5',
    '900': '064ee0',
    'A100': 'ffffff',
    'A200': 'd5e1ff',
    'A400': 'a2bcff',
    'A700': '89aaff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      '300',
      '400',
      'A100',
      'A200',
      'A400',
      'A700'
    ],
    'contrastLightColors': [
      '500',
      '600',
      '700',
      '800',
      '900'
    ]
  });
  // Defines warn palette scheme
  $mdThemingProvider.definePalette('logoutPalette', {
    '50': 'fbe4e4',
    '100': 'f5bbbb',
    '200': 'ef8e8e',
    '300': 'e96060',
    '400': 'e43e3e',
    '500': 'df1c1c',
    '600': 'db1919',
    '700': 'd71414',
    '800': 'd21111',
    '900': 'ca0909',
    'A100': 'fff5f5',
    'A200': 'ffc2c2',
    'A400': 'ff8f8f',
    'A700': 'ff7575',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      '300',
      'A100',
      'A200',
      'A400',
      'A700'
    ],
    'contrastLightColors': [
      '400',
      '500',
      '600',
      '700',
      '800',
      '900'
    ]
  });
  // Defines accent palette scheme
  $mdThemingProvider.definePalette('moAccentPalette', {
    '50': 'E5F7E7',
    '100': 'BEEAC4',
    '200': '93DC9C',
    '300': '67CE74',
    '400': '47C457',
    '500': '26B939',
    '600': '22B233',
    '700': '1CAA2C',
    '800': '17A224',
    '900': '0D9317',
    'A100': 'C3FFC6',
    'A200': '90FF96',
    'A400': '5DFF65',
    'A700': '43FF4D',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      'A100',
      'A200',
      'A400',
      'A700'
    ],
    'contrastLightColors': [
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900'
    ]
  });
  // Assigns palette schemes
  $mdThemingProvider.theme('default')
    .primaryPalette('mobilityPalette')
    .accentPalette('moAccentPalette')
    .warnPalette('logoutPalette');

});
